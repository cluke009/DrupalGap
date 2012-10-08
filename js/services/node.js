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
 * Returns a specified node by ID.
 *
 * @type {Object}
 */
var drupal_services_node_retrieve = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "node/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/node.js 'options.nid' is not a number.");
    }
  },
  "resource_type": "get",

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
      console.log("drupal_services_node_retrieve");
      console.log(error);
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

  "local_storage_remove": function (options) {
    // Removes a node from local storage.
    type = this.resource_type;
    resource_path = this.resource_path(options);
    key = drupal_services_default_local_storage_key(type, resource_path);
    window.localStorage.removeItem(key);
    console.log("Removed from local storage (" + key + ")");
  },
};

/**
 * Creates a new node based on submitted values.
 *
 * @type {Object}
 */
var drupal_services_node_create = {
  "resource_path": "node.json",
  "resource_type": "post",

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
 * Updates a specified node based on submitted values.
 *
 * @type {Object}
 */
var drupal_services_node_update = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "node/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/node.js 'options.nid' is not a number.");
    }
  },
  "resource_type": "put",

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
 * Delete a node given its nid. Returns true if delete was successful.
 *
 * @type {Object}
 */
var drupal_services_node_delete = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "node/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/node.js 'options.nid' is not a number.");
    }
  },
  "resource_type": "delete",

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
 * Return an array of optionally paged nids based on a set of criteria.
 *
 * @type {Object}
 */
var drupal_services_node_index = {
  "resource_path": "node.json",
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
      console.log("Error: services/node.js");
      console.log("Object: drupal_services_node_index - " + error);
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
 * Generates an array of base64 encoded files attached to a node.
 *
 * @type {Object}
 */
var drupal_services_node_files = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "node/" + encodeURIComponent(options) + "/files.json";
    }
    else {
      console.log("Error: services/node.js 'options.nid' is not a number.");
    }
  },
  "resource_type": "get",

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
 * Returns the comments of a specified node.
 *
 * @type {Object}
 */
var drupal_services_node_comments = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "node/" + encodeURIComponent(options) + "/comments.json";
    }
    else {
      console.log("Error: services/node.js 'options.nid' is not a number.");
    }
  },
  "resource_type": "get",

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
