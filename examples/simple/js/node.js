/*global services*/

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
 * Handles the submission of the node retrieve form.
 */
$('#submit_node_retrieve').live('click', function () {
  // Build service call options.
  var options = {
    'nid': $('#input_node_retrieve_nid').val(),
    'success': function () {},
    'error': function () {}
  };
  // Make service call.
  services.node.retrieve(options);
});

/**
 * Handles the submission of the node create form.
 */
$('#submit_node_create').live('click', function () {
  // Build service call options.
  var options = {
    'language': $('#input_node_create_language').val(),
    'title': $('#input_node_create_title').val(),
    'body': $('#input_node_create_body').val(),
    'type': $('#input_node_create_type').val(),
    'fields': {
      'path[alias]': $('#input_node_create_title').val()
    }
  };
  // Make the service call.
  services.node.create(options);
});

/**
 * Handles the submission of the node update form.
 */
$('#submit_node_update').live('click', function () {
  // Build service call options.
  var options = {
    'language': $('#input_node_update_language').val(),
    'title': $('#input_node_update_title').val(),
    'body': $('#input_node_update_body').val(),
    'type': $('#input_node_update_type').val(),
    'nid': $('#input_node_update_nid').val(),
    'success': function () {},
    'error': function () {}
  };
  // Make the service call.
  services.node.update(options);
});

/**
 * Handles the submission of the node delete form.
 */
$('#submit_node_delete').live('click', function () {
  // Build service call options.
  var options = {
    'nid': $('#input_node_delete_nid').val(),
    'success': function () {},
    'error': function () {}
  };
  // Make the service call.
  services.node.del(options);
});

/**
 * Handles the submission of the node index form.
 */
$('#submit_node_index').live('click', function () {
  // Build service call options.
  var options = {
    'success': function () {},
    'error': function () {}
  };
  // Load node via services call.
  services.node.index(options);
});

/**
 * Handles the submission of the node files form.
 */
$('#submit_node_files').live('click', function () {
  // Build service call options.
  var options = {
    'nid': $('#input_node_files_nid').val(),
    'success': function () {},
    'error': function () {}
  };
  // Make the service call.
  services.node.files(options);
});

/**
 * Handles the submission of the node comments form.
 */
$('#submit_node_comments').live('click', function () {
  // Build service call options.
  var options = {
    'nid': $('#input_node_comments_nid').val(),
    'success': function () {},
    'error': function () {}
  };
  // Make the service call.
  services.node.comments(options);
});
