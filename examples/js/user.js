/**
 * Prepare elements for this page.
 */
$(function () {
  // Tab swapping.
  $('a').click(function () {
    var target = $(this.rel);
    $('.content').not(target).hide();
    target.toggle();

    $('a.active').removeClass('active');
    $(this).addClass('active');
    $('body > div.content_active').removeClass('content_active');
    $(this.rel).addClass('content_active');
  });

  // Prepopulate user edit fields.
  $('#link_user_edit').live('click', function () {
    if(window.localStorage.getItem('post.system/connect.json')){
      drupal_user = $.parseJSON(window.localStorage.getItem('post.system/connect.json'));
      var name    = drupal_user.user.name;
      var mail    = drupal_user.user.mail
    }
    else {
      var name = '';
      var mail = '';
    }

    $('#input_user_edit_name').val(name);
    $('#input_user_edit_mail').val(mail);
  });
});

/**
 * Handles the submission of the user login form.
 */
$('#submit_user_login').live('click', function () {
  try {
    // Make call to the bundled user login service resource.
    options = {
      "name": $('#input_user_login_username').val(),
      "pass": $('#input_user_login_password').val(),
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
    // Build the service resource call options.
    options = {
      "name"         : $('#input_user_edit_name').val(),
      "mail"         : $('#input_user_edit_mail').val(),
      "current_pass" : $('#input_user_edit_current_pass').val(),
      "pass"         : $('#input_user_edit_pass').val(),
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
    // Build service call options.
    options = {
      "name": $('#input_user_register_name').val(),
      "mail": $('#input_user_register_mail').val(),
      "pass": $('#input_user_register_pass').val(),

      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
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

/**
 * Make services.user.retrieve call
 */
$('#submit_user_retrieve').live('click', function () {
  try {
    // Make call to the bundled user login service resource.
    options = {
      "uid": $('#input_user_retrieve_uid').val(),
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
    drupal_services_user_retrieve.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_user_retrieve - " + error);
  }
  return false;
});

/**
 * Make services.user.index call
 */
$('#submit_user_index').live('click', function () {
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
    drupal_services_user_index.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_user_index - " + error);
  }
  return false;
});

/**
 * Handles the submission of the user registration form.
 */
$('#submit_user_create').live('click', function () {
  try {
    // Build service call options.
    options = {
      "name": $('#input_user_create_name').val(),
      "mail": $('#input_user_create_mail').val(),
      "pass": $('#input_user_create_pass').val(),

      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
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
    drupal_services_user_create.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_user_create - " + error);
  }
  return false;
});
