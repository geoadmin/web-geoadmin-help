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

/**
 * Sample JavaScript code for sheets.spreadsheets.values.get
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */

// Make sure the client is loaded before calling this method.
function execute() {
  return gapi.client.sheets.spreadsheets.values.get({
    "spreadsheetId": "15JQBRjkLi7ZUvE8v76doc-Mq0eXVGihksylfGScAHNM",
    "range": "A1:J217",
    "majorDimension": "ROWS"
  })
  .then(function(response) {
    // Handle the results here (response.result has the parsed body).
    var result = response.result;
    var id = parseInt(GetUrlValue('id')) || 1;
    if (id == 63) {
      id = 62;
    }
    var langa = GetUrlValue('lang') || 'de';
    var lang = null;
    var idspreadsheet = result.values[id][0];
    var selectLang = $('<div id="selectLang">');
    if (langa == 'de') {
      lang = 'de';
    } else if (langa == 'fr') {
      lang = 'fr';
    } else if (langa == 'it') {
      lang = 'it';
    } else if (langa == 'en') {
      lang = 'en';
    } else if (langa == 'rm') {
      lang = 'de';
    }

    var i;
    for (i = 0; i < 216; i++) {
      if (id && lang && id == result.values[i][0] && lang == result.values[i][5]) {
        var dl = $('<dl>');
        var heading = $('<div id="heading">');
        var result = response.result;
        var title = result.values[i][1];
        var content = result.values[i][2].replace(/[\n\r]/g, '<br>').replace(/\[/g,'<a href="').replace(/\]/g,'" target="_blank"><b><span style="padding-right:20px; background: url(ico_extern.gif) no-repeat 26px 1px;"> Link </span></b></a>').replace(/<b1>/g,'<b>').replace(/<b2>/g,'</b>');
        var legend = result.values[i][3].replace(/[\n\r]/g, '<br>');
        var image = result.values[i][4];

        // Exception Homepage 
        if (id == 1) {
          dl.append('<p>' + content + '</p>' + '<br>' + '<img src="' + image + '">' + '<br><br>' + '<legend>' + legend + '</legend></dl>');
        }
        // Exception id 54 with iFrame
        else if (id == 54) {
          var urlSpecialParams = 'special/parameter_fr.html';
          if (lang === 'de') {
            urlSpecialParams = 'special/parameter.html'
          } else if (lang === 'en') {
            urlSpecialParams = 'special/parameter_en.html'
          }
          dl.append('<h2>' + title + '</h2><p>' + content + '</p>' + '<br>' + '<img src="' + image + '">' + '<br><br>' + '<legend>' + legend + '</legend>' + '<iframe class="param" src="' + urlSpecialParams + '" width="570" height="1200" frameborder="0" marginheight="0" marginwidth="0" scrolling="no"></iframe></dl>');
        }
        // Exception id 28 with table (3D)
        else if (id == 28) {
            dl.append('<h2>' + title + '</h2><p>' + content + '</p><table>' + legend + '</table></dl>');
        }
        // Content displayed in normal case
        else {
          dl.append('<h2>' + title + '</h2><p>' + content + '</p>' + '<br>' + '<img src="' + image + '">' + '<br><br>' + '<legend>' + legend + '</legend></dl>');
        }
        
        selectLang.append('<a href="?id=1&lang=' + lang + '"target="_self">Home</a>'
                         + '&nbsp;|&nbsp;'
                         + '<a href="?id='+ id + '&lang=de" target="_self">DE</a>'
                         + '&nbsp;|&nbsp;'
                         + '<a href="?id='+ id + '&lang=fr" target="_self">FR</a>'
                         + '&nbsp;|&nbsp;'
                         + '<a href="?id='+ id + '&lang=it" target="_self">IT</a>'
                         + '&nbsp;|&nbsp;'
                         + '<a href="?id='+ id + '&lang=en" target="_self">EN</a>');
        $('#helpSection').append(dl);
        $('#select').append(selectLang);

        var headingText;
        if (lang == 'de') {
          headingText = 'Hilfe Kartenviewer';
        } else if (lang == 'fr') {
          headingText = 'Aide visualiseur de cartes';
        } else if (lang == 'it') {
          headingText = 'Aiuto visualizzatore di carte';
        } else if (lang == 'en') {
          headingText = 'Mapviewer Help'
        }
        heading.append('<h2>' + headingText + '</h2><hr class="afx">');
        $('#headingSection').append(heading);
      }
    }

    // Menu left display
    var dt = $('<ul class="nav qq nav-stacked xx">');
    $.each(response.result.values, function () {
      var row = this;
      var ids = row[0],
      titles = row[1].replace(/[\n\r]/g, '<br>'),
      contents = row[2],
      languages = row[5];

      if (lang !== languages || ids == 1) {
        return;
      }
      if (ids == 63) {
        ids = 62;
      }
      if (ids == id) {
        dt.append('<li><a class="qn active">' + titles + '</a></li>');
      } else if (contents == '#'){
        dt.append('<li class="ayx">' + titles + '</li>');
      } else {
        dt.append('<li class="qp"><a class="qn" href="?id='+ ids + '&lang='+ languages +'" target="_self">'+titles+'</a></li>');
      }
    });

    $('#nav-toggleable-md').append(dt);
  },
  function(err) {
    console.error("Execute error", err);
  });
}
gapi.load("client");

function loadClient() {
  return gapi.client.init({
    'apiKey': 'AIzaSyDTp5iwOQzABZdnTD1t1C3546SV8I-7B7k',
    'discoveryDocs': ['https://content.googleapis.com/discovery/v1/apis/sheets/v4/rest'],
    'scope': 'profile'
  }).then(
    function success () {
      execute();
    },
    function error (err) { 
      console.error("Error loading GAPI client for API", err);
    }
  );
}
