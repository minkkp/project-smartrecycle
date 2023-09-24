# 프로젝트 소개

- 1인가구 증가, 비대면 수요 증가에 따라 생활 폐기물이 증가하고 있음
- 생활폐기물이 증가함에 따라 폐기물 처리단가 상승, 처리시설 부족등의 문제가 발생
- 단독주택의 경우 분리배출이 잘 되지 않아 폐기물중 35%가 선별되지 않고 소각되고 있음
- 재활용이 가능한 4개 생활폐기물(플라스틱, 금속, 유리, 종이) 재활용률을 1%만 높여도 연간 639억 원 절약

<br>

#### # 딥러닝 이미지 분석을 통해 재활용품 선별을 도와주는 서비스를 제공하여 이러한 문제들을 예방하고자 함

<br>

# 프로젝트 정보

#### # 개발환경

<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/django-092E20?style=for-the-badge&logo=django&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/opencv-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white"> 

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"><img src="https://img.shields.io/badge/kakao map-FFCD00?style=for-the-badge&logo=kakao&logoColor=black"><img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">

<br>

#### # 개발기간

2023.03.14 ~ 2023.04.21

<br>

#### # 참여인원 : 3명

- 담당역할
  - 딥러닝 모델 탐색 및 선정
  - Django 프레임워크를 활용한 웹서비스 구현
  - AWS를 통한 서버 배포

<br>

#### # 디렉토리 요약

```
[SmartRecycle]
...
├── smart_recycle / "프로젝트 설정 (앱 설정, DB연결, URL 관리 ...)"
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   ├── asgi.py
│   ...
│
├── accounts / "계정 관리 App"
│   ├── models.py
│   ├── views.py
│   ├── templates
│   ...
│   
├── board / "게시판 구현 App"
│   ├── models.py
│   ├── views.py
│   ├── templates
│   ...
│
├── detection / "이미지 분석 App"
│   ├── models.py
│   ├── views.py
│   ├── templates
│   ...
│
├── manage.py / "프로젝트 관리 (서버실행, 앱생성 , DB 적용...)"
│
├── static / "이미지, CSS, JavaScript, 딥러닝모델 저장"
│
├── templates / "Base HTML파일 관리"
│
└── db.sqlite / "Django 데이터베이스 관리(ORM)
...
```

<br>

#### # 실행방법

```
1. SmartRecycle 디렉토리 접근
2. 터미널에서 bash명령어 입력(python manage.py runserver)
```

<br>

# 서비스 소개

#### # 핵심기능

