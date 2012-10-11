/*global services*/

/**
 * @file
 * Controls interactions with the services taxonomy_term group.
 *
 * @todo Create validation for all passed in values?
 * @todo Add Drupal version checking.
 * @todo Merge create/update objects?
 */

/**
 * Creates a new taxonomy_term based on submitted values. Returns 1 if successful.
 *
 * @param {object} options
 * @param {string} options.vid
 *        Required. The Vocabulary to insert the term in.
 * @param {string} options.name
 *        Required. Name of the term.
 * @param {string} options.description
 *        Optional. Description of the term.
 * @param {string} options.weight
 *        Optional. Weight of the term.
 * @param {string} options.parent
 *        Optional. Parent term ID.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.taxonomyTerm.create = function (options) {
  try {
    // Build service call data string.
    var data  = 'vid=' + encodeURIComponent(options.vid);
        data += '&name=' + encodeURIComponent(options.name);
        data += '&description=' + encodeURIComponent(options.description);
        data += '&weight=' + encodeURIComponent(options.weight);
        data += '&parent=' + encodeURIComponent(options.parent);

    // Build the options for the service call.
    options = {
      type: 'post',
      url: 'taxonomy_term.json',
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
    console.log('Error: services/taxonomy_term.js');
    console.log('Object: services.taxonomyTerm.create - ' + error);
  }
};

/**
 * Return the results for a specified term id or FALSE if term id does not exist.
 *
 * @param {object} options
 * @param {string} options.tid
 *        Required. Term ID.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.taxonomyTerm.retrieve = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'get',
      url: 'taxonomy_term/' + options.tid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/taxonomy_term.js');
    console.log('Object: services.taxonomyTerm.retrieve - ' + error);
  }
};

/**
 * Updates a specified taxonomy_term based on submitted values.
 *
 * @param {object} options
 * @param {string} options.vid
 *        Optional. The Vocabulary to insert the term in.
 * @param {string} options.tid
 *        Required. The term ID.
 * @param {string} options.name
 *        Optional. Name of the term.
 * @param {string} options.description
 *        Optional. Description of the term.
 * @param {string} options.weight
 *        Optional. Weight of the term.
 * @param {string} options.parent
 *        Optional. Parent term ID.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.taxonomyTerm.update = function (options) {
  try {
    // Build service call data string.
    var data  = 'vid=' + encodeURIComponent(options.vid);
        data += '&name=' + encodeURIComponent(options.name);
        data += '&description=' + encodeURIComponent(options.description);
        data += '&weight=' + encodeURIComponent(options.weight);
        data += '&parent=' + encodeURIComponent(options.parent);

    // Build the options for the service call.
    options = {
      type: 'put',
      url: 'taxonomy_term/' + options.tid + '/.json',
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
    console.log('Error: services/taxonomy_term.js');
    console.log('Object: services.taxonomyTerm.update - ' + error);
  }
};


/**
 * Deletes the specified taxonomy_term. Returns true if delete was successful.
 *
 * @param {object} options
 * @param {string} options.tid
 *        Required. The Term ID.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.taxonomyTerm.del = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'delete',
      url: 'taxonomy_term/' + options.tid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/taxonomy_term.js');
    console.log('Object: services.taxonomyTerm.del - ' + error);
  }
};

/**
 * Return an array of optionally paged tids baed on a set of criteria.
 *
 * @example
 * An example request might look like
 *
 * http://domain/endpoint/taxonomy_term?fields=tid,name&parameters[tid]=7&parameters[vid]=1
 *
 * This would return an array of objects with only tid and name defined, where
 * tid = 7 and vid = 1.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.taxonomyTerm.index = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'get',
      url: 'taxonomy_term.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/taxonomy_term.js');
    console.log('Object: services.taxonomyTerm.index - ' + error);
  }
};

/**
 * Returns all nodes with provided taxonomy id.
 *
 * @param {object} options
 * @param {string} options.tid
 *        Required. The term ID.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.taxonomyTerm.selectNodes = function (options) {
  try {
    // Build service call data string.
    var data = 'tid=' + encodeURIComponent(options.tid);

    // Build the options for the service call.
    options = {
      type: 'post',
      url: 'taxonomy_term/selectNodes.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/taxonomy_term.js');
    console.log('Object: services.taxonomyTerm.selectNodes - ' + error);
  }
};
