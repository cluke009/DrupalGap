/**
 * Tab swapping.
 */
$('a').live('click', function () {
  var target = $(this.rel);
  $('.content').not(target).hide();
  target.toggle();

  $('li.active').removeClass('active');
  $(this).parent().addClass('active');
  $('body > div.content_active').removeClass('content_active');
  $(this.rel).addClass('content_active');
});

/**
 * Handles the submission of the file retrieve form.
 */
$('#submit_file_retrieve').live('click', function () {
  try {
    // Make call to the bundled user login service resource.
    options = {
      "fid": $('#input_file_retrieve_fid').val(),
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
    drupal_services_file_retrieve.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_file_retrieve - " + error);
  }
  return false;
});

/**
 * Handles the submission of the file create form.
 */
$('#submit_file_create').live('click', function () {
  try {
    // Build service call options.
    options = {
      "file": $('#input_file_create_file').val(),
      "filename": $('#input_file_create_filename').val(),

      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },

      "success": function (data) {
        // Success...
      },
    };
    // Make the service call.
    drupal_services_file_create.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_file_create - " + error);
  }
  return false;
});

/**
 * Handles the submission of the file delete form.
 */
$('#submit_file_delete').live('click', function () {
  try {
    // Build service call options.
    options = {
      "fid": $('#input_file_delete_fid').val(),
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (data) {
        // Success...
      },
    };
    // Make the service call.
    drupal_services_file_delete.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_file_delete - " + error);
  }
  return false;
});

/**
 * Handles the submission of the file index form.
 */
$('#submit_file_index').live('click', function () {
  try {
    // Build service call options.
    options = {
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (data) {
        // Success...
      },
    };
    // Load file via services call.
    drupal_services_file_index.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_file_index - " + error);
  }
  return false;
});

/**
 * Handles the submission of the file create form.
 */
$('#submit_file_create_raw').live('click', function () {
  try {
    // Build service call options.
    options = {
      "file": $('#input_file_create_raw_file').val(),
      "filename": $('#input_file_create_raw_filename').val(),

      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },

      "success": function (data) {
        // Success...
      },
    };
    // Make the service call.
    drupal_services_file_create_raw.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_file_create_raw - " + error);
  }
  return false;
});