> [딥러닝 모델을 활용한 재활용품 선별](#-딥러닝-모델을-활용한-재활용품-선별)
>
> [주변 재활용센터 안내](#-주변-재활용센터-안내)
>
> [지역별 재활용 안내](#-지역별-재활용-안내)

<br>

#### # 부가기능

> [회원관리 및 게시판 (Django ORM)](#-회원관리-및-게시판)

<br>

#### # 딥러닝 모델을 활용한 재활용품 선별

***

```
딥러닝 모델을 사용하여 재활용품의 정확한 분리 배출을 도와주기 위함
```

- 실시간 스캔

  ><img src="https://user-images.githubusercontent.com/119550105/270147568-d3c4df60-9f91-486a-8c67-30a684b00fef.gif" width="80%">
  >
  ><hr width="80%">
  >
  ><img src="https://user-images.githubusercontent.com/119550105/270147570-da4a41d7-d753-4c69-bbc0-78b0f4d7d608.gif" width="80%">

<br>

- 사진 가져오기

  ><img src="https://user-images.githubusercontent.com/119550105/270147383-d7a13e22-66f5-4de9-bcac-d62e67b31755.gif" width="80%">

<br>

- 딥러닝 모델 요약

  >```
  >모델명 : YOLO v8m
  >선정 이유 : 이미지 분석 속도가 빨라 실시간 객체 탐지에 최적화
  >학습 이미지 : 30000 ~ 40000개 (Ai Hub 데이터셋 위주 사용)
  >학습 카테고리 : 15개 [의류, 전자제품, 플라스틱, 도기류, 비닐, 스티로폼, 유리 ...]
  >전처리 과정 : 해상도 일치화(Resize) -> 대비 향상(equalizeHist) -> 증강 처리(Augmentation)
  >```
  >

<br>

- 주요 코드

  >- 실시간 스캔
  >
  >  <img src="https://user-images.githubusercontent.com/119550105/270147922-6e7a866e-de7f-4823-a7d5-fdbcda5c0e71.png" width="80%">
  >
  ><hr width="80%">
  >
  >- 사진 가져오기
  >
  >  <img src="https://user-images.githubusercontent.com/119550105/270148052-e953cce5-6636-4eb3-8ae3-96fb24720152.png" width="80%">
  >
  ><hr width="80%">
  >
  >- 전처리 함수 (크기 조절 -> 대비 향상 -> 선명도 향상)
  >
  >  <img src="https://user-images.githubusercontent.com/119550105/270148176-ca1447c8-f134-479d-a81b-516afeab024c.png" width="80%">
  >
  ><hr width="80%">
  >
  >- 탐지영역 그리기
  >
  >  <img src="https://user-images.githubusercontent.com/119550105/270148665-562e0955-9174-41db-bd5c-593338f761b3.png" width="80%">

<br>

#### # 주변 재활용센터 안내

<hr>

````
가구, 가전제품 등 재활용이 가능한 대형 폐기물의 처리를 돕기 위함
````

- 회원의 거주지역을 기반으로 안내

  ><img src="https://user-images.githubusercontent.com/119550105/270147371-2ab2a6ea-2128-4fdb-938d-9ffdfd5bd7d0.gif" width="80%">

<br>

- 비회원 로그인시 사용자 위치정보를 수집하여 안내

  ><img src="https://user-images.githubusercontent.com/119550105/270147379-3499e791-48bb-4133-a795-3af2d47dfa21.gif" width="80%">

<br>

- 주요 코드

  >- 회원정보로 저장된 행정구역의 중심 좌표 추출(Kakao API)
  >
  >  <img src="https://user-images.githubusercontent.com/119550105/270147850-3c9c5457-c3b4-4976-9c52-274f18e8a350.png" width="80%">
  >
  ><hr width="80%">
  >
  >- 비로그인시 사용자의 위치좌표 수집(JavaScript)
  >
  >  <img src="https://user-images.githubusercontent.com/119550105/270147875-1e50e2e7-7d1a-4987-8e05-156c19bf93b3.png" width="80%">

<br>

#### # 지역별 재활용 안내

---

```
지역별로 상이한 재활용 방법에 대해서 안내하고자 함
```

- 회원의 거주지역을 기반으로 안내

  ><img src="https://user-images.githubusercontent.com/119550105/270147379-3499e791-48bb-4133-a795-3af2d47dfa21.gif" width="80%">

<br>

- 비로그인시 사용자 위치정보를 수집하여 안내

  ><img src="https://user-images.githubusercontent.com/119550105/270147382-8f8816fe-0851-4701-830e-a3bdf1ee02b3.gif" width="80%">

<br>

- 주요 코드

  >- 사용자의 위치정보와 지역별 재활용 안내 사이트 매칭(JavaScript)
  >
  >  <img src="https://user-images.githubusercontent.com/119550105/270148738-175d91d1-eeba-418a-9c7b-425b93e6cd4b.png" width="80%">
  >
  ><hr width="80%">
  >
  >- URL정보를 저장하는 딕셔너리(JavaScript)
  >
  >  <img src="https://user-images.githubusercontent.com/119550105/270148792-e5a5313b-f3e7-4e7e-a29e-ebed9d818d45.png" width="80%">

<br>

#### # 회원관리 및 게시판

<hr>

```
Django ORM 사용하여 CRUD기능 구현
```

- 회원관리

  >- 회원가입
  >
  ><img src="https://user-images.githubusercontent.com/119550105/270149343-4bf64d3c-63ac-412b-b6e2-d44c4b60b1aa.png" width="80%">
  >
  ><hr width="80%">
  >
  >- 회원정보 수정
  >
  >  <img src="https://user-images.githubusercontent.com/119550105/270149356-dd6ea7d6-f889-4f4b-895c-ce9c518ec2fd.png" width="80%">
  >
  ><hr width="80%">
  >
  >- models.py
  >
  >  <img src="https://user-images.githubusercontent.com/119550105/270149586-a5f8768b-9f4d-46d6-b050-6f5d5834718d.png" width="80%">

<br>

- 게시판

  >- 게시물 페이지
  >
  >  <img src="https://user-images.githubusercontent.com/119550105/270149389-c8077515-2df6-4dd9-8173-963159691996.png" width="80%">
  >
  ><hr width="80%">
  >
  >- 상세보기 / 댓글
  >
  >  <img src="https://user-images.githubusercontent.com/119550105/270149535-6a4b1aba-05cb-4d23-bb80-9cca6d308b42.png" width="80%">
  >
  ><hr width="80%">
  >
  >- models.py
  >
  ><img src="https://user-images.githubusercontent.com/119550105/270149650-fbd98f1c-c813-4f75-9b25-94440bf713bb.png" width="80%">

<br>

# 향후 계획

- 접근성을 높이기 위한 모바일 환경 연동(Android, iOS)
- 다양한 재활용품 분류를 위해 학습 카테고리 추가
