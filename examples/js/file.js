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
  try {
    // Make call to the bundled user login service resource.
    options = {
      "cid": $('#input_file_retrieve_cid').val(),
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
      "filemime": '',
      "filepath": '',
      "filename": $('#input_file_create_file').val(),

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
 * Handles the submission of the file update form.
 */
$('#submit_file_update').live('click', function () {
  try {
    // Build service call options.
    options = {
      "subject": $('#input_file_update_subject').val(),
      "body": $('#input_file_update_file_body').val(),
      "cid": $('#input_file_update_cid').val(),
      "nid": $('#input_file_update_nid').val(),
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
    drupal_services_file_update.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_file_update - " + error);
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
 * Handles the submission of the file count all form.
 */
$('#submit_file_count_all').live('click', function () {
  try {
    // Build service call options.
    options = {
      "nid": $('#input_file_count_all_nid').val(),
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (file) {
        // Success...
      },
    };
    // Load file via services call.
    drupal_services_file_count_all.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_file_count_all - " + error);
  }
  return false;
});

/**
 * Handles the submission of the file count new form.
 */
$('#submit_file_count_new').live('click', function () {
  try {
    // Build service call options.
    options = {
      "nid": $('#input_file_count_new_nid').val(),
      "since": $('#input_file_count_new_since').val(),
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (file) {
        // Success...
      },
    };
    // Load file via services call.
    drupal_services_file_count_new.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_file_count_new - " + error);
  }
  return false;
});
