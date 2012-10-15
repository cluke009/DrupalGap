/**
 * Handles the submission of the comment retrieve form.
 */
$('#submit_comment_retrieve').live('click', function () {
  // Make call to the bundled user login service resource.
  options = {
    "cid": $('#input_comment_retrieve_cid').val(),
    "success": function () {
      console.log("success asdasdasd");
    }
  };
  // Make service call.
  services.comment.retrieve(options);
});

/**
 * Handles the submission of the comment create form.
 */
$('#submit_comment_create').live('click', function () {
  // Build service call options.
  options = {
    "subject": $('#input_comment_create_subject').val(),
    "body": $('#input_comment_create_comment_body').val(),
    "nid": $('#input_comment_create_nid').val(),
    "language": $('#input_comment_create_language').val(),
    "success": function () {
      console.log("success asdasdasd");
    },
    "complete": function () {
      console.log("complete asdasdasd");
    }
  };
  // Make the service call.
  services.comment.create(options);
});

/**
 * Handles the submission of the comment update form.
 */
$('#submit_comment_update').live('click', function () {
  // Build service call options.
  options = {
    "subject": $('#input_comment_update_subject').val(),
    "body": $('#input_comment_update_comment_body').val(),
    "cid": $('#input_comment_update_cid').val(),
    "language": $('#input_comment_update_language').val(),
    "success": function () {
      console.log('test')
    },
    "error": function () {
      console.log('error')
    }
  };
  // Make the service call.
  services.comment.update(options);
});

/**
 * Handles the submission of the comment delete form.
 */
$('#submit_comment_delete').live('click', function () {
  // Build service call options.
  options = {
    "cid": $('#input_comment_delete_cid').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  services.comment.del(options);
});

/**
 * Handles the submission of the comment index form.
 */
$('#submit_comment_index').live('click', function () {
    // Build service call options.
  var params = $('#input_comment_index_params').val();
  var fields = $('#input_comment_index_fields').val();
      fields = fields.split(',');

  // Build service call options.
  var options = {
    params: $.parseJSON(params),
    fields: fields,
    'success': function () {},
    'error': function () {}
  };
    // Make the service call.
    services.comment.index(options);
});

/**
 * Handles the submission of the comment count all form.
 */
$('#submit_comment_count_all').live('click', function () {
  // Build service call options.
  options = {
    "nid": $('#input_comment_count_all_nid').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  services.comment.countAll(options);
});

/**
 * Handles the submission of the comment count new form.
 */
$('#submit_comment_count_new').live('click', function () {
  // Build service call options.
  options = {
    "nid": $('#input_comment_count_new_nid').val(),
    "since": $('#input_comment_count_new_since').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make the service call.
  services.comment.countNew(options);
});
