/**
 * Handles the login page show event.
 */
$(document).ready(function () {
  try {
    // if user is already logged in, send them to the dashboard
    if (drupalgap_user.uid != 0) {
      console.log("Already logged in!");
      // $.mobile.changePage("dashboard.html", "slideup");
      return;
    }
  }
  catch (error) {
    console.log("drupalgap_page_user_login");
    console.log(error);
  }
});

/**
 * Handles the submission of the user login form.
 */
$('#drupalgap_user_login_submit').live('click', function () {
  try {
    // Grab name and validate it.
    var name = $('#drupalgap_user_login_name').val();
    if (!name) {
      alert('Please enter your user name.');
      return false;
    }

    // Grab pass and validate it.
    var pass = $('#drupalgap_user_login_pass').val();
    if (!pass) {
      alert('Please enter your password.');
      return false;
    }

    // Make call to the bundled user login service resource.
    options = {
      "name": name,
      "pass": pass,
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          alert(errorThrown);
        }
        else {
          alert(textStatus);
        }
      },
      "success": function () {
        // $.mobile.changePage("dashboard.html", "slideup");
      }
    };
    // drupalgap_services_user_login.resource_call(options);
    drupalgap_services_drupalgap_user_login.resource_call(options);
  }
  catch (error) {
    console.log("drupalgap_user_login_submit - " + error);
  }

  // stop the click from executing any further
  return false;
});
