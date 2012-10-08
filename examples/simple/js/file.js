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
 * Handles the submission of the file retrieve form.
 */
$('#submit_file_retrieve').live('click', function () {
    // Make call to the bundled user login service resource.
    options = {
      "fid": $('#input_file_retrieve_fid').val(),
      "success": function () {},
      "error": function () {}
    };
    // Make service call.
    drupal_services_file_retrieve.resource_call(options);
});

/**
 * Handles the submission of the file create form.
 */
$('#submit_file_create').live('click', function () {
  // Build service call options.
  options = {
    "file": $('#input_file_create_file').val(),
    "filename": $('#input_file_create_filename').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_file_create.resource_call(options);
});

/**
 * Handles the submission of the file delete form.
 */
$('#submit_file_delete').live('click', function () {
  // Build service call options.
  options = {
    "fid": $('#input_file_delete_fid').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_file_delete.resource_call(options);
});

/**
 * Handles the submission of the file index form.
 */
$('#submit_file_index').live('click', function () {
  // Build service call options.
  options = {
    "success": function () {},
    "error": function () {}
  };
  // Load file via services call.
  drupal_services_file_index.resource_call(options);
});

/**
 * Handles the submission of the file create form.
 */
$('#submit_file_create_raw').live('click', function () {
  // Build service call options.
  options = {
    "file": $('#input_file_create_raw_file').val(),
    "filename": $('#input_file_create_raw_filename').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_file_create_raw.resource_call(options);
});
