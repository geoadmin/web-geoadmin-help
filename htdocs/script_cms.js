function GetUrlValue(VarSearch) {
    var SearchString = window.location.search.substring(1);
    var VariableArray = SearchString.split('&');
    for (var i = 0; i < VariableArray.length; i++) {
        var KeyValuePair = VariableArray[i].split('=');
        if (KeyValuePair[0] == VarSearch) {
            return KeyValuePair[1];
        }
    }
}


$(document).ready(function () {

    var url = "https://www.googleapis.com/fusiontables/v1/query";
	var id = parseInt(GetUrlValue('id')) || 1;
    var lang = GetUrlValue('lang') || 'de';


	if (id && lang) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        cache: false,
        contentType: "application/json",
        data: {
            key: 'AIzaSyDT7wmEx97gAG5OnPwKyz2PnCx3yT4j7C0',
            sql: "select * from 1xLMF1355zT4uq8t8TeMUC8PkCVdAzHskdrfaPng where col0=" + id + " and col5='" + lang + "'"
        },
        success: function (msg) {

			var selectLang = $('<div id="selectLang">');
            var dl = $('<dl>');

            var row = msg.rows[0];

            var title = row[1];
            var content = row[2].replace(/[\n\r]/g, '<br>').replace(/\[/g,'<a href="').replace(/\]/g,'" target="_blank"><b><span style="padding-right:20px; background: url(ico_extern.gif) no-repeat 26px 1px;"> Link </span></b></a>').replace(/<b1>/g,'<b>').replace(/<b2>/g,'</b>');
            var legend = row[3].replace(/[\n\r]/g, '<br>');
            var image = row[4];
			
			if (id == 1){
			dl.append('<p>' + content + '</p>' + '<br>' + '<img src="' + image + '">' + '<br><br>' + '<legend>' + legend + '</legend></dl>');
			selectLang.append('<a href="http://www.geo.admin.ch/internet/geoportal/de/commons/mapviewer_help.html?id=01&lang=de" target="_self">DE</a> | <a href="http://www.geo.admin.ch/internet/geoportal/de/commons/mapviewer_help.html?id=01&lang=fr" target="_self">FR</a> | <a href="http://www.geo.admin.ch/internet/geoportal/de/commons/mapviewer_help.html?id=01&lang=it" target="_self">IT</a> | <a href="http://www.geo.admin.ch/internet/geoportal/de/commons/mapviewer_help.html?id=01&lang=en" target="_self">EN</a>');

			$('#helpSection').append(dl);
			$('#headingSection').append(selectLang);
			}
			else{  

			dl.append('<h2>' + title + '</h2><p>' + content + '</p>' + '<br>' + '<img src="' + image + '">' + '<br><br>' + '<legend>' + legend + '</legend></dl>');
			selectLang.append('<a href="http://www.geo.admin.ch/internet/geoportal/de/commons/mapviewer_help.html?id='+ id + '&lang=de" target="_self">DE</a> | <a href="http://www.geo.admin.ch/internet/geoportal/de/commons/mapviewer_help.html?id='+ id + '&lang=fr" target="_self">FR</a> | <a href="http://www.geo.admin.ch/internet/geoportal/de/commons/mapviewer_help.html?id='+ id + '&lang=it" target="_self">IT</a> | <a href="http://www.geo.admin.ch/internet/geoportal/de/commons/mapviewer_help.html?id='+ id + '&lang=en" target="_self">EN</a>');

			$('#helpSection').append(dl);
			$('#headingSection').append(selectLang);
			}
        }
				
    });
	} 
	
	if ((id || 1) && (lang || de)) {
	    $.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        cache: false,
        contentType: "application/json",
        data: {
            key: 'AIzaSyDT7wmEx97gAG5OnPwKyz2PnCx3yT4j7C0',
            sql: 'select * from 1xLMF1355zT4uq8t8TeMUC8PkCVdAzHskdrfaPng order by col0'
        },
        success: function (msg) {

 		var dt = $('<dt>');

            $.each(msg.rows, function () {

                var row = this;
                var	ids = row[0], 
					titles = row[1].replace(/[\n\r]/g, '<br>'),
					contents = row[2],
					languages = row[5];

				if (lang == languages && contents !== '#' && ids == id) {
				    dt.append('<span style="color:#ff0000; font-size:0.9em; padding-left:10px; font-weight:bold; background: url(arrow.png) no-repeat 0px 2px;">'+titles+'</span></a><br>');
			    }	else if (lang == languages && contents !== '#') {
				    dt.append('<a href="http://www.geo.admin.ch/internet/geoportal/de/commons/mapviewer_help.html?id='+ ids + '&lang='+ languages +'" target="_self">'+titles+'</a><br>');
			    } 	else if (lang == languages && contents == '#'){
				    dt.append('<h3>' + titles + '</h3>');
				}
            });

			
            $('#menuHelp').append(dt);						

        }
				
    });
	}
	
	else{
		$.ajax({
        type: "GET",
        url: url,
        dataType: "jsonp",
        cache: false,
        contentType: "application/json",
        data: {
            key: 'AIzaSyDT7wmEx97gAG5OnPwKyz2PnCx3yT4j7C0',
            sql: 'select * from 1xLMF1355zT4uq8t8TeMUC8PkCVdAzHskdrfaPng order by col0'
        },
        success: function (msg) {

 		var dt = $('<dt>');

            $.each(msg.rows, function () {

                var row = this;
                var	ids = row[0], 
					titles = row[1].replace(/[\n\r]/g, '<br>'),
					contents = row[2],
					languages = row[5];

				
				if ('de' == languages && contents !== '#' && ids == id) {
				    dt.append('<a href="http://www.geo.admin.ch/internet/geoportal/de/commons/mapviewer_help.html?id='+ ids + '&lang='+ languages +'" target="_self"><span style="color:red">'+titles+'</span></a><br>');
			    } 
				else if ('de' == languages && contents !== '#') {
				    dt.append('<a href="http://www.geo.admin.ch/internet/geoportal/de/commons/mapviewer_help.html?id='+ ids + '&lang='+ languages +'" target="_self">'+titles+'</a><br>');
			    }
				else if ('de' == languages && contents == '#'){
				    dt.append('<h3>' + titles + '</h3>');
				}
            });

			
            $('#menuHelp').append(dt);						

        }
				
    });
	}

});



