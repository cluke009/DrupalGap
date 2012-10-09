/**
 * @file
 * Controls interactions with the services system group.
 */

/**
 * @constructor
 * @description Makes a Service call to Drupal's System Connect resource.
 */
var drupal_services_system_connect = {
  /**
   * Resource URL. "system/connect.json"
   */
  "resource_path": "system/connect.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service System Connect Resource.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Build the options for the service call.
      options = {
        "resource_path": this.resource_path,
        "async": true,
        "success": this.success,
        "error": this.error,
      };

      // Attach error/success hooks if provided.
      if (caller_options.error) {
        options.hook_error = caller_options.error;
      }
      if (caller_options.success) {
        options.hook_success = caller_options.success;
      }

      // Make the service call.
      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("Error: services/system.js");
      console.log("Object: drupal_services_system_connect - " + error);
    }
  },

  /**
   * Error Handler
   */
  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.error(errorThrown);
    }
    else {
      console.log(textStatus);
    }
  },

  /**
   * Success handler
   */
  "success": function (data) {},

  /**
   * Removes a system connect from local storage.
   */
  "local_storage_remove": function () {
    type = this.resource_type;
    resource_path = this.resource_path;
    key = drupal_services_default_local_storage_key(type, resource_path);
    window.localStorage.removeItem(key);
    console.log("Removed from local storage (" + key + ")");
  },
};

/**
 * @constructor
 * @description Makes a Service call to Drupal's System Get Variable resource.
 */
var drupal_services_system_get_variable = {
  /**
   * Resource URL. "system/get_variable.json"
   */
  "resource_path": "system/get_variable.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service System Get Variable Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.name
   *        Required. The name of the variable you want.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = "name=" + encodeURIComponent(caller_options.name);

      // Build the options for the service call.
      options = {
        "resource_path": this.resource_path,
        "async": true,
        "success": this.success,
        "error": this.error,
        "data": data
      };

      // Attach error/success hooks if provided.
      if (caller_options.error) {
        options.hook_error = caller_options.error;
      }
      if (caller_options.success) {
        options.hook_success = caller_options.success;
      }

      // Make the service call.
      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("Error: services/system.js");
      console.log("Object: drupal_services_system_get_variable - " + error);
    }
  },

  /**
   * Error Handler
   */
  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.error(errorThrown);
    }
    else {
      console.log(textStatus);
    }
  },

  /**
   * Success handler
   */
  "success": function (data) {},

  /**
   * Removes the variable from local storage.
   */
  "local_storage_remove": function () {
    type = this.resource_type;
    resource_path = this.resource_path;
    key = drupal_services_default_local_storage_key(type, resource_path);
    window.localStorage.removeItem(key);
    console.log("Removed from local storage (" + key + ")");
  },
};

/**
 * @constructor
 * @description Makes a Service call to Drupal's System Set Variable resource.
 */
var drupal_services_system_set_variable = {
  /**
   * Resource URL. "system/set_variable.json"
   */
  "resource_path": "system/set_variable.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service System Set Variable Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.name
   *        Required. The name of the variable you want to edit.
   * @param {string} caller_options.value
   *        Required. The replacement value of the variable.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = 'name=' + encodeURIComponent(caller_options.name);
      data += '&value=' + encodeURIComponent(caller_options.value);

      // Build options for service call.
      options = {
        "load_from_local_storage": "0",
        "resource_path": this.resource_path,
        "async": true,
        "success": this.success,
        "error": this.error,
        "data": data
      };

      // Attach error/success hooks if provided.
      if (caller_options.error) {
        options.hook_error = caller_options.error;
      }
      if (caller_options.success) {
        options.hook_success = caller_options.success;
      }

      // Make the service call.
      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("errorThrown: drupal_services_system_set_variable.resource_call");
      console.error(error);
    }
  },

  /**
   * Error Handler
   */
  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.error(errorThrown);
    }
    else {
      console.log(textStatus);
    }
  },

  /**
   * Success handler
   */
  "success": function (data) {},
};

/**
 * @constructor
 * @description Makes a Service call to Drupal's System Del Variable resource.
 */
var drupal_services_system_del_variable = {
  /**
   * Resource URL. "system/del_variable.json"
   */
  "resource_path": "system/del_variable.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service System Set Variable Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.name
   *        Required. The name of the variable you want to delete.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = "name=" + encodeURIComponent(caller_options.name);

      // Set default options.
      options = {
        "load_from_local_storage": "0",
        "resource_path": this.resource_path,
        "async": true,
        "success": this.success,
        "error": this.error,
        "data": data
      };

      // Attach error/success hooks if provided.
      if (caller_options.error) {
        options.hook_error = caller_options.error;
      }
      if (caller_options.success) {
        options.hook_success = caller_options.success;
      }

      // Make the service call.
      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("Error: services/system.js");
      console.log("Object: drupal_services_system_del_variable - " + error);
    }
  },

  /**
   * Error handler.
   */
  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.error(errorThrown);
    }
    else {
      console.log(textStatus);
    }
  },

  /**
   * Success handler.
   */
  "success": function (data) {},
};
