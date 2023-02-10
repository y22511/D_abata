// キーボードの入力状態を管理する配列の定義
let input_key = new Array();
// キーボードの入力イベント
window.addEventListener("keydown", handleKeydown);
function handleKeydown(e) {
  input_key[e.keyCode] = true;
}
window.addEventListener("keyup", handleKeyup);
function handleKeyup(e) {
  input_key[e.keyCode] = false;
}

// canvas要素の取得
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 1900;
const CANVAS_HEIGHT = 860;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

//キャラの設定
const IMG_SIZE = 80;
const CHARA_SPEED = 4;
// キャラの配置初期値
let x = 0;
let y = 300;
// 上下方向の速度
let vy = 0;  //正のとき：落下中 負のとき:上昇中
// ジャンプしたか否かのフラグ値
let isJump = false;

// ゲームオーバーか否かのフラグ値
let isGameOver = false;
// ゲームクリアか否かのフラグ値
let isGameClear = false;

//ゴール位置
const GOAL_X = 1400;
const GOAL_Y = 220;

// ブロック要素の定義
let blocks = [
  { x: 0, y: 600, w: 400, h: 40 },
  { x: 400, y: 500, w: 400, h: 40 },
  { x: 800, y: 400, w: 200, h: 40 },
  { x: 1200, y: 400, w: 70, h: 40 },
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

// ロード時に画面描画の処理が実行されるようにする
window.addEventListener("load", update);
// 画面を更新する関数を定義
function update() {
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
      const blockTargetIsOn = getBlockTargetIsOn(enemy.x, enemy.y, updatedEnemyX, updatedEnemyY);
      if (blockTargetIsOn !== null) {// ブロックが取得できた場合には、そのブロックで止まる
        updatedEnemyY = blockTargetIsOn.y - IMG_SIZE;
        updatedEnemyInJump = false;
      }
    } else { //ジャンプしていない状態でブロックが取得できなかったら
      if (getBlockTargetIsOn(enemy.x, enemy.y, updatedEnemyX, updatedEnemyY) === null) {
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
    alert("ゲームクリア");
    isGameClear = false;
    isJump = false;
    updatedX = 0;
    updatedY = 0;
    vy = 0;
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
    }
  } else {
    if (input_key[37]) {
      updatedX = x - CHARA_SPEED;
    }
    if (input_key[38] && !isJump ) {
      vy = -10;
      isJump = true;
    }
    if (input_key[39]) {
      updatedX = x + CHARA_SPEED;
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
      let isHit = isAreaOverlap(x, y, IMG_SIZE, IMG_SIZE, enemy.x, enemy.y, IMG_SIZE, IMG_SIZE);
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
    isHit = isAreaOverlap(x, y, IMG_SIZE, IMG_SIZE, GOAL_X, GOAL_Y, IMG_SIZE, IMG_SIZE);
    if (isHit) {
      isGameClear = true;
    }
  }

  // playrの画像を表示
  let image = new Image();
  image.src = "img/normalhanten.PNG";
  ctx.drawImage(image, x, y, IMG_SIZE, IMG_SIZE);

  // 敵の画像を表示
  let enemyImage = new Image();
  enemyImage.src = "img/normal.PNG";
  for (const enemy of enemies) {
    ctx.drawImage(enemyImage, enemy.x, enemy.y, IMG_SIZE, IMG_SIZE);
  }

  // ゴールの画像を表示
  image = new Image();
  image.src = "img/normal.PNG";
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
  return true;  // ここまで到達する場合には、どこかしらで重なる
}