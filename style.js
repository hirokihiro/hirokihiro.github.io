function drawOmikuji() {
    const fortunes = [
        { result: "大吉", advices: ["素敵な出会いがありそう！", "運命の人に出会うかも！", "最高の一日になりそう！", "運命の人は半径１mにいるかも！？"], luckyItems: ["赤いハンカチ", "ハートのアクセサリー", "ローズの香水"] },
        { result: "中吉", advices: ["片思いが実るかも！？", "思い切ってアプローチしてみよう！", "恋のチャンスが近づいてる！"], luckyItems: ["青いペン", "好きな本", "星のモチーフ"] },
        { result: "小吉", advices: ["焦らずゆっくり進もう", "タイミングを見極めるのが大切", "小さな幸せを大切に"], luckyItems: ["白いスカーフ", "お気に入りのノート", "月のチャーム"] },
        { result: "吉", advices: ["チャンスを逃さないで！", "自信を持って行動しよう", "思いがけない展開があるかも"], luckyItems: ["緑のブレスレット", "フルーツ", "花のピアス"] },
        { result: "凶", advices: ["今日は慎重に行動しよう", "無理せず自分の気持ちを大切に", "焦らずチャンスを待とう"], luckyItems: ["黄色い靴下", "お気に入りの音楽", "お守り"] },
        { result: "大凶", advices: ["今日は大人しく過ごそう", "好きな人を思い出して元気だそう！！", "自分の行動を見つめ直せ！"], luckyItems: ["ピンクのリボン", "マスタードイエローの物"]　}
    ];

    const randomIndex = Math.floor(Math.random() * fortunes.length);
    const fortune = fortunes[randomIndex];
    const randomAdvice = fortune.advices[Math.floor(Math.random() * fortune.advices.length)];
    const randomLuckyItem = fortune.luckyItems[Math.floor(Math.random() * fortune.luckyItems.length)];

    document.getElementById("result").textContent = fortune.result;
    document.getElementById("advice").textContent = randomAdvice;
    document.getElementById("lucky-item").textContent = "ラッキーアイテム: " + randomLuckyItem;
}