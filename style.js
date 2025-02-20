document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("amidaCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 300;

    const columns = 5;
    const rows = 6;
    const lineSpacing = canvas.width / (columns + 1);
    let verticalLines = [];
    let horizontalLines = [];
    let animationFrameId = null;

    // **結果の確率を設定**
    const resultProbabilities = [
        { result: "大吉", probability: 0.1 },  // 10%
        { result: "中吉", probability: 0.2 },  // 20%
        { result: "小吉", probability: 0.3 },  // 30%
        { result: "吉", probability: 0.25 },   // 25%
        { result: "凶", probability: 0.15 }    // 15%
    ];

    // **アドバイスとラッキーアイテムのリスト**
    const adviceList = [
        "最高の恋愛運！", "チャンスが近づいてる！", "焦らず進もう", 
        "チャンスを逃さないで！", "今日は慎重に行動しよう", "思い切ってアプローチ！", 
        "新しい出会いに期待！", "素直な気持ちを大切にしよう", "友達のアドバイスを聞こう"
    ];

    const luckyItems = [
        "赤いハンカチ", "青いペン", "白いスカーフ", "緑のブレスレット", 
        "黄色い靴下", "ピンクのネックレス", "オレンジのバッグ", "紫のノート",
        "金色のリング", "銀のイヤリング"
    ];

    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function getResultByProbability() {
        let rand = Math.random();
        let cumulativeProbability = 0;

        for (let item of resultProbabilities) {
            cumulativeProbability += item.probability;
            if (rand < cumulativeProbability) {
                return item.result;
            }
        }
        return "吉"; // もし確率が合わない場合のデフォルト
    }

    function drawAmida() {
        verticalLines.length = 0;
        horizontalLines.length = 0;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 2;
        ctx.font = "16px Arial";
        ctx.textAlign = "center";

        for (let i = 0; i < columns; i++) {
            let x = lineSpacing * (i + 1);
            ctx.beginPath();
            ctx.moveTo(x, 20);
            ctx.lineTo(x, canvas.height - 40);
            ctx.stroke();
            verticalLines.push(x);
            ctx.fillStyle = "#000";
            ctx.fillText(getResultByProbability(), x, canvas.height - 20);
        }

        for (let i = 0; i < rows; i++) {
            let startIdx = Math.floor(Math.random() * (columns - 1));
            let x1 = verticalLines[startIdx];
            let x2 = verticalLines[startIdx + 1];
            let y = (canvas.height / (rows + 1)) * (i + 1);
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.stroke();
            horizontalLines.push({ x1, x2, y });
        }
    }

    function startAmida() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        let position = Math.floor(Math.random() * columns);
        let x = verticalLines[position];
        let y = 20;
        let speed = 1.5;

        function moveDown() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawAmida();

            if (y < canvas.height - 40) {
                y += speed;

                for (let line of horizontalLines) {
                    if (Math.abs(y - line.y) < 5) {
                        if (x === line.x1) {
                            x = line.x2;
                        } else if (x === line.x2) {
                            x = line.x1;
                        }
                    }
                }

                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fill();

                animationFrameId = requestAnimationFrame(moveDown);
            } else {
                showResult(position);
            }
        }

        moveDown();
    }

    function showResult(position) {
        let result = getResultByProbability();
        let advice = getRandomItem(adviceList);
        let luckyItem = getRandomItem(luckyItems);

        document.getElementById('result').innerText = "結果: " + result;
        document.getElementById('advice').innerText = "アドバイス: " + advice;

        let luckyButton = document.getElementById("lucky-button");
        luckyButton.textContent = "ラッキーアイテム"; 
        luckyButton.style.display = "block";
        luckyButton.style.margin = "10px auto"; 

        document.getElementById("lucky-item").style.display = "none";

        luckyButton.onclick = () => {
            let luckyItemElement = document.getElementById("lucky-item");
            luckyItemElement.textContent = "ラッキーアイテム: " + luckyItem;
            luckyItemElement.style.display = "block";

            luckyButton.style.display = "none"; 
        };
    }

    window.startAmida = startAmida;

    drawAmida();
});