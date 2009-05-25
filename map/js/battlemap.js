
var elements = {
	bal : { pos:"i3", name : "Baal", icon: "monster1_6x2",  info : "Baal. Tiefling Wizard lvl1", priv_info : "Farlig sjarmerende"},
	tha : { pos:"i4", name : "Tharsul",   icon: "classm10x5", info : "Tharsul. Sjeledød Shaman", priv_info : "Vil at ting skal dø" },
	bro : { pos:"e6", name : "Tharsul - Bror",  icon:"undead2x7", info : "Bror. Tharsul sin spirit" },
	nok : { pos:"f4", name : "Nokar", icon: "classm2x8",   info : "Nokar. Deva Avenger. Bloddied. Prone.", priv_info : "Liker å gutse" },
	nik : { pos:"h4", name : "Nikodamus",   icon: "classm2x4", info : "Nikodamus. Human spydkriger.", priv_info : "Glory of battle" },
	pre : { pos:"d8", icon : "humans2x1", name : "Prest",   info : "Prest", priv_info : "Muahaha" },
	fa1 : { pos:"g4", icon : "humans2x5", text : "1",  name : "Fanatiker 1",  info : "Fanatiker. Bloodied", priv_info : "asdads"},
	fa2 : { pos:"g5", icon : "humans2x5", text : "2", name : "Fanatiker 2",  info : "Fanatiker. Bloodied", priv_info : "asdads"},
	ku1 : { pos:"g3", icon : "humans2x4", text : "1", name : "Kultist 1" },
	ku2 : { show: false, pos : " g3", name : "Kultist 2",  info : "Fanatiker. Bloodied", priv_info : "asdads"},
	ku5 : { pos:"e5", icon : "humans2x4", text : "5", name: "Kultist 5",   info : "Fanatiker. Bloodied", priv_info : "asdads"},

}


grid = {
a1 : {}, 
 b1 : {},
 c1 : {}, 
 d1 : {desc : "DT. Stone floor, Wooden table", note : "B"}, 
 e1 : {}, 
 f1 : {}, 
 g1 : {}, 
 h1 : { tile: false}, 
 i1 : { tile: false}, 
 j1 : { tile: false}, 

 a2 : {}, 
 b2 : {}, 
 c2 : {note: "S", desc : "Stone floor, wooden chair" }, 
 d2 : {desc : "DT. Stone floor, Wooden table", note : "B"}, 
 e2 : {note: "S", desc : "Stone floor, wooden chair" }, 
 f2 : {}, 
 g2 : {note: "S", desc : "Stone floor, wooden chair" }, 
 h2 : { tile: false}, 
 i2 : { tile: false}, 
 j2 : { tile: false}, 

 a3 : {}, 
 b3 : {}, 
 c3 : {note: "S", desc : "Stone floor, wooden chair" }, 
 d3 : {"desc" : "DT. Stone floor, Wooden table", note : "B"}, 
 e3 : {}, 
 f3 : {}, 
 g3 : {}, 
 h3 : { tile: false}, 
 i3 : {},
 j3 : { tile: false}, 

 a4 : {}, 
 b4 : {}, 
 c4 : {}, 
 d4 : {}, 
 e4 : {}, 
 f4 : {}, 
 g4 : {}, 
 h4 : {}, 
 i4 : {}, 
 j4 : { tile: false}, 
 
 a5 : {}, 
 b5 : {}, 
 c5 : {}, 
 d5 : {},
 e5 : {}, 
 f5 : {}, 
 g5 : {}, 
 h5 : { tile: false}, 
 i5 : { tile: false}, 
 j5 : { tile: false}, 
 
 a6 : {}, 
 b6 : {}, 
 c6 : {}, 
 d6 : {},
 e6 : {}, 
 f6 : {"desc" : "DT. Stone floor, Wooden table", note : "B"}, 
 g6 : {"desc" : "DT. Stone floor, Wooden table", note : "B"}, 
 h6 : { tile: false}, 
 i6 : { tile: false}, 
 j6 : { tile: false}, 
 
 a7 : {}, 
 b7 : {}, 
 c7 : {}, 
 d7 : {},
 e7 : {}, 
 f7 : {note: "S", desc : "Stone floor, wooden chair" }, 
 g7 : {}, 
 h7 : { tile: false}, 
 i7 : { tile: false}, 
 j7 : { tile: false}, 
 
 a8 : { tile: false}, 
 b8 : { tile: false}, 
 c8 : { tile: false}, 
 d8 : {},
 e8 : { tile: false}, 
 f8 : { tile: false}, 
 g8 : { tile: false}, 
 h8 : { tile: false}, 
 i8 : { tile: false}, 
 j8 : { tile: false}, 
 
 a9 : {}, 
 b9 : {}, 
 c9 : {}, 
 d9 : {},
 e9 : {}, 
 f9 : {}, 
 g9 : {}, 
 h9 : { tile: false}, 
 i9 : { tile: false}, 
 j9 : { tile: false}, 
 
 a10 : {}, 
 b10 : {}, 
 c10 : {}, 
 d10 : {}, 
 e10 : {}, 
 f10 : {}, 
 g10 : {}, 
 h10 : { tile: false}, 
 i10 : { tile: false}, 
 j10 : { tile: false}, 
};

$(document).ready(function(){
    createRows(10);
    createCols(10);
    paintGrid(grid);
    paintElements(elements);

    $("#element").sortable();

    $("#map .element").draggable({ 
        containment: ".themap",
        revert: true,
        cursor: 'crosshair',
        cursorAt: { left: 0 },
        revertDuration: 0
    });

	$("div.drop").droppable({
		hoverClass: "hover",
		drop: function(event, ui) { 
			var cell = $("#" + event.target.id);
			var element = ui.draggable;
		 	var parent_element = element.parent();
		 	parent_element.droppable("enable");
			cell.droppable("disable");

	 	    cell.append(element);
 	 	    element.css( {
			    left: "0", 
			    top: "0" 
            });
		},
		activeClass: 'accept'
    });

	$(".drop :has(div)").droppable("disable");

	$(".tile").click(function(i) {
		inspect_tile(i.currentTarget.id);
	});

    $("#element").find("li").click(function(i) {
		inspector(i.target.id.split("-")[0]);
    });

	$(".element").click(function(i) {
		inspector(i.target.id);
    });

});

