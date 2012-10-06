/**
 * Start debug.
 */
$(document).ready(function () {
  // Insert debugDiv.
  $('body').append('<div class="debugDiv">');

  // Override default console command
  if (typeof console != "undefined") {
    if (typeof console.log != 'undefined') {
      console.olog = console.log;
    }
    else {
      console.olog = function () {};
    }
  }
  console.log = function (message) {
    var now = new Date()
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();
    var ms = now.getMilliseconds();
    var now = '<span class="timestamp">' + h + ':' + m + ':' + s + ':' + ms + '</span> ';
    console.olog(message);
    $('.debugDiv').prepend('<pre>' + now + drupalgap_syntax_highlight(message) + '</pre>');
  };
  console.error = console.debug = console.info = console.log
});

/**
 * JSON syntax highlighting.
 */
function drupalgap_syntax_highlight(json) {
  json = json.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      }
      else {
        cls = 'string';
      }
    }
    else if (/true|false/.test(match)) {
      cls = 'boolean';
    }
    else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });

  return json;
}
