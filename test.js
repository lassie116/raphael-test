function make_cross(obj) {
    var bb1 = obj.getBBox();
    return [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
            {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
            {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
            {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2}];
}

function calc_dir(obj1,obj2) {
    var cross1 = make_cross(obj1);
    var cross2 = make_cross(obj2);
    var min_v = null;
    var dir1 = 0;
    var dir2 = 0;
    for (var i = 0; i < 4; i++) {
        var p1 = cross1[i];
        for (var j = 0; j < 4; j++) {
            var p2 = cross2[j];
            var dx = Math.abs(p1.x - p2.x);
            var dy = Math.abs(p2.y - p2.y);

            if ((i == j ) || 
                (((i != 3 && j != 2) || p1.x < p2.x) && 
                 ((i != 2 && j != 3) || p1.x > p2.x) && 
                 ((i != 0 && j != 1) || p1.y > p2.y) && 
                 ((i != 1 && j != 0) || p1.y < p2.y))) {

                if (min_v === null || min_v > dx + dy) {
                    min_v = dx + dy;
                    dir1 = i;
                    dir2 = j;
                }
            }
        }
    }
    return [dir1,dir2];
}

function make_dirp(p,dir,dx,dy) {
    return {x:[p.x, p.x, p.x - dx, p.x + dx][dir],
            y:[p.y - dy, p.y + dy, p.y, p.y][dir]};
}

Raphael.fn.connect = function(obj1,dir1,obj2,dir2,color,width) {
    var p1 = (make_cross(obj1))[dir1];
    var p2 = (make_cross(obj2))[dir2];

    var dx = Math.max(Math.abs(p1.x - p2.x) / 2, 10);
    var dy = Math.max(Math.abs(p1.y - p2.y) / 2, 10);

    var d2 = make_dirp(p1,dir1,dx,dy);
    var d3 = make_dirp(p2,dir2,dx,dy);
    var path_str = ["M", 
                    p1.x.toFixed(3), p1.y.toFixed(3), 
                    "C", 
                    d2.x.toFixed(3), d2.y.toFixed(3), 
                    d3.x.toFixed(3), d3.y.toFixed(3), 
                    p2.x.toFixed(3), p2.y.toFixed(3)].join(",");
    
    this.path(path_str).attr({stroke: color, 
                              fill: "none",
                              "stroke-width":width});
    return;
}


Raphael.fn.connection = function (obj1, obj2, color, width) {
    var dir = calc_dir(obj1,obj2);
    this.connect(obj1,dir[0],obj2,dir[1],color,width);
};


(function(){
     var div = document.getElementById("base");
     var paper = Raphael(div, 300, 400);

     wire(100,100,200,200);
     wire(100,100,150,200);
     wire(100,100,120,200);
     wire(100,100,250,300);

     function wire(x,y,xx,yy){
         var r = 8;
         var color = "#9F9";
         var c1 = paper.circle(x,y,r);
         c1.attr({fill:color,stroke:color});
         var c2 = paper.circle(xx,yy,r);
         c2.attr({fill:color,stroke:color});

         paper.connect(c1,1,c2,0,"#000",2);
     }
})();