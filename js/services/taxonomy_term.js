/**
 * @file
 * Controls interactions with the services taxonomy_term group.
 *
 * @todo Create validation for all passed in values?
 * @todo Add Drupal version checking.
 */

// Global variables used to hold the latest system resource call results.
var drupalgap_services_taxonomy_term_update_result;
var drupalgap_services_taxonomy_term_delete_result;

/**
 * Return the results for a specified term id or FALSE if term id does not exist.
 *
 * @type {Object}
 */
var drupal_services_taxonomy_term_retrieve = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "taxonomy_term/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/taxonomy_term.js 'options.nid' is not a number.");
    }
  },
  "resource_type": "get",

  "resource_call": function (caller_options) {
    try {
      // Build the options for the service call.
      options = {
        "resource_path": this.resource_path(caller_options.tid),
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
      console.log("Object: drupal_services_taxonomy_term_retrieve - " + error);
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
    // Removes a taxonomy_term from local storage.
    type = this.resource_type;
    resource_path = this.resource_path(options);
    key = drupal_services_default_local_storage_key(type, resource_path);
    window.localStorage.removeItem(key);
    console.log("Removed from local storage (" + key + ")");
  },
};

/**
 * Creates a new taxonomy_term based on submitted values. Returns 1 if successful.
 *
 * @type {Object}
 */
var drupal_services_taxonomy_term_create = {
  "resource_path": "taxonomy_term.json",
  "resource_type": "post",

  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = "vid=" + encodeURIComponent(caller_options.vid);
      data += "&name=" + encodeURIComponent(caller_options.name);
      data += "&description=" + encodeURIComponent(caller_options.description);
      data += "&weight=" + encodeURIComponent(caller_options.weight);
      data += "&parent=" + encodeURIComponent(caller_options.parent);

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

      // Make the service call.
      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("Error: services/taxonomy_term.js");
      console.log("Object: drupal_services_taxonomy_term_create - " + error);
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
 * Updates a specified taxonomy_term based on submitted values.
 *
 * @type {Object}
 */
var drupal_services_taxonomy_term_update = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "taxonomy_term/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/taxonomy_term.js 'options.nid' is not a number.");
    }
  },
  "resource_type": "put",

  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = "vid=" + encodeURIComponent(caller_options.vid);
      data += "&name=" + encodeURIComponent(caller_options.name);
      data += "&description=" + encodeURIComponent(caller_options.description);
      data += "&weight=" + encodeURIComponent(caller_options.weight);
      data += "&parent=" + encodeURIComponent(caller_options.parent);

      // Build options for service call.
      options = {
        "resource_path": this.resource_path(caller_options.tid),
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
      console.log("Error: services/taxonomy_term.js");
      console.log("Object: drupal_services_taxonomy_term_update - " + error);
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
 * Deletes the specified taxonomy_term. Returns true if delete was successful.
 *
 * @type {Object}
 */
var drupal_services_taxonomy_term_delete = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "taxonomy_term/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/taxonomy_term.js 'options.nid' is not a number.");
    }
  },
  "resource_type": "delete",

  "resource_call": function (caller_options) {
    try {
      // Build the options to the service call.
      options = {
        "resource_path": this.resource_path(caller_options.tid),
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
      console.log("Error: services/taxonomy_term.js");
      console.log("Object: drupal_services_taxonomy_term_delete - " + error);
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
 * Return an array of optionally paged tids baed on a set of criteria.
 *
 * An example request might look like
 *
 * http://domain/endpoint/taxonomy_term?fields=tid,name&parameters[tid]=7&parameters[vid]=1
 *
 * This would return an array of objects with only tid and name defined, where
 * tid = 7 and vid = 1.
 *
 * @type {Object}
 */
var drupal_services_taxonomy_term_index = {
  "resource_path": "taxonomy_term.json",
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
      console.log("Error: services/taxonomy_term.js");
      console.log("Object: drupal_services_taxonomy_term_index - " + error);
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
 * Returns all nodes with provided taxonomy id.
 *
 * @type {Object}
 */
var drupal_services_taxonomy_term_select_nodes = {
  "resource_path": "taxonomy_term/selectNodes.json",
  "resource_type": "post",

  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = "tid=" + encodeURIComponent(caller_options.tid);

      // Build the options to the service call.
      options = {
        "data": data,
        "resource_path": this.resource_path,
        "type": this.resource_type,
        "async": true,
        "success": this.success,
        "error": this.error
      };

      // Attach error/success hooks if provided.resource_call
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
      console.log("Error: services/taxonomy_term.js");
      console.log("Object: drupal_services_taxonomy_term_select_nodes - " + error);
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
