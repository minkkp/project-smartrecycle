import cv2
import sys
import time
import numpy as np
import pygetwindow as gw
import requests

from json import dumps
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.contrib import messages
from .models import *
from ultralytics import YOLO
from PIL import ImageDraw,ImageFont,Image
from django.core.files.uploadedfile import InMemoryUploadedFile
from io import BytesIO

# 스캔 종료 조건
scanning = True

# 스캔화면 종료 콜백함수
def mouse_callback(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        global scanning
        scanning=False
       

# 임계값 기준에 따른 True False 적용
def check_thr(pred):
    for index in range(len(pred[0].boxes.conf)):
        if float(pred[0].boxes.conf[index])<0.8:    
            return False
    return True

# 탐지된 오브젝트 카운트
def check_cls(pred):
    check_detect = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] 
    for index in range(len(pred[0].boxes.cls)):
        check_detect[int(pred[0].boxes.cls[index])]+=1
    return check_detect

# 이미지 전처리
def pre(img):
    # 가로 세로비율 유지한채 resize 
    h,w = img.shape[:2]
    ratio = w/h
    resized_img = cv2.resize(img,(800,int(800/ratio)),interpolation=cv2.INTER_AREA)

    # 이미지 대비 향상 
    eq_img = cv2.cvtColor(resized_img, cv2.COLOR_BGR2YUV)
    eq_img[:, :, 0] = cv2.equalizeHist(eq_img[:, :, 0])
    eq_img = cv2.cvtColor(eq_img, cv2.COLOR_YUV2RGB)

    # 이미지 선명도 향상
    kernel = np.array([[0, -1, 0],[-1, 5, -1],[0, -1, 0]])
    kernel_img = cv2.filter2D(resized_img, -1, kernel)

    return kernel_img

def plot(img,pred,mode):
    labels={0:'가구',1:'금속',2:'나무',3:'도기류',4:'비닐',5:'스티로폼',6:'유리',7:'의류',8:'자전거',9:'전자제품',10:'종이',11:'캔',12:'페트병',13:'플라스틱',14:'형광등'}

    # 사진 가져오기
    if mode==0:
        pillow_image = Image.fromarray(img)
        plot_img = ImageDraw.Draw(pillow_image)
        
        # 탐지영역 그리기
        for i,box in enumerate(pred[0].boxes.boxes):
            plot_img.rectangle((int(box[0]),int(box[1]),int(box[2]),int(box[3])),outline=(51,255,51),width=5)
            plot_img.text(xy=(int(box[0]),int(box[1])-35),text=labels[int(pred[0].boxes.cls[i])],fill=(255,0,0),font=ImageFont.truetype("static/font/malgunbd.ttf",30),align='center',stroke_width=2,stroke_fill=(255,255,255))
        
        # DB저장을 위한 파일 처리
        output = BytesIO()
        pillow_image.save(output, format='JPEG', quality=100)
        output.seek(0)
        return InMemoryUploadedFile(output,'ImageField','result.jpg','image/jpeg',sys.getsizeof(output),None)
    
    # 스캔 모드
    if mode==1:
        # 화면에 사각형, 글자를 넣기위해 Pillow 이미지로 변환
        pillow_image = Image.fromarray(img)
        plot_img = ImageDraw.Draw(pillow_image)

        # 텍스트 생성
        text = "탐지완료! 화면 클릭시 종료됩니다"
        font = ImageFont.truetype("static/font/malgunbd.ttf", 30)

        # 글자 위치 설정
        text_width, text_height = plot_img.textsize(text, font)
        image_width, image_height = pillow_image.size
        x = (image_width - text_width) // 2
        y = (image_height - text_height) // 2

        # 탐지영역 그리기
        if(len(pred[0])==0):
            plot_img.text(xy=(x,y),text="탐지중.. 화면 터치시 종료됩니다",fill=(255,0,0),font=ImageFont.truetype("static/font/malgunbd.ttf",30),align='center',stroke_width=2,stroke_fill=(255,255,255))
        else:
            for i,box in enumerate(pred[0].boxes.boxes):
                prob = int(pred[0].boxes.conf[i]*100)
                plot_img.rectangle((int(box[0]),int(box[1]),int(box[2]),int(box[3])),outline=(51,255,51),width=5)
                plot_img.text(xy=(int(box[0]),int(box[1])-35),text=labels[int(pred[0].boxes.cls[i])]+" "+str(prob)+"%",fill=(255,0,0),font=ImageFont.truetype("static/font/malgunbd.ttf",30),align='center',stroke_width=2,stroke_fill=(255,255,255))
                plot_img.text(xy=(x,10),text="탐지완료! 화면 터치시 종료됩니다",fill=(0,0,255),font=ImageFont.truetype("static/font/malgunbd.ttf",30),align='center',stroke_width=2,stroke_fill=(255,255,255))
        
        return np.array(pillow_image)

