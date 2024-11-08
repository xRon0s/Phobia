// 動画の読み込みが完了したらローディング画面を非表示にして、メインコンテンツを表示
const video = document.getElementById('introVideo');
const loadingScreen = document.getElementById('loading');
const content = document.getElementById('content');

// 動画の読み込みが完了したときのイベント
video.onloadeddata = function () {
    video.play();  // 動画が読み込まれたら再生開始
};

video.onended = function () {
    setTimeout(function () {
        loadingScreen.style.display = 'none';
        content.style.display = 'block';
    }, 1000);  // 1秒待ってからコンテンツ表示
};

// 動画の読み込みを開始
video.load();
