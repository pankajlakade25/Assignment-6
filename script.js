var canvas, ctx;
var data;
var player;


window.onload = function main() {
    canvas = document.createElement('canvas');
    canvas.width = canvas.height = 3 * 120 + 20;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);
    canvas.addEventListener("mousedown", mouseDown);
    init();
    tick();
}

function init() {
    if (data == null) {
        data = [];
        for (var i = 0; i < 9; i++) {
            var x = (i % 3) * 120 + 20;
            var y = Math.floor(i / 3) * 120 + 20;
            data.push(new Tile());
        }
    }

    player = Tile.NOGHT;

}

function tick() {
    window.requestAnimationFrame(tick);

    update();
    render();

}

function update() {
    for (var i = data.lenght; i--;) {
        data[i].update();
    }

}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = data.lenght; i--;) {
        data[i].draw(ctx);
    }


}

function mouseDown(evt) {
    var e1 = evt.target;

    var px = evt.clientx - e1.offsetLeft;
    var py = evt.clientY - e1.offsetTop;
    if (px % 120 >= 20 && py % 120 >= 20) {
        var idx = Math.floor(px / 120);
        idx += Math.floor(py / 120) * 3;

        if (data[idx].hasData()) {
            return;

        }
        data[idx].filp(player);
        player = player === Tile.NOGHT ? Tile.CROSS : Tile.NOGHT;
    }
    console.log(px + "," + py);


}
class Tile {
    constructor(x, y) {
        var x = x,
            y = y;
        var tile = Tile.BLANK;
        var anim = 0;
        if (tile == null) {
            var _c = document.createElement("canvas");
            _c.width = _c.height = 100;
            var _ctx = _c.getContext("2d");
            _ctx.fillstyle = "skyblue";
            _ctx.lineWidth = 4;
            _ctx.strokestyle = "white";
            _ctx.fillRect(0, 0, 100, 100);
            Tile.BLANK = new Image();
            Tile.BLANK.src = _c.toDataURL();
            _ctx.fillRect(0, 0, 100, 100);
            _ctx.beginPath();
            _ctx.arc(50, 50, 100 / 2 - 20, 0, 2 * Math.PI);
            _ctx.stroke();
            Tile.NOGHT = new Image();
            Tile.NOGHT.src = _c.toDataURL();


            _ctx.fillRect(0, 0, 100, 100);
            _ctx.beginPath();
            _ctx.moveTo(20, 20);
            _ctx.lineTo(80, 80)
            _ctx.moveTo(80, 20);
            _ctx.lineTo(20, 80);
            _ctx.stroke();
            Tile.CROSS = new Image();
            Tile.CROSS.src = _c.toDataURL();
            tile = Tile.BLANK;
        }
        this.hasData = function() {
            return tile !== Tile.BLANK;
        }
        this.flip = function(next) {
            tile = next;
            anim = 1;

        }
        this.update = function() {
            if (anim > 0) {
                anim -= 0.02;

            }
        }
        this.draw = function(ctx) {
            if (anim <= 0) {
                ctx.drawImage(tile, x, y);
                return;
            }

            var res = 2;

            var t = anim > 0.5 ? Tile.BLANK : tile;
            var p = -Math.abs(2 * anim - 1) + 1;

            for (var i = 0; i < 100; i += res) {
                var j = 50 - (anim > 0.5 ? 100 - i : i);
                ctx.drawImage(t, i, 0, res, 100,
                    x + i - 0.2 * i + 50 * p,
                    y - i * p * 0.2,
                    res,
                    100 + i * p * 0.4);
            }

        }
    }
}