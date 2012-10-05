/**
 * Handles the register page show event.
 */
$(document).ready(function () {
  try {
    if (drupalgap_user.uid != 0) {
      console.log("Already logged in!");
      // $.mobile.changePage("dashboard.html", "slideup");
    }
  }
  catch (error) {
    console.log("drupalgap_page_user_register - " + error);
  }
});

/**
 * Handles the submission of the user registration form.
 */
$('#drupalgap_user_register_submit').live('click', function () {
  try {
    // Grab name and validate it.
    var name = $('#drupalgap_user_register_name').val();
    if (!name) {
      alert('Please enter your user name.');
      return false;
    }

    // Grab mail and validate it.
    var mail = $('#drupalgap_user_register_mail').val();
    if (!mail) {
      alert('Please enter your e-mail address.');
      return false;
    }

    // Grab passwords, compare and validate.
    var pass = $('#drupalgap_user_register_pass').val();
    if (!pass) {
      alert('Please enter your password.');
      return false;
    }
    var pass2 = $('#drupalgap_user_register_confirm_pass').val();
    if (!pass2) {
      alert('Please confirm your password.');
      return false;
    }
    if (pass != pass2) {
      alert("Passwords do not match.");
      return false;
    }

    // Build service call options.
    options = {
      "name": name,
      "mail": mail,
      "pass": pass,

      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          alert(errorThrown);
        }
        else {
          alert(textStatus);
        }
      },

      "success": function (data) {
        if (data._user_resource_create.uid) {

          // User registration was successful...

          // Show message depending on site's user registration settings.
          site_name = drupalgap_site_settings.variable.site_name;

          // Who can create accounts?
          // TODO - take into account the 'require e-mail verification when a
          // visitor creates an account' checkbox on the drupal site
          switch (drupalgap_site_settings.variable.user_register) {
          case 1:
            // Visitors
          case "1":
            alert("Registration complete! Please check your e-mail to verify your new account at " + site_name + ".");
            break;
          case 2:
            // Visitors, but administrator approval is required
          case "2":
            alert("Registration complete! An administrator from " + site_name + " must now approve your new account.");
            break;
          default:
            // TODO - this should be more informative, instruct user what's next.
            alert("Registration complete!");
            break;
          }

          // $.mobile.changePage("dashboard.html", "slideup");
        }
        else {
          // User registration was not successful...
        }
      },
    };
    // Make the service call.
    drupalgap_services_drupalgap_user_register.resource_call(options);
  }
  catch (error) {
    console.log("drupalgap_user_register_submit - " + error);
    alert("drupalgap_user_register_submit - " + error);
  }
  // Stop the click from executing any further.
  return false;
});
