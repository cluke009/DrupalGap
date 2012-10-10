/**
 * Make services.system.connect call
 */
$('#submit_system_connect').live('click', function () {
  // Build service call options.
  var options = {
hookSuccess: function () { console.log('te');},
    success: function () { alert('test');}
  };
  // Make service call.
  services.system.connect();
});

/**
 * Make services.system.get_variable call
 */
$('#submit_system_connect_get_variable').live('click', function () {
  // Build service call options.
  options = {
    "name": $('#input_system_get_variable').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make service call.
  drupal_services_system_get_variable.resource_call(options);
});

/**
 * Make services.system.set_variable call
 */
$('#submit_system_connect_set_variable').live('click', function () {
  // Build service call options.
  options = {
    "name": $('#input_system_get_variable').val(),
    "value": $('#input_system_set_variable').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make service call.
  drupal_services_system_set_variable.resource_call(options);
});

/**
 * Make services.system.set_variable call
 */
$('#submit_system_connect_del_variable').live('click', function () {
  // Build service call options.
  options = {
    // Change 'site_mail' to the variable name you want.
    "name": $('#input_system_get_variable').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make service call.
  drupal_services_system_del_variable.resource_call(options);
});

/**
 * Clear localStorage so we can load new settings.
 */
$('#submit_system_clear').live('click', function () {
  localStorage.clear();
  console.log("localStorage cleared");
})
