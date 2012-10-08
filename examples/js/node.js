/**
 * Tab swapping.
 */
$(function () {
  $('a').live('click', function () {
    var target = $(this.rel);
    $('.content').not(target).hide();
    target.toggle();

    $('a.active').removeClass('active');
    $(this).addClass('active');
    $('body > div.content_active').removeClass('content_active');
    $(this.rel).addClass('content_active');
  });
});

/**
 * Handles the submission of the node retrieve form.
 */
$('#submit_node_retrieve').live('click', function () {
  try {
    // Make call to the bundled user login service resource.
    options = {
      "nid": $('#input_node_retrieve_nid').val(),
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
    drupal_services_node_retrieve.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_node_retrieve - " + error);
  }
  return false;
});

/**
 * Handles the submission of the node create form.
 */
$('#submit_node_create').live('click', function () {
  try {
    // Build service call options.
    options = {
      "title": $('#input_node_create_title').val(),
      "body": $('#input_node_create_body').val(),
      "type": 'page',

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
    drupal_services_node_create.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_node_create - " + error);
  }
  return false;
});

/**
 * Handles the submission of the node update form.
 */
$('#submit_node_update').live('click', function () {
  try {
    // Build service call options.
    options = {
      "title": $('#input_node_update_title').val(),
      "body": $('#input_node_update_body').val(),
      "type": 'page',
      "nid": '1',
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
    drupal_services_node_update.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_node_update - " + error);
  }
  return false;
});

/**
 * Handles the submission of the node delete form.
 */
$('#submit_node_delete').live('click', function () {
  try {
    // Build service call options.
    options = {
      "nid": $('#input_node_delete_nid').val(),
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (node) {
        // Success...
      },
    };
    // Make the service call.
    drupal_services_node_delete.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_node_delete - " + error);
  }
  return false;
});

/**
 * Handles the submission of the node index form.
 */
$('#submit_node_index').live('click', function () {
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
      "success": function (node) {
        // Success...
      },
    };
    // Load node via services call.
    drupal_services_node_index.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_node_index - " + error);
  }
  return false;
});

/**
 * Handles the submission of the node files form.
 */
$('#submit_node_files').live('click', function () {
  try {
    // Build service call options.
    options = {
      "nid": $('#input_node_files_nid').val(),
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (node) {
        // Success...
      },
    };
    // Make the service call.
    drupal_services_node_files.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_node_files - " + error);
  }
  return false;
});

/**
 * Handles the submission of the node comments form.
 */
$('#submit_node_comments').live('click', function () {
  try {
    // Build service call options.
    options = {
      "nid": $('#input_node_comments_nid').val(),
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (node) {
        // Success...
      },
    };
    // Make the service call.
    drupal_services_node_comments.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_node_comments - " + error);
  }
  return false;
});
