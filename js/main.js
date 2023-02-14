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
const HEAD_SKIN_ITEM = ["", "head-item/christmas_head_item.PNG", "head-item/kanhuku_head_item.PNG", "head-item/odairisama_head_item.PNG", "head-item/ohinasama_head_item.PNG", "head-item/pajama_head_item.PNG", "head-item/pumpkin_head_item.PNG", "head-item/rabbit_head_item.PNG", "head-item/wizard_head_item.PNG"]; //あたま(item)
const BODY_SKIN_ITEM = ["", "body-item/christmas_body_item.PNG", "body-item/kanhuku_body_item.PNG", "body-item/odairisama_body_item.PNG", "body-item/ohinasama_body_item.PNG", "body-item/pajama_body_item.PNG", "body-item/pumpkin_body_item.PNG", "body-item/rabbit_body_item.PNG", "body-item/wizard_body_item.PNG"]; //からだ(item)

let myHeadSkinNum = Number(searchNameCookie('myHeadSkinNum'));
if (myHeadSkinNum == "") { myHeadSkinNum = 0 };
let myBodySkinNum = Number(searchNameCookie('myBodySkinNum'));
if (myBodySkinNum == "") { myBodySkinNum = 0 };
let mySkinNum = myHeadSkinNum + myBodySkinNum;
let valueImg = "";


//==============Coin==============//

function myCoinCounter() {
    let myCoinNum = document.querySelector('.mycoin-num');
    myCoinNum.innerHTML = '×' +  myCoin;
}



//==============Menu==============//
function selectBoxBtn(selectNum) {
    switch (selectNum) {
        case 0: 
    }
}
function selectBoxData() {

}
function selectBoxList() {

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
    while (valueImg == ""){
        let randomNum1 = Math.floor( Math.random() * 10) % 2;
        let randomNum2 = Math.floor( Math.random() * SKIN_NUM / 2 - 1 ) + 1; // 1 ~ 8
        valueImg = HEAD_OR_BODY[randomNum1][randomNum2];
        if (searchValueCookie(valueImg) == "" && valueImg != "") {
            document.cookie = 'mySkin' + mySkinNum + '=' + valueImg;
            switch (randomNum1) {
                case 0: 
                    myHeadSkinNum += 1;
                    document.cookie = 'myHeadSkinNum=' + myHeadSkinNum;
                case 1: 
                    myBodySkinNum += 1;
                    document.cookie = 'myBodySkinNum=' + myBodySkinNum;
            }
            mySkinNum += 1;
            document.cookie = 'mySkinNum=' + mySkinNum;
            if(SKIN_NUM - 2 < mySkinNum) { mySkinNum = 0; };
            console.log("新しいスキンをゲットしました！");
        } else {
            console.log("持ってるスキンをゲットしました！");
        }
    }
    wait = false;
}


function gachaMovie() {
    wait = true;
    let gachaMain = document.querySelector('.gacha-machine');
    
    //カプセルmovie
    let capsuleMovie = document.createElement('img');
    let capsule = {
        class: 'gacha-capsule',
        src: 'img/gacha_capsule.png',
        alt: 'カプセル',
    }
    FuncSetAttribute(capsuleMovie, capsule);
    gachaMain.after(capsuleMovie);

    //フラッシュmovie
    let flashMovie = document.createElement('img');
    let flash = {
        class: 'gacha-flash',
        src: 'img/gacha_flash.png',
        alt: 'フラッシュ',
    }
    FuncSetAttribute(flashMovie, flash);
    setTimeout(function(){
        gachaMain.after(flashMovie);
    }, 3000);

    //スキンmovie
    let skinMovie = document.createElement('img');
    let skin = {
        class: 'gacha-skin',
        src: 'img/' + valueImg,
        alt: 'スキン',
    }
    FuncSetAttribute(skinMovie, skin);
    setTimeout(function(){
        gachaMain.after(skinMovie);
    }, 5000);
}

//==============Main==============//

let wait = false;
let myCoin = Number(searchNameCookie('myCoin'));
if(myCoin == "") { myCoin = 0; };
myCoinCounter();


window.addEventListener('DOMContentLoaded', function() {
    //==============メニュー.html==============//
    let path = location.pathname;
    if (path == "/menu.html") {
        document.querySelector('.select-btn').addEventListener('click', function(e) {
            if (e.target.className != 'select-btn') {
                let sbtn = document.querySelectorAll('.s-btn');
                let selectNum = [].slice.call(sbtn).indexOf(e.target);
                selectBoxBtn(selectNum);
            }

        })

        selectBoxList();
    } 
    //==============ガチャ.html==============//
    path = location.pathname;
    if (path == "/gacha.html") {
        document.querySelector('.gacha-btn').addEventListener('click', function(){
            if (wait == true) { return; };
            wait = true;
            pullGacha();
            if (myCoin <= 0) { wait = false; return; };
            getSkin();
            gachaMovie();
            setTimeout(function() {
                document.querySelector('body').addEventListener('click', function(){
                    location.reload();
                })
            }, 7000)
        })
        //==============test==============//
        document.querySelector('.gacha-machine').addEventListener('click', function(){
            myCoin += 5;
            myCoinCounter();
        })
    }
})
