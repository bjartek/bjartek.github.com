
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


defaultCell.tile = "dungeon6x9";

grid = {
a1 : defaultCell, 
 b1 : defaultCell,
 c1 : defaultCell, 
 d1 : {desc : "DT. Stone floor, Wooden table", note : "B"}, 
 e1 : defaultCell, 
 f1 : defaultCell, 
 g1 : defaultCell, 
 h1 : { tile: false}, 
 i1 : { tile: false}, 
 j1 : { tile: false}, 

 a2 : defaultCell, 
 b2 : defaultCell, 
 c2 : {note: "S", desc : "Stone floor, wooden chair" }, 
 d2 : {desc : "DT. Stone floor, Wooden table", note : "B"}, 
 e2 : {note: "S", desc : "Stone floor, wooden chair" }, 
 f2 : defaultCell, 
 g2 : {note: "S", desc : "Stone floor, wooden chair" }, 
 h2 : { tile: false}, 
 i2 : { tile: false}, 
 j2 : { tile: false}, 

 a3 : defaultCell, 
 b3 : defaultCell, 
 c3 : {note: "S", desc : "Stone floor, wooden chair" }, 
 d3 : {"desc" : "DT. Stone floor, Wooden table", note : "B"}, 
 e3 : defaultCell, 
 f3 : defaultCell, 
 g3 : defaultCell, 
 h3 : { tile: false}, 
 i3 : defaultCell,
 j3 : { tile: false}, 

 a4 : defaultCell, 
 b4 : defaultCell, 
 c4 : defaultCell, 
 d4 : defaultCell, 
 e4 : defaultCell, 
 f4 : defaultCell, 
 g4 : defaultCell, 
 h4 : defaultCell, 
 i4 : defaultCell, 
 j4 : { tile: false}, 
 
 a5 : defaultCell, 
 b5 : defaultCell, 
 c5 : defaultCell, 
 d5 : defaultCell,
 e5 : defaultCell, 
 f5 : defaultCell, 
 g5 : defaultCell, 
 h5 : { tile: false}, 
 i5 : { tile: false}, 
 j5 : { tile: false}, 
 
 a6 : defaultCell, 
 b6 : defaultCell, 
 c6 : defaultCell, 
 d6 : defaultCell,
 e6 : defaultCell, 
 f6 : {"desc" : "DT. Stone floor, Wooden table", note : "B"}, 
 g6 : {"desc" : "DT. Stone floor, Wooden table", note : "B"}, 
 h6 : { tile: false}, 
 i6 : { tile: false}, 
 j6 : { tile: false}, 
 
 a7 : defaultCell, 
 b7 : defaultCell, 
 c7 : defaultCell, 
 d7 : defaultCell,
 e7 : defaultCell, 
 f7 : {note: "S", desc : "Stone floor, wooden chair" }, 
 g7 : defaultCell, 
 h7 : { tile: false}, 
 i7 : { tile: false}, 
 j7 : { tile: false}, 
 
 a8 : { tile: false}, 
 b8 : { tile: false}, 
 c8 : { tile: false}, 
 d8 : defaultCell,
 e8 : { tile: false}, 
 f8 : { tile: false}, 
 g8 : { tile: false}, 
 h8 : { tile: false}, 
 i8 : { tile: false}, 
 j8 : { tile: false}, 
 
 a9 : defaultCell, 
 b9 : defaultCell, 
 c9 : defaultCell, 
 d9 : defaultCell,
 e9 : defaultCell, 
 f9 : defaultCell, 
 g9 : defaultCell, 
 h9 : { tile: false}, 
 i9 : { tile: false}, 
 j9 : { tile: false}, 
 
 a10 : defaultCell, 
 b10 : defaultCell, 
 c10 : defaultCell, 
 d10 : defaultCell, 
 e10 : defaultCell, 
 f10 : defaultCell, 
 g10 : defaultCell, 
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

