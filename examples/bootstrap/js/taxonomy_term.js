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
 * Handles the submission of the taxonomy_term retrieve form.
 */
$('#submit_taxonomy_term_retrieve').live('click', function () {
  try {
    // Make call to the bundled user login service resource.
    options = {
      "tid": $('#input_taxonomy_term_retrieve_tid').val(),
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
    drupal_services_taxonomy_term_retrieve.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_taxonomy_term_retrieve - " + error);
  }
  return false;
});

/**
 * Handles the submission of the taxonomy_term create form.
 */
$('#submit_taxonomy_term_create').live('click', function () {
  try {
    // Build service call options.
    options = {
      "vid": $('#input_taxonomy_term_create_vid').val(),
      "name": $('#input_taxonomy_term_create_name').val(),
      "description": $('#input_taxonomy_term_create_description').val(),
      "weight": $('#input_taxonomy_term_create_weight').val(),
      "parent": $('#input_taxonomy_term_create_parent').val(),

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
    drupal_services_taxonomy_term_create.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_taxonomy_term_create - " + error);
  }
  return false;
});

/**
 * Handles the submission of the taxonomy_term update form.
 */
$('#submit_taxonomy_term_update').live('click', function () {
  try {
    // Build service call options.
    options = {
      "vid": $('#input_taxonomy_term_update_vid').val(),
      "tid": $('#input_taxonomy_term_update_tid').val(),
      "name": $('#input_taxonomy_term_update_name').val(),
      "description": $('#input_taxonomy_term_update_description').val(),
      "weight": $('#input_taxonomy_term_update_weight').val(),
      "parent": $('#input_taxonomy_term_update_parent').val(),

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
    drupal_services_taxonomy_term_update.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_taxonomy_term_update - " + error);
  }
  return false;
});

/**
 * Handles the submission of the taxonomy_term delete form.
 */
$('#submit_taxonomy_term_delete').live('click', function () {
  try {
    // Build service call options.
    options = {
      "tid": $('#input_taxonomy_term_delete_tid').val(),
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (taxonomy_term) {
        // Success...
      },
    };
    // Make the service call.
    drupal_services_taxonomy_term_delete.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_taxonomy_term_delete - " + error);
  }
  return false;
});

/**
 * Handles the submission of the taxonomy_term index form.
 */
$('#submit_taxonomy_term_index').live('click', function () {
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
      "success": function (taxonomy_term) {
        // Success...
      },
    };
    // Load taxonomy_term via services call.
    drupal_services_taxonomy_term_index.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_taxonomy_term_index - " + error);
  }
  return false;
});

/**
 * Handles the submission of the taxonomy_term select_nodes form.
 */
$('#submit_taxonomy_term_select_nodes').live('click', function () {
  try {
    // Build service call options.
    options = {
      "tid": $('#input_taxonomy_term_select_nodes_tid').val(),
      "error": function (jqXHR, textStatus, errorThrown) {
        if (errorThrown) {
          console.log(errorThrown);
        }
        else {
          console.log(textStatus);
        }
      },
      "success": function (taxonomy_term) {
        // Success...
      },
    };
    // Make the service call.
    drupal_services_taxonomy_term_select_nodes.resource_call(options);
  }
  catch (error) {
    console.log("errorThrown: #submit_taxonomy_term_select_nodes - " + error);
  }
  return false;
});
