# 프로젝트 소개

- 시각장애인들은 일반책 접근이 어려움 (전체 출판도서중 점자도서 출간비율 0.2%)
- 글자를 읽지 못하고 듣기만 할 수 있는 노년층 및 문맹인이 소수 남아있음
- 사용자가 카메라로 글자를 스캔하면 음성으로 출력해주어 이러한 어려움을 해결하고자 함

<br/>

# 프로젝트 정보

#### # 개발환경

<img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=OpenCV&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white"> 

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">

<br/>

#### # 개발기간

2023.08.10 ~ 2023.09.14

<br/>

# 서비스 소개

#### # 핵심기능

> [얼굴인식 회원가입 및 로그인](#-얼굴인식-회원가입-및-로그인)
>
> [카메라 화면의 글자를 추출하여 음성 출력](#-카메라-화면의-글자를-추출하여-음성-출력)
>
> [시각장애인들을 위한 음성제어](#-시각장애인들을-위한-음성제어)

<br/>

#### # 부가기능

> [CRUD기능을 적용한 회원관리 및 게시판](#-CRUD기능을-적용한-회원관리-및-게시판)
>
> [SNS연동 회원가입 및 로그인](#-SNS연동-회원가입-및-로그인)
>
> [다국어 처리](#-다국어-처리)

<br/>

#### # 얼굴인식 회원가입 및 로그인

***

- 회원가입 요청시 회원별 고유번호, 얼굴정보를 학습한 모델을 생성

- 생성된 모델을 이진변환하여 DB에 BLOB(Binary Large Object) 형식으로 저장

  ><img src="https://user-images.githubusercontent.com/119550105/268550285-4fe9d690-d29b-4d90-b5be-a3376aa95d25.gif" style="float:left; border :1px solid black;" width="70%">
  >
  ><img src="https://user-images.githubusercontent.com/119550105/268183193-7db1e34e-8ec4-4860-87fb-a8dea324c997.png" style=" border:1px solid black; float:left;" width="70%">

<br/>

- 로그인 요청시 회원별로 저장된 얼굴정보 모델을 DB에서 호출

- 얼굴 일치여부를 정확도로 산출하여 로그인 여부 결정

  ><img src="https://user-images.githubusercontent.com/119550105/268550314-f367c7ca-5ad9-49fa-aa52-e017f2c76a2f.gif" style="float:left; border :1px solid black;" width="70%">
  >
  ><img src="https://user-images.githubusercontent.com/119550105/268549011-44edb241-d85d-43f5-b031-f432fba90d9a.png" style="float:left; border :1px solid black;" width="70%" height="450px">

<br/>

#### # 카메라 화면의 글자를 추출하여 음성 출력

---

- 시연영상

  >https://github.com/minkkp/project-magicreader/assets/119550105/fc404299-9f3f-47f0-94b2-4e2f7a1d2c6b

<br/>

- 글자 추출을 위해 학습된 Tessearct 문자인식 모델 사용

  ><img src="https://user-images.githubusercontent.com/119550105/268566415-f86598f0-f27e-43d6-a936-55bb1653dbcc.png" style="float:left; border :1px solid black;" width="80%" >

- 종이 외곽선 검출을 위한 이미지 전처리

  ><img src="https://user-images.githubusercontent.com/119550105/268666017-aa4a155c-bbce-4997-8e8d-b8d4eb5dfd98.png" style="float:left; border :1px solid black;" width="80%" >
  >
  ><img src="https://user-images.githubusercontent.com/119550105/268567318-1587a324-c528-4c2f-a4b2-454188a03a7f.png" style="float:left; border :1px solid black;" width="80%" >

- 이미지 외곽선 정보를 추출하여 원근변환

  > <img src="https://user-images.githubusercontent.com/119550105/268666125-f929519d-df96-40d8-8e9d-b783a1325dc0.png" style="float:left; border :1px solid black;" width="80%" >
  >
  > <img src="https://user-images.githubusercontent.com/119550105/268567599-de81398e-ac94-4a9a-b583-356be96081ed.png" style="float:left; border :1px solid black;" width="80%" >

<br/>

#### # 시각장애인들을 위한 음성제어

---

- 시연영상

  >- 회원가입
  >
  >https://github.com/minkkp/project-magicreader/assets/119550105/bbd32e4e-ccf8-485f-a345-5e753ae198fd
  >
  ><br/>
  >
  >- 로그인
  >
  >https://github.com/minkkp/project-magicreader/assets/119550105/7ccef5d0-1db1-4ac6-8933-6179f7da795e
  >
  ><br/>
  >
  >- 글자인식
  >
  >https://github.com/minkkp/project-magicreader/assets/119550105/a5949cde-7c76-4531-a6a7-64714d7a1182

<br/>

- 음성인식 객체 설정 (JavaScript)

  ><img src="https://user-images.githubusercontent.com/119550105/268675578-c4a197b4-413e-41c3-b6c1-04b396ea3ecc.png" style="float:left; border :1px solid black;" width="60%" >

- 음성인식 결과 분기처리

  ><img src="https://user-images.githubusercontent.com/119550105/268679782-d49ff306-3e49-4d47-b507-d22530e5020d.png" style="float:left; border :1px solid black;" width="70%" >
  >
  ><img src="https://user-images.githubusercontent.com/119550105/268680815-e3d7cfa5-2ae8-4e9b-b74b-b3f69e9ef2f5.png" style="float:left; border :1px solid black;" width="70%" >

<br/>

#### # CRUD기능을 적용한 회원관리 및 게시판

***

- 회원가입 및 회원정보 수정

  ><img src="https://user-images.githubusercontent.com/119550105/268429375-1d31e836-16bc-4166-a6cf-1455ff32bfe9.png" style="border:1px solid black; float:left;" width="60%">
  >
  ><br/>
  ><img src="https://user-images.githubusercontent.com/119550105/268552248-b506c85a-ed7e-4abd-b7a5-7b01f21724a6.png" style="border:1px solid black;" width="60%" >

  <br/>

- 비밀번호 분실시 임시 비밀번호를 메일 발송

  ><img src="https://user-images.githubusercontent.com/119550105/268551275-658e10d6-b322-458a-8d74-c74c52a419d8.png" style="border:1px solid black; float:left;" width="70%">
  >
  ><br/>
  >
  ><img src="https://user-images.githubusercontent.com/119550105/268551020-94117179-561c-40d3-9f11-4feff38dd845.png" style="border:1px solid black; float:left;" width="70%">

  <br/>

- 게시물 및 댓글기능

  ><img src="https://user-images.githubusercontent.com/119550105/268553650-e9dc7cb9-8281-47b3-bc24-b7b0bae4d1c9.png" style="border:1px solid black; float:left;" width="85%">
  >
  ><img src="https://user-images.githubusercontent.com/119550105/268553671-0596433b-b044-4264-94ac-b6da8f451b37.png" style="border:1px solid black; float:left;" width="85%">

#### # SNS연동 회원가입 및 로그인

---

- Naver, Google API 활용

- AccessToken를 통한 로그인

  ><img src="https://user-images.githubusercontent.com/119550105/268553496-81aebcdc-9015-4502-bb4a-0e372f432cd4.gif" style="border:1px solid black; float:left;" width="90%">



#### # 다국어 처리

***

- ResourceBundleMessageSource 사용하여 국가별 메시지 로드

  ><img src="https://user-images.githubusercontent.com/119550105/268189821-adc805b6-941f-4fdf-ad56-bfbf3bc14fa3.gif" style="border:1px solid black; float:left;" width="95%">

<br/>

# 향후 계획

- 접근성을 높이기 위한 모바일 환경 연동(Android, iOS)
- 얼굴인식 서비스 고도화를 위한 다양한 모델 테스트
- 한글 인식률 향상을 위해 다양한 글꼴 학습 및 적용
- 이미지 인식률 보장을 위한 전처리 과정 보강
