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
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
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
    var props = {
      type: 'post',
      url: 'taxonomy_term.json',
      async: true,
      data: data,
      fields: options.fields
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
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
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
 *        Success handler hook.
 */
services.taxonomyTerm.retrieve = function (options) {
  try {
    // Build the options for the service call.
    var props = {
      type: 'get',
      url: 'taxonomy_term/' + options.tid + '.json',
      async: true
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
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
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
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
    var props = {
      type: 'put',
      url: 'taxonomy_term/' + options.tid + '/.json',
      async: true,
      data: data,
      fields: options.fields
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
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
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
 *        Success handler hook.
 */
services.taxonomyTerm.del = function (options) {
  try {
    // Build the options for the service call.
    var props = {
      type: 'delete',
      url: 'taxonomy_term/' + options.tid + '.json',
      async: true
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
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
 * @param {object} options
 * @param {array} options.fields
 *        An array of fields to pass in the url.
 * @param {object} options.param
 *        A json object containing url parameters.
 *
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
 *        Success handler hook.
 */
services.taxonomyTerm.index = function (options) {
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
          args += $.trim(fields[i]) + ',';
        }
        else {
          args += $.trim(fields[i]);
        }
      }
    }

    // Append parameters to url.
    var params = options.params;
    var args1 = '';
    if (params) {
      for (var k in params) {
        if (params.hasOwnProperty(k)) {
          args1 += '&parameters[' + $.trim(k) + ']=' + $.trim(params[k]);
        }
      }
    }

    // Build the options for the service call.
    var props = {
      type: 'get',
      url: 'taxonomy_term.json?' + args + args1,
      async: true
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
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
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
 *        Success handler hook.
 */
services.taxonomyTerm.selectNodes = function (options) {
  try {
    // Build service call data string.
    var data = 'tid=' + encodeURIComponent(options.tid);

    // Build the options for the service call.
    var props = {
      type: 'post',
      url: 'taxonomy_term/selectNodes.json',
      async: true,
      data: data
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
  }
  catch (error) {
    console.log('Error: services/taxonomy_term.js');
    console.log('Object: services.taxonomyTerm.selectNodes - ' + error);
  }
};
