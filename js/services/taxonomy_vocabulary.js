/*global services*/

/**
 * @file
 * Controls interactions with the services taxonomy_vocabulary group.
 *
 * @todo Create validation for all passed in values?
 * @todo Add Drupal version checking.
 * @todo Merge create/update objects?
 */

/**
 * Create a new taxonomy vocabulary based on submitted values.
 *
 * @see http://drupaldeveloper.in/article/programmatically-create-vocabulary
 *
 * @param {object} options
 * @param {string} options.name
 *        Required. Human readable name of the vocabulary.
 * @param {string} options.machineName
 *        Required. Machine readable name of the vocabulary.
 * @param {string} options.description
 *        Optional. Extended description of the vocabulary.
 * @param {string} options.help
 *        Optional. Help text.
 * @param {string} options.tags
 *        Required. 1 to make this vocabulary free tagging.
 * @param {string} options.multiple
 *        Required. 1 to allow multiple selection.
 * @param {string} options.required
 *        Optional. 1 to make the terms mandatory to be selected.
 * @param {string} options.hierarchy
 *        Optional. 1 to allow and create hierarchy of the terms within the vocabulary.
 * @param {string} options.relations
 *        Optional. 1 to set and allow relation amongst multiple terms.
 * @param {string} options.module
 *        Optional. Provide the module name in which the vocabulary is defined and which is calling this function.
 * @param {string} options.node
 *        Optional. {'story' : 1}, Content types to which this vocabulary will be attached to.
 * @param {string} options.weight
 *        Optional. Set the weight to display the vocabulary in the list.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.taxonomyVocabulary.create = function (options) {
  try {
    // Build service call data string.
    var data  = 'name=' + encodeURIComponent(options.name);
        data += '&machine_name=' + encodeURIComponent(options.machineName);
        data += '&description=' + encodeURIComponent(options.description);
        data += '&help=' + encodeURIComponent(options.help);
        data += '&tags=' + encodeURIComponent(options.tags);
        data += '&multiple=' + encodeURIComponent(options.multiple);
        data += '&required=' + encodeURIComponent(options.required);
        data += '&hierarchy=' + encodeURIComponent(options.hierarchy);
        data += '&relations=' + encodeURIComponent(options.relations);
        data += '&module=' + encodeURIComponent(options.module);
        data += '&node=' + encodeURIComponent(options.node);
        data += '&weight=' + encodeURIComponent(options.weight);

    // Build the options for the service call.
    options = {
      type: 'post',
      url: 'taxonomy_vocabulary.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data,
      fields: options.fields
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/taxonomy_vocabulary.js');
    console.log('Object: services.taxonomyVocabulary.create - ' + error);
  }
};

/**
 * Return the results for a specified vocabulary id or FALSE if term id does not exist.
 *
 * @param {object} options
 * @param {string} options.vid
 *        Optional. The Vocabulary ID.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.taxonomyVocabulary.retrieve = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'get',
      url: 'taxonomy_vocabulary/' + options.vid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/taxonomy_vocabulary.js');
    console.log('Object: services.taxonomyVocabulary.retrieve - ' + error);
  }
};

/**
 * Updates a specified taxonomy_vocabulary based on submitted values.
 *
 * @param {object} options
 * @param {string} options.name
 *        Required. Human readable name of the vocabulary.
 * @param {string} options.machine_name
 *        Required. Machine readable name of the vocabulary.
 * @param {string} options.description
 *        Optional. Extended description of the vocabulary.
 * @param {string} options.help
 *        Optional. Help text.
 * @param {string} options.tags
 *        Required. 1 to make this vocabulary free tagging.
 * @param {string} options.multiple
 *        Required. 1 to allow multiple selection.
 * @param {string} options.required
 *        Optional. 1 to make the terms mandatory to be selected.
 * @param {string} options.hierarchy
 *        Optional. 1 to allow and create hierarchy of the terms within the vocabulary.
 * @param {string} options.relations
 *        Optional. 1 to set and allow relation amongst multiple terms.
 * @param {string} options.module
 *        Optional. Provide the module name in which the vocabulary is defined and which is calling this function.
 * @param {string} options.node
 *        Optional. {'story' : 1}, Content types to which this vocabulary will be attached to.
 * @param {string} options.weight
 *        Optional. Set the weight to display the vocabulary in the list.
 * @param {string} options.vid
 *        Optional. The vocabulary ID to update.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.taxonomyVocabulary.update = function (options) {
  try {
    // Build service call data string.
    var data  = 'name=' + encodeURIComponent(options.name);
        data += '&machine_name=' + encodeURIComponent(options.machineName);
        data += '&description=' + encodeURIComponent(options.description);
        data += '&help=' + encodeURIComponent(options.help);
        data += '&tags=' + encodeURIComponent(options.tags);
        data += '&multiple=' + encodeURIComponent(options.multiple);
        data += '&required=' + encodeURIComponent(options.required);
        data += '&hierarchy=' + encodeURIComponent(options.hierarchy);
        data += '&relations=' + encodeURIComponent(options.relations);
        data += '&module=' + encodeURIComponent(options.module);
        data += '&node=' + encodeURIComponent(options.node);
        data += '&weight=' + encodeURIComponent(options.weight);

    // Build the options for the service call.
    options = {
      type: 'put',
      url: 'taxonomy_vocabulary/' + options.vid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data,
      fields: options.fields
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/taxonomy_vocabulary.js');
    console.log('Object: services.taxonomyVocabulary.update - ' + error);
  }
};

/**
 * Deletes the specified taxonomy_vocabulary. Returns true if delete was successful.
 *
 * @param {object} options
 * @param {string} options.vid
 *        Required. The vocabulary ID.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.taxonomyVocabulary.del = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'delete',
      url: 'taxonomy_vocabulary/' + options.vid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/taxonomy_vocabulary.js');
    console.log('Object: services.taxonomyVocabulary.del - ' + error);
  }
};

/**
 * Return an array of optionally paged tids based on a set of criteria.
 *
 * @example
 * An example request might look like
 *
 * http://domain/endpoint/taxonomy_vocabulary?fields=tid,name&amp;parameters[tid]=7&amp;parameters[vid]=1
 *
 * This would return an array of objects with only tid and name defined, where
 * tid = 7 and vid = 1.
 *
 * @param {object} options
 * @param {array} options.fields
 *        An array of fields to pass in the url.
 * @param {object} options.param
 *        A json object containing url parameters.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.taxonomyVocabulary.index = function (options) {
  try {
    // @see http://pkarl.com/articles/remove-undefined-and-empty-elements-javascript-arr/
    var fields = options.fields;
    var newArr = [];

    // remove 'falsey' items by creating new array of true-y stuff
    for (var index in fields) {
      if(fields[index]) {
        newArr.push( fields[index] );
      }
    }
    fields = newArr;

    // Append fields to urls.
    var args = '';
    if (fields.length > 0) {
      args = 'fields=';
      for (var i = 0; i < fields.length; i++) {
        if (i !== fields.length - 1) {
          args += fields[i] + ',';
        }
        else {
          args += fields[i];
        }
      }
    }

    // Append parameters to url.
    var params = options.params;
    var args1 = '';
    if (params) {
      for (var k in params) {
        if (params.hasOwnProperty(k)) {
          args1 += '&parameters[' + k + ']=' + params[k];
        }
      }
    }

    // Build the options for the service call.
    options = {
      type: 'delete',
      url: 'taxonomy_vocabulary.json' + args + args1,
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/taxonomy_vocabulary.js');
    console.log('Object: services.taxonomyVocabulary.index - ' + error);
  }
};

/**
 * Services interface to taxonomy_get_tree().
 *
 * @param {object} options
 * @param {string} options.vid
 *        Required. The vocabulary ID.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.taxonomyVocabulary.getTree = function (options) {
  try {
    // Build service call data string.
    var data = 'vid=' + encodeURIComponent(options.vid);

    // Build the options for the service call.
    options = {
      type: 'post',
      url: 'taxonomy_vocabulary/getTree.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/taxonomy_vocabulary.js');
    console.log('Object: services.taxonomyVocabulary.getTree - ' + error);
  }
};
