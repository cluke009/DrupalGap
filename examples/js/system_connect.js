$('#system_connect_submit').live('click', function () {
  try {
    // Update settings with new site url path.
    // settings = drupalgap_settings_load();
    // settings.site_path = url;
    // drupalgap_settings_save(settings);

    // Perform system connect to see if DrupalGap is setup properly on Drupal site.
    options = {
      "error": function (jqXHR, textStatus, errorThrown) {
        // Clear the site path and re-save the settings to start over.
        // settings.site_path = "";
        // drupalgap_settings_save(settings);
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log("Error connecting. Please check that the URL is typed correctly, with no trailing slashes.");
        }
      },
      "success": function (inner_data) {
        // Session id came back, everything is ok...
        console.log("Setup Complete!");

        // Make a call to the DrupalGap bundled system connect resource.
        inner_options = {
          "load_from_local_storage": "0",
          "error": function (jqXHR, textStatus, errorThrown) {
            if (errorThrown) {
              console.log(errorThrown);
            }
            else {
              console.log("Error connecting. Please check that the URL is typed correctly, with no trailing slashes.");
            }
          },
          "success": function () {
            // Go to the dashboard.
            // $.mobile.changePage("dashboard.html", "slideup");
          }
        };
        // drupalgap_services_resource_system_connect.resource_call(inner_options);
      },
    };
    drupal_services_system_connect.resource_call(options);
  }
  catch (error) {
    console.log("drupalgap_page_setup_connect");
    console.log(error);
  }
  return false;
});
