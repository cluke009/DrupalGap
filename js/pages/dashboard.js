/**
 * Dashboard page is ready.
 */
$(document).ready(function () {
  try {
    // Display site name.
    site_name = drupalgap_site_settings.variable.site_name;
    if (!site_name) {
      site_name = "DrupalGap";
    }
    $('#drupalgap_page_dashboard h1').html(site_name);

    // Hide both navbars (logic below will show them).
    $('#drupalgap_page_dashboard_navbar_anonymous').hide();
    $('#drupalgap_page_dashboard_navbar_authenticated').hide();

    if (drupalgap_user.uid == 0) {
      // user is not logged in...
      $('#drupalgap_page_dashboard_navbar_anonymous').show();
      $('#drupalgap_page_dashboard_navbar_authenticated').hide();

      // Determine what to do with the user registration button based on the site settings.
      switch (drupalgap_site_settings.variable.user_register) {
      case 0:
        // Administrators only.
      case "0":
        $('#drupalgap_button_user_register').hide();
        break;
      case 1:
        // Visitors.
      case "1":
        break;
      case 2:
        // Visitors, but administrator approval is required.
      case "2":
        break;
      }
    }
    else {
      // User is logged in.
      $('#drupalgap_page_dashboard_navbar_authenticated').show();
      $('#drupalgap_page_dashboard_header_user').html("Hi, " + drupalgap_user.name);
    }

    // Load user access permissions.
    // access_content = drupalgap_services_user_access({
    //   "permission": "access content"
    // });
    // access_comments = drupalgap_services_user_access({
    //   "permission": "access comments"
    // });

    // // Set visibility on other buttons.
    // if (access_content) {
    //   $('#drupalgap_button_content').show();
    // }
    // if (access_comments) {
    //   $('#drupalgap_button_comments').show();
    // }
  }
  catch (error) {
    console.error("errorThrown: 'drupalgap_page_dashboard'");
    console.error(error);
  }
});

/**
 * Logout submit.
 */
$('#drupalgap_button_user_logout').live("click", function () {
  try {
    // Build the service call options.
    options = {
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          alert(errorThrown);
        }
        else {
          alert(textStatus);
        }
      },
      "success": function () {
        // Success.
      },
    };
    // Make the service call.
    drupalgap_services_drupalgap_user_logout.resource_call(options);
  }
  catch (error) {
    console.log("drupalgap_button_user_logout - " + error);
  }

  // Stop the click from executing any further.
  return false;
});
