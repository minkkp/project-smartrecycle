const loader = document.querySelector('.loader');
const html = document.querySelector('html');


let possible_list = ""
let impossible_list = ""
let possible_cnt = 0
let impossible_cnt = 0

// 행정구역별 재활용안내 사이트 url 
let recycle_info={
  서울특별시:
  {
   종로구:'https://www.jongno.go.kr/Main.do?menuId=1365&menuNo=1365',
   중구:'http://www.junggu.seoul.kr/content.do?cmsid=14189',
   용산구:'https://www.yongsan.go.kr/portal/main/contents.do?menuNo=200887',
   광진구:'https://www.gwangjin.go.kr/portal/main/contents.do?menuNo=200842', 
   동대문구:'https://www.ddm.go.kr/www/contents.do?key=860',
   중랑구:'https://www.jungnang.go.kr/portal/main/contents.do?menuNo=200052',
   성북구:'https://www.sb.go.kr/main/PageLink.do?link=forward:use/PageContent.do&menuNo=94000000&subMenuNo=94040000&thirdMenuNo=94040500&fourthMenuNo=',
   강북구:'https://www.gangbuk.go.kr/www/contents.do?key=885',
   도봉구:'https://www.dobong.go.kr/subsite/waste//Contents.asp?code=10007366',
   노원구:'https://www.nowon.kr/www/minwon/minwon4/minwon4_03/minwon4_03_04.jsp',
   은평구:'https://www.ep.go.kr/www/contents.do?key=1239',
   서대문구:'https://www.sdm.go.kr/civil/type/ceanup.do',
   마포구:'https://www.mapo.go.kr/site/main/content/mapo05060501',
   양천구:'https://www.yangcheon.go.kr/site/yangcheon/ex/bbs/View.do?cbIdx=279&bcIdx=895',
   강서구:'https://www.gangseo.seoul.kr/env/env010101',
   구로구:'https://www.guro.go.kr/www/contents.do?key=2697&',       
   금천구:'https://www.geumcheon.go.kr/portal/contents.do?key=820',  
   영등포구:'https://www.ydp.go.kr/www/contents.do?key=2733&',  
   동작구:'https://www.dongjak.go.kr/portal/main/contents.do?menuNo=200592',  
   관악구:'https://www.gwanak.go.kr/site/gwanak/07/10703010200002016051206.jsp',  
   서초구:'https://www.seocho.go.kr/site/seocho/04/10408030301002015070706.jsp',  
   강남구:'https://www.gangnam.go.kr/board/waste/list.do?mid=ID02_011109#collapse26',  
   송파구:'https://www.songpa.go.kr/www/contents.do?key=3164&',  
   강동구:'https://www.gangdong.go.kr/web/newportal/contents/gdp_005_004_010_004_001'
  },
  부산광역시:
  { 
    중구:'https://www.bsjunggu.go.kr/index.junggu?menuCd=DOM_000000109001001009',
    서구:'https://www.bsseogu.go.kr/index.bsseogu?menuCd=DOM_000000102004002001',
    동구:'http://www.bsdonggu.go.kr/index.donggu?menuCd=DOM_000000104005008000',
    영도구:'https://www.yeongdo.go.kr/00672/01898/03301.web',
    부산진구:'https://www.busanjin.go.kr/board/view.busanjin?boardId=BBS_0000009&menuCd=DOM_000000110001001000&paging=ok&startPage=1&searchType=DATA_TITLE&searchOperation=AND&keyword=%EC%9E%AC%ED%99%9C%EC%9A%A9&dataSid=3799668',
    동래구:'https://www.dongnae.go.kr/index.dongnae?menuCd=DOM_000000105009001004',
    남구:'https://www.bsnamgu.go.kr/index.namgu?menuCd=DOM_000000125001012004',
    북구:'https://www.bsbukgu.go.kr/index.bsbukgu?menuCd=DOM_000000103005001002',
    강서구:'https://www.gangseo.seoul.kr/env/env010101',
    해운대구:'https://www.haeundae.go.kr/index.do?menuCd=DOM_000000102014009000',
    사하구:'https://www.saha.go.kr/portal/contents.do?mId=0405050300',
    금정구:'https://www.geumjeong.go.kr/index.geumj?menuCd=DOM_000000133009001000',
    연제구:'https://www.yeonje.go.kr/portal/contents.do?mId=0602030100',
    수영구:'https://www.suyeong.go.kr/environment/index.suyeong?menuCd=DOM_000000205003000000',
    사상구:'https://www.sasang.go.kr/index.sasang?menuCd=DOM_000000110001001000',
    기장군:'https://www.gijang.go.kr/index.gijang?menuCd=DOM_000000104006001003'
  },
  대구광역시:
  {
    중구:'https://www.jung.daegu.kr/new/pages/information/page.html?mc=0273',
    동구:'https://www.dong.daegu.kr/main/page.htm?mnu_uid=387&',
    서구:'https://www.dgs.go.kr/dgs/minwon/page.php?mnu_uid=11027',
    남구:'https://nam.daegu.kr/index.do?menu_id=00000777',
    북구:'https://www.buk.daegu.kr/index.do?menu_id=00001795',
    수성구:'https://www.suseong.kr/index.do?menu_id=00000363',
    달서구:'https://dalseo.daegu.kr/index.do?menu_id=00001252',
    달성군:'https://dalseong.daegu.kr/index.do?menu_id=00004530'
  },
  인천광역시:
  {
    중구:'https://www.icjg.go.kr/krpt040402tc',
    동구:'https://www.icdonggu.go.kr/open_content/main/part/clean/detritus_recycle.jsp',
    미추홀구:'https://www.michuhol.go.kr/main/content.do?sq=446',
    연수구:'https://www.yeonsu.go.kr/main/part/clean/recycle.asp',
    남동구:'https://www.namdong.go.kr/main/area/clean/recycle/intro.jsp',
    부평구:'https://www.icbp.go.kr/main/life/clean/recycle_trick.jsp',
    계양구:'https://www.gyeyang.go.kr/open_content/main/part/clean/recycle_how.jsp',
    서구:'https://www.seo.incheon.kr/open_content/main/part/clean/detritus_seperate.jsp',
    강화군:'https://www.ganghwa.go.kr/open_content/main/part/clean/detritus_recycle.jsp',
    옹진군:'https://www.ongjin.go.kr/open_content/main/environment/cleaning/recycle.jsp'
  },
  광주광역시:
  {
    동구:'https://www.donggu.kr/menu.es?mid=a10408010300',
    서구:'https://www.seogu.gwangju.kr/menu.es?mid=a10308010300',
    남구:'https://www.namgu.gwangju.kr/board.es?mid=a10604010000&bid=0001&act=view&list_no=7122',
    북구:'https://bukgu.gwangju.kr/menu.es?mid=a10406030000',
    광산구:'https://www.gwangsan.go.kr/co/contentsView.php?pageID=gwangsan0406020100'
  },
  대전광역시:
  {
    동구:'https://www.donggu.go.kr/dg/kor/contents/618',
    중구:'https://www.djjunggu.go.kr/kr/sub06_05_09_05.do',
    서구:'https://www.seogu.go.kr/kor/sub06_11_02_01.do',
    유성구:'https://www.yuseong.go.kr/kor/sub07_11_03_03.do',
    대덕구:'https://www.daedeok.go.kr/was/goContents.do?link=/was/was01/WAS010206&menuId=WAS010206'
  },
  울산광역시:
  {
    중구:'https://www.junggu.ulsan.kr/index.ulsan?menuCd=DOM_000000301007002002',
    남구:'https://www.ulsannamgu.go.kr/fieldInfo/recyclingWaste01.jsp',
    동구:'https://www.donggu.ulsan.kr/donggu/contents/contents.do?mId=7050201',
    북구:'https://www.bukgu.ulsan.kr/lay1/S1T211C364/contents.do',
    울주군:'https://www.ulju.ulsan.kr/ulju/contents.do?mId=0505010300'
  },
  세종특별시:'https://www.sejong.go.kr/recycle/sub02_01.do',
  경기도:
  {
    수원시:'https://www.suwon.go.kr/sw-www/deptHome/dep_env/env_03/env_03_09.jsp',
    고양시:'https://www.goyang.go.kr/www/www03/www03_3/www03_3_3/www03_3_3_tab1.jsp',
    용인시:'https://www.yongin.go.kr/home/www/www12/www12_01/www12_01_08/www12_01_08_05.jsp',
    성남시:'https://www.seongnam.go.kr/city/1002164/10239/contents.do',
    부천시:'http://www.bucheon.go.kr/site/homepage/menu/viewMenu?menuid=148006007006003',
    화성시:'https://www.hscity.go.kr/www/partInfo/trnsportEnvrn/trashProcessInfo.jsp',
    안산시:'https://www.ansan.go.kr/www/common/cntnts/selectContents.do?cntnts_id=C0001357',
    남양주시:'https://www.nyj.go.kr/main/559',
    안양시:'https://www.anyang.go.kr/main/contents.do?key=806',
    평택시:'https://www.pyeongtaek.go.kr/pyeongtaek/contents.do?mId=1601030000',
    시흥시:'https://www.siheung.go.kr/portal/contents.do?mId=0703010301',
    파주시:'https://www.paju.go.kr/www/www_02/environment/environment_05/environment_05_01/environment_05_01_02.jsp',
    의정부시:'https://www.ui4u.go.kr/depart/contents.do?mId=0602030000',
    김포시:'https://www.gimpo.go.kr/portal/contents.do?key=1435',
    광주시:'https://www.gjcity.go.kr/depart/contents.do?mId=0901050000',
    광명시:'https://www.gm.go.kr/pt/partInfo/en/cleaning/lfgarbage/PTMN219.jsp',
    군포시:'https://www.gunpo.go.kr/www/contents.do?key=4527',
    하남시:'https://www.hanam.go.kr/www/contents.do?key=6421',
    오산시:'https://www.osan.go.kr/depart/contents.do?mId=0602030000',
    양주시:'https://www.yangju.go.kr/www/contents.do?key=689',
    이천시:'https://www.icheon.go.kr/depart/contents.do?key=2316',
    구리시:'https://www.guri.go.kr/www/contents.do?key=763',
    안성시:'https://www.anseong.go.kr/depart/contents.do?mId=0701010000',
    포천시:'https://www.pocheon.go.kr/www/contents.do?key=4595',
    의왕시:'http://www.uiwang.go.kr/UWKORENV0303',
    양평군:'https://www.yp21.go.kr/www/contents.do?key=1458',
    여주시:'https://www.yeoju.go.kr/cms/content/view/802',
    동두천시:'https://www.ddc.go.kr/ddc/contents.do?key=489',
    가평군:'https://www.gp.go.kr/portal/contents.do?key=678',
    과천시:'https://www.gccity.go.kr/portal/bbs/view.do?mId=0301010000&bIdx=44713&ptIdx=111',
    연천군:'https://www.yeoncheon.go.kr/www/contents.do?key=3503'
  },
  강원도:
  {
    춘천시:'https://www.chuncheon.go.kr/cityhall/living-info/clean-environment/waste-discharge/recyclable/',
    원주시:'https://www.wonju.go.kr/www/contents.do?key=556&',
    강릉시:'https://www.gn.go.kr/www/contents.do?key=469',
    동해시:'https://www.dh.go.kr/www/contents.do?key=792',
    태백시:'https://www.taebaek.go.kr/www/contents.do?key=1615',
    속초시:'https://www.sokcho.go.kr/portal/partinfo/life/trash',
    삼척시:'https://www.samcheok.go.kr/specialty/00469/03296.web',
    홍천군:'https://www.hongcheon.go.kr/www/contents.do?key=628',
    횡성군:'https://www.hsg.go.kr/www/contents.do?key=1310',
    영월군:'https://www.yw.go.kr/www/selectBbsNttView.do?key=473&bbsNo=44&nttNo=1064&searchCtgry=&searchCnd=SJ&searchKrwd=%EB%B6%84%EB%A6%AC&pageIndex=1&integrDeptCode=&pageUnit=10',
    평창군:'https://pc.go.kr/portal/government/government-news/government-news-agency',
    정선군:'https://www.jeongseon.go.kr/portal/partinfo/environment_forest/waste',
    철원군:'https://www.cwg.go.kr/www/contents.do?key=426',
    화천군:'https://www.ihc.go.kr/www/contents.do?key=298',
    양구군:'https://www.yanggu.go.kr/index_main.php?ygtype=main',
    인제군:'https://www.inje.go.kr/portal/adm/notice?articleSeq=154539',
    고성군:'https://www.goseong.go.kr/environment/index.goseong?menuCd=DOM_000000903004000000',
    양양군:'https://www.yangyang.go.kr/gw/portal/yyc_partinfo_envi_recy#text_toptotalsearch'
  },
  충청북도:
  {
    청주시:'https://www.cheongju.go.kr/www/contents.do?key=23182',
    충주시:'https://www.chungju.go.kr/www/contents.do?key=657',
    제천시:'https://www.jecheon.go.kr/www/contents.do?key=5155',
    보은군:'https://www.boeun.go.kr/www/selectBbsNttView.do?key=800&bbsNo=4&nttNo=8888',
    옥천군:'https://www.oc.go.kr/www/contents.do?key=339&',
    영동군:'https://www.yd21.go.kr/kr/html/sub05/05060302.html',
    증평군:'https://www.jp.go.kr/kor/sub05_07_02.do',
    진천군:'https://www.jincheon.go.kr/site/environment/sub.do?menukey=1517',
    괴산군:'https://www.goesan.go.kr/www/selectBbsNttView.do?key=1100&bbsNo=174&nttNo=48695&searchCtgry=&searchCnd=SJ&searchKrwd=%EB%B6%84%EB%A6%AC&pageIndex=1&integrDeptCode=',
    음성군:'https://www.eumseong.go.kr/www/contents.do?key=7829',
    단양군:'https://www.danyang.go.kr/dy21/856'
  },
  충청남도:
  {
    천안시:'https://www.cheonan.go.kr/kor/sub05_08_02.do',
    공주시:'https://www.gongju.go.kr/kr/sub06_08_06_01.do',
    보령시:'https://www.brcn.go.kr/kor/sub05_07_08.do',
    아산시:'https://www.asan.go.kr/main/cms/?no=293',
    서산시:'https://www.seosan.go.kr/www/contents.do?key=1568',
    논산시:'https://www.nonsan.go.kr/kor/html/sub05/05081101.html',
    계룡시:'https://www.gyeryong.go.kr/kr/html/sub05/05051403.html',
    당진시:'https://www.dangjin.go.kr/kor/sub05_09_07_01.do',
    금산군:'https://www.geumsan.go.kr/kr/html/sub05/05050602.html',
    부여군:'https://www.buyeo.go.kr/html/kr/refo/refo_06040402.html',
    서천군:'https://www.seocheon.go.kr/kor/sub07_04_04_02.do',
    청양군:'https://www.cheongyang.go.kr/kor/sub06_04_07.do',
    홍성군:'https://www.hongseong.go.kr/kor/sub05_090205.do',
    예산군:'https://www.yesan.go.kr/kor/sub05_06_06.do',
    태안군:'https://www.taean.go.kr/cop/bbs/BBSMSTR_000000000058/selectBoardArticle.do?nttId=1514390346'
  },
  전라북도:
  {
    전주시:'https://www.jeonju.go.kr/index.9is?contentUid=9be517a74f8dee91014f9225bf401116',
    군산시:'https://www.gunsan.go.kr/main/m250',
    익산시:'https://www.iksan.go.kr/index.iksan?menuCd=DOM_000002015002003000',
    정읍시:'https://www.jeongeup.go.kr/buseo/board/view.jeongeup?menuCd=DOM_000001015002000000&boardId=BBS_0000012&dataSid=254421',
    남원시:'https://www.namwon.go.kr/index.do?menuCd=DOM_000000203004004000',
    김제시:'https://www.gimje.go.kr/index.gimje?menuCd=DOM_000000106002002000',
    완주군:'https://www.wanju.go.kr/index.wanju?menuCd=DOM_000000104005005003',
    진안군:'https://www.jinan.go.kr/index.jinan?contentsSid=1108&fid=/upload_data/board_data/BBS_0000026/153138624926939.pdf',
    무주군:'https://www.muju.go.kr/planweb/board/view.9is?dataUid=ff8080818055f04a01825e61509e1449&page=1&boardUid=ff80808170d1c8cf0170f7188d3913c2&contentUid=ff80808170d1c8cf0170f71d1a2b13e7',
    장수군:'https://www.jangsu.go.kr/index.jangsu?menuCd=DOM_000000406009002000',
    임실군:'https://www.imsil.go.kr/town/board/view.imsil?boardId=BBS_0000003&menuCd=DOM_000000709004001000&paging=ok&startPage=13&dataSid=56861',
    순창군:'https://www.sunchang.go.kr/index.sunchang?menuCd=DOM_000000105004003002',
    고창군:'https://www.gochang.go.kr/index.gochang?menuCd=DOM_000000104004001003',
    부안군:'https://www.buan.go.kr/board/view.buan?menuCd=DOM_000000103001001000&boardId=BBS_0000052&dataSid=24318'
  },
  전라남도:
  {
    목포시:'https://www.mokpo.go.kr/www/life_welfare/environmental_info/disposal_behavior',
    여수시:'https://www.yeosu.go.kr/www/eminwon/field/waste/recycle',
    순천시:'https://www.suncheon.go.kr/kr/life/0003/0001/',
    나주시:'https://www.naju.go.kr/www/field_info/environment/guide',
    광양시:'https://gwangyang.go.kr/menu.es?mid=a11205090400',
    담양군:'https://www.damyang.go.kr/tour/board/view.damyang?menuCd=DOM_000000305008000000&boardId=BBS_0000001&dataSid=694219',
    곡성군:'https://www.gokseong.go.kr/kr/subPage.do?menuNo=103004002002',
    구례군:'https://www.gurye.go.kr/board/view.do?bbsId=BBS_0000000000000056&pageIndex=1&nttId=13845&menuNo=115004001000',
    고흥군:'https://www.goheung.go.kr/environmental/contentsView.do?pageId=environmental16',
    보성군:'https://www.boseong.go.kr/www/open_data/environment/recycle',
    화순군:'https://www.hwasun.go.kr/contents.do?S=S01&M=060804010000',
    장흥군:'https://www.jangheung.go.kr/www/open_data/life_environment/separate_collection',
    강진군:'https://www.gangjin.go.kr/www/part/environment/wastes/info',
    해남군:'https://www.haenam.go.kr/index.9is?contentUid=18e3368f5d745106015e51afeffd340f',
    영암군:'https://www.yeongam.go.kr/home/www/info_area/life_env/life_env_01/life_env_01_05/yeongam.go',
    무안군:'https://www.muan.go.kr/www/information/environment_facilities/recycling/collection',
    함평군:'https://www.hampyeong.go.kr/boardView.do?pageId=www272&boardId=NOTICE&seq=213647364',
    영광군:'https://www.yeonggwang.go.kr/subpage/?site=headquarter_new&mn=9117',
    장성군:'https://www.jangseong.go.kr/home/www/openinfo/environment/environment_21/show/59',
    완도군:'https://www.wando.go.kr/www/welfare/greenenviron/living_waste/recycle',
    진도군:'https://www.jindo.go.kr/home/sub.cs?m=334',
    신안군:'https://www.shinan.go.kr/home/www/dept_info/env/waste/page.wscms'
  },
  경상북도:
  {
    포항시:'https://www.pohang.go.kr/pohang/7234/subview.do',
    경주시:'https://www.gyeongju.go.kr/area/page.do?mnu_uid=1013&',
    김천시:'https://www.gc.go.kr/portal/contents.do?mId=1414040000',
    안동시:'https://www.andong.go.kr/portal/contents.do?mId=0607090000',
    구미시:'https://www.gumi.go.kr/portal/contents.do?mId=0608040200',
    영주시:'https://www.yeongju.go.kr/open_content/main/page.do?mnu_uid=10513&',
    영천시:'https://www.yc.go.kr/depart/contents.do?mId=0505050000',
    상주시:'https://www.sangju.go.kr/civil/page/2596/1710.tc?protocol=http',
    문경시:'https://www.gbmg.go.kr/portal/contents.do?mId=0606040106',
    경산시:'https://www.gbgs.go.kr/open_content/ko/page.do?mnu_uid=2219&',
    군위군:'https://www.gunwi.go.kr/ko/page.do?mnu_uid=317&',
    의성군:'https://www.usc.go.kr/page/1375/1454.tc',
    청송군:'https://www.cs.go.kr/specialty/00003172/00003282.web',
    영양군:'https://www.yyg.go.kr/www/welfare/life_info/waste_discharge',
    영덕군:'https://www.yd.go.kr/?p=604',
    청도군:'https://www.cheongdo.go.kr/open.content/ko/section/environment/waste/recycling/',
    고령군:'http://www.goryeong.go.kr/kor/contents.do?IDX=266',
    성주군:'https://www.sj.go.kr/page.do?mnu_uid=3954&',
    칠곡군:'https://www.chilgok.go.kr/portal/contents.do?mId=1108010400',
    예천군:'https://www.ycg.kr/download/open.content/ko/section/environment/recycled/%EC%9E%AC%ED%99%9C%EC%9A%A9%ED%92%88%20%EB%B6%84%EB%A6%AC%EB%B0%B0%EC%B6%9C%20%EA%B0%80%EC%9D%B4%EB%93%9C%EB%9D%BC%EC%9D%B8.pdf',
    봉화군:'https://www.bonghwa.go.kr/open.content/ko/welfare/environment/recycling.info/',
    울진군:'https://www.uljin.go.kr/index.uljin?menuCd=DOM_000000106003001003',
    울릉군:'https://www.ulleung.go.kr/ko/page.do?mnu_uid=1582&'
  },
  경상남도:
  {
    창원시:'https://www.changwon.go.kr/depart/contents.do?mId=1005010100',
    진주시:'https://www.jinju.go.kr/00134/00615/00870.web',
    통영시:'https://www.tongyeong.go.kr/00973/01112/01985.web',
    사천시:'https://www.sacheon.go.kr/life/00330/01781.web',
    김해시:'https://www.gimhae.go.kr/01544/02643/01745.web',
    밀양시:'https://www.miryang.go.kr/web/index.do?mnNo=50201010000',
    거제시:'https://www.geoje.go.kr/index.geoje?menuCd=DOM_000008903003007003',
    양산시:'https://www.yangsan.go.kr/portal/contents.do?mId=0609020300',
    의령군:'https://www.uiryeong.go.kr/index.uiryeong?menuCd=DOM_000000204008002003',
    함안군:'https://www.haman.go.kr/02852/02858/03249.web',
    창녕군:'https://www.cng.go.kr/life/environment/00000912.web',
    고성군:'https://www.goseong.go.kr/environment/index.goseong?menuCd=DOM_000000903004000000',
    남해군:'https://www.namhae.go.kr/depart/Index.do?c=DE0702010000',
    하동군:'https://www.hadong.go.kr/specialty/00219/00477.web',
    산청군:'https://www.sancheong.go.kr/www/contents.do?key=300',
    함양군:'https://search.naver.com/p/crd/rd?m=1&px=559&py=890&sx=559&sy=469&p=iZsgllprvxZssmMQhCosssssswo-265045&q=%ED%95%A8%EC%96%91%EA%B5%B0%EC%B2%AD+%EC%9E%AC%ED%99%9C%EC%9A%A9&ie=utf8&rev=1&ssc=tab.nx.all&f=nexearch&w=nexearch&s=PY20nps4sZXSr3ruQSyGXA%3D%3D&time=1681920899558&abt=%5B%7B%22eid%22%3A%22FBL-ADPOS%22%2C%22vid%22%3A%2231%22%7D%2C%7B%22eid%22%3A%22SBR1%22%2C%22vid%22%3A%22948%22%7D%2C%7B%22eid%22%3A%22SHP-LONGTAIL%22%2C%22vid%22%3A%224%22%7D%5D&a=web_gen*w.link&r=0&i=a00000fa_d612db7daf364d979ff5cf88&u=https%3A%2F%2Fwww.hygn.go.kr%2Fspecialty%2F02201%2F00388.web&cr=2',
    거창군:'https://www.geochang.go.kr/environment/Index.do?c=EV0801000000',
    합천군:'https://www.hc.go.kr/05754/06019/06040.web'
  },
  제주도:
  {
    제주시:'https://www.jejusi.go.kr/field/eco/weekwaste.do',
    서귀포시:'https://www.seogwipo.go.kr/group/clean/life/archives.htm?act=view&seq=124312507'

  }
}

