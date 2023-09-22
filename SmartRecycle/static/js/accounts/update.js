var city_selected = document.getElementById("city").value
var district_selected = document.getElementById("district")

var default_district = district_selected.value

var option = document.createElement('option');
option.innerText = district_selected.value
district_selected.length=0;
district_selected.append(option)

for(var i in districts[city_selected]){
    console.log(default_district,districts[city_selected][i])
    if(default_district!=districts[city_selected][i]){
        var option = document.createElement('option');
        option.innerText = districts[city_selected][i]
        district_selected.append(option)
    }
}     

function del() {
    if (confirm("정말 탈퇴하시겠습니까?")){
        document.form_delete.submit(); 
    }
}       

function selected() {
    var city_selected = document.getElementById("city").value
    var district_selected = document.getElementById("district")
    district_selected.length=0;
    for(var i in districts[city_selected]){
        var option = document.createElement('option');
        option.innerText = districts[city_selected][i]
        district_selected.append(option)
    }         
}     