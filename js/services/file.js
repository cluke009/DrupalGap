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
 * @constructor
 * @description Adds a new file and returns the fid.
 */
var drupal_services_file_create = {
 /**
   * Resource URL. "file.json"
   */
  "resource_path": "file.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service File Create Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.file
   *        Required. A Base64 encoded file.
   * @param {string} caller_options.filename
   *        Required. The filename with extension.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
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
 * @constructor
 * @description Get a given file
 */
var drupal_services_file_retrieve = {
  /**
   * Resource URL. "file/fid.json"
   * @param {string} options
   *        Accepts File ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "file/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/file.js 'options.cid' is not a number.");
    }
  },

  /**
   * Default Method: GET
   */
  "resource_type": "get",

  /**
   * Make a call to a Drupal Service File Retrieve Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.fid
   *        Required. The file ID to retrieve.
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

  /**
   * Removes a file from local storage.
   */
  "local_storage_remove": function (options) {
    type = this.resource_type;
    resource_path = this.resource_path(options);
    key = drupal_services_default_local_storage_key(type, resource_path);
    window.localStorage.removeItem(key);
    console.log("Removed from local storage (" + key + ")");
  },
};

/**
 * @constructor
 * @description Delete a file. Returns true/nid if delete was successful.
 */
var drupal_services_file_delete = {
  /**
   * Resource URL. "file/fid.json"
   * @param {string} options
   *        Accepts File ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "file/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/file.js 'options.fid' is not a number.");
    }
  },

  /**
   * Default Method: DELETE
   */
  "resource_type": "delete",

  /**
   * Make a call to a Drupal Service File Delete Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.fid
   *        Required. The file ID to retrieve.
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
 * @constructor
 * @description
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
 */
var drupal_services_file_index = {
  /**
   * Resource URL.
   */
  "resource_path": "file.json",

  /**
   * Default Method: GET
   */
  "resource_type": "get",

  /**
   * Make a call to a Drupal Service File Index Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
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

  /**
   * Error handler.
   */
  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.log(errorThrown);
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

/**
 * @constructor
 * @description Adds new files and returns the files array.
 */
var drupal_services_file_create_raw = {
  /**
   * Resource URL. "file.json"
   */
  "resource_path": "file.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service File Create Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.file
   *        Required. A Base64 encoded file.
   * @param {string} caller_options.filename
   *        Required. The filename with extension.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
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
