/**
 * Handles the submission of the user login form.
 */
$('#submit_user_login').live('click', function () {
  // Make call to the bundled user login service resource.
  options = {
    name: $('#input_user_login_username').val(),
    pass: $('#input_user_login_password').val(),
    success: function () {},
    error: function () {}
  };

  // Make service call.
  services.user.login(options);
});

/**
 * Handles the submission of the user edit form.
 */
$('#submit_user_update').live('click', function () {
  // Build the service resource call options.
  options = {
    uid: $('#input_user_update_uid').val(),
    name: $('#input_user_update_name').val(),
    mail: $('#input_user_update_mail').val(),
    currentPass: $('#input_user_update_current_pass').val(),
    pass: $('#input_user_update_password').val(),
    success: function () {},
    error: function () {}
  };

  // Make service call.
  services.user.update(options);
});

/**
 * Handles the submission of the user registration form.
 */
$('#submit_user_register').live('click', function () {
  // Build service call options.
  options = {
    name: $('#input_user_register_name').val(),
    mail: $('#input_user_register_mail').val(),
    pass: $('#input_user_register_pass').val(),
    success: function () {},
    error: function () {}
  };

  // Make the service call.
  services.user.register(options);
});

/**
 * Make services.user.logout call
 */
$('#link_user_logout').live('click', function () {
  // Make call to the bundled user login service resource.
  options = {
    success: function () {},
    error: function () {}
  };

  // Make service call.
  services.user.logout(options);
});

/**
 * Make services.user.retrieve call
 */
$('#submit_user_retrieve').live('click', function () {
  // Make call to the bundled user login service resource.
  options = {
    uid: $('#input_user_retrieve_uid').val(),
    success: function () {},
    error: function () {}
  };

  // Make service call.
  services.user.retrieve(options);
});

/**
 * Make services.user.retrieve call
 */
$('#submit_user_delete').live('click', function () {
  // Make call to the bundled user login service resource.
  options = {
    uid: $('#input_user_delete_uid').val(),
    success: function () {},
    error: function () {}
  };

  // Make service call.
  services.user.del(options);
});

/**
 * Make services.user.index call
 */
$('#submit_user_index').live('click', function () {
  // Make call to the bundled user login service resource.
  options = {
    success: function () {},
    error: function () {}
  };

  // Make service call.
  services.user.index(options);
});

/**
 * Handles the submission of the user registration form.
 */
$('#submit_user_create').live('click', function () {
  // Build service call options.
  options = {
    name: $('#input_user_create_name').val(),
    mail: $('#input_user_create_mail').val(),
    pass: $('#input_user_create_pass').val(),
    status: $('#input_user_create_status').val(),
    notify: $('#input_user_create_notify').val(),
    success: function () {},
    error: function () {}
  };

  // Make the service call.
  services.user.create(options);
});
