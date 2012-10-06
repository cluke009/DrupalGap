/**
 * Prepare elements for this page.
 */
$(function () {
  // Tab swapping.
  $('#section_user_register').hide();
  $('#section_user_edit').hide();

  $('#link_user_login').live('click', function () {
    $('#section_user_login').show();
    $('#section_user_register').hide();
    $('#section_user_edit').hide();
  });
  $('#link_user_register').live('click', function () {
    $('#section_user_login').hide();
    $('#section_user_register').show();
    $('#section_user_edit').hide();
  });
  $('#link_user_edit').live('click', function () {
    $('#section_user_login').hide();
    $('#section_user_register').hide();
    $('#section_user_edit').show();
  });

  // Prepopulate user edit fields.
  if(window.localStorage.getItem('post.system/connect.json')){
    drupal_user = $.parseJSON(window.localStorage.getItem('post.system/connect.json'));
    var name = drupal_user.user.name;
    var mail = drupal_user.user.mail
  }
  else {
    var name = '';
    var mail = '';
  }

  $('#input_user_edit_name').val(name);
  $('#input_user_edit_mail').val(mail);
});

/**
 * Handles the submission of the user login form.
 */
$('#submit_user_login').live('click', function () {
  try {
    // Set user/pass variables
    var name = $('#input_user_login_username').val();
    var pass = $('#input_user_login_password').val();

    // Make call to the bundled user login service resource.
    options = {
      "name": name,
      "pass": pass,
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.error(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function () {
        // Success...
      }
    };
    // Make service call.
    drupal_services_user_login.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_user_login - " + error);
  }
  return false;
});

/**
 * Handles the submission of the user edit form.
 */
$('#submit_user_edit').live('click', function () {
  try {
    // Grab form inputs.
    var name = $('#input_user_edit_name').val();
    var mail = $('#input_user_edit_mail').val();
    var pass = $('#input_user_edit_pass').val();
    var current_pass = $('#input_user_edit_current_pass').val();

    // Build the service resource call options.
    options = {
      "name": name,
      "mail": mail,
      "current_pass": current_pass,
      "pass": pass,
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (data) {
        if (data.uid) {
          // user update successful...
        }
        else {
          // update failed...
        }
      }
    };
    // Make the service resource call.
    drupal_services_user_update.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_user_edit - " + error);
  }
  return false;
});

/**
 * Handles the submission of the user registration form.
 */
$('#submit_user_register').live('click', function () {
  try {
    // Grab form inputs.
    var name = $('#input_user_register_name').val();
    var mail = $('#input_user_register_mail').val();
    var pass = $('#input_user_register_pass').val();

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
        }
        else {
          // User registration was not successful...
        }
      },
    };
    // Make the service call.
    drupal_services_user_register.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_user_register - " + error);
  }
  return false;
});

/**
 * Make services.user.logout call
 */
$('#link_user_logout').live('click', function () {
  try {
    // Make call to the bundled user login service resource.
    options = {
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.error(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function () {
        // Success...
      }
    };
    // Make service call.
    drupal_services_user_logout.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #link_user_logout - " + error);
  }
  return false;
});
