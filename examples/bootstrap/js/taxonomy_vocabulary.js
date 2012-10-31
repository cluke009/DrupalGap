/**
 * Handles the submission of the taxonomy_vocabulary retrieve form.
 */
$('#submit_taxonomy_vocabulary_retrieve').live('click', function () {
  // Build service call options.
  options = {
    vid: $('#input_taxonomy_vocabulary_retrieve_vid').val(),
    success: function () {},
    error: function () {}
  };

  // Make service call.
  services.taxonomyVocabulary.retrieve(options);
});

/**
 * Handles the submission of the taxonomy_vocabulary create form.
 */
$('#submit_taxonomy_vocabulary_create').live('click', function () {
  // Build service call options.
  options = {
    vid: $('#input_taxonomy_vocabulary_create_vid').val(),
    name: $('#input_taxonomy_vocabulary_create_name').val(),
    machine_name: $('#input_taxonomy_vocabulary_create_machine_name').val(),
    description: $('#input_taxonomy_vocabulary_create_description').val(),
    help: $('#input_taxonomy_vocabulary_create_help').val(),
    tags: $('#input_taxonomy_vocabulary_create_tags').val(),
    multiple: $('#input_taxonomy_vocabulary_create_multiple').val(),
    required: $('#input_taxonomy_vocabulary_create_required').val(),
    hierarchy: $('#input_taxonomy_vocabulary_create_hierarchy').val(),
    relations: $('#input_taxonomy_vocabulary_create_relations').val(),
    module: $('#input_taxonomy_vocabulary_create_module').val(),
    node: $('#input_taxonomy_vocabulary_create_node').val(),
    weight: $('#input_taxonomy_vocabulary_create_weight').val(),
    success: function () {},
    error: function () {}
  };

  // Make the service call.
  services.taxonomyVocabulary.create(options);
});

/**
 * Handles the submission of the taxonomy_vocabulary update form.
 */
$('#submit_taxonomy_vocabulary_update').live('click', function () {
  // Build service call options.
  options = {
    vid: $('#input_taxonomy_vocabulary_update_vid').val(),
    name: $('#input_taxonomy_vocabulary_update_name').val(),
    machine_name: $('#input_taxonomy_vocabulary_update_machine_name').val(),
    description: $('#input_taxonomy_vocabulary_update_description').val(),
    help: $('#input_taxonomy_vocabulary_update_help').val(),
    tags: $('#input_taxonomy_vocabulary_update_tags').val(),
    multiple: $('#input_taxonomy_vocabulary_update_multiple').val(),
    required: $('#input_taxonomy_vocabulary_update_required').val(),
    hierarchy: $('#input_taxonomy_vocabulary_update_hierarchy').val(),
    relations: $('#input_taxonomy_vocabulary_update_relations').val(),
    module: $('#input_taxonomy_vocabulary_update_module').val(),
    node: $('#input_taxonomy_vocabulary_update_node').val(),
    weight: $('#input_taxonomy_vocabulary_update_weight').val(),
    success: function () {},
    error: function () {}
  };

  // Make the service call.
  services.taxonomyVocabulary.update(options);
});

/**
 * Handles the submission of the taxonomy_vocabulary delete form.
 */
$('#submit_taxonomy_vocabulary_delete').live('click', function () {
  // Build service call options.
  options = {
    vid: $('#input_taxonomy_vocabulary_delete_vid').val(),
    success: function () {},
    error: function () {}
  };

  // Make the service call.
  services.taxonomyVocabulary.del(options);
});

/**
 * Handles the submission of the taxonomy_vocabulary index form.
 */
$('#submit_taxonomy_vocabulary_index').live('click', function () {
  // Build service call options.
  options = {
    success: function () {},
    error: function () {}
  };

  // Make the service call.
  services.taxonomyVocabulary.index(options);
});

/**
 * Handles the submission of the taxonomy_vocabulary get_tree form.
 */
$('#submit_taxonomy_vocabulary_get_tree').live('click', function () {
  // Build service call options.
  options = {
    vid: $('#input_taxonomy_vocabulary_get_tree_vid').val(),
    success: function () {},
    error: function () {}
  };

  // Make the service call.
  services.taxonomyVocabulary.getTree(options);
});
