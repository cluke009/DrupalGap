/*global services*/

/**
 * @file
 * Link general system functionalities to services module.
 *
 * @example
 * // Build service call options.
 * options = {
 *   "name": $('#input_system_get_variable').val(),
 *   "value": $('#input_system_set_variable').val(),
 *   "success": function () {},
 *   "error": function () {}
 * };
 *
 * // Make service call.
 * services.system.setVariable(options);
 */

/**
 * An object with an active session name and id.
 *
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.success
 *        Success handler hook.
 */
services.system.connect = function (options) {
  try {
    // Build the options for the service call.
    var props = {
      type: 'post',
      url: 'system/connect.json',
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
    console.log('Error: services/system.js');
    console.log('Object: drupal_services_system_connect - ' + error);
  }
};

/**
 * Returns the value of a system variable using variable_get().
 *
 * @param {object} options
 * @param {string} options.name
 *        Required. The name of the variable you want.
 *
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.success
 *        Success handler hook.
 * @param {string} options.complete
 *        Complete handler hook.
 */
services.system.getVariable = function (options) {
  try {
    // Build service call data string.
    var data = 'name=' + encodeURIComponent(options.name);

    // Build the options for the service call.
    var props = {
      type: 'post',
      url: 'system/get_variable.json',
      async: true,
      data: data
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.error){
        props.error = options.error;
      }
      if (options.success){
        props.success = options.success;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
  }
  catch (error) {
    console.log('Error: services/system.js');
    console.log('Object: services.system.getVariable - ' + error);
  }
};

/**
 * Sets the value of a system variable using variable_set().
 *
 * @param {object} options
 * @param {string} options.name
 *        Required. The name of the variable you want to edit.
 * @param {string} options.value
 *        Optional. The replacement value of the variable.
 *
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.success
 *        Success handler hook.
 * @param {string} options.complete
 *        Complete handler hook.
 */
services.system.setVariable = function (options) {
  try {
    // Build service call data string.
    var data  = 'name=' + encodeURIComponent(options.name);
        data += '&value=' + encodeURIComponent(options.value);

    // Build the options for the service call.
    var props = {
      type: 'post',
      url: 'system/set_variable.json',
      async: true,
      data: data
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.error){
        props.error = options.error;
      }
      if (options.success){
        props.success = options.success;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
  }
  catch (error) {
    console.log('Error: services/system.js');
    console.log('Object: services.system.setVariable - ' + error);
  }
};

/**
 * Deletes a system variable using variable_del().
 *
 * @param {object} options
 * @param {string} options.name
 *        Required. The name of the variable you want to delete.
 *
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.success
 *        Success handler hook.
 * @param {string} options.complete
 *        Complete handler hook.
 */
services.system.delVariable = function (options) {
  try {
    // Build service call data string.
    var data = 'name=' + encodeURIComponent(options.name);

    // Build the options for the service call.
    var props = {
      type: 'post',
      url: 'system/del_variable.json',
      async: true,
      data: data
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.error){
        props.error = options.error;
      }
      if (options.success){
        props.success = options.success;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
  }
  catch (error) {
    console.log('Error: services/system.js');
    console.log('Object: services.system.setVariable - ' + error);
  }
};
