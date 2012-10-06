/**
 * Make services.system.connect call
 */
$('#system_connect_submit').live('click', function () {
  try {
    // Perform system connect to see if DrupalGap is setup properly on Drupal site.
    options = {
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.error(errorThrown);
        }
        else {
          console.error("Error connecting. Please check that the URL is typed correctly, with no trailing slashes.");
        }
      },
      "success": function (inner_data) {
        // Session id came back, everything is ok...
        console.log("Setup Complete!");
      },
    };
    // Make service call.
    drupal_services_system_connect.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: system_connect_submit");
    console.error(error);
  }
  return false;
});

/**
 * Make services.system.getvar call
 */
$('#system_connect_get_variable_submit').live('click', function () {
  try {
    // Perform system connect to see if DrupalGap is setup properly on Drupal site.
    options = {
      // Change 'site_mail' to the variable name you want.
      "name": 'site_mail',
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.error(errorThrown);
        }
        else {
          console.error("");
        }
      },
      "success": function (inner_data) {
        // Returned variable...
      },
    };
    // Make service call.
    drupal_services_system_get_variables.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: system_connect_get_variable_submit");
    console.error(error);
  }
  return false;
});

/**
 * Clear localStorage so we can load new settings.
 */
$('#system_clear_submit').live('click', function () {
  localStorage.clear();
  console.log("localStorage cleared");
})
