// 画像のドラッグを無効にするためのイベントリスナーを設定
const image = document.querySelector('.full-screen-image');

image.addEventListener('dragstart', function(e) {
    e.preventDefault(); // ドラッグのデフォルト動作をキャンセル
});

// 画像へのマウスイベントを無効にするためのリスナー
image.addEventListener('mousedown', function(e) {
    e.preventDefault(); // マウスボタンクリックのデフォルト動作をキャンセル
});

image.addEventListener('touchstart', function(e) {
    e.preventDefault(); // タッチのデフォルト動作をキャンセル
});