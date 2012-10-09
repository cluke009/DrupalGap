/**
 * Handles the submission of the node retrieve form.
 */
$('#submit_node_retrieve').live('click', function () {
  // Build service call options.
  options = {
    "nid": $('#input_node_retrieve_nid').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make service call.
  drupal_services_node_retrieve.resource_call(options);
});

/**
 * Handles the submission of the node create form.
 */
$('#submit_node_create').live('click', function () {
  // Build service call options.
  options = {
    "language": $('#input_node_create_language').val(),
    "title": $('#input_node_create_title').val(),
    "body": $('#input_node_create_body').val(),
    "type": $('#input_node_create_type').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_node_create.resource_call(options);
});

/**
 * Handles the submission of the node update form.
 */
$('#submit_node_update').live('click', function () {
  // Build service call options.
  options = {
    "language": $('#input_node_update_language').val(),
    "title": $('#input_node_update_title').val(),
    "body": $('#input_node_update_body').val(),
    "type": $('#input_node_update_type').val(),
    "nid": $('#input_node_update_nid').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_node_update.resource_call(options);
});

/**
 * Handles the submission of the node delete form.
 */
$('#submit_node_delete').live('click', function () {
  // Build service call options.
  options = {
    "nid": $('#input_node_delete_nid').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_node_delete.resource_call(options);
});

/**
 * Handles the submission of the node index form.
 */
$('#submit_node_index').live('click', function () {
  // Build service call options.
  options = {
    "success": function () {},
    "error": function () {}
  };
  // Load node via services call.
  drupal_services_node_index.resource_call(options);
});

/**
 * Handles the submission of the node files form.
 */
$('#submit_node_files').live('click', function () {
  // Build service call options.
  options = {
    "nid": $('#input_node_files_nid').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_node_files.resource_call(options);
});

/**
 * Handles the submission of the node comments form.
 */
$('#submit_node_comments').live('click', function () {
  // Build service call options.
  options = {
    "nid": $('#input_node_comments_nid').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  drupal_services_node_comments.resource_call(options);
});
