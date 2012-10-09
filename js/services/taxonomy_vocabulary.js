/**
 * @file
 * Controls interactions with the services taxonomy_vocabulary group.
 *
 * @todo Create validation for all passed in values?
 * @todo Add Drupal version checking.
 */

/**
 * @constructor
 * @description
 *   Return the results for a specified vocabulary id or FALSE if term id does not exist.
 */
var drupal_services_taxonomy_vocabulary_retrieve = {
  /**
   * Resource URL. "taxonomy_vocabulary/vid.json"
   * @param {string} options
   *        Accepts Vocabulary ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "taxonomy_vocabulary/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/taxonomy_vocabulary.js 'options.nid' is not a number.");
    }
  },

  /**
   * Default Method: GET
   */
  "resource_type": "get",

  /**
   * Make a call to a Drupal Service Taxonomy Vocabulary Retrieve Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.vid
   *        Optional. The Vocabulary ID.
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
        "resource_path": this.resource_path(caller_options.vid),
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

      // Retrieve the taxonomy_vocabulary.
      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("Error: services/taxonomy_vocabulary.js");
      console.log("Object: drupal_services_taxonomy_vocabulary_retrieve - " + error);
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
   * Removes a taxonomy_vocabulary from local storage.
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
 * @description Create a new taxonomy vocabulary based on submitted values.
 *
 * @see
 * http://drupaldeveloper.in/article/programmatically-create-vocabulary
 */
var drupal_services_taxonomy_vocabulary_create = {
  /**
   * Resource URL. "taxonomy_vocabulary.json"
   */
  "resource_path": "taxonomy_vocabulary.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service Taxonomy Vocabulary Create Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.name
   *        Required. Human readable name of the vocabulary.
   * @param {string} caller_options.machine_name
   *        Required. Machine readable name of the vocabulary.
   * @param {string} caller_options.description
   *        Optional. Extended description of the vocabulary.
   * @param {string} caller_options.help
   *        Optional. Help text.
   * @param {string} caller_options.tags
   *        Required. 1 to make this vocabulary free tagging.
   * @param {string} caller_options.multiple
   *        Required. 1 to allow multiple selection.
   * @param {string} caller_options.required
   *        Optional. 1 to make the terms mandatory to be selected.
   * @param {string} caller_options.hierarchy
   *        Optional. 1 to allow and create hierarchy of the terms within the vocabulary.
   * @param {string} caller_options.relations
   *        Optional. 1 to set and allow relation amongst multiple terms.
   * @param {string} caller_options.module
   *        Optional. Provide the module name in which the vocabulary is defined and which is calling this function.
   * @param {string} caller_options.node
   *        Optional. {'story' : 1}, Content types to which this vocabulary will be attached to.
   * @param {string} caller_options.weight
   *        Optional. Set the weight to display the vocabulary in the list.
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
      data += "&machine_name=" + encodeURIComponent(caller_options.machine_name);
      data += "&description=" + encodeURIComponent(caller_options.description);
      data += "&help=" + encodeURIComponent(caller_options.help);
      data += "&tags=" + encodeURIComponent(caller_options.tags);
      data += "&multiple=" + encodeURIComponent(caller_options.multiple);
      data += "&required=" + encodeURIComponent(caller_options.required);
      data += "&hierarchy=" + encodeURIComponent(caller_options.hierarchy);
      data += "&relations=" + encodeURIComponent(caller_options.relations);
      data += "&module=" + encodeURIComponent(caller_options.module);
      data += "&node=" + encodeURIComponent(caller_options.node);
      data += "&weight=" + encodeURIComponent(caller_options.weight);

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
      console.log("Error: services/taxonomy_vocabulary.js");
      console.log("Object: drupal_services_taxonomy_vocabulary_create - " + error);
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
 * @description Updates a specified taxonomy_vocabulary based on submitted values.
 */
var drupal_services_taxonomy_vocabulary_update = {
  /**
   * Resource URL. "taxonomy_vocabulary/vid.json"
   * @param {string} options
   *        Accepts Vocabulary ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "taxonomy_vocabulary/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/taxonomy_vocabulary.js 'options.vid' is not a number.");
    }
  },

  /**
   * Default Method: PUT
   */
  "resource_type": "put",

  /**
   * Make a call to a Drupal Service Taxonomy Vocabulary Update Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.name
   *        Required. Human readable name of the vocabulary.
   * @param {string} caller_options.machine_name
   *        Required. Machine readable name of the vocabulary.
   * @param {string} caller_options.description
   *        Optional. Extended description of the vocabulary.
   * @param {string} caller_options.help
   *        Optional. Help text.
   * @param {string} caller_options.tags
   *        Required. 1 to make this vocabulary free tagging.
   * @param {string} caller_options.multiple
   *        Required. 1 to allow multiple selection.
   * @param {string} caller_options.required
   *        Optional. 1 to make the terms mandatory to be selected.
   * @param {string} caller_options.hierarchy
   *        Optional. 1 to allow and create hierarchy of the terms within the vocabulary.
   * @param {string} caller_options.relations
   *        Optional. 1 to set and allow relation amongst multiple terms.
   * @param {string} caller_options.module
   *        Optional. Provide the module name in which the vocabulary is defined and which is calling this function.
   * @param {string} caller_options.node
   *        Optional. {'story' : 1}, Content types to which this vocabulary will be attached to.
   * @param {string} caller_options.weight
   *        Optional. Set the weight to display the vocabulary in the list.
   * @param {string} caller_options.vid
   *        Optional. The vocabulary ID to update.
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
      data += "&machine_name=" + encodeURIComponent(caller_options.machine_name);
      data += "&description=" + encodeURIComponent(caller_options.description);
      data += "&help=" + encodeURIComponent(caller_options.help);
      data += "&tags=" + encodeURIComponent(caller_options.tags);
      data += "&multiple=" + encodeURIComponent(caller_options.multiple);
      data += "&required=" + encodeURIComponent(caller_options.required);
      data += "&hierarchy=" + encodeURIComponent(caller_options.hierarchy);
      data += "&relations=" + encodeURIComponent(caller_options.relations);
      data += "&module=" + encodeURIComponent(caller_options.module);
      data += "&node=" + encodeURIComponent(caller_options.node);
      data += "&weight=" + encodeURIComponent(caller_options.weight);

      // Build options for service call.
      options = {
        "resource_path": this.resource_path(caller_options.vid),
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
      console.log("Error: services/taxonomy_vocabulary.js");
      console.log("Object: drupal_services_taxonomy_vocabulary_update - " + error);
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
 * @description
 *   Deletes the specified taxonomy_vocabulary. Returns true if delete was successful.
 */
var drupal_services_taxonomy_vocabulary_delete = {
  /**
   * Resource URL. "taxonomy_vocabulary/vid.json"
   * @param {string} options
   *        Accepts Vocabulary ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "taxonomy_vocabulary/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/taxonomy_vocabulary.js 'options.nid' is not a number.");
    }
  },

  /**
   * Default Method: DELETE
   */
  "resource_type": "delete",

  /**
   * Make a call to a Drupal Service Taxonomy Vocabulary Delete Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.vid
   *        Required. The vocabulary ID.
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
        "resource_path": this.resource_path(caller_options.vid),
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
      console.log("Error: services/taxonomy_vocabulary.js");
      console.log("Object: drupal_services_taxonomy_vocabulary_delete - " + error);
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
 * @description Return an array of optionally paged tids based on a set of criteria.
 *
 * @example
 * An example request might look like
 *
 * http://domain/endpoint/taxonomy_vocabulary?fields=tid,name&amp;parameters[tid]=7&amp;parameters[vid]=1
 *
 * This would return an array of objects with only tid and name defined, where
 * tid = 7 and vid = 1.
 */
var drupal_services_taxonomy_vocabulary_index = {
  /**
   * Resource URL. "taxonomy_vocabulary.json"
   */
  "resource_path": "taxonomy_vocabulary.json",

  /**
   * Default Method: GET
   */
  "resource_type": "get",
  /**
   * Make a call to a Drupal Service Taxonomy Vocabulary Index Resource.
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
      console.log("Error: services/taxonomy_vocabulary.js");
      console.log("Object: drupal_services_taxonomy_vocabulary_index - " + error);
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
 * @description Services interface to taxonomy_get_tree().
 */
var drupal_services_taxonomy_vocabulary_get_tree = {
  /**
   * Resource URL. "taxonomy_vocabulary/getTree.json"
   */
  "resource_path": "taxonomy_vocabulary/getTree.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service Taxonomy Vocabulary Get Tree Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.vid
   *        Required. The vocabulary ID.
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
      console.log("Error: services/taxonomy_vocabulary.js");
      console.log("Object: drupal_services_taxonomy_vocabulary_get_tree - " + error);
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
