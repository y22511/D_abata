//-------------Cookie--------------//
function nameCookie() {
    var name=[2];
    var p = 0;
    var r = document.cookie.split(';');
    r.forEach(function(e) {
        content = e.split('=');
        name[p] = content[0];
        p++;
    })
    return key;
}
function valueCookie() {
    var value=[2];
    var p = 0;
    var r = document.cookie.split(';');
    r.forEach(function(e) {
        content = e.split('=');
        value[p] = content[1];
        console.log(value[p]);
        p++;
    })
    return value;
}
function searchCookie(item) {
    if (item == Name[0]);
}

//-------------Test--------------//
// document.querySelector(".save").addEventListener("click", function(){
//     document.cookie = 'key1= 1234; max-age= 5';
//     document.cookie = 'key2= 5678';
//     document.cookie = 'key3= 9999';
// })
// document.querySelector(".display").addEventListener("click", function(){
//     // console.log(document.cookie);
//     let iii = Cookie();
//     console.log(iii);
// })
//==============Main==============//
let myCoin = document.cookie;
// document.cookie = 'myCoin =' + NameCookie();

//==============ガチャ==============//
document.querySelector('.gacha-btn').addEventListener('click', function(){
    pullGacha();
})
function pullGacha(){
    console.log(valueCookie());
}
