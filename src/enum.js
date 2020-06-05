/**
 * 存放枚举
 */
// 各个元素的图片
export const PIC = Object.freeze({
    BOX:
        'https://imgkr.cn-bj.ufileos.com/93862bfa-fa93-4b60-b4e6-aa4bf339335a.png',
    WALL:
        'https://imgkr.cn-bj.ufileos.com/8655ba2b-9056-4727-9b6c-f6736e79d4af.png',
    TREASURE:
        'https://imgkr.cn-bj.ufileos.com/671d0735-68be-4cff-88a1-1ea5b88341c2.png',
    ROLE:
        'https://imgkr.cn-bj.ufileos.com/20b743ba-98ca-440e-bc69-a065c2fd0a01.png',
})
// 地图里 3-箱子 1-围墙 2-宝藏 4-角色 0-空
export const MAP = Object.freeze({
    BOX: 3,
    WALL: 1,
    TREASURE: 2,
    ROLE: 4,
    NULL: 0,
})

export const ENCOURAGEMENT = Object.freeze({
    0: '欸，你很厉害嘛！',
    1: '有本事给我全部通关，哼！！',
    2: '再接再厉哦！',
    3: '我当年也是这么过关的.',
    4: '你是我见过过关速度最快的',
})
