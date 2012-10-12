/**
 * @file
 */
/*jshint multistr: true*/
/*global SyntaxHighlighter*/
/**
 * [generator description]
 * @type {[type]}
 */
var generator = generator || {};

/**
 * [viewsDataSource description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
generator.viewsDataSource = function (options) {

  var dataSource = ' \n\
services.viewsDataSource.' + options.method + ' = function (options) { \n\
  try { \n\
    // Build the options for the service call. \n\
    var options = { \n\
      endPoint: \'\', \n\
      type: \'get\', \n\
      url: \'' + options.url + '\', \n\
      async: true, \n\
      success: this.hookSuccess, \n\
      error: this.hookError \n\
    }; \n\
 \n\
    // Make the service call. \n\
    services.resource(options); \n\
  } \n\
  catch (error) { \n\
    console.log(\'Error: ' + options.filename + '\'); \n\
    console.log(\'Object: services.viewsDataSource.' + options.method + ' - \' + error); \n\
  } \n\
};';

  return dataSource;
};

/**
 * [viewsDataSource description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
generator.services = function (options) {
  var services = '// Add ' + options.group + ' to services namespace. \n\
services.' + options.group + ' = || {}; \n\n\
services.' + options.group + '.' + options.method + ' = function (options) { \n\
  try { \n';

  if (options.type !== 'get') {
    var target = options.data;
        target = target.split(',');

    services += '    // Build service call data string. \n';
    for (var k in target) {
      if (target.hasOwnProperty(k)) {
        if (k == '0') {
          services += '    var data = \'' + $.trim(target[k]) + '=\' + encodeURIComponent(options.' + $.trim(target[k]) + '); \n';
        }
        else {
          services += '        data += \'&' + $.trim(target[k]) + '=\' + encodeURIComponent(options.' + $.trim(target[k]) + '); \n';
        }
      }
    }
    services += ' \n';
  }

  services += '    // Build the options for the service call. \n\
    var options = { \n\
      type: \'' + options.type + '\', \n';
      if (options.endPoint !== ''){
        services += '      endPoint: ' + options.endPoint + ';\n';
      }
services += '      url: \'' + options.url + '\', \n\
      async: true, \n\
      success: this.hookSuccess, \n\
      error: this.hookError';

      if (options.type !== 'get'){
        services += ',\n      data: data';
      }
services += '\n    }; \n\
 \n\
    // Make the service call. \n\
    services.resource(options); \n\
  } \n\
  catch (error) { \n\
    console.log(\'Error: ' + options.filename + '\'); \n\
    console.log(\'Object: services.' + options.group + '.' + options.method + ' - \' + error); \n\
  } \n\
};';

  return services;
};

generator.endpoint = function (options) {

  var json = $.parseJSON(options.json);
  console.log(json.resources);


  var data = {
    group: json.name,
    filename: json.name + '.js',
    type: '',
    data: '',
    method: json.resources,
    endPoint: json.path,
    url: json.resources
  };


  var endpoint = generator.services(data);

  return endpoint;
};

/**
 * Make generator.viewsDataSource call
 */
$('#submit_generator').live('click', function () {
  // Build service call options.
  var options = {
    url: $('#input_generator_url').val(),
    method: $('#input_generator_method').val(),
    filename: $('#input_generator_filename').val()
  };
  // Make service call.
  var data  = '<pre class="prettyprint brush: js; toolbar: false;">';
      data += generator.viewsDataSource(options);
      data += '</pre>';

  $('#generator_output').html(data);
  SyntaxHighlighter.highlight();
  $('#generator_output').removeClass('hidden');
  return false;
});

/**
 * Make generator.endpoint call
 */
$('#submit_generator_endpoint_json').live('click', function () {
  // Build service call options.
  var options = {
    json: $('#input_generator_endpoint_json').val()
  };
  // Make service call.
  var data  = '<pre class="prettyprint brush: js; toolbar: false;">';
      data += generator.endpoint(options);
      data += '</pre>';

  $('#generator_output').html(data);
  SyntaxHighlighter.highlight();
  $('#generator_output').removeClass('hidden');
  return false;
});


$('#submit_generator_services').live('click', function () {
  // Build service call options.
  var options = {
    url: $('#input_generator_services_url').val(),
    method: $('#input_generator_services_method').val(),
    filename: $('#input_generator_services_filename').val(),
    group: $('#input_generator_services_group').val(),
    type: $('#input_generator_services_type').val(),
    endPoint: $('#input_generator_services_end_point').val(),
    data: $('#input_generator_services_data').val()
  };
  // Make service call.
  var data  = '<pre class="prettyprint brush: js; toolbar: false;">';
      data += generator.services(options);
      data += '</pre>';

  $('#generator_output_services').html(data);
  $('#generator_output_services').removeClass('hidden');
  SyntaxHighlighter.highlight();
  return false;
});

$('#example_generator_services').live('click', function () {
  $('#input_generator_services_url').val('comment.json');
  $('#input_generator_services_method').val('create');
  $('#input_generator_services_filename').val('services/comment.js');
  $('#input_generator_services_group').val('comment');
  $('#input_generator_services_type').val('post');
  $('#input_generator_services_end_point').val('rest');
  $('#input_generator_services_data').val('nid, subject, comment_body[und][0][value]');
});


$('#example_generator').live('click', function () {
  $('#input_generator_url').val('drupalgap/views_datasource/drupalgap_content');
  $('#input_generator_method').val('drupalgapContent');
  $('#input_generator_filename').val('views_datasource/drupalgap_content.js');
});

