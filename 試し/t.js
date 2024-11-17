// app.js

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Canvasサイズ設定
canvas.width = window.innerWidth;
canvas.height = 500;

let isDrawing = false;
let startX = 0;
let startY = 0;
let points = []; // 描画した点を記録

// 描画開始
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
    points = [{ x: startX, y: startY }];
});

// 描画中
canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        const x = e.offsetX;
        const y = e.offsetY;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // 既存の描画を消す
        drawAngelWings(); // 羽の形を表示

        // 曲線を描く
        ctx.beginPath();
        ctx.moveTo(startX, startY); // 開始位置

        // マウスの動きに合わせて曲線を描画
        ctx.quadraticCurveTo(startX + (x - startX) / 2, startY + (y - startY) / 2, x, y);

        ctx.stroke();
        points.push({ x, y });
    }
});

// 描画終了
canvas.addEventListener('mouseup', () => {
    isDrawing = false;

    // 一定時間後に線を消す（例: 1秒後）
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAngelWings(); // 羽の形を再表示
    }, 1000);

    // 描画が羽に近いか判定
    if (isWingShape(points)) {
        alert("天使の羽の形が描かれました！");
    }
});

// 描画リセット（ダブルクリックで消去）
canvas.addEventListener('dblclick', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAngelWings(); // 羽の形を再表示
});

// 天使の羽の形を描画する関数
function drawAngelWings() {
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
    ctx.beginPath();

    // 中央の点（基準）
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 左側の羽
    ctx.moveTo(centerX, centerY); // 始点
    ctx.quadraticCurveTo(centerX - 150, centerY - 150, centerX, centerY - 200); // 曲線で羽を描く
    ctx.quadraticCurveTo(centerX + 150, centerY - 150, centerX, centerY); // 右側に戻る

    // 右側の羽（反転）
    ctx.moveTo(centerX, centerY); // 始点
    ctx.quadraticCurveTo(centerX + 150, centerY - 150, centerX, centerY - 200); // 曲線で羽を描く
    ctx.quadraticCurveTo(centerX - 150, centerY - 150, centerX, centerY); // 左側に戻る

    ctx.stroke();
}

// 羽の形に近いかどうかを判定する関数（簡易版）
function isWingShape(points) {
    if (points.length < 10) return false;  // 十分な点数がないときは判定しない

    const centerX = (points[0].x + points[points.length - 1].x) / 2; // X座標の中心

    let leftPoints = [];
    let rightPoints = [];

    // 描画された点を左右に分ける
    points.forEach((point) => {
        if (point.x < centerX) leftPoints.push(point);
        else rightPoints.push(point);
    });

    // 左右の点がどれくらい近いかをチェック
    let symmetryScore = 0;
    const maxDistance = 50;  // 誤差の最大値（50px以内に収まるべき）
    leftPoints.forEach((leftPoint, i) => {
        const rightPoint = rightPoints[rightPoints.length - 1 - i]; // 対応する右側の点
        if (rightPoint && Math.abs(leftPoint.y - rightPoint.y) < maxDistance) {
            symmetryScore++;
        }
    });

    // 左右の点の対称度合いが高ければ羽の形に近いと判断
    const symmetryRatio = symmetryScore / Math.min(leftPoints.length, rightPoints.length);
    return symmetryRatio > 0.8; // 対称性が80%以上あれば羽の形と見なす
}
