// モバイルデバイスかどうかを判定する関数
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const video = document.getElementById('introVideo');
const loadingScreen = document.getElementById('loading');
const content = document.getElementById('content');
const gomen = document.getElementById('gomen');

// モバイルデバイスの場合、アニメーションをスキップ
if (isMobile()) {
    // モバイルの場合、videoを非表示にして、すぐにコンテンツを表示
    loadingScreen.style.display = 'none';
    content.style.display = 'block';
    gomen.style.display = 'block';
} else {
    // デスクトップの場合、動画の再生が終了したらコンテンツを表示
    video.onended = function () {
        setTimeout(function () {
            loadingScreen.style.display = 'none';
            content.style.display = 'block';
        }, 1000);  // 動画終了後、1秒待ってからコンテンツ表示
    };
}

document.body.addEventListener('touchstart', function(e) {
    // 2本以上の指が使われている場合、デフォルトの動作を無効化
    if (e.touches.length > 1) {
      e.preventDefault();  // 拡大縮小やスクロールを無効化
    }
  }, { passive: false }); // passive: falseを指定しないとpreventDefault()が効かない
  
document.body.addEventListener('touchmove', function(e) {
    // 同様に、タッチムーブ操作も無効化
    if (e.touches.length > 1) {
      e.preventDefault();  // スクロールやズームを無効化
    }
  }, { passive: false });


  document.body.addEventListener('wheel', function(e) {
    // コントロールキーが押されている場合は拡大縮小とみなす
    if (e.ctrlKey) {
        e.preventDefault();  // 拡大縮小を無効化
    }
}, { passive: false });

// ページが読み込まれた後に実行
window.addEventListener('load', function () {
  const popup = document.getElementById('popup');
  const playButton = document.getElementById('play-button');
  const noPlayButton = document.getElementById('no-play-button');
  const bgm = document.getElementById('bgm');

  bgm.volume = 0.05;

  // ポップアップを表示
  popup.style.display = 'flex';

  // 「再生する」ボタンがクリックされた場合
  playButton.addEventListener('click', function () {
    bgm.play(); // 音楽を再生

    var tagImageContainer = document.getElementById('tag-image-container');
    
    setTimeout(function() {
      tagImageContainer.style.opacity = 1;  // フェードイン
    }, 2000);  // 2秒後
  
    // 7秒後にフェードアウトで非表示
    setTimeout(function() {
      tagImageContainer.style.opacity = 0;  // フェードアウト
    }, 9000);  // 7秒後

    popup.style.display = 'none'; // ポップアップを閉じる
  });

  // 「再生しない」ボタンがクリックされた場合
  noPlayButton.addEventListener('click', function () {
    bgm.pause(); // 音楽を再生しない
    bgm.currentTime = 0; // 音楽の再生位置をリセット
    popup.style.display = 'none'; // ポップアップを閉じる
  });
});

let lastTime = 0;
let timeSinceLastStar = 0;
const interval = 1000; // 星を生成する間隔 (ミリ秒)
const maxStars = 5;   // 画面に表示する最大星の数
let currentStars = 0;  // 現在の星の数

// 流れ星を生成する関数
// 流れ星を生成する関数
function createShootingStar() {
  if (currentStars >= maxStars) return;  // 最大数に達したら新しい星は生成しない

  const star = document.createElement('img');
  star.src = 'JS/star.png';  // 流れ星の画像をここで指定します
  star.classList.add('star');

  const container = document.querySelector('.container');
  container.appendChild(star);

  const randomX = Math.random() * 100;  // x軸ランダム位置（%）
  const randomY = Math.random() * 100;  // y軸ランダム位置（%）
  const randomDelay = Math.random() * 5;  // アニメーションのランダムな遅延

  star.style.left = `${randomX}%`;
  star.style.top = `${randomY}%`;
  star.style.animationDelay = `${randomDelay}s`;

  star.addEventListener('animationend', function () {
    star.remove();
    currentStars--;  // 星が消えたら数を減らす
    createShootingStar();  // 星が消えたら新たな星を生成
  });

  currentStars++;  // 新しい星を生成したら数を増やす
}

// アニメーションを管理する関数
function animate(time) {
  const deltaTime = time - lastTime;
  lastTime = time;

  // 一定間隔で星を生成（無限に生成しない）
  if (timeSinceLastStar >= interval) {
    createShootingStar();
    timeSinceLastStar = 0; // リセット
  } else {
    timeSinceLastStar += deltaTime; // 経過時間を追加
  }

  // 次のフレームを呼び出し
  requestAnimationFrame(animate);
}

// アニメーションを開始
requestAnimationFrame(animate);


// configボタンとポップアップを取得
const configButton = document.getElementById('configButton');
const configPopu = document.getElementById('configPopu');
const closeButton = document.getElementById('closeButton');

// configボタンがクリックされたときにポップアップを表示
configButton.addEventListener('click', function() {
    configPopu.style.display = 'flex';  // ポップアップを表示
});

// closeボタンがクリックされたときにポップアップを閉じる
closeButton.addEventListener('click', function() {
    configPopu.style.display = 'none';  // ポップアップを非表示
});

// ポップアップ外のクリックで閉じる（オプション）
window.addEventListener('click', function(event) {
    if (event.target === configPopu) {
        configPopu.style.display = 'none';  // ポップアップを非表示
    }
});
