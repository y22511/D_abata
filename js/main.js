//-------------skin--------------//
const SKIN_NUM = 7;  //スキンの数

//あたま//
const HEAD_SKIN = ["christmas_head.PNG", "kanhuku_head.PNG", "odairisama_head.PNG", "ohinasama_head.PNG", "pajama_head.PNG", "pumpkin_head.PNG", "rabbit_head.PNG", "wizard_head.PNG"]; //あたま
const BODY_SKIN = ["christmas_body.PNG", "kanhuku_body.PNG", "odairisama_body.PNG", "ohinasama_body.PNG", "pajama_body.PNG", "pumpkin_body.PNG", "rabbit_body.PNG", "wizard_body.PNG"]; //からだ
const HEAD_SKIN_ITEM = ["christmas_head_item.PNG", "kanhuku_head_item.PNG", "odairisama_head_item.PNG", "ohinasama_head_item.PNG", "pajama_head_item.PNG", "pumpkin_head_item.PNG", "rabbit_head_item.PNG", "wizard_head_item.PNG"]; //あたま(item)
const BODY_SKIN_ITEM = ["christmas_body_item.PNG", "kanhuku_body_item.PNG", "odairisama_body_item.PNG", "ohinasama_body_item.PNG", "pajama_body_item.PNG", "pumpkin_body_item.PNG", "rabbit_body_item.PNG", "wizard_body_item.PNG"]; //からだ(item)



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
