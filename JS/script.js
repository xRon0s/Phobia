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
