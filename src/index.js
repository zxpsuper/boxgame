import levelMap from './levelMap.js'
import InputManager from './inputManager'
import DomManager from './domManager'
import raf from 'raf'
import { PIC, MAP, ENCOURAGEMENT } from './enum'
let changeX = 0,
    changeY = 0,
    time = 0,
    requestAnimationFrame = null

export default class BoxGame {
    constructor() {
        this.nowLevel = +localStorage.getItem('nowLevel') || 0
        this.ctx1 = document.getElementById('canvas1').getContext('2d')
        this.canvas2 = document.getElementById('canvas2')
        this.ctx2 = canvas2.getContext('2d')
        this.inputManager = new InputManager()
        this.domManager = new DomManager(this)
        this.inputManager.on('move', this.move.bind(this))
    }
    prev() {
        if (this.nowLevel - 1 < 0) return false
        this.domManager.setLevel(this.nowLevel - 1)
    }
    next() {
        if (this.nowLevel + 1 > 99) return false
        this.domManager.setLevel(this.nowLevel + 1)
    }
    move(direction) {
        // 0 1 2 3 上右下左, changeX, changeY 对应角色将于地图坐标的偏移量
        switch (direction) {
            case 3:
                changeX = -1
                this.role.walkY = 100
                break
            case 0:
                changeY = -1
                this.role.walkY = 300
                break
            case 1:
                changeX = 1
                this.role.walkY = 200
                break
            case 2:
                changeY = 1
                this.role.walkY = 0
                break
        }
    }
    // 前进
    goAhead() {
        let boxs = this.boxs.array
        if (changeX != 0 || changeY != 0) {
            // 如果前进点为空或者宝藏点，角色移动
            if (
                this.nowLevelMap[this.role.realX + changeX][
                    this.role.realY + changeY
                ] == MAP.NULL ||
                this.nowLevelMap[this.role.realX + changeX][
                    this.role.realY + changeY
                ] == MAP.TREASURE
            ) {
                this.role.y += 5 * changeY
                this.role.x += 5 * changeX
            } else if (
                this.nowLevelMap[this.role.realX + changeX][
                    this.role.realY + changeY
                ] == MAP.BOX
            ) {
                // 如果前进方式有箱子，往前进方向加多一格判断 2 * changeX ，2 * changeY
                if (
                    this.nowLevelMap[this.role.realX + 2 * changeX][
                        this.role.realY + 2 * changeY
                    ] == MAP.NULL ||
                    this.nowLevelMap[this.role.realX + 2 * changeX][
                        this.role.realY + 2 * changeY
                    ] == MAP.TREASURE
                ) {
                    // 如果箱子前进方向一格为空或者宝藏点，角色和箱子一起移动
                    this.role.y += 5 * changeY
                    this.role.x += 5 * changeX
                    for (var i = 0; i < boxs.length; i++) {
                        if (
                            boxs[i].realX == this.role.realX + changeX &&
                            boxs[i].realY == this.role.realY + changeY
                        ) {
                            boxs[i].y += 5 * changeY
                            boxs[i].x += 5 * changeX
                        }
                    }
                }
            }
            // 每个格子是35单位，每一帧走5单位，7帧就走完一格
            time += 5
            // 修改 this.role.walkX 修改角色的前进动作
            if (time >= 7) {
                this.role.walkX = 100
            }
            if (time >= 14) {
                this.role.walkX = 200
            }
            if (time >= 21) {
                this.role.walkX = 300
            }
            if (time >= 35) {
                // 当走完一格的时候
                this.role.walkX = 0
                time = 0
                // 如果前进的位置不是墙也不是箱子
                if (
                    this.nowLevelMap[this.role.realX + changeX][
                        this.role.realY + changeY
                    ] != MAP.WALL &&
                    this.nowLevelMap[this.role.realX + changeX][
                        this.role.realY + changeY
                    ] != MAP.BOX
                ) {
                    // 修改nowLevelMap,修改当前地图保存记录
                    // 将角色原来的位置设为空
                    this.nowLevelMap[this.role.realX][this.role.realY] = 0
                    // 前进的位置设为角色
                    this.nowLevelMap[this.role.realX + changeX][
                        this.role.realY + changeY
                    ] = 4
                    // 更新角色信息
                    this.role.realY += changeY
                    this.role.realX += changeX
                } else if (
                    this.nowLevelMap[this.role.realX + changeX][
                        this.role.realY + changeY
                    ] == MAP.BOX
                ) {
                    // 如果前进的位置是箱子
                    if (
                        this.nowLevelMap[this.role.realX + 2 * changeX][
                            this.role.realY + 2 * changeY
                        ] == MAP.NULL ||
                        this.nowLevelMap[this.role.realX + 2 * changeX][
                            this.role.realY + 2 * changeY
                        ] == MAP.TREASURE
                    ) {
                        // 在往前进方向加多一格判断是否为空或宝藏
                        for (var i = 0; i < boxs.length; i++) {
                            if (
                                boxs[i].realX == this.role.realX + changeX &&
                                boxs[i].realY == this.role.realY + changeY
                            ) {
                                // 更新前进箱子的信息
                                boxs[i].realY += changeY
                                boxs[i].realX += changeX
                            }
                        }
                        // 更新箱子于地图中的位置
                        this.nowLevelMap[this.role.realX + 2 * changeX][
                            this.role.realY + 2 * changeY
                        ] = MAP.BOX
                        // 更新角色于地图中的位置
                        this.nowLevelMap[this.role.realX + changeX][
                            this.role.realY + changeY
                        ] = MAP.ROLE
                        // 更新角色原来的位置为空
                        this.nowLevelMap[this.role.realX][this.role.realY] = 0
                        // 更新角色信息
                        this.role.realY += changeY
                        this.role.realX += changeX
                    }
                }
                changeX = 0
                changeY = 0
            }
        }
    }
    init() {
        this.nowLevelMap = JSON.parse(JSON.stringify(levelMap[this.nowLevel])) // 简单深拷贝一份地图
        this.boxs = new Element() // 箱子
        this.walls = new Element() // 墙
        this.treasures = new Element() // 宝藏
        this.role = null // 角色
        for (var i = 0; i < this.nowLevelMap.length; i++) {
            for (var j = 0; j < this.nowLevelMap[i].length; j++) {
                if (this.nowLevelMap[i][j] == MAP.BOX) {
                    let img = new Image()
                    img.src = PIC.BOX
                    this.boxs.add({
                        x: i * 35,
                        y: j * 35,
                        pic: img,
                        realX: i,
                        realY: j,
                    })
                } else if (this.nowLevelMap[i][j] == MAP.WALL) {
                    let img = new Image()
                    img.src = PIC.WALL
                    this.walls.add({
                        x: i * 35,
                        y: j * 35,
                        pic: img,
                        realX: i,
                        realY: j,
                    })
                } else if (this.nowLevelMap[i][j] == MAP.TREASURE) {
                    let img = new Image()
                    img.src = PIC.TREASURE
                    this.treasures.add({
                        x: i * 35,
                        y: j * 35,
                        pic: img,
                        realX: i,
                        realY: j,
                    })
                } else if (this.nowLevelMap[i][j] == MAP.ROLE) {
                    let img = new Image()
                    img.src = PIC.ROLE
                    this.role = new Role({
                        x: i * 35,
                        y: j * 35,
                        role: img,
                        walkX: 0,
                        walkY: 0,
                        realX: i,
                        realY: j,
                    })
                }
            }
        }
        raf.cancel(requestAnimationFrame)
        this.draw()
    }
    draw() {
        if (this.checkWin()) {
            this.domManager.setLevel(this.nowLevel + 1)
            let message = ENCOURAGEMENT[(Math.random() * 5) | 0]
            alert(message)
            return
        }
        this.ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
        // 一列列画才有层次感
        for (var i = 0; i < 16; i++) {
            this.drawLine(i)
        }
        this.goAhead()
        requestAnimationFrame = raf(this.draw.bind(this))
    }
    drawLine(i) {
        // 先画墙和宝藏点，因为这两者是不动的
        this.walls.draw(i, this.ctx2)
        this.treasures.draw(i, this.ctx2)
        // 角色与箱子后面画，否则会出现被箱子“挡脸”的情况
        this.boxs.draw(i, this.ctx2)
        this.role.draw(i, this.ctx2)
    }
    // 检查是否成功过关
    checkWin() {
        let boxs = this.boxs.array,
            treasures = this.treasures.array,
            complete = 0
        for (var i = 0; i < treasures.length; i++) {
            for (var j = 0; j < boxs.length; j++) {
                if (
                    treasures[i].x == boxs[j].realX * 35 &&
                    treasures[i].y == boxs[j].realY * 35
                ) {
                    complete++
                }
            }
        }
        if (complete == treasures.length) {
            return true
        }
        return false
    }
}

// 元素类
class Element {
    constructor() {
        this.array = []
    }
    add(block) {
        this.array.push(block)
    }
    draw(index, ctx) {
        ctx.beginPath()
        this.array.forEach(block => {
            if (this.ifInline(index, block)) {
                ctx.drawImage(block.pic, block.x, block.y, 35, 35)
            }
        })
    }
    // 是否属于当前行
    ifInline(index, block) {
        return block.realX === index
    }
}
// 角色类
class Role {
    constructor(options) {
        this.x = options.x // x坐标
        this.y = options.y // y坐标
        this.role = options.role
        this.walkX = options.walkX
        this.walkY = options.walkY
        this.realX = options.realX // x坐标index
        this.realY = options.realY // y坐标index
    }
    draw(index, ctx) {
        if (this.realX === index) {
            ctx.beginPath()
            ctx.drawImage(
                this.role,
                this.walkX,
                this.walkY,
                100,
                100,
                this.x - 18,
                this.y - 65,
                70,
                90
            )
        }
    }
}