if(document.getElementById('info')){

  for(let i=0; i<detect.length; i++){
    if(detect[i]>0){
        switch(i){
          case 0:
            impossible_list +="#가구 ";
            break;
          case 1:
            impossible_list +="#금속 ";
            break;
          case 2:
            impossible_list +="#나무 ";
            break;  
          case 3:
            impossible_list +="#도기류 ";
            break;   
          case 4:
            possible_list +="#비닐류 ";
            break;
          case 5:
            possible_list +="#스티로폼 "
            break;
          case 6:
            possible_list +="#유리 "
            break;
          case 7:
            possible_list +="#의류 "
            break;
          case 8:
            impossible_list +="#자전거 ";
            break;
          case 9:
            impossible_list +="#전자제품 ";
            break;
          case 10:
            possible_list +="#종이 "
            break;
          case 11:
            possible_list +="#캔류 ";
            break;
          case 12:
            possible_list +="#페트병 "
            break;
          case 13:
            possible_list +="#플라스틱 "
            break;
          case 14:
            possible_list +="#형광등 "
            break;
        }
        if((i>=0 && i<=3) || i>=8 && i<=9){
          impossible_cnt+=1;
        }else{
          possible_cnt+=1;
        }
      }
  }

  if(possible_list==""){
    possible_list="-"
  }
  if(impossible_list==""){
    impossible_list="-"
  }
  
  document.getElementById("possible_cnt").innerHTML = possible_cnt+"개"
  document.getElementById("possible_list").innerHTML = possible_list
  document.getElementById("impossible_cnt").innerHTML = impossible_cnt+"개"
  document.getElementById("impossible_list").innerHTML = impossible_list
}

