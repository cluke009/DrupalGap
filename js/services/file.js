/**
 * @file
 * Controls interactions with the services file group.
 *
 * @todo  Create validation for all passed in values?
 * @todo  Add Drupal version checking.
 * @todo  Many calls will take additional parameters.
 */

// global variables used to hold the latest system resource call results
var drupal_services_file_node_files_result;

/**
 * Adds a new file and returns the fid.
 *
 * @type {Object}
 */
var drupal_services_file_create = {
  "resource_path": "file.json",
  "resource_type": "post",

  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = "file=" + encodeURIComponent(caller_options.file);
      data += "&filename=" + encodeURIComponent(caller_options.filename);

      // Make the call.
      options = {
        "resource_path": this.resource_path,
        "type": this.resource_type,
        "async": true,
        "data": data,
        "error": function (jqXHR, textStatus, errorThrown) {},
        "success": function (data) {},
      };

      // Attach error/success hooks if provided.
      if (caller_options.error) {
        options.hook_error = caller_options.error;
      }
      if (caller_options.success) {
        options.hook_success = caller_options.success;
      }

      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("Error: services/file.js");
      console.log("Object: drupal_services_file_create - " + error);
    }
  }
};

/**
 * Get a given file
 *
 * @type {Object}
 */
var drupal_services_file_retrieve = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "file/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/file.js 'options.cid' is not a number.");
    }
  },
  "resource_type": "get",

  "resource_call": function (caller_options) {
    try {
      // Build the options for the service call.
      options = {
        "resource_path": this.resource_path(caller_options.fid),
        "type": this.resource_type,
        "async": true,
        "error": function (jqXHR, textStatus, errorThrown) {},
        "success": function (data) {}
      }

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
      console.log("Error: services/file.js");
      console.log("Object: drupal_services_file_retrieve - " + error);
    }
  },

  "local_storage_remove": function (options) {
    // Removes a file from local storage.
    type = this.resource_type;
    resource_path = this.resource_path(options);
    key = drupal_services_default_local_storage_key(type, resource_path);
    window.localStorage.removeItem(key);
    console.log("Removed from local storage (" + key + ")");
  },
};

/**
 * Delete a file. Returns true/nid if delete was successful.
 *
 * @type {Object}
 */
var drupal_services_file_delete = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "file/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/file.js 'options.fid' is not a number.");
    }
  },
  "resource_type": "delete",

  "resource_call": function (caller_options) {
    try {
      // Build the options for the service call.
      options = {
        "resource_path": this.resource_path(caller_options.fid),
        "type": this.resource_type,
        "async": true,
        "success": this.success,
        "error": this.error
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
      console.log("Error: services/file.js");
      console.log("Object: drupal_services_file_delete - " + error);
    }
  },
  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.log(errorThrown);
    }
    else {
      console.log(textStatus);
    }
  },

  "success": function (data) {},
};

/**
 * Return an array of optionally paged fids based on a set of criteria.
 *
 * An example request might look like
 *
 * http://domain/endpoint/file?fields=fid,filename&parameters[fid]=7&parameters[uid]=1
 *
 * This would return an array of objects with only fid and filename defined, where
 * fid = 7 and uid = 1.
 *
 * @type {Object}
 */
var drupal_services_file_index = {
  "resource_path": "file.json",
  "resource_type": "get",

  "resource_call": function (caller_options) {
    try {
      // Build the service resource call options.
      options = {
        "resource_path": this.resource_path,
        "type": this.resource_type,
        "async": true,
        "error": this.error,
        "success": this.success,
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
      console.log("Error: services/file.js");
      console.log("Object: drupal_services_file_index - " + error);
    }
  },

  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.log(errorThrown);
    }
    else {
      console.log(textStatus);
    }
  },

  "success": function (data) {},
};

/**
 * Adds new files and returns the files array.
 *
 * @type {Object}
 */
var drupal_services_file_create_raw = {
  "resource_path": "file.json",
  "resource_type": "post",

  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = "file=" + encodeURIComponent(caller_options.file);
      data += "&filename=" + encodeURIComponent(caller_options.filename);

      // Make the call.
      options = {
        "resource_path": this.resource_path,
        "type": this.resource_type,
        "async": true,
        "data": data,
        "error": function (jqXHR, textStatus, errorThrown) {},
        "success": function (data) {},
      };

      // Attach error/success hooks if provided.
      if (caller_options.error) {
        options.hook_error = caller_options.error;
      }
      if (caller_options.success) {
        options.hook_success = caller_options.success;
      }

      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("Error: services/file.js");
      console.log("Object: drupal_services_file_create_raw - " + error);
    }
  }
};
