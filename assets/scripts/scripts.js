$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
    var actions = `<a class="add" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>
    <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>
    <a class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>`;//$("table td:last-child").html();
    
    $('#grDate').datepicker(); 
    $('#invoiceDate').datepicker();

    // Append table with add row form on add new button click
    var i=0;
    $(".add-new").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td>'+
                '<input autofocus id="fabricGrp_'+i+'" class="form-control awesomplete"/>'+
            '</td>' +
            '<td>'+
                '<input id="fabricName_'+i+'" class="form-control awesomplete"/>'+
            '</td>' +
            '<td><input type="text" class="form-control" id="styleNo_'+i+'"></td>' +
            '<td><input type="text" class="form-control" id="desc_'+i+'"></td>' +
            '<td><input type="text" class="form-control" id="qty_'+i+'"></td>' +
            '<td>'+
                '<input id="uom_'+i+'" class="form-control awesomplete"/>'+
            '</td>' +
            '<td><input type="text" class="form-control" id="rate_'+i+'"></td>' +
            '<td>'+
                '<a class="add" title="Save" data-toggle="tooltip" id="save_'+i+'"><i class="material-icons">&#xE03B;</i></a>'+
                '<a class="edit" title="Edit" data-toggle="tooltip" id="edit_'+i+'"><i class="material-icons">&#xE254;</i></a>'+
                '<a class="delete" title="Remove" data-toggle="tooltip" id="remove_'+i+'"><i class="material-icons">&#xE872;</i></a>'+
            '</td>' +
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
    //  $('[data-toggle="tooltip"]').tooltip();
        $("save_"+i).tooltip();
        $("edit_"+i).tooltip();
        $("remove_"+i).tooltip();

        new Awesomplete(document.getElementById("fabricGrp_"+i), {
            list: ["Knitted", "Wooven"]
        });
        new Awesomplete(document.getElementById("fabricName_"+i), {
            list: ["Printed", "Solid"]
        });
        new Awesomplete(document.getElementById("uom_"+i), {
            list: ["kg", "pcs"]
        });
        i++;
    });
	// Add row on add button click
	$(document).on("click", ".add", function(){
		var empty = false;
		var input = $(this).parents("tr").find('input');
        input.each(function(){
            console.log($(this).val())
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});
        $(this).parents("tr").find(".error").first().focus();
        if(!empty){
            input.each(function(){
                if(input.hasClass("awesomplete")) {
                    $(this).parents("td").html($(this).val());
                } else {
                    $(this).parent("td").html($(this).val());
                }
            });
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
        }	

       /* var select = $(this).parents("tr").find('select');
        select.each(function(){
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){
            input.each(function(){
				$(this).parent("td").html($(this).val());
            });
            
			select.each(function(){
				$(this).parent("td").html($(this).val());
			});			
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
        }	*/
        
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){		
        $(this).parents("tr").find("td:not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});		
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
    });
	// Delete row on delete button click
	$(document).on("click", ".delete", function(){
        $(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");
    });
});