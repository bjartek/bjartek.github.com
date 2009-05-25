$(document).ready(function(){

    var numCols = 10;
    var numRows = 10;
    grid = repaint(numRows, numCols, {});

    $("#tabs").tabs();

    $(".tiles").click(function(e) {
        $(".tiles").unbind("mousemove");
    });

    $("#clear").click(function(e) {
        $(".cell").removeClass("ui-selected");
        $("#selection").hide();
    });

		$("#reset").click(function(e) {
		   $(".ui-selected").each(function() {
            if(this.nodeName == "DIV") {
                var id = $(this).attr("id");
                grid[id] = defaultCell;
            }
			});
       grid = repaint(numRows, numCols, grid, true);
			 $("#selection").hide();

		});

    $("#tile_activate").click(function() {
        var mode;
         if($("#tile_activate").attr("value") == "Enable") {
            mode = true;
            $("#tile_activate").attr("value", "Disable").switchClass("ui-icon-locked", "ui-icon-unlocked");
          } else {
            mode = false;
            $("#tile_activate").attr("value", "Enable").switchClass("ui-icon-unlocked", "ui-icon-locked");
          }


        $(".ui-selected").each(function() {
            if(this.nodeName == "DIV") {
                var id = $(this).attr("id");
                grid[id].enabled = mode;
            }
         });

      });

    $("#map").selectable({
        selected: function(event, ui) {
            
            $("#selection").show();
            var id = $(ui.selected).attr("id");
            var cell = grid[id];

            $("#tile_desc").text(cell.desc);
            $("#tile_note").text(cell.note);

      $('#tile_desc').editable(function(value, settings) { 
         $(".ui-selected").each(function() {
            if(this.nodeName == "DIV") {
                var id = $(this).attr("id");
                grid[id].desc = value;
            }
         });

        return(value);
    }, { 
        tooltip   : 'Click to add description...',
        height    : "22px",
    });

    $('#tile_note').editable(function(value, settings) { 
        $(".ui-selected").each(function() {
            if(this.nodeName == "DIV") {
                var id = $(this).attr("id");
                grid[id].note = value;
                $("#" + id).html("<span class=\"desc\">" + value + "</span>");
            }
         });

        return(value);
    }, { 
        tooltip   : 'Click to add note...',
        height    : "22px",
    });



            if(cell.enabled == false) {
             	$("#tile_activate").attr("value", "Enable").switchClass("ui-icon-unlocked", "ui-icon-locked");
             } else {
            	$("#tile_activate").attr("value", "Disable").switchClass("ui-icon-locked", "ui-icon-unlocked");
             }
            
           $(".tiles").mousemove(function(e) {
                var offset = $(this).offset();
                var actualY = e.pageY - offset.top;
                var actualX = e.pageX - offset.left;;
                var x = 1 + Math.floor(actualX / 32.0);
                var y = 1 + Math.floor(actualY / 32.0);
                var cssClass = this.id + y + "x" + x;

                $(".ui-selected").each(function() {
                  var element = $(this);
                  var id = element.attr("id");

                  var oldTile = findTile(element);
                    if(oldTile == cssClass){
                        return this;
                    }
                    grid[id].tile = cssClass;

                    element.removeClass(oldTile);
                    element.addClass(cssClass);
                });
            });
        }
    });


    $("#addcol").click(function(){

        numCols++;
        grid = repaint(numRows, numCols, grid, true);
        if(numCols == 26) {
            $("#addcol").attr("disabled", "true");
        }

        if(numCols == 2){
            $("#rmcol").removeAttr("disabled");
         }


     });


    $("#addrow").click(function(){
        numRows++;
        grid = repaint(numRows, numCols, grid, true);
        if(numRows == 2){
            $("#rmrow").removeAttr("disabled");
         }

     });

    $("#rmrow").click(function() {

        numRows--;
        grid = repaint(numRows, numCols, grid, true);
        if(numRows == 1){
            $("#rmrow").attr("disabled", "true");
         }
     });

    $("#rmcol").click(function() {

        numCols--;
        grid = repaint(numRows, numCols, grid, true);
        if(numCols == 25) {
            $("#addcol").removeAttr("disabled");
        }
        if(numCols == 1){
            $("#rmcol").attr("disabled", "true");
         }
     });


 });


