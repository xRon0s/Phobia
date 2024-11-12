// モバイルデバイスかどうかを判定する関数
function isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

const video = document.getElementById('introVideo');
const loadingScreen = document.getElementById('loading');
const content = document.getElementById('content');

// モバイルデバイスの場合、アニメーションをスキップ
if (isMobile()) {
    // モバイルの場合、videoを非表示にして、すぐにコンテンツを表示
    loadingScreen.style.display = 'none';
    content.style.display = 'block';
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
    popup.style.display = 'none'; // ポップアップを閉じる
  });

  // 「再生しない」ボタンがクリックされた場合
  noPlayButton.addEventListener('click', function () {
    bgm.pause(); // 音楽を再生しない
    bgm.currentTime = 0; // 音楽の再生位置をリセット
    popup.style.display = 'none'; // ポップアップを閉じる
  });
});