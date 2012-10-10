/*global services*/

/**
 * @file
 * Controls interactions with the services node group.
 *
 * @todo Create validation for all passed in values?
 * @todo Add Drupal version checking.
 * @todo Merge create/update objects?
 */

/**
 * Creates a new node based on submitted values.
 *
 * Note that this function uses drupal_execute() to create new nodes,
 * which may require very specific formatting. The full implications of this
 * are beyond the scope of this comment block. The Googles are your friend.
 *
 * @param {Object} options
 * @param {string} options.type
 *        Required. The content type of the node.
 * @param {string} options.title
 *        Required. The title of the node.
 * @param {string} options.body
 *        Optional. The body of the node.
 * @param {string} options.language
 *        Optional. The language of the node.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.node.create = function (options) {
  try {
    // Set language if not defined.
    if (!options.language) {
      options.language = 'und';
    }

    // Build service call data string.
    var data  = 'type=' + encodeURIComponent(options.type);
        data += '&title=' + encodeURIComponent(options.title);
        data += '&body[' + options.language + '][][value]=' + encodeURIComponent(options.body);
        data += '&language=' + encodeURIComponent(options.language);

    // Build the options for the service call.
    options = {
      type: 'post',
      url: 'node.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/node.js');
    console.log('Object: services.node.create - ' + error);
  }
};

/**
 * Returns a specified node by ID.
 *
 * @param {Object} options
 * @param {string} options.nid
 *        Required. The node ID the comment belongs to.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.node.retrieve = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'get',
      url: 'node/' + options.nid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/node.js');
    console.log('Object: services.node.retrieve - ' + error);
  }
};

/**
 * Updates a specified node based on submitted values.
 *
 * @param {Object} options
 * @param {string} options.type
 *        Required. The content type of the node.
 * @param {string} options.title
 *        Required. The title of the node.
 * @param {string} options.body
 *        Optional. The body of the node.
 * @param {string} options.language
 *        Optional. The language of the node.
 * @param {string} options.nid
 *        Optional. Node ID.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.node.update = function (options) {
  try {
    // Set language if not defined.
    if (!options.language) {
      options.language = 'und';
    }

    // Build service call data string.
    var data  = 'type=' + encodeURIComponent(options.type);
        data += '&title=' + encodeURIComponent(options.title);
        data += '&body[' + options.language + '][][value]=' + encodeURIComponent(options.body);
        data += '&language=' + encodeURIComponent(options.language);

    // Build the options for the service call.
    options = {
      type: 'put',
      url: 'node/' + options.nid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/node.js');
    console.log('Object: services.node.update - ' + error);
  }
};

/**
 * Delete a node given its nid. Returns true if delete was successful.
 *
 * @param {Object} options
 * @param {string} options.nid
 *        Required. The node ID.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.node.del = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'delete',
      url: 'node/' + options.nid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/node.js');
    console.log('Object: services.node.del - ' + error);
  }
};

/**
 * Return an array of optionally paged nids based on a set of criteria.
 *
 * @example
 * An example request might look like
 *
 * http://domain/endpoint/node?fields=nid,vid&amp;parameters[nid]=7&amp;parameters[uid]=1
 *
 * This would return an array of objects with only nid and vid defined, where
 * nid = 7 and uid = 1.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.node.index = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'get',
      url: 'node.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/node.js');
    console.log('Object: services.node.index - ' + error);
  }
};

/**
 * Generates an array of base64 encoded files attached to a node.
 *
 * @param {Object} options
 * @param {string} options.nid
 *        Required. The node ID.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.node.getFiles = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'get',
      url: 'node/' + options.nid + '/files.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/node.js');
    console.log('Object: services.node.getFiles - ' + error);
  }
};

/**
 * Returns the comments of a specified node.
 *
 * @param {Object} options
 * @param {string} options.nid
 *        Required. The node ID.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.node.comments = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'get',
      url: 'node/' + options.nid + '/comments.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/node.js');
    console.log('Object: services.node.getFiles - ' + error);
  }
};
