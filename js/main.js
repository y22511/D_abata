//-------------skin--------------//
const SKIN_NUM = 7;  //スキンの数

//あたま//
const HEAD_SKIN = ["eyemask.PNG", "christmas.PNG", "odairisama.PNG", "ohinasama.PNG", "pumpkin.PNG", "rabbit.PNG", "wizard.PNG"];



//-------------Cookie--------------//
function nameCookie() {
    let name=[2];
    let i = 0;
    let r = document.cookie.replace(/ /g,"").split(';');
    r.forEach(function(e) {
        content = e.split('=');
        name[i] = content[0];
        i++;
    })
    return name;
}
function valueCookie() {
    let value=[2];
    let i = 0;
    let r = document.cookie.replace(/ /g,"").split(';');
    r.forEach(function(e) {
        content = e.split('=');
        value[i] = content[1];
        i++;
    })
    return value;
}
//-----nameを入れるとvalueが返ってくる-----//
function searchCookie(item) {
    let i = 0;
    let itemValue = "";
    nameCookie().forEach(function() {
        if (item == nameCookie()[i]) {itemValue =  valueCookie()[i]}
        i++;
    })
    return itemValue;
}

//==============Main==============//
function myCoinCounter() {
    let myCoinNum = document.querySelector('.mycoin-num');
    myCoinNum.innerHTML = '×' +  myCoin;
}

myCoin = searchCookie('myCoin');
if(myCoin == "") {myCoin = 0;}
myCoinCounter();


//==============ガチャ==============//

//-----ガチャを回したとき-----//
document.querySelector('.gacha-btn').addEventListener('click', function(){
    pullGacha();
})
function pullGacha(){
    if (myCoin <= 0) {console.log("コインが足りないよ"); return;}
    myCoin -= 1;
    document.cookie = 'myCoin =' + myCoin;
    myCoinCounter();
}
//ガチャボックスクリック
document.querySelector('.gacha-main').addEventListener('click', function(){
    myCoin += 5;
    myCoinCounter();
})
