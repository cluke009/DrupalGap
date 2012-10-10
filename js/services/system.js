/**
 * @file
 * Link general system functionalities to services module.
 */

/**
 * @constructor
 * @description Handle ajax calls to services system group.
 */
var system = services.system = {};

/**
 * An object with an active session name and id.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
system.connect = function (options) {
  try {
    // Build the options for the service call.
    options = {
      resourceType: 'post',
      resourcePath: 'system/connect.json',
      async: true,
      success: this.hookSuccess,
      error: this.hookError
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/system.js');
    console.log('Object: drupal_services_system_connect - ' + error);
  }
};

/**
 * Returns the value of a system variable using variable_get().
 *
 * @param {Object} options
 * @param {string} options.name
 *        Required. The name of the variable you want.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
system.getVariable = function (options) {
  try {
    // Build service call data string.
    var data = 'name=' + encodeURIComponent(options.name);

    // Build the options for the service call.
    options = {
      resourcePath: 'system/get_variable.json',
      resourceType: 'post',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data
    };

    // Attach error/success hooks if provided.
    if (options.error) {
      options.hookError = options.error;
    }
    if (options.success) {
      options.hookSuccess = options.success;
    }

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/system.js');
    console.log('Object: services.system.getVariable - ' + error);
  }
};

/**
 * Sets the value of a system variable using variable_set().
 *
 * @param {Object} options
 * @param {string} options.name
 *        Required. The name of the variable you want to edit.
 * @param {string} options.value
 *        Optional. The replacement value of the variable.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
system.setVariable = function (options) {
  try {
    // Build service call data string.
    var data  = 'name=' + encodeURIComponent(options.name);
        data += '&value=' + encodeURIComponent(options.value);

    // Build the options for the service call.
    options = {
      resourcePath: 'system/set_variable.json',
      resourceType: 'post',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/system.js');
    console.log('Object: services.system.setVariable - ' + error);
  }
};

/**
 * Deletes a system variable using variable_del()
 *
 * @param {Object} options
 * @param {string} options.name
 *        Required. The name of the variable you want to delete.
 *
 * @param {string} options.hookError
 *        Error handler hook.
 * @param {string} options.hookSuccess
 *        Success handler hook.
 */
system.delVariable = function (options) {
  try {
    // Build service call data string.
    var data = 'name=' + encodeURIComponent(options.name);

    // Build the options for the service call.
    options = {
      resourcePath: 'system/set_variable.json',
      resourceType: 'post',
      async: true,
      success: this.hookSuccess,
      error: this.hookError,
      data: data
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: services/system.js');
    console.log('Object: services.system.setVariable - ' + error);
  }
};
