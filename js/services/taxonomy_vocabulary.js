/**
 * @file
 * Controls interactions with the services taxonomy_vocabulary group.
 *
 * @todo Create validation for all passed in values?
 * @todo Add Drupal version checking.
 */

/**
 * Return the results for a specified vocabulary id or FALSE if term id does not exist.
 *
 * @type {Object}
 */
var drupal_services_taxonomy_vocabulary_retrieve = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "taxonomy_vocabulary/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/taxonomy_vocabulary.js 'options.nid' is not a number.");
    }
  },
  "resource_type": "get",

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
      console.log("Error: services/node.js");
      console.log("Object: drupal_services_taxonomy_vocabulary_retrieve - " + error);
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
    // Removes a taxonomy_vocabulary from local storage.
    type = this.resource_type;
    resource_path = this.resource_path(options);
    key = drupal_services_default_local_storage_key(type, resource_path);
    window.localStorage.removeItem(key);
    console.log("Removed from local storage (" + key + ")");
  },
};

/**
 * Create a new taxonomy vocabulary based on submitted values.
 *
 * Here is a sample vocabulary array, taken from
 * http://drupaldeveloper.in/article/programmatically-create-vocabulary
 *
 * @code
 * var vocabulary = {
 *   'name' : "Name", // Human readable name of the vocabulary
 *   'machine_name' : "Machine_name" // Machine readable name of the vocabulary
 *   'description' : "Description", // extended description of the vocabulary
 *   'help' : "help", // help text
 *   'tags' : 0, // 1 to make this vocabulary free tagging
 *   'multiple' : 0, // 1 to allow multiple selection
 *   'required' : 0, // 1 to make the terms mandatory to be selected
 *   'hierarchy' : 0, // 1 to allow and create hierarchy of the terms within the vocabulary
 *   'relations' : 0, // 1 to set and allow relation amongst multiple terms
 *   'module' : 'mymodule', // provide the module name in which the vocabulary is defined and which is calling this function
 *   'node' : {'story' : 1}, // content types to which this vocabulary will be attached to
 *   'weight' : -9, // set the weight to display the vocabulary in the list
 * };
 * @endcode
 *
 * @type {Object}
 */
var drupal_services_taxonomy_vocabulary_create = {
  "resource_path": "taxonomy_vocabulary.json",
  "resource_type": "post",

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
 * Updates a specified taxonomy_vocabulary based on submitted values.
 *
 * @type {Object}
 */
var drupal_services_taxonomy_vocabulary_update = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "taxonomy_vocabulary/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/taxonomy_vocabulary.js 'options.vid' is not a number.");
    }
  },
  "resource_type": "put",

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
 * Deletes the specified taxonomy_vocabulary. Returns true if delete was successful.
 *
 * @type {Object}
 */
var drupal_services_taxonomy_vocabulary_delete = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "taxonomy_vocabulary/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/taxonomy_vocabulary.js 'options.nid' is not a number.");
    }
  },
  "resource_type": "delete",

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
 * Return an array of optionally paged tids based on a set of criteria.
 *
 * An example request might look like
 *
 * http://domain/endpoint/taxonomy_vocabulary?fields=tid,name&parameters[tid]=7&parameters[vid]=1
 *
 * This would return an array of objects with only tid and name defined, where
 * tid = 7 and vid = 1.
 *
 * @type {Object}
 */
var drupal_services_taxonomy_vocabulary_index = {
  "resource_path": "taxonomy_vocabulary.json",
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
      console.log("Error: services/taxonomy_vocabulary.js");
      console.log("Object: drupal_services_taxonomy_vocabulary_index - " + error);
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
 * Services interface to taxonomy_get_tree().
 *
 * @type {Object}
 */
var drupal_services_taxonomy_vocabulary_get_tree = {
  "resource_path": "taxonomy_vocabulary/getTree.json",
  "resource_type": "post",

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
