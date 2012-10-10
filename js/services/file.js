/*global services*/

/**
 * @file
 * Controls interactions with the services file group.
 *
 * @todo Create validation for all passed in values?
 * @todo Add Drupal version checking.
 * @todo Many calls will take additional parameters.
 */

/**
 * Creates a file with base64 encoded data.
 *
 * @param {Object} options
 * @param {string} options.file
 *        Required. A Base64 encoded file.
 * @param {string} options.filename
 *        Required. The filename with extension.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.file.create = function (options) {
  try {
    // Build service call data string.
    var data  = 'file=' + encodeURIComponent(options.file);
        data += '&filename=' + encodeURIComponent(options.filename);

    // Build the options for the service call.
    options = {
      type: 'post',
      url: 'file.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/file.js');
    console.log('Object: services.file.create - ' + error);
  }
};

/**
 * Get a given file.
 *
 * @param {Object} options
 * @param {string} options.fid
 *        Required. The file ID to retrieve.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.file.retrieve = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'get',
      url: 'file/' + options.fid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/file.js');
    console.log('Object: services.file.retrieve - ' + error);
  }
};

/**
 * Deletes a file.
 *
 * @param {Object} options
 * @param {string} options.fid
 *        Required. The file ID to retrieve.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.file.del = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'delete',
      url: 'file/' + options.fid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/file.js');
    console.log('Object: services.file.del - ' + error);
  }
};

/**
 * Return an array of optionally paged fids based on a set of criteria.
 *
 * @example
 * An example request might look like
 *
 * http://domain/endpoint/file?fields=fid,filename&amp;parameters[fid]=7&amp;parameters[uid]=1
 *
 * This would return an array of objects with only fid and filename defined, where
 * fid = 7 and uid = 1.
 *
 * @todo Get parameters working.
 * @todo Figure out if parameters can be used without clean urls.
 *
 * @param {Object} options
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.file.index = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'get',
      url: 'file/' + options.fid + '.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/file.js');
    console.log('Object: services.file.index - ' + error);
  }
};

/**
 * Adds new files and returns the files array.
 *
 * @param {Object} options
 * @param {string} options.file
 *        Required. A Base64 encoded file.
 * @param {string} options.filename
 *        Required. The filename with extension.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
services.file.createRaw = function (options) {
  try {
    // Build service call data string.
    var data  = 'file=' + encodeURIComponent(options.file);
        data += '&filename=' + encodeURIComponent(options.filename);

    // Build the options for the service call.
    options = {
      type: 'post',
      url: 'file.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/file.js');
    console.log('Object: services.file.createRaw - ' + error);
  }
};
