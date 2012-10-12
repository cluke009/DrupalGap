<?php
$endpoint = new stdClass();
$endpoint->disabled = FALSE; /* Edit this to true to make a default endpoint disabled initially */
$endpoint->api_version = 3;
$endpoint->name = 'drupalgap';
$endpoint->server = 'rest_server';
$endpoint->path = 'drupalgap';
$endpoint->authentication = array(
  'services' => 'services',
  'services_accept_origin' => array(
    'whitelist' => '*',
    'no_origin_policy' => 1,
  ),
);
$endpoint->server_settings = array(
  'rest_server' => array(
    'formatters' => array(
      'json' => TRUE,
      'bencode' => FALSE,
      'jsonp' => FALSE,
      'php' => FALSE,
      'rss' => FALSE,
      'xml' => FALSE,
      'yaml' => FALSE,
    ),
    'parsers' => array(
      'application/json' => TRUE,
      'application/x-www-form-urlencoded' => TRUE,
      'application/vnd.php.serialized' => FALSE,
      'application/x-yaml' => FALSE,
      'multipart/form-data' => FALSE,
    ),
  ),
);
$endpoint->resources = array(
  'drupalgap_content' => array(
    'actions' => array(
      'content_types_list' => array(
        'enabled' => 1,
      ),
      'content_types_user_permissions' => array(
        'enabled' => 1,
      ),
    ),
  ),
  'drupalgap_system' => array(
    'actions' => array(
      'site_settings' => array(
        'enabled' => 1,
      ),
      'connect' => array(
        'enabled' => 1,
      ),
    ),
  ),
  'drupalgap_user' => array(
    'actions' => array(
      'access' => array(
        'enabled' => 1,
      ),
      'login' => array(
        'enabled' => 1,
      ),
      'logout' => array(
        'enabled' => 1,
      ),
      'register' => array(
        'enabled' => 1,
      ),
      'roles_and_permissions' => array(
        'enabled' => 1,
      ),
    ),
  ),
  'comment' => array(
    'operations' => array(
      'create' => array(
        'enabled' => 1,
      ),
      'retrieve' => array(
        'enabled' => 1,
      ),
      'update' => array(
        'enabled' => 1,
      ),
      'delete' => array(
        'enabled' => 1,
      ),
      'index' => array(
        'enabled' => 1,
      ),
    ),
    'actions' => array(
      'countAll' => array(
        'enabled' => 1,
      ),
      'countNew' => array(
        'enabled' => 1,
      ),
    ),
  ),
  'file' => array(
    'operations' => array(
      'create' => array(
        'enabled' => 1,
      ),
      'retrieve' => array(
        'enabled' => 1,
      ),
      'delete' => array(
        'enabled' => 1,
      ),
      'index' => array(
        'enabled' => 1,
      ),
    ),
    'actions' => array(
      'create_raw' => array(
        'enabled' => 1,
      ),
    ),
  ),
  'node' => array(
    'operations' => array(
      'retrieve' => array(
        'enabled' => 1,
      ),
      'create' => array(
        'enabled' => 1,
      ),
      'update' => array(
        'enabled' => 1,
      ),
      'delete' => array(
        'enabled' => 1,
      ),
      'index' => array(
        'enabled' => 1,
      ),
    ),
    'relationships' => array(
      'files' => array(
        'enabled' => 1,
      ),
      'comments' => array(
        'enabled' => 1,
      ),
    ),
  ),
  'system' => array(
    'actions' => array(
      'connect' => array(
        'enabled' => 1,
      ),
      'get_variable' => array(
        'enabled' => 1,
      ),
      'set_variable' => array(
        'enabled' => 1,
      ),
      'del_variable' => array(
        'enabled' => 1,
      ),
    ),
  ),
  'taxonomy_term' => array(
    'operations' => array(
      'retrieve' => array(
        'enabled' => 1,
      ),
      'create' => array(
        'enabled' => 1,
      ),
      'update' => array(
        'enabled' => 1,
      ),
      'delete' => array(
        'enabled' => 1,
      ),
      'index' => array(
        'enabled' => 1,
      ),
    ),
    'actions' => array(
      'selectNodes' => array(
        'enabled' => 1,
      ),
    ),
  ),
  'taxonomy_vocabulary' => array(
    'operations' => array(
      'retrieve' => array(
        'enabled' => 1,
      ),
      'create' => array(
        'enabled' => 1,
      ),
      'update' => array(
        'enabled' => 1,
      ),
      'delete' => array(
        'enabled' => 1,
      ),
      'index' => array(
        'enabled' => 1,
      ),
    ),
    'actions' => array(
      'getTree' => array(
        'enabled' => 1,
      ),
    ),
  ),
  'user' => array(
    'operations' => array(
      'retrieve' => array(
        'enabled' => 1,
      ),
      'create' => array(
        'enabled' => 1,
      ),
      'update' => array(
        'enabled' => 1,
      ),
      'delete' => array(
        'enabled' => 1,
      ),
      'index' => array(
        'enabled' => 1,
      ),
    ),
    'actions' => array(
      'login' => array(
        'enabled' => 1,
      ),
      'logout' => array(
        'enabled' => 1,
      ),
      'register' => array(
        'enabled' => 1,
      ),
    ),
  ),
);
$endpoint->debug = 1;

function objectToArray($d) {
  if (is_object($d)) {
    // Gets the properties of the given object
    // with get_object_vars function
    $d = get_object_vars($d);
  }

  if (is_array($d)) {
    /*
    * Return array converted to object
    * Using __FUNCTION__ (Magic constant)
    * for recursive call
    */
    return array_map(__FUNCTION__, $d);
  }
  else {
    // Return array
    return $d;
  }
}
function arrayToObject($d) {
  if (is_array($d)) {
    /*
    * Return array converted to object
    * Using __FUNCTION__ (Magic constant)
    * for recursive call
    */
    return (object) array_map(__FUNCTION__, $d);
  }
  else {
    // Return object
    return $d;
  }
}

// Convert array to object and then object back to array
  $array = objectToArray($endpoint);
  $object = arrayToObject($array);
?>
<html>
<head>
<style type="text/css">

pre {outline: 1px solid #ccc; padding: 5px; margin: 5px; }
.string { color: green; }
.number { color: darkorange; }
.boolean { color: blue; }
.null { color: magenta; }
.key { color: red; }
​
</style>
</head>
<body>
<script type="text/javascript">
function output(inp) {
    document.body.appendChild(document.createElement('pre')).innerHTML = inp;
}

function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

var obj = <?php echo json_encode($array); ?>;
var str = JSON.stringify(obj, undefined, 2);


output(syntaxHighlight(str));
</script>
</body>

</html>
