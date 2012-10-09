/**
 * Handles the submission of the taxonomy_term retrieve form.
 */
$('#submit_taxonomy_term_retrieve').live('click', function () {
  // Build service call options.
  options = {
    "tid": $('#input_taxonomy_term_retrieve_tid').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make service call.
  drupal_services_taxonomy_term_retrieve.resource_call(options);
});

/**
 * Handles the submission of the taxonomy_term create form.
 */
$('#submit_taxonomy_term_create').live('click', function () {
  // Build service call options.
  options = {
    "vid": $('#input_taxonomy_term_create_vid').val(),
    "name": $('#input_taxonomy_term_create_name').val(),
    "description": $('#input_taxonomy_term_create_description').val(),
    "weight": $('#input_taxonomy_term_create_weight').val(),
    "parent": $('#input_taxonomy_term_create_parent').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_taxonomy_term_create.resource_call(options);
});

/**
 * Handles the submission of the taxonomy_term update form.
 */
$('#submit_taxonomy_term_update').live('click', function () {
  // Build service call options.
  options = {
    "vid": $('#input_taxonomy_term_update_vid').val(),
    "tid": $('#input_taxonomy_term_update_tid').val(),
    "name": $('#input_taxonomy_term_update_name').val(),
    "description": $('#input_taxonomy_term_update_description').val(),
    "weight": $('#input_taxonomy_term_update_weight').val(),
    "parent": $('#input_taxonomy_term_update_parent').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_taxonomy_term_update.resource_call(options);
});

/**
 * Handles the submission of the taxonomy_term delete form.
 */
$('#submit_taxonomy_term_delete').live('click', function () {
  // Build service call options.
  options = {
    "tid": $('#input_taxonomy_term_delete_tid').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_taxonomy_term_delete.resource_call(options);
});

/**
 * Handles the submission of the taxonomy_term index form.
 */
$('#submit_taxonomy_term_index').live('click', function () {
  // Build service call options.
  options = {
    "success": function () {},
    "error": function () {}
  };
  // Load taxonomy_term via services call.
  drupal_services_taxonomy_term_index.resource_call(options);
});

/**
 * Handles the submission of the taxonomy_term select_nodes form.
 */
$('#submit_taxonomy_term_select_nodes').live('click', function () {
  // Build service call options.
  options = {
    "tid": $('#input_taxonomy_term_select_nodes_tid').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_taxonomy_term_select_nodes.resource_call(options);
});
