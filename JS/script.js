// 動画の読み込みが完了したらローディング画面を非表示にして、メインコンテンツを表示
const video = document.getElementById('introVideo');
const loadingScreen = document.getElementById('loading');
const content = document.getElementById('content');

// 動画の再生が終了した時にローディング画面を非表示に
video.onended = function () {
    loadingScreen.style.display = 'none';
    content.style.display = 'block';
};

// 動画が読み込まれた直後に再生を開始
video.load();