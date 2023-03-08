//==============Various==============//
function FuncSetAttribute(origin, obj) {
    for (let i of Object.entries(obj)) {
        origin.setAttribute(i[0], i[1]);
    }
}
function searchArrayNum(skinImgSrc) {
    for (let i = 0; i < SKIN_NUM / 2; i++) {
        if (selectItem == 'head') {
            if (HEAD_SKIN_ITEM[i] == skinImgSrc) {
                return i;
            }
        } else {
            if (BODY_SKIN_ITEM[i] == skinImgSrc) {
                return i;
            }
        }
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
function searchValueCookie(item) {
    let i = 0;
    let itemValue = "";
    nameCookie().forEach(function() {
        if (item == nameCookie()[i]) {itemValue =  valueCookie()[i]}
        i++;
    })
    return itemValue;
}
//-----valueを入れるとnameが返ってくる-----//
function searchNameCookie(item) {
    let i = 0;
    let itemName = "";
    valueCookie().forEach(function() {
        if (item == valueCookie()[i]) {itemName =  nameCookie()[i]}
        i++;
    })
    return itemName;
}



//==============skin==============//

const SKIN_NUM = 20;  //スキンの種類

const HEAD_SKIN = ["head/normal_head.PNG", "head/christmas_head.PNG", "head/kanhuku_head.PNG", "head/odairisama_head.PNG", "head/ohinasama_head.PNG", "head/pajama_head.PNG", "head/pumpkin_head.PNG", "head/rabbit_head.PNG", "head/wizard_head.PNG", "head/cowboy_head.PNG"]; //あたま
const BODY_SKIN = ["body/normal_body.PNG", "body/christmas_body.PNG", "body/kanhuku_body.PNG", "body/odairisama_body.PNG", "body/ohinasama_body.PNG", "body/pajama_body.PNG", "body/pumpkin_body.PNG", "body/rabbit_body.PNG", "body/wizard_body.PNG", "body/cowboy_body.PNG"]; //からだ
const HEAD_SKIN_ITEM = ["head-item/normal_head_item.PNG", "head-item/christmas_head_item.PNG", "head-item/kanhuku_head_item.PNG", "head-item/odairisama_head_item.PNG", "head-item/ohinasama_head_item.PNG", "head-item/pajama_head_item.PNG", "head-item/pumpkin_head_item.PNG", "head-item/rabbit_head_item.PNG", "head-item/wizard_head_item.PNG", "head-item/cowboy_head_item.PNG"]; //あたま(item)
const BODY_SKIN_ITEM = ["body-item/normal_body_item.PNG", "body-item/christmas_body_item.PNG", "body-item/kanhuku_body_item.PNG", "body-item/odairisama_body_item.PNG", "body-item/ohinasama_body_item.PNG", "body-item/pajama_body_item.PNG", "body-item/pumpkin_body_item.PNG", "body-item/rabbit_body_item.PNG", "body-item/wizard_body_item.PNG", "body-item/cowboy_body_item.PNG"]; //からだ(item)

let myHeadSkinNum = Number(searchValueCookie('myHeadSkinNum'));
if (myHeadSkinNum == "") { myHeadSkinNum = 1 };
let myBodySkinNum = Number(searchValueCookie('myBodySkinNum'));
if (myBodySkinNum == "") { myBodySkinNum = 1 };
let mySkinNum = myHeadSkinNum + myBodySkinNum;
let valueImg = "";
let selectItem = 'head';

if (searchValueCookie('selectSkinHead') == "") 
    document.cookie = 'selectSkinHead =' + HEAD_SKIN[0];
if (searchValueCookie('selectSkinBody') == "") 
    document.cookie = 'selectSkinBody =' + BODY_SKIN[0];

//==============game==============//

// キーボードの入力状態を管理する配列の定義
let input_key = new Array();

//キャラの設定
const IMG_SIZE = 100;
const CHARA_SPEED = 4;
const ENEMY_SIZE = 80;
// キャラの配置初期値
let x = 0;
let y = 300;
// 上下方向の速度
let vy = 0;

let isJump = false;
let isGameOver = false;
let isGameClear = false;

//ゴール位置
const GOAL_X = 1400;
const GOAL_Y = 200;

// ブロック要素の定義
let blocks = [
{ x: 0, y: 600, w: 400, h: 40 },
{ x: 400, y: 500, w: 400, h: 40 },
{ x: 800, y: 400, w: 200, h: 40 },
{ x: 1160, y: 400, w: 50, h: 40 },
{ x: 1250, y: 300, w: 300, h: 40 },
];

// 敵の情報
let enemies = [
{ x: 550, y: 0, isJump: true, vy: 0 },
{ x: 650, y: 20, isJump: true, vy: 0 },
{ x: 850, y: 50, isJump: true, vy: 0 },
{ x: 1000, y: 50, isJump: true, vy: 0 },
];
const ENEMY_SPEED = 1;





//==============Coin==============//

function myCoinCounter() {
    let myCoinNum = document.querySelector('.mycoin-num');
    myCoinNum.innerHTML = '×' +  myCoin;
}



//==============Menu==============//
function btnBorderChange(selectNum) {
    let selectBtn = document.querySelectorAll('.s-btn')[selectNum];
    if (selectBtn.classList.length == 1) {
        selectBtn.classList.add('s-btncolor0' + (selectNum + 1));
        for (let i = 0; i < 3; i++) {
            if (i != selectNum) {
                let notSelectBtn = document.querySelector('.s-btncolor0' + (i + 1));
                if (notSelectBtn != null) {
                    notSelectBtn.classList.remove('s-btncolor0' + (i + 1));
                }
            }
        }
    }
}//btnBorderChange
function selectBoxBtn(selectNum) {
    let itemList = document.querySelector('.itemlist');
    let originalClass = 'itemlist-color0' + itemList.classList.value.slice(-1);
    let changeClass = 'itemlist-color0' + (selectNum + 1);

    if (originalClass == changeClass) { return; };
    itemList.classList.replace(originalClass, changeClass);
}//selectBoxBtn

function selectBoxList() {
    let listNum = 0;
    if (selectItem == 'head') {
        listNum = myHeadSkinNum;
    } else if (selectItem == 'body') {
        listNum = myBodySkinNum;
    }
    while (listNum % 4 != 0) {
        listNum += 1;
    }

    //リスト生成
    let itemList = document.querySelector('.itemlist');
    for (let i = 0; i < listNum; i++) {
        let selectBoxList = document.createElement('li');
        selectBoxList.className = 'item';
        itemList.appendChild(selectBoxList);
    }
}
function selectBoxRemove() {
    let itemList = document.querySelector('.itemlist');
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}
function nonSelectBoxImage() {
    let notImgSrc = '';
    if (selectItem == 'head') {
        notImgSrc = HEAD_SKIN_ITEM[0];
    } else {
        notImgSrc = BODY_SKIN_ITEM[0];
    }

    let notImgObj = {
        class: 'not-image',
        src: 'img/' + notImgSrc,
        alt: 'ノーマルスキン'
    }
    let notImg = document.createElement('img');
    FuncSetAttribute(notImg, notImgObj);

    document.querySelector('.item').appendChild(notImg);

}
function selectBoxImage() {
    let mySkinImage = [];
    let pickList = 1;
    let pickNum = 0;
    let skinImage = [];
    let createImage = [];
    for (let i = 1; i < mySkinNum; i++) {
        if (searchValueCookie('mySkin' + i).slice(0, 4) == selectItem) {
            let skinObj = {
                class: 'skin-image',
                src: 'img/' + searchValueCookie('mySkin' + i),
                alt: 'マイスキン',
            }
            skinImage.push(skinObj);
            mySkinImage[pickNum] = document.createElement('img');
            FuncSetAttribute(mySkinImage[pickNum], skinImage[pickNum]);
            createImage.push(document.getElementsByClassName('item')[pickList]);

            createImage[pickNum].appendChild(mySkinImage[pickNum]);
            pickList += 1;
            pickNum += 1;
        }
    }
}

function itemSelect(itemNum) {
    let skinImg = document.querySelectorAll('.item img')[itemNum];
    let skinImgSrc = skinImg.getAttribute('src').slice(4);
    let skinArrayNum = searchArrayNum(skinImgSrc);
    let selectSkin = '';
    if (selectItem == 'head') {
        selectSkin = 'img/' + HEAD_SKIN[skinArrayNum];
        document.cookie = 'selectSkinHead =' + HEAD_SKIN[skinArrayNum];
    } else if (selectItem == 'body') {
        selectSkin = 'img/' + BODY_SKIN[skinArrayNum];
        document.cookie = 'selectSkinBody =' + BODY_SKIN[skinArrayNum];
    }
    let itemImage = document.querySelector('.' + selectItem + '_img');
    itemImage.src = selectSkin;
}
function nonItemSelect() {
    let headItem = document.querySelector('.head_img');
    let bodyItem = document.querySelector('.body_img');
    headItem.src = 'img/' + searchValueCookie('selectSkinHead');
    bodyItem.src = 'img/' + searchValueCookie('selectSkinBody');
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
        let randomNum2 = Math.floor( Math.random() * (SKIN_NUM / 2 - 1)) + 1;
        valueImg = HEAD_OR_BODY[randomNum1][randomNum2];
        if (searchNameCookie(valueImg) == "" && valueImg != "") {
            document.cookie = 'mySkin' + mySkinNum + '=' + valueImg;
            switch (randomNum1) {
                case 0: 
                    myHeadSkinNum += 1;
                    document.cookie = 'myHeadSkinNum=' + myHeadSkinNum;
                    break;
                case 1: 
                    myBodySkinNum += 1;
                    document.cookie = 'myBodySkinNum=' + myBodySkinNum;
                    break;
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
        src: 'img/gacha/gacha_capsule.png',
        alt: 'カプセル',
    }
    FuncSetAttribute(capsuleMovie, capsule);
    gachaMain.after(capsuleMovie);

    //フラッシュmovie
    let flashMovie = document.createElement('img');
    let flash = {
        class: 'gacha-flash',
        src: 'img/gacha/gacha_flash.png',
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

//==============Game==============//

function handleKeydown(e) {
    input_key[e.keyCode] = true;
}
function handleKeyup(e) {
    input_key[e.keyCode] = false;
}
// 画面を更新する関数を定義
function update() {
    // canvas要素の取得
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const CANVAS_WIDTH = 1900;
    const CANVAS_HEIGHT = 920;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (const enemy of enemies) {
        let updatedEnemyX = enemy.x;
        let updatedEnemyY = enemy.y;
        let updatedEnemyInJump = enemy.isJump;
        let updatedEnemyVy = enemy.vy;
        updatedEnemyX = updatedEnemyX - ENEMY_SPEED;
        if (enemy.isJump) {
            updatedEnemyY = enemy.y + enemy.vy;
            updatedEnemyVy = enemy.vy + 0.5;
            const blockTargetIsOn = getEnemyBlockTargetIsOn(enemy.x, enemy.y, updatedEnemyX, updatedEnemyY);
            if (blockTargetIsOn !== null) {// ブロックが取得できた場合には、そのブロックで止まる
                updatedEnemyY = blockTargetIsOn.y - IMG_SIZE;
                updatedEnemyInJump = false;
            }
        } else { //ジャンプしていない状態でブロックが取得できなかったら
            if (getEnemyBlockTargetIsOn(enemy.x, enemy.y, updatedEnemyX, updatedEnemyY) === null) {
                updatedEnemyInJump = true; //上記のif文が実行される(ジャンプと同じ扱いにする)
                updatedEnemyVy = 0;
            }
        }
        enemy.x = updatedEnemyX;
        enemy.y = updatedEnemyY;
        enemy.isJump = updatedEnemyInJump;
        enemy.vy = updatedEnemyVy;
    }

    let updatedX = x;
    let updatedY = y;
    if (isGameClear) {
        document.cookie = 'myCoin=' + (myCoin + 5);
        console.log(searchValueCookie('myCoin'));
        alert("5コインゲット!");
        isGameClear = false;
        isJump = false;
        updatedX = 0;
        updatedY = 0;
        vy = 0;
        history.back();
    } else if (isGameOver){
        updatedY = y + vy;
        vy = vy + 0.5;
        if (y > CANVAS_HEIGHT) { //キャラが更に下に落ちてきた時
            alert("GAME OVER");
            
            isGameOver = false;
            isJump = false;
            updatedX = 0;
            updatedY = 0;
            vy = 0;
            location.reload();
        }
    } else {
        if (input_key[37]) {
            updatedX = x + CHARA_SPEED;
        }
        if (input_key[38] && !isJump ) {
            vy = -14;
            isJump = true;
        }
        if (input_key[39]) {
            updatedX = x - CHARA_SPEED;
        }
        if (isJump) {
            updatedY = y + vy;
            vy = vy + 0.5;
            const blockTargetIsOn = getBlockTargetIsOn(x, y, updatedX, updatedY);
            if (blockTargetIsOn !== null) {// ブロックが取得できた場合には、着地させる
                updatedY = blockTargetIsOn.y - IMG_SIZE; //地面で止まる
                isJump = false;
            }
        } else {  //ジャンプしていない状態でブロックが取得できなかったら
            if (getBlockTargetIsOn(x, y, updatedX, updatedY) === null) {
                isJump = true; //上のif文が適用される
                vy = 0;
            }
        }

        if (y > CANVAS_HEIGHT) { //下まで落ちたらゲームオーバー
            isGameOver = true;
            updatedY = CANVAS_HEIGHT; //一度その場所に固定
            vy = -15;
        }
    }

    x = updatedX;
    y = updatedY;

    if (!isGameOver) {
      for (const enemy of enemies) { // すべて敵で当たり判定を調査
            let isHit = isAreaOverlap(-x, y, IMG_SIZE, IMG_SIZE, enemy.x + 40, enemy.y + 40, ENEMY_SIZE, ENEMY_SIZE);
            if(isHit) {//重なっていて
                if (isJump && vy > 0) { // ジャンプしていて、落下している状態で敵にぶつかった場合には
                    vy = -7; //上向きのジャンプ
                    enemy.y = CANVAS_HEIGHT;// 敵を消し去る(見えない位置に移動させる)
                } else {// ぞれ以外でぶつかっていた場合には
                    isGameOver = true;  //ゲームオーバー
                    vy = -10; //上に飛び上がる
                }
            }
        }
        isHit = isAreaOverlap(-x, y, IMG_SIZE, IMG_SIZE, GOAL_X + 48, GOAL_Y, IMG_SIZE, IMG_SIZE);
        if (isHit) {
            isGameClear = true;
        }
    }

    // playrの画像を表示h
    ctx.save();
    ctx.transform(-1, 0, 0, 1, IMG_SIZE, 0);
    
    let imageHead = new Image();
    imageHead.src = "img/" + searchValueCookie('selectSkinHead');
    ctx.drawImage(imageHead, x, y+8, IMG_SIZE, IMG_SIZE);
    let imageBody = new Image();
    imageBody.src = "img/" + searchValueCookie('selectSkinBody');
    ctx.drawImage(imageBody, x, y+8, IMG_SIZE, IMG_SIZE);

    ctx.restore();

    // 敵の画像を表示
    let enemyImage = new Image();
    enemyImage.src = "img/game/mouse.png";
    for (const enemy of enemies) {
        ctx.drawImage(enemyImage, enemy.x, enemy.y + 20, ENEMY_SIZE, ENEMY_SIZE);
    }

    // ゴールの画像を表示
    image = new Image();
    image.src = "img/coin.PNG";
    ctx.drawImage(image, GOAL_X, GOAL_Y, IMG_SIZE, IMG_SIZE);

    // ブロックを表示
    ctx.fillStyle = "Orange";
    for (const block of blocks) {
        ctx.fillRect(block.x, block.y, block.w, block.h);
    }
    window.requestAnimationFrame(update);
}

// ブロック上に存在していればそのブロックの情報を、存在していなければnullを返す
function getBlockTargetIsOn(x, y, updatedX, updatedY) {
    for (const block of blocks) {
        console.log('x=' + x, 'ux=' + updatedX , 'bx=' + block.x , 'bw=' + block.w);
        //更新前はキャラ下部が地面以上　かつ　更新後はキャラ下部が地面以下
        if (y + IMG_SIZE <= block.y && updatedY + IMG_SIZE >= block.y) {
            if (//このifを満たすときはブロックがないので取得できない
            //キャラ右端 <= ブロック左端 または　キャラ左端 >= ブロック右端
            (x - IMG_SIZE >= -block.x || x <= -block.x - block.w) &&
            (updatedX - IMG_SIZE >= -block.x || updatedX <= -block.x - block.w)
            // (x + IMG_SIZE <= block.x || x >= block.x + block.w) &&
            // (updatedX + IMG_SIZE <= block.x || updatedX >= block.x + block.w)
            ) {
            // ブロックの上にいない場合には何もしない
            continue;
            }
        // ブロックの上にいる場合には、そのブロック要素を返す
        return block;
        }
    }// 最後までブロック要素を返さなかった場合(すべてcontinue処理された場合)
    return null; //ブロック要素の上にいないということなのでnullを返却する
}
function getEnemyBlockTargetIsOn(x, y, updatedX, updatedY) {
    for (const block of blocks) {
        //更新前はキャラ下部が地面以上　かつ　更新後はキャラ下部が地面以下
        if (y + IMG_SIZE <= block.y && updatedY + IMG_SIZE >= block.y) {
            if (//このifを満たすときはブロックがないので取得できない
            //キャラ右端 <= ブロック左端 または　キャラ左端 >= ブロック右端
            (x + IMG_SIZE <= block.x || x >= block.x + block.w) &&
            (updatedX + IMG_SIZE <= block.x || updatedX >= block.x + block.w)
            ) {
            // ブロックの上にいない場合には何もしない
            continue;
            }
        // ブロックの上にいる場合には、そのブロック要素を返す
        return block;
        }
    }// 最後までブロック要素を返さなかった場合(すべてcontinue処理された場合)
    return null; //ブロック要素の上にいないということなのでnullを返却する
}

/* キャラの左上の角の座標を(cx, cy)、幅をcw, 高さをchとする
* 敵の左上の角の座標を(ex, ey)、幅をew, 高さをehとする */
function isAreaOverlap(cx, cy, cw, ch, ex, ey, ew, eh) {
    if (ex + ew < cx) return false;  //キャラの左と敵の右
    if (cx + cw < ex) return false;  //キャラの右と敵の左
    if (ey + eh < cy) return false;  //キャラの上と敵の下
    if (cy + ch < ey) return false;  //キャラの下と敵の上
    return true;
}
//==============Main==============//

let wait = false;
let myCoin = Number(searchValueCookie('myCoin'));
if(myCoin == "") { myCoin = 0; };

window.addEventListener('DOMContentLoaded', function() {

    let width = document.body.clientWidth;
    let height = window.outerHeight;
    if (width <= 1200 || height <= 700) {
        flag = confirm("全画面表示推奨です。");
    }
    
    //==============トップ.html==============//
    document.getElementById("start_button").onclick = function () {
        // cookie 入っているか確認して分岐
        if (document.cookie != "") {
            swal("本当にはじめからにしますか？", {
                buttons: {
                    cancel: "いいえ",
                    yes: "はい"
                }
            }).then((value) => {
                switch(value) {
                    case "cancel": 
                        
                        console.log("ddd");
                        break;
                    
                    case "yes":
                        //クッキー削除
                        console.log("new");
                }
            });
        }
        swal('ゲームを始めます。');
    };   

    //==============メニュー.html==============//
    let path = location.pathname.slice(-10);
    if (path == "/menu.html") {
        //myCoin
        myCoinCounter();

        //menu限定
        selectBoxList();
        nonSelectBoxImage();
        selectBoxImage();
        nonItemSelect();
        document.querySelector('.select-btn').addEventListener('click', function(e) {
            if (e.target.className != 'select-btn') {
                let sbtn = document.querySelectorAll('.s-btn');
                let selectNum = [].slice.call(sbtn).indexOf(e.target);
                
                switch (selectNum) {
                    case 0: selectItem = 'head'; break;
                    case 1: selectItem = 'body'; break;
                    case 2: window.location.href = 'gacha.html';
                }
                btnBorderChange(selectNum);
                selectBoxBtn(selectNum);
            }
            selectBoxRemove();
            selectBoxList();
            nonSelectBoxImage();
            selectBoxImage();
        })
        document.querySelector('.itemlist').addEventListener('click', function(e) {
            let item = document.querySelectorAll(".item img");
            let itemNum = [].slice.call(item).indexOf(e.target);
            itemSelect(itemNum);
        })
    } 
    //==============ガチャ.html==============//
    path = location.pathname.slice(-11);
    if (path == "/gacha.html") {
        //myCoin
        myCoinCounter();

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
    }

    //==============ゲーム.html==============//
    path = location.pathname.slice(-10);
    if (path == "/game.html") {
        
        // キーボードの入力イベント
        window.addEventListener("keydown", handleKeydown);

        window.addEventListener("keyup", handleKeyup);

        // ロード時に画面描画の処理が実行されるようにする
        window.addEventListener("load", update);
    }
})
