var Material = {
    wood: 'wood',
    silver: 'silver',
    gold: 'gold'
}

var levelPrizeStatus = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
]

module.exports = {
    currentLevel: 0,
    enterLevel: 0,
    levels:[true, false, false],
    boomNum: 0,
    score: 0,
    gameBg: 'huoShan',
    Material,
    diamond: 0,
    vip: false,
    levelPrizeStatus,
    shield: 0,
    allPass: false
};
