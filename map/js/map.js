var grid = {};
var defaultElement = {
	icon: false,
	text: false,
 	show : true,
	info : "", 
	priv_info : "",
}

function paintElements(e) {
	for(var element in e) {
		var obj = $.extend(empty, defaultElement, e[element]);
		paintElement(element, obj)
	}
}

function paintElement(id, obj) {
	if(!obj.show) {
		return;
	}
	var cell = $("#" + obj.pos);

	var claz = "element ";

	var body = ""
	if(obj.icon) {
		claz += obj.icon
			if(obj.text) {
				body = obj.text;
			}
	} else {
		body = id;
	}

	var content = "<div id=\"" + id + "\" class=\"" + claz +"\">" + body + "</div>"; 
	cell.append(content);

	var listContent = "<li id=\"" + id + "-i\">" + obj.name + "</li>";
	$("#element").append(listContent);
	
}

var empty = {}
var defaultCell = {
	tile: "forrest1x1", 
	desc: "",
	note: "",
	enabled: true,
}


function repaint(rows, cols, newgrid) {

        $("#map").html("");
        $("#rows").html("<div class=\"firstrow\"></div>");
        $("#cols").html("");

        var combinedGrid = createGrid(rows, cols, newgrid);
        createRows(rows);
        createCols(cols);
        paintGrid(combinedGrid);

        var newWidth =(cols * 34);
        $(".map").css("width", newWidth + "px");
        return combinedGrid;
}

function getGridElement(element) {

	return $.extend(empty, defaultCell, grid[element]);
}

function paintGrid(grid) {
	for(var element in grid) {
		paintGridCell(element, getGridElement(element))
	}
}


function paintGridCell(id, content) {
	var claz = "cell ";

	if(content.tile) {
		claz += "drop " + content.tile
	}

	if(content.enabled && content.tile) {
		claz += " tile";
	}

	if(id.indexOf("a") != -1) {
        claz += " first";
	}

	var body = "";
	if(content.note) {
		body += "<span class=\"desc\">" + content.note + "</span>";
	}

	var element = "<div id=\"" + id  + "\" class=\"" + claz +"\">" + body + "</div>"
	$("#map").append(element);
}


function createRows(rows) {
	var i=0;
	var container = $("#rows");
	for (i=1;i <= rows;i++) {
		container.append("<div>" + i + "</div>");
	}
}

var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');

function createCols(cols) {
	var i=0;
	var container = $("#cols");
	for (i=0;i < cols;i++) {
		container.append("<div>" + alpha[i] + "</div>");
	}
}

var char = false
function inspector(id) {
    if(char) {
       $("#" + char).parent().removeClass("highlight");
       $("#" + char + "-i").removeClass("highlight");
    }
   char = id;
    $("#" + id).parent().addClass("highlight");
    $("#" + id + "-i").addClass("highlight");

	$("#inspector").text(elements[id].info);

	$('#inspector').editable(function(value, settings) { 
		 elements[char].info = value;
		 return(value);
	}, { 
		 tooltip   : 'Click to edit...',
	});
}

var activeTile = false;
function inspect_tile(id) {
    if(activeTile) {
        $("#tile").removeClass(activeTile);
    }
    var obj = getGridElement(id);
    var classes = $("#" + id).attr("class").split(" ");
    for(var i in classes) {
        var claz = classes[i];
      if(claz != "tile" && claz != "drop" && claz != "cell" && claz != "first" && claz != "ui-droppable" && claz != "highlight"){
         activeTile = claz;
         $("#tile").addClass(claz);
      }
    }

	$("#tile_inspector").html(id + " " + obj.desc);
}

function findTile(node) {
    var classes = node.attr("class").split(" ");
    for(var i in classes) {
        var claz = classes[i];
          if(claz != "tile" && claz != "drop" && claz != "cell" && claz != "first" && claz != "ui-droppable" && claz != "highlight" && claz != "ui-selectee" && claz != "ui-selected"){
              return claz;
         }
    }
}

function createGrid(rows, cols, oldgrid) {
    var g = {};
    var row;

        for (j=1;j <= rows;j++) {
            for (i=0;i < cols;i++) {
                var col = alpha[i].toLowerCase();
                var element = [col + j];
                if(oldgrid[element]){
                    g[element] = oldgrid[element];
                } else {
                    g[element] = {};
                }
        }
        
	}
    return g
}
