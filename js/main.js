//==============Various==============//
function FuncSetAttribute(origin, obj) {
    for (let i of Object.entries(obj)) {
        origin.setAttribute(i[0], i[1]);
    }
}
//==============Cookie==============//
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
function searchNameCookie(item) {
    let i = 0;
    let itemValue = "";
    nameCookie().forEach(function() {
        if (item == nameCookie()[i]) {itemValue =  valueCookie()[i]}
        i++;
    })
    return itemValue;
}
//-----valueを入れるとnameが返ってくる-----//
function searchValueCookie(item) {
    let i = 0;
    let itemName = "";
    valueCookie().forEach(function() {
        if (item == valueCookie()[i]) {itemName =  nameCookie()[i]}
        i++;
    })
    return itemName;
}



//==============skin==============//

const SKIN_NUM = 18;  //スキンの種類

const HEAD_SKIN = ["normal_head.PNG", "christmas_head.PNG", "kanhuku_head.PNG", "odairisama_head.PNG", "ohinasama_head.PNG", "pajama_head.PNG", "pumpkin_head.PNG", "rabbit_head.PNG", "wizard_head.PNG"]; //あたま
const BODY_SKIN = ["normal_body.PNG", "christmas_body.PNG", "kanhuku_body.PNG", "odairisama_body.PNG", "ohinasama_body.PNG", "pajama_body.PNG", "pumpkin_body.PNG", "rabbit_body.PNG", "wizard_body.PNG"]; //からだ
const HEAD_SKIN_ITEM = ["", "christmas_head_item.PNG", "kanhuku_head_item.PNG", "odairisama_head_item.PNG", "ohinasama_head_item.PNG", "pajama_head_item.PNG", "pumpkin_head_item.PNG", "rabbit_head_item.PNG", "wizard_head_item.PNG"]; //あたま(item)
const BODY_SKIN_ITEM = ["", "christmas_body_item.PNG", "kanhuku_body_item.PNG", "odairisama_body_item.PNG", "ohinasama_body_item.PNG", "pajama_body_item.PNG", "pumpkin_body_item.PNG", "rabbit_body_item.PNG", "wizard_body_item.PNG"]; //からだ(item)

let mySkinNum = searchNameCookie('mySkinNum');
if (mySkinNum == "") { mySkinNum = 0 };


//==============Coin==============//

function myCoinCounter() {
    let myCoinNum = document.querySelector('.mycoin-num');
    myCoinNum.innerHTML = '×' +  myCoin;
}

//==============Gacha==============//

function pullGacha(){
    if (myCoin <= 0) {console.log("コインが足りないよ"); return;}
    myCoin -= 1;
    document.cookie = 'myCoin =' + myCoin;
    myCoinCounter();
}

function getSkin(){
    const HEAD_OR_BODY = [HEAD_SKIN_ITEM, BODY_SKIN_ITEM]; 
    let valueImg = "";
    while (valueImg == ""){
        let randomNum1 = Math.floor( Math.random() * 10) % 2;
        let randomNum2 = Math.floor( Math.random() * SKIN_NUM / 2 - 1 ) + 1; // 1 ~ 8
        valueImg = HEAD_OR_BODY[randomNum1][randomNum2];
        if (searchValueCookie(valueImg) == "" && valueImg != "") {
            document.cookie = 'mySkin' + mySkinNum + '=' + valueImg;
            mySkinNum += 1;
            if(SKIN_NUM - 2 < mySkinNum) { mySkinNum = 0; };
            console.log("新しいスキンをゲットしました！");
        } else {
            console.log("持ってるスキンをゲットしました！");
        }
    }
    wait = false;
}


function gachaMovie() {
    let gachaMovie = document.querySelector('.gacha-movie');
    let capsuleMovie = document.createElement('img');
    
    let capsule = {
        class: 'gacha-capsule',
        src: 'img/gacha_capsule.png',
        alt: 'カプセル',
    }

    FuncSetAttribute(capsuleMovie, capsule);
    
    gachaMovie.insertBefore(capsuleMovie, gachaMovie.firstChild);
    setTimeout(function(){
        capsuleMovie.remove();
    }, 50000);
    
}

//==============Main==============//

let wait = false;
let myCoin = Number(searchNameCookie('myCoin'));
if(myCoin == "") { myCoin = 0; };
myCoinCounter();

//==============メニュー.html==============//
window.onload = ()=> {
    // パスの取得
    let path = location.pathname
    if (path == "/menu.html") {
    } 
}


//==============ガチャ.html==============//
window.onload = ()=> {
    // パスの取得
    let path = location.pathname;
    if (path == "/gacha.html") {

        document.querySelector('.gacha-btn').addEventListener('click', function(){
            if (wait == true) { return; };
            wait = true;
            pullGacha();
            if (myCoin <= 0) { wait = false; return; };
            getSkin();
            gachaMovie();
        })

        //==============test==============//
        document.querySelector('.gacha-machine').addEventListener('click', function(){
            myCoin += 5;
            myCoinCounter();
        })
    } 
}

