/*global services*/

/**
 * @file
 * Controls interactions with the services comment group.
 *
 * @todo Create validation for all passed in values?
 * @todo Add Drupal version checking.
 */

/**
 * Adds a new comment to a node and returns the cid.
 *
 * @param {object} options
 * @param {string} options.nid
 *        Required. The node ID the comment belongs to.
 * @param {string} options.body
 *        Required. The comment body you want to post.
 * @param {string} options.subject
 *        Optional. The title of the comment.
 * @param {string} options.language
 *        Optional. The language of the comment.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.comment.create = function (options) {
  try {
    // Set language if not defined.
    if (!options.language) {
      options.language = 'und';
    }

    // Build service call data string.
    var data  = 'nid=' + encodeURIComponent(options.nid);
        data += '&comment_body[' + options.language + '][0][value]=' + encodeURIComponent(options.body);
        data += '&subject=' + encodeURIComponent(options.subject);

    // Build the options for the service call.
    options = {
      type: 'post',
      url: 'comment.json',
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
    console.log('Error: services/comment.js');
    console.log('Object: services.comment.create - ' + error);
  }
};

/**
 * Returns a specified comment.
 *
 * @param {object} options
 * @param {string} options.cid
 *        Required. The Comment ID the comment you want.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.comment.retrieve = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'get',
      url: 'comment/' + options.cid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/comment.js');
    console.log('Object: services.comment.retrieve - ' + error);
  }
};

/**
 * Updates a comment and returns the cid.
 *
 * @param {object} options
 * @param {string} options.body
 *        Required. The comment body you want to post.
 * @param {string} options.subject
 *        Optional. The title of the comment.
 * @param {string} options.language
 *        Optional. The language of the comment.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.comment.update = function (options) {
  try {
    // Set language if not defined.
    if (!options.language) {
      options.language = 'und';
    }

    // Build service call data string.
    var data = 'comment_body[' + options.language + '][0][value]=' + encodeURIComponent(options.body);
        data += '&subject=' + encodeURIComponent(options.subject);

    // Build the options for the service call.
    options = {
      type: 'put',
      url: 'comment/' + options.cid + '.json',
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
    console.log('Error: services/comment.js');
    console.log('Object: services.comment.update - ' + error);
  }
};

/**
 * Delete a comment.
 *
 * @param {object} options
 * @param {string} options.cid
 *        Required. The comment ID to delete.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.comment.del = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'delete',
      url: 'comment/' + options.cid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/comment.js');
    console.log('Object: services.comment.del - ' + error);
  }
};

/**
 * Return an array of optionally paged cids based on a set of criteria.
 *
 * @example
 * An example request might look like
 *
 * http://domain/endpoint/comment?fields=cid,nid&amp;parameters[nid]=7&amp;parameters[uid]=2
 *
 * This would return an array of objects with only cid and nid defined
 * where nid = 7 and uid = 1.
 *
 * @todo Get parameters working.
 * @todo Figure out if parameters can be used without clean urls
 *
 * @param {object} options
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.comment.index = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'get',
      url: 'comment.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/comment.js');
    console.log('Object: services.comment.index - ' + error);
  }
};

/**
 * Returns the number of comments for a given node id.
 *
 * @param {object} options
 * @param {string} options.nid
 *        Required. The node ID the comment belongs to.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.comment.countAll = function (options) {
  try {
    // Build service call data string.
    var data = 'nid=' + options.nid;

    // Build the options for the service call.
    options = {
      type: 'post',
      url: 'comment/countAll.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/comment.js');
    console.log('Object: services.comment.countAll - ' + error);
  }
};

/**
 * Returns the number of new comments on a given node id since timestamp.
 *
 * @param {object} options
 * @param {string} options.nid
 *        Required. The node ID the comment belongs to.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.comment.countNew = function (options) {
  try {
    // Build service call data string.
    var data  = 'nid=' + options.nid;
        data += '&since=' + options.since;

    // Build the options for the service call.
    options = {
      type: 'post',
      url: 'comment/countNew.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/comment.js');
    console.log('Object: services.comment.countAll - ' + error);
  }
};
