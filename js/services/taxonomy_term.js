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
 * @constructor
 * @description Return the results for a specified term id or FALSE if term id does not exist.
 */
var drupal_services_taxonomy_term_retrieve = {
  /**
   * Resource URL. "taxonomy_term/tid.json"
   * @param {string} options
   *        Accepts term ID
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "taxonomy_term/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/taxonomy_term.js 'options.nid' is not a number.");
    }
  },

  /**
   * Default Method: GET
   */
  "resource_type": "get",

  /**
   * Make a call to a Drupal Service Taxonomy Term Retrieve Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.tid
   *        Required. Term ID.
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

  /**
   * Removes a taxonomy_term from local storage.
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
 * @description Creates a new taxonomy_term based on submitted values. Returns 1 if successful.
 */
var drupal_services_taxonomy_term_create = {
  /**
   * Resource URL. "taxonomy_term.json"
   */
  "resource_path": "taxonomy_term.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service Taxonomy Term Create Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.vid
   *        Required. The Vocabulary to insert the term in.
   * @param {string} caller_options.name
   *        Required. Name of the term.
   * @param {string} caller_options.description
   *        Optional. Description of the term.
   * @param {string} caller_options.weight
   *        Optional. Weight of the term.
   * @param {string} caller_options.parent
   *        Optional. Parent term ID.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
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
 * @description Updates a specified taxonomy_term based on submitted values.
 */
var drupal_services_taxonomy_term_update = {
  /**
   * Resource URL. "taxonomy_term/tid.json"
   * @param {string} options
   *        Accepts term ID
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "taxonomy_term/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/taxonomy_term.js 'options.nid' is not a number.");
    }
  },

  /**
   * Default Method: PUT
   */
  "resource_type": "put",

  /**
   * Make a call to a Drupal Service Taxonomy Term Update Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.vid
   *        Optional. The Vocabulary to insert the term in.
   * @param {string} caller_options.tid
   *        Required. The term ID.
   * @param {string} caller_options.name
   *        Optional. Name of the term.
   * @param {string} caller_options.description
   *        Optional. Description of the term.
   * @param {string} caller_options.weight
   *        Optional. Weight of the term.
   * @param {string} caller_options.parent
   *        Optional. Parent term ID.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
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
 * @description Deletes the specified taxonomy_term. Returns true if delete was successful.
 */
var drupal_services_taxonomy_term_delete = {
  /**
   * Resource URL. "taxonomy_term/tid.json"
   * @param {string} options
   *        Accepts term ID
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "taxonomy_term/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/taxonomy_term.js 'options.nid' is not a number.");
    }
  },

  /**
   * Default Method: POST
   */
  "resource_type": "delete",

  /**
   * Make a call to a Drupal Service Taxonomy Term Create Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.tid
   *        Required. The Term ID.
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
 * @description Return an array of optionally paged tids baed on a set of criteria.
 *
 * @example
 * An example request might look like
 *
 * http://domain/endpoint/taxonomy_term?fields=tid,name&parameters[tid]=7&parameters[vid]=1
 *
 * This would return an array of objects with only tid and name defined, where
 * tid = 7 and vid = 1.
 *
 */
var drupal_services_taxonomy_term_index = {
  /**
   * Resource URL. "taxonomy_term.json"
   */
  "resource_path": "taxonomy_term.json",

  /**
   * Default Method: GET
   */
  "resource_type": "get",

  /**
   * Make a call to a Drupal Service Taxonomy Term Index Resource.
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
      console.log("Error: services/taxonomy_term.js");
      console.log("Object: drupal_services_taxonomy_term_index - " + error);
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
 * @description Returns all nodes with provided taxonomy id.
 */
var drupal_services_taxonomy_term_select_nodes = {
  /**
   * Resource URL. "taxonomy_term/selectNodes.json"
   */
  "resource_path": "taxonomy_term/selectNodes.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service Taxonomy Term Update Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.tid
   *        Required. The term ID.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
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
