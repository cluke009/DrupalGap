/**
 * Tab swapping.
 */
$('a').live('click', function () {
  var target = $(this.rel);
  $('.content').not(target).hide();
  target.toggle();

  $('a.active').removeClass('active');
  $(this).addClass('active');
  $('body > div.content_active').removeClass('content_active');
  $(this.rel).addClass('content_active');
});

/**
 * Handles the submission of the user login form.
 */
$('#submit_user_login').live('click', function () {
  // Make call to the bundled user login service resource.
  options = {
    "name": $('#input_user_login_username').val(),
    "pass": $('#input_user_login_password').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make service call.
  drupal_services_user_login.resource_call(options);
});

/**
 * Handles the submission of the user edit form.
 */
$('#submit_user_edit').live('click', function () {
  // Build the service resource call options.
  options = {
    "uid"          : $('#input_user_edit_uid').val(),
    "name"         : $('#input_user_edit_name').val(),
    "mail"         : $('#input_user_edit_mail').val(),
    "current_pass" : $('#input_user_edit_current_pass').val(),
    "pass"         : $('#input_user_edit_password').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service resource call.
  drupal_services_user_update.resource_call(options);
});

/**
 * Handles the submission of the user registration form.
 */
$('#submit_user_register').live('click', function () {
  // Build service call options.
  options = {
    "name": $('#input_user_register_name').val(),
    "mail": $('#input_user_register_mail').val(),
    "pass": $('#input_user_register_pass').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_user_register.resource_call(options);
});

/**
 * Make services.user.logout call
 */
$('#link_user_logout').live('click', function () {
  // Make call to the bundled user login service resource.
  options = {
    "success": function () {},
    "error": function () {}
  };
  // Make service call.
  drupal_services_user_logout.resource_call(options);
});

/**
 * Make services.user.retrieve call
 */
$('#submit_user_retrieve').live('click', function () {
  // Make call to the bundled user login service resource.
  options = {
    "uid": $('#input_user_retrieve_uid').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make service call.
  drupal_services_user_retrieve.resource_call(options);
});

/**
 * Make services.user.index call
 */
$('#submit_user_index').live('click', function () {
  // Make call to the bundled user login service resource.
  options = {
    "success": function () {},
    "error": function () {}
  };
  // Make service call.
  drupal_services_user_index.resource_call(options);
});

/**
 * Handles the submission of the user registration form.
 */
$('#submit_user_create').live('click', function () {
  // Build service call options.
  options = {
    "name": $('#input_user_create_name').val(),
    "mail": $('#input_user_create_mail').val(),
    "pass": $('#input_user_create_pass').val(),
    "status": $('#input_user_create_status').val(),
    "notify": $('#input_user_create_notify').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_user_create.resource_call(options);
});