// 사용자가 설정한 행정구역 추출
if(document.getElementById("hidden_text")){
  region = document.getElementById("hidden_text").value.split('/')
  var elements = document.getElementsByClassName("user_url");
  for (var i = 0; i < elements.length; i++) {
    elements[i].textContent = "＃"+region[0] + " " + region[1];
  }
}else{
  // 비로그인시 현재좌표 추출하여 행정동 반환
  var geocoder = new kakao.maps.services.Geocoder();
  navigator.geolocation.getCurrentPosition((position) => {   
      
      geocoder.coord2RegionCode(position.coords.longitude,position.coords.latitude,function(result, status){
          if (status === kakao.maps.services.Status.OK) {               
              region = result[0].address_name.split(' ')
              var elements = document.getElementsByClassName("anon_url");
              for (var i = 0; i < elements.length; i++) {
                elements[i].textContent = "＃" + region[0] + " " + region[1];
              }
          }
      });     
  })
}

// 사용자가 위치 권한이 없는 경우
var gps_check = document.getElementsByClassName("anon_url")
if(gps_check[0].textContent==""){
  gps_check[0].textContent = "위치 권한을 허용해주세요!";
  gps_check[1].textContent = "위치 권한을 허용해주세요!";
}


window.onpageshow = function(event) {
  if ( event.persisted || (window.performance && window.performance.navigation.type == 2)) {
      location.reload()
  }
}

