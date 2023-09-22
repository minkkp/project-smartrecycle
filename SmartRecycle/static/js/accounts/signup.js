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