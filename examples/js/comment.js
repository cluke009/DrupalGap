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
 * Handles the submission of the comment retrieve form.
 */
$('#submit_comment_retrieve').live('click', function () {
  try {
    // Make call to the bundled user login service resource.
    options = {
      "cid": $('#input_comment_retrieve_cid').val(),
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
    drupal_services_comment_retrieve.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_comment_retrieve - " + error);
  }
  return false;
});

/**
 * Handles the submission of the comment create form.
 */
$('#submit_comment_create').live('click', function () {
  try {
    // Build service call options.
    options = {
      "subject": $('#input_comment_create_subject').val(),
      "body": $('#input_comment_create_comment_body').val(),
      "nid": $('#input_comment_create_nid').val(),
      "language": $('#input_comment_create_language').val(),
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
    drupal_services_comment_create.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_comment_create - " + error);
  }
  return false;
});

/**
 * Handles the submission of the comment update form.
 */
$('#submit_comment_update').live('click', function () {
  try {
    // Build service call options.
    options = {
      "subject": $('#input_comment_update_subject').val(),
      "body": $('#input_comment_update_comment_body').val(),
      "cid": $('#input_comment_update_cid').val(),
      "nid": $('#input_comment_update_nid').val(),
      "language": $('#input_comment_update_language').val(),
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
    drupal_services_comment_update.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_comment_update - " + error);
  }
  return false;
});

/**
 * Handles the submission of the comment delete form.
 */
$('#submit_comment_delete').live('click', function () {
  try {
    // Build service call options.
    options = {
      "cid": $('#input_comment_delete_cid').val(),
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (comment) {
        // Success...
      },
    };
    // Make the service call.
    drupal_services_comment_delete.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_comment_delete - " + error);
  }
  return false;
});

/**
 * Handles the submission of the comment index form.
 */
$('#submit_comment_index').live('click', function () {
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
      "success": function (comment) {
        // Success...
      },
    };
    // Make the service call.
    drupal_services_comment_index.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_comment_index - " + error);
  }
  return false;
});

/**
 * Handles the submission of the comment count all form.
 */
$('#submit_comment_count_all').live('click', function () {
  try {
    // Build service call options.
    options = {
      "nid": $('#input_comment_count_all_nid').val(),
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (comment) {
        // Success...
      },
    };
    // Make the service call.
    drupal_services_comment_count_all.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_comment_count_all - " + error);
  }
  return false;
});

/**
 * Handles the submission of the comment count new form.
 */
$('#submit_comment_count_new').live('click', function () {
  try {
    // Build service call options.
    options = {
      "nid": $('#input_comment_count_new_nid').val(),
      "since": $('#input_comment_count_new_since').val(),
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (comment) {
        // Success...
      },
    };
    // Make the service call.
    drupal_services_comment_count_new.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_comment_count_new - " + error);
  }
  return false;
});
