const video = document.getElementById('introVideo');
const loadingScreen = document.getElementById('loading');
const content = document.getElementById('content');

// 動画が正しく読み込まれて再生されるか確認
video.onloadeddata = function () {
    console.log("Video loaded, starting playback.");
    video.play();
};

// 動画が終了した時にローディング画面を非表示にしてコンテンツを表示
video.onended = function () {
    console.log("Video ended.");
    setTimeout(function () {
        loadingScreen.style.display = 'none';  // ローディング画面を非表示
        content.style.display = 'block';       // コンテンツを表示
    }, 1000);  // 1秒待ってからコンテンツ表示
};

// 動画の読み込みを開始
video.load();