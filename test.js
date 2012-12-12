(function(){
     var div = document.getElementById("base");
     // var paper = Raphael(50, 35, 200, 200);
     var paper = Raphael(div, 200, 200);
     var r = paper.rect(0,0,200,200);
     r.attr({fill:"#99F",stroke:"#F00",opacity:0.25});
     var c1 = paper.circle(50,50,100);
     c1.attr({fill:"#F99",stroke:"#F99",opacity:0.5});
     var c2 = paper.circle(125,125,50);
     c2.attr({fill:"#9F9",stroke:"#F9F","stroke-width":10,opacity:0.5});
})()