# result view 
@require_http_methods(['GET','POST'])
def result(request):
    return render(request,'detection/result.html')

# 카메라 스캔 모드
@require_http_methods(['GET','POST'])
def scan(request):
    # 윈도우 해상도 계산
    active_window = gw.getActiveWindow()
    screen_width, screen_height = active_window.width , active_window.height

    # 학습모델 로드
    model =  YOLO('static/model/v8m_best.pt')

    # 카메라 호출
    cap = cv2.VideoCapture(0)
    pre_img = None
    pred = None

    # 종료 조건
    global scanning

    if not cap.isOpened():
        messages.warning(request,'카메라 장치를 인식할 수 없습니다!')
    else: 
        while scanning:
            # 카메라의 화면을 mat형식으로 가져옴
            ret, frame = cap.read()

            # 이미지 전처리
            pre_img = pre(frame)

            # 이미지 가로 세로 추출
            height, width, _ = pre_img.shape

            # 이미지 추론 (임계값 0.5 설정)
            pred = model.predict(pre_img,show=False,conf=0.8)

            # 추론 결과를 frame에 저장
            frame = plot(pre_img,pred,1)
            
            # 출력화면 설정
            cv2.imshow("Smart Recycle",frame)
            cv2.setWindowProperty("Smart Recycle", cv2.WND_PROP_TOPMOST, 1)
            cv2.moveWindow("Smart Recycle", int((screen_width - width) / 2), int((screen_height - height) / 2))
        
            # 종료 조건
            cv2.waitKey(1)
            cv2.setMouseCallback("Smart Recycle", mouse_callback)
            
        scanning = True

        # 출력화면 종료
        cv2.destroyAllWindows()
        cap.release()

        # 추론정보 DB저장
        upload = Upload( 
            user_id = request.user,
            img_file = plot(pre_img,pred,0),
            threshold=check_thr(pred)
        )
    upload.save()   

    context={'upload':upload,'detect':dumps(check_cls(pred))}
    return render(request,'detection/result.html',context)    

# 사진 가져오기 모드
@require_http_methods(['GET','POST'])
def upload(request):
    if request.method=='POST':    
        # 업로드된 이미지 파일 로드
        uploaded_image = request.FILES['image']

        #  이미지를 byte배열로 변환 후 OpenCV 객체로 디코딩
        origin_img = cv2.imdecode(np.fromstring(uploaded_image.read(), np.uint8),cv2.IMREAD_COLOR)

        # 이미지 전처리 함수 호출
        pre_img = pre(origin_img)

        # 학습모델 로드
        model = YOLO('static/model/v8m_best.pt')

        # 이미지 추론 (임계값 0.8 설정)
        pred = model.predict(pre_img,conf=0.8)

        # 추론정보 DB저장
        upload = Upload( 
            user_id = request.user,
            img_file = plot(pre_img,pred,0),
            threshold=check_thr(pred)
        )

    upload.save()   

    context={'upload':upload,'detect':dumps(check_cls(pred))}
    return render(request,'detection/result.html',context) 

# 주변 재활용센터 참기
@require_http_methods(['GET','POST'])
def map(request):
    # 로그인 상태에서는 유저의 행정구역 중심좌표로 검색
    if request.user.is_authenticated:
        # 유저 정보 가져오기
        user = request.user
        # 카카오 API 키
        api_key = '0dd5b85143a0324d96fa5f01d4741b5c'
        # 검색할 법정동 이름 또는 코드
        region = user.user_area.split('/')[0]+" "+user.user_area.split('/')[1]

        # 카카오 지역 검색 API 호출
        url = f'https://dapi.kakao.com/v2/local/search/keyword.json?query={region}'
        headers = {'Authorization': f'KakaoAK {api_key}'}
        response = requests.get(url, headers=headers)

        data = response.json()

        if data.get('documents'):
            # 검색 결과 중 첫 번째 항목의 중심 좌표 정보 얻기
            location = data['documents'][0]['x'], data['documents'][0]['y']
            context = {"long":location[0],"lat":location[1],"region":region}
            return render(request,'detection/map.html',{'context': context})
    return render(request,'detection/map.html')