/**
 * @file
 * Controls interactions with the services node group.
 *
 * @todo Create validation for all passed in values?
 * @todo Add Drupal version checking.
 */

// Global variables used to hold the latest system resource call results.
var drupalgap_services_node_update_result;
var drupalgap_services_node_delete_result;

/**
 * @constructor
 * @description Returns a specified node by ID.
 */
var drupal_services_node_retrieve = {
  /**
   * Resource URL. "node/nid.json"
   * @param {string} options
   *        Accepts node ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "node/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/node.js 'options.nid' is not a number.");
    }
  },

  /**
   * Default Method: GET
   */
  "resource_type": "get",

  /**
   * Make a call to a Drupal Service Node Retrieve Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.nid
   *        Required. The node ID the comment belongs to.
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
        "resource_path": this.resource_path(caller_options.nid),
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

      // Retrieve the node.
      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("Error: services/node.js");
      console.log("Object: drupal_services_node_retrieve - " + error);
    }
  },

  /**
   * Error Handler
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
   * Success handler
   */
  "success": function (data) {},

  /**
   * Removes a node from local storage.
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
 * @description Creates a new node based on submitted values.
 */
var drupal_services_node_create = {
  /**
   * Resource URL. "node.json"
   */
  "resource_path": "node.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service Node Create Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.type
   *        Required. The content type of the node.
   * @param {string} caller_options.title
   *        Required. The title of the node.
   * @param {string} caller_options.body
   *        Optional. The body of the node.
   * @param {string} caller_options.language
   *        Optional. The language of the node.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = "type=" + encodeURIComponent(caller_options.type);
      data += "&title=" + encodeURIComponent(caller_options.title);
      data += "&body=" + encodeURIComponent(caller_options.body);
      data += "&language=" + encodeURIComponent(caller_options.language);

      // Build options for service call.
      options = {
        "resource_path": this.resource_path,
        "type": this.resource_type,
        "data": data,
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

      // Make the service call to the node create resource.
      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("Error: services/node.js");
      console.log("Object: drupal_services_node_create - " + error);
    }
  },

  /**
   * Error Handler
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
   * Success handler
   */
  "success": function (data) {},
};

/**
 * @constructor
 * @description Updates a specified node based on submitted values.
 */
var drupal_services_node_update = {
  /**
   * Resource URL. "node/nid.json"
   * @param {string} options
   *        Accepts node ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "node/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/node.js 'options.nid' is not a number.");
    }
  },

  /**
   * Default Method: PUT
   */
  "resource_type": "put",

  /**
   * Make a call to a Drupal Service Node Create Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.type
   *        Required. The content type of the node.
   * @param {string} caller_options.title
   *        Required. The title of the node.
   * @param {string} caller_options.body
   *        Optional. The body of the node.
   * @param {string} caller_options.language
   *        Optional. The language of the node.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Set language if not defined.
      if (!caller_options.language) {
        caller_options.language = 'und';
      }
      // Build the data string and options for the service call.
      data = "body[" + caller_options.language + "][][value]=" + encodeURIComponent(caller_options.body);
      data += "&type=" + caller_options.type;
      data += "&title=" + encodeURIComponent(caller_options.title);
      data += "&language=" + encodeURIComponent(caller_options.language);

      // Build options for service call.
      options = {
        "resource_path": this.resource_path(caller_options.nid),
        "type": this.resource_type,
        "data": data,
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
      console.log("Error: services/node.js");
      console.log("Object: drupal_services_node_update - " + error);
    }
  },

  /**
   * Error Handler
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
   * Success handler
   */
  "success": function (data) {},
};

/**
 * @constructor
 * @description Delete a node given its nid. Returns true if delete was successful.
 */
var drupal_services_node_delete = {
  /**
   * Resource URL. "node/nid.json"
   * @param {string} options
   *        Accepts node ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "node/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/node.js 'options.nid' is not a number.");
    }
  },

  /**
   * Default Method: DELETE
   */
  "resource_type": "delete",

  /**
   * Make a call to a Drupal Service Node Delete Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.nid
   *        Required. The node ID.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Build the options to the service call.
      options = {
        "resource_path": this.resource_path(caller_options.nid),
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
      console.log("Error: services/node.js");
      console.log("Object: drupal_services_node_delete - " + error);
    }
  },

  /**
   * Error Handler
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
   * Success handler
   */
  "success": function (data) {},
};

/**
 * @constructor
 * @description Return an array of optionally paged nids based on a set of criteria.
 *
 * @example
 * An example request might look like
 *
 * http://domain/endpoint/node?fields=nid,vid&amp;parameters[nid]=7&amp;parameters[uid]=1
 *
 * This would return an array of objects with only nid and vid defined, where
 * nid = 7 and uid = 1.
 */
var drupal_services_node_index = {
  /**
   * Resource URL. "node.json"
   */
  "resource_path": "node.json",

  /**
   * Default Method: GET
   */
  "resource_type": "get",

  /**
   * Make a call to a Drupal Service Node Index Resource.
   *
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
      console.log("Error: services/node.js");
      console.log("Object: drupal_services_node_index - " + error);
    }
  },

  /**
   * Error Handler
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
   * Success handler
   */
  "success": function (data) {},
};

/**
 * @constructor
 * @description Generates an array of base64 encoded files attached to a node.
 */
var drupal_services_node_files = {
  /**
   * Resource URL. "node/nid.json"
   * @param {string} options
   *        Accepts node ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "node/" + encodeURIComponent(options) + "/files.json";
    }
    else {
      console.log("Error: services/node.js 'options.nid' is not a number.");
    }
  },

  /**
   * Default Method: GET
   */
  "resource_type": "get",

  /**
   * Make a call to a Drupal Service Node Files Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.nid
   *        Required. The node ID.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Build the options to the service call.
      options = {
        "resource_path": this.resource_path(caller_options.nid),
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
      console.log("Error: services/node.js");
      console.log("Object: drupal_services_node_files - " + error);
    }
  },

  /**
   * Error Handler
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
   * Success handler
   */
  "success": function (data) {},
};

/**
 * Returns the comments of a specified node.
 *
 * @type {Object}
 */
var drupal_services_node_comments = {
  /**
   * Resource URL. "node/nid/comments.json"
   * @param {string} options
   *        Accepts node ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "node/" + encodeURIComponent(options) + "/comments.json";
    }
    else {
      console.log("Error: services/node.js 'options.nid' is not a number.");
    }
  },

  /**
   * Default Method: GET
   */
  "resource_type": "get",

  /**
   * Make a call to a Drupal Service Node Comments Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.nid
   *        Required. The node ID.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Build the options to the service call.
      options = {
        "resource_path": this.resource_path(caller_options.nid),
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
      console.log("Error: services/node.js");
      console.log("Object: drupal_services_node_comments - " + error);
    }
  },

  /**
   * Error Handler
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
   * Success handler
   */
  "success": function (data) {},
};

/**
 * Helper functions.
 * @todo Move/delete these.
 */

function drupal_node_load() {
  drupal_node = window.localStorage.getItem("drupal_node");
  if (!drupal_node) {
    // no settings found in local storage, setup defaults...
    drupal_node = {};
    drupal_node.nid = "";
    drupal_node.type = "";
    drupal_node_save(drupal_node);
  }
  else {
    drupal_node = JSON.parse(drupal_node);
  }
  return drupal_node;
}

function drupal_node_save(settings) {
  window.localStorage.setItem("drupal_node", JSON.stringify(settings));
  drupal_node = settings;
  return drupal_node;
}
