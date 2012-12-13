Raphael.fn.connection = function (obj1, obj2, color, width) {
    var bb1 = obj1.getBBox();
    var bb2 = obj2.getBBox();
    var p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
             {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
             {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
             {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
             {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
             {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
             {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
             {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}];
    var d = {};
    var dis = [];
    var min_v = null;
    var res = [0,4];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x);
            var dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || 
                (((i != 3 && j != 6) || p[i].x < p[j].x) && 
                 ((i != 2 && j != 7) || p[i].x > p[j].x) && 
                 ((i != 0 && j != 5) || p[i].y > p[j].y) && 
                 ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                var current = dx + dy;
                if (min_v === null || min_v > current) {
                    min_v = current;
                    res = [i,j];
                }
            }
        }
    }

    var x1 = p[res[0]].x;
    var y1 = p[res[0]].y;
    var x4 = p[res[1]].x;
    var y4 = p[res[1]].y;

    var dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    var dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]];
    var y2 = [y1 - dy, y1 + dy, y1, y1][res[0]];
    var x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]];
    var y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]];
    var path_str = ["M", x1.toFixed(3), y1.toFixed(3), 
                    "C", 
                    x2.toFixed(3), y2.toFixed(3), 
                    x3.toFixed(3), y3.toFixed(3), 
                    x4.toFixed(3), y4.toFixed(3)].join(",");
    
    this.path(path_str).attr({stroke: color, 
                              fill: "none",
                              "stroke-width":width});
    return;
};


(function(){
     var div = document.getElementById("base");
     var paper = Raphael(div, 300, 300);

     wire(100,100,200,200);
     function wire(x,y,xx,yy){
         var r = 8;
         var color = "#9F9";
         var c1 = paper.circle(x,y,r);
         c1.attr({fill:color,stroke:color});
         var c2 = paper.circle(xx,yy,r);
         c2.attr({fill:color,stroke:color});

         paper.connection(c1,c2,"#000",2);
     }
})()