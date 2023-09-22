// 마커를 담을 배열
var markers = [];

var mapContainer = document.getElementById('map') // 지도를 표시할 div 
var mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();  

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow();

// 유저 행정구역의 좌표정보
var user_lat = document.getElementById('hidden_lat').value;
var user_long = document.getElementById('hidden_long').value;

// 키워드로 장소를 검색합니다
searchPlaces();

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {
    // 검색 키워드
    var keyword = '재활용'

    var geocoder = new kakao.maps.services.Geocoder();

    if(user_lat==""){
        // 현재위치 가져오기
        navigator.geolocation.getCurrentPosition((position) => {   
            var options = {
                location: new kakao.maps.LatLng(position.coords.latitude,position.coords.longitude), // 검색 중심 위치의 위도와 경도 설정
                radius: 10000, // 검색 반경 설정 (미터 단위)
                sort: kakao.maps.services.SortBy.ACCURACY,           
            }
    
            // 현재 좌표를 추출하여 행정동으로 출력
            geocoder.coord2RegionCode(position.coords.longitude,position.coords.latitude,function(result, status){
                if (status === kakao.maps.services.Status.OK) {               
                    document.getElementById('map_region').textContent = result[0].address_name        
                }
            });        
        ps.keywordSearch(keyword,placesSearchCB,options);
        });       
    }else{
        var options = {
            location: new kakao.maps.LatLng(user_lat, user_long), 
            radius: 10000, 
            sort: kakao.maps.services.SortBy.ACCURACY,           
        }
        ps.keywordSearch(keyword,placesSearchCB,options);
    }
}

// 장소검색이 완료됐을 때 호출되는 콜백함수
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        // 검색 목록과 마커를 표출
        displayPlaces(data); 

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {     
        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {         
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList');
    menuEl = document.getElementById('menu');
    fragment = document.createDocumentFragment();
    bounds = new kakao.maps.LatLngBounds();

    if(user_lat==""){
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도

            var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            // 마커와 인포윈도우를 표시합니다
            displayCurrent(locPosition);
        });
    }else{
        var locPosition = new kakao.maps.LatLng(user_lat, user_long);
        displayCurrent(locPosition);
    }
    
    for ( var i=0; i<10; i++ ) {
        // 마커를 생성하고 지도에 표시합니다
        
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(placePosition, i), 
        itemEl = getListItem(i, places[i]); 

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout =  function () {
                infowindow.close();
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address_name  + '</span>'; 
    }
        if(places.phone==""){
            itemStr += '  <span class="tel">' + "전화번호 정보 없음"  + '</span>' +
            '</div>';   
        }else{
            itemStr += '  <span class="tel">' + places.phone  + '</span>' +
            '</div>';  
        }   
         

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage, 

        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}
function displayCurrent(locPosition) {
    var imageSrc = 'https://cdn-icons-png.flaticon.com/512/6388/6388034.png';
    var imageSize = new kakao.maps.Size(40, 40);
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map, 
        position: locPosition, 
        image : markerImage, 
    });

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content : '<span class="info-title">내위치</span>',
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="width:150px; text-align:center">'+title+'</div>';
    infowindow.setContent(content);
    infowindow.open(map, marker);
}