export default class DomManager {
    constructor(game) {
        this.game = game
        this.setLevel(this.game.nowLevel)
        document
            .querySelector('#replay')
            .addEventListener('click', function () {
                game.init()
            })
        document.querySelector('#prev').addEventListener('click', function () {
            game.prev()
        })
        document.querySelector('#next').addEventListener('click', function () {
            game.next()
        })
        document
            .querySelector('#top-icon')
            .addEventListener('click', function () {
                game.move(0)
            })
        document
            .querySelector('#right-icon')
            .addEventListener('click', function () {
                game.move(1)
            })
        document
            .querySelector('#down-icon')
            .addEventListener('click', function () {
                game.move(2)
            })
        document
            .querySelector('#left-icon')
            .addEventListener('click', function () {
                game.move(3)
            })
    }
    setLevel(level) {
        // 修改页面关卡
        document.querySelector('h3 span').innerHTML = +level + 1
        // 储存数据
        localStorage.setItem('nowLevel', +level)
        // 修改 游戏关卡
        this.game.nowLevel = +level
        // 游戏初始化
        this.game.init()
    }
}
