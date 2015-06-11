$(document).ready(function () {


    var url = "https://www.googleapis.com/fusiontables/v1/query";


    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        cache: false,
        contentType: "application/json",
        data: {
            key: 'AIzaSyDT7wmEx97gAG5OnPwKyz2PnCx3yT4j7C0',
            sql: 'select col0, col1 from 1xLMF1355zT4uq8t8TeMUC8PkCVdAzHskdrfaPng order by col0'
        },
        success: function (msg) {

 		var dt = $('<dt>');

            $.each(msg.rows, function () {

                var row = this;
                var	ids = row[0], 
					titles = row[1];					

				
				if (ids) {
				    dt.append('<a href="http://web-storymaps.bgdi.admin.ch/help/menu.html?id='+ ids + '&lang=de" target="_self">'+titles+'</a><br>');
			    } else {
				    dt.append();
				}
            });

			
            $('#menuHelp').append(dt);						

        }
				
    });

});



