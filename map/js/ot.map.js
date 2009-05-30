/* 
 * File        : ot.map.js
 * Author      : Bjarte Stien Karlsen
 * Copyright   : (c) 2009
 *               Do not use (or abuse) without permission
 */
window.status = 'Loading [ot.map.js]';

window.ot = window.ot || { VERSION: '1.0' };

ot.Map = function( args ) {
	me = this;
  this.options = {
		rows: 10,
		cols: 10,
		div: "#map",
		inspector: {
			previewTile: false, 
			previewText: false, 
			onInspect: false, 
			enable : true
		},
		defaultCell : {
			tile: "forrest1x1", 
			desc: "",
			note: "",
			enabled: true,
		}, 
	grid: {},
	};
  jQuery.extend(true, this.options, args);

	this.grid = this.options.grid;
	this.paint();

	if(this.options.inspector.enable != false) {
		$(".tile").click(function(i) {
			me.inspect_tile(i.currentTarget.id);
		});
	}


	return this;
}

ot.Map.prototype = {

	empty : {},
	alpha : new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'),

	paint: function() {

			$("#map").html("<div id=\"ot_map_rows\">\n <div class=\"ot_map_firstrow\"></div>\n </div>\n <div id=\"ot_map_box\">\n <div id=\"ot_map_cols\"></div>\n <div id=\"ot_map\"> </div>\n </div>");

		this.createGrid();
		this.createRows();
		this.createCols();
		this.paintGrid();

		var newWidth =(this.options.cols * 34) + 40;
		$("#ot_map_box").css("width", newWidth + "px");
	},

	createGrid: function() {
		var g = {};

		for (j=1;j <= this.options.rows;j++) {
			for (i=0;i < this.options.cols;i++) {
				var col = this.alpha[i].toLowerCase();
				var element = [col + j];
				if(this.grid[element]){
					g[element] = this.grid[element];
				} else {
					g[element] = {};
				}
			}

		}
		this.grid = g;
	},

	createRows: function() {
		var i=0;
		var container = $("#ot_map_rows");
		for (i=1;i <= this.options.rows;i++) {
			container.append("<div>" + i + "</div>");
		}
	},


	createCols:function() {
		var i=0;
		var container = $("#ot_map_cols");
		for (i=0;i < this.options.cols;i++) {
			container.append("<div>" + this.alpha[i] + "</div>");
		}
	},

	paintGrid: function() {
		for(var element in this.grid) {
			this.paintGridCell(element, this.getGridElement(element))
		}
	},
	
	paintGridCell: function(id, content) {
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
		$("#ot_map").append(element);
	},

	getGridElement: function(element) {
		return $.extend(this.empty, this.options.defaultCell, this.grid[element]);
	},
	addColumn: function() {
		this.options.cols++;
		this.paint();
	},
	removeColumn: function() {
		this.options.cols--;
		this.paint();
	},
	addRow: function() {
		this.options.rows++;
		this.paint();
	},
	removeColumn: function() {
		this.options.rows--;
		this.paint();
	},

	setTile: function(id, tile) {
		this.grid[id] = tile;
		return this;
	},

 activeTile : false,

	findTile: function(node) {
		var classes = node.attr("class").split(" ");
		for(var i in classes) {
			var claz = classes[i];
			if(claz != "tile" && claz != "drop" && claz != "cell" && claz != "first" && claz != "ui-droppable" && claz != "highlight" && claz != "ui-selectee" && claz != "ui-selected"){
				return claz;
			}
		}
	},

	inspect_tile: function(id) {

		var tile = this.findTile($("#" + id));
		var obj = this.getGridElement(id);

		if(this.options.inspector.previewTile != false) {
			if(this.activeTile) {
				$(this.options.inspector.previewTile).removeClass(this.activeTile);
			}
			$(this.options.inspector.previewTile).addClass(tile);
		}

		if(this.options.inspector.previewText != false) {
			$(this.options.inspector.previewText).html(id + " " + obj.desc);
		}

		if(this.options.inspector.onInspect != false) {
			this.options.inspector.onInspect(obj);
		}

		this.activeTile = tile;
	},
}

window.status = '';