// 로딩화면 구현
function loading(){
    navigator.permissions.query({ name: "geolocation" }).then((result) => {          
        if (result.state === "granted") {
            window.open
            loader.style.display='inline';
            setTimeout(() => { //로딩속도 구현
            loader.style.opacity = '0';
            html.style.overflow = 'auto'; //스크롤 방지 해제     
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 400);        
            }, 5000);
            // 위치권한 없을시 요구
        } else if (result.state === "prompt") {
            alert("위치 권한을 허용해주세요")
            location.reload()
        }
      });
}

// 사진 가져오기 모드 form submit함수
function upload_submit() {
  navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") 
          document.upload.submit()
    });   
}

// 재활용 배출방법 안내, 버튼과 url 매칭
function recycle_url(){

  // 윈도우 크기 조절
  var popupX = (window.screen.width / 2) - (1024 / 2);
  var popupY= (window.screen.height / 2) - (768 / 2);

  // 로그인시 회원정보로 url 매칭
  if(document.getElementById("hidden_text")){
      region = document.getElementById("hidden_text").value.split('/')
      window.open(recycle_info[region[0]][region[1]],'','left='+popupX+', top='+popupY+
      ', width=1024, height=768, status=no, menubar=no, toolbar=no, resizable=no');

  // 비로그인시 사용자의 현재위치를 수집, 행정구역으로 변환후 url 매칭
  }else{
      var geocoder = new kakao.maps.services.Geocoder();
      navigator.geolocation.getCurrentPosition((position) => {   
          geocoder.coord2RegionCode(position.coords.longitude,position.coords.latitude,function(result, status){
              if (status === kakao.maps.services.Status.OK) {               
                  region = result[0].address_name.split(' ')
                  window.open(recycle_info[region[0]][region[1]],'','left='+popupX+', top='+popupY+
                  ', width=1024, height=768, status=no, menubar=no, toolbar=no, resizable=no');
              }
          });     
      })
    }
  }

