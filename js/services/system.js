/**
 * @file
 * Controls interactions with the services system group.
 */

/**
 * Makes a Service call to Drupal's System Connect resource.
 *
 * @type {Object}
 */
var drupal_services_system_connect = {
  "resource_path": "system/connect.json",
  "resource_type": "post",

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
      console.log("Error: services/node.js");
      console.log("Object: drupal_services_system_connect - " + error);
    }
  },

  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.error(errorThrown);
    }
    else {
      console.log(textStatus);
    }
  },

  "success": function (data) {},

  "local_storage_remove": function () {
    type = this.resource_type;
    resource_path = this.resource_path;
    key = drupal_services_default_local_storage_key(type, resource_path);
    window.localStorage.removeItem(key);
    console.log("Removed from local storage (" + key + ")");
  },
};

/**
 * Makes a Service call to Drupal's System Get Variable resource.
 *
 * @type {Object}
 */
var drupal_services_system_get_variable = {
  "resource_path": "system/get_variable.json",
  "resource_type": "post",

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
      console.log("Error: services/node.js");
      console.log("Object: drupal_services_system_get_variable - " + error);
    }
  },

  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.error(errorThrown);
    }
    else {
      console.log(textStatus);
    }
  },

  "success": function (data) {},

  "local_storage_remove": function () {
    // Removes the variable from local storage.
    type = this.resource_type;
    resource_path = this.resource_path;
    key = drupal_services_default_local_storage_key(type, resource_path);
    window.localStorage.removeItem(key);
    console.log("Removed from local storage (" + key + ")");
  },
};

/**
 * Makes a Service call to Drupal's System Set Variable resource.
 *
 * @type {Object}
 */
var drupal_services_system_set_variable = {
  "resource_path": "system/set_variable.json",
  "resource_type": "post",

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

  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.error(errorThrown);
    }
    else {
      console.log(textStatus);
    }
  },

  "success": function (data) {},
};

/**
 * Makes a Service call to Drupal's System Del Variable resource.
 *
 * @type {Object}
 */
var drupal_services_system_del_variable = {
  "resource_path": "system/del_variable.json",
  "resource_type": "post",

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
      console.log("errorThrown: drupal_services_system_set_variable.resource_call");
      console.error(error);
    }
  },

  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.error(errorThrown);
    }
    else {
      console.log(textStatus);
    }
  },

  "success": function (data) {},
};
