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
    console.log("errorThrown: drupal_page_setup_connect");
    console.error(error);
  }
  return false;
});

/**
 * Clear localStorage so we can load new settings.
 */
$('#system_connect_clear_submit').live('click', function () {
  localStorage.clear();
  console.log("localStorage cleared");
})
