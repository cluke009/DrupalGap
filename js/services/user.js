/**
 * @file
 * Controls interactions with the services user group.
 *
 * @todo Create validation for all passed in values?
 * @todo Add Drupal version checking.
 * @todo Merge create/register like in user_resource.inc
 */


// Define global variables to hold the latest resource call result json.
var drupal_services_user_access_result;
var drupal_services_user_roles_and_permissions_result;

/**
 * Login a user using the specified credentials.
 *
 * Note this will transfer a plaintext password.
 *
 * @type {Object}
 */
var drupal_services_user_login = {
  "resource_path": "user/login.json",
  "resource_type": "post",

  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = 'username=' + encodeURIComponent(caller_options.name);
      data += '&password=' + encodeURIComponent(caller_options.pass);

      // Build service call options.
      options = {
        "resource_path": this.resource_path,
        "data": data,
        "async": true,
        "success": this.success,
        "error": this.error
      };

      // Attach error/success hooks if provided.
      // @todo Seems like redundant error reporting.
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
      console.log("Error: services/user.js");
      console.log("Object: drupal_services_user_login - " + error);
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
 * Logout the current user.
 *
 * @type {Object}
 */
var drupal_services_user_logout = {
  "resource_path": "user/logout.json",
  "resource_type": "post",

  "resource_call": function (caller_options) {
    try {
      // Build the service call options.
      options = {
        "resource_path": this.resource_path,
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
      console.log("Error: services/user.js");
      console.log("Object: drupal_services_user_logout - " + error);
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
 * Update an existing user.
 *
 * @type {Object}
 */
var drupal_services_user_update = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "user/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/user.js 'options.uid' is not a number.");
    }
  },
  "resource_type": "put",

  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = "name=" + encodeURIComponent(caller_options.name);
      data += "&mail=" + encodeURIComponent(caller_options.mail);
      data += "&current_pass=" + encodeURIComponent(caller_options.current_pass);
      data += "&pass=" + encodeURIComponent(caller_options.pass);

      // Build the service resource call options.
      options = {
        "resource_path": this.resource_path(caller_options.uid),
        "data": data,
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
      console.log("Error: services/user.js");
      console.log("Object: drupal_services_user_update - " + error);
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
 * Register a user.
 *
 * @type {Object}
 */
var drupal_services_user_register = {
  "resource_path": "user/register.json",
  "resource_type": "post",

  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = 'name=' + encodeURIComponent(caller_options.name);
      data += '&mail=' + encodeURIComponent(caller_options.mail);
      data += '&pass=' + encodeURIComponent(caller_options.pass);

      // Build the options for the service call.
      options = {
        "resource_path": this.resource_path,
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
      console.log("Error: services/user.js");
      console.log("Object: drupal_services_user_register - " + error);
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
 * Get user details.
 *
 * @type {Object}
 */
var drupal_services_user_retrieve = {
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "user/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/node.js 'options.nid' is not a number.");
    }
  },
  "resource_type": "get",

  "resource_call": function (caller_options) {
    try {
      // Build the service resource call options.
      options = {
        "resource_path": this.resource_path(caller_options.uid),
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
      console.log("Object: drupal_services_user_retrieve - " + error);
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
 * Return an array of optionally paged uids based on a set of criteria.
 *
 * An example request might look like
 *
 * http://domain/endpoint/user?fields=uid,name,mail&parameters[uid]=1
 *
 * This would return an array of objects with only uid, name and mail defined,
 * where uid = 1.
 *.
 * @return
 *   An array of user objects.
 */
var drupal_services_user_index = {
  "resource_path": "user.json",
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
      console.log("drupal_services_user_update");
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
};

/**
 * Create a new user.
 *
 *   A object containing account information. The $account object should
 *   contain, at minimum, the following properties:
 *     - name (user name)
 *     - mail (email address)
 *     - pass (plain text unencrypted password)
 *
 *   These properties can be passed but are optional
 *     - status (0 for blocked, otherwise will be active by default)
 *     - notify (1 to notify user of new account, will not notify by default)
 *
 *  Roles can be passed in a roles property which is an associative
 *  array formatted with '<role id>' => '<role id>', not including
 *  the authenticated user role, which is given by default.
 *
 * @return
 *   The user object of the newly created user.
 */
var drupal_services_user_create = {
  "resource_path": "user.json",
  "resource_type": "post",

  "resource_call": function (caller_options) {
    try {
      // Build the options for the service call.
      data = 'name=' + encodeURIComponent(caller_options.name);
      data += '&mail=' + encodeURIComponent(caller_options.mail);
      data += '&pass=' + encodeURIComponent(caller_options.pass);
      data += '&status=' + encodeURIComponent(caller_options.status);
      data += '&notify=' + encodeURIComponent(caller_options.notify);

      // Build the options to the service call.
      options = {
        "resource_path": this.resource_path,
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
      console.log("drupal_services_user_create");
      console.log(error);
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
 * Helper functions.
 * @todo Move/delete these.
 */

function drupal_services_user_access(options) {
  try {
    // Clear the previous call.
    drupal_services_user_access_result = false;

    // Validate the input.
    if (!options.permission) {
      console.log("drupal_services_user_access - no permission provided");
      return false;
    }

    // If we have the user's roles and permissions already stored from
    // a call to drupalgap system connect, iterate over the collection
    // to see if the user has access to the permission.
    if (drupal_user_roles_and_permissions) {
      $.each(drupal_user_roles_and_permissions, function (index, object) {
        if (object.permission == options.permission) {
          drupal_services_user_access_result = true;
          return;
        }
      });
    }
    else {
      // We did not have the user's roles and permissions stored, make
      // a call to the drupalgap user access resource to see if the user
      // has the requested permission.
      if (valid) {
        resource_path = "drupal_user/access.json";
        data = 'permission=' + encodeURIComponent(options.permission);
        drupal_services_user_access_result = drupal_services.resource_call({
          "resource_path": resource_path,
          "data": data
        });
      }
    }
  }
  catch (error) {
    console.log("drupal_services_user_access");
    console.log(error);
  }

  return drupal_services_user_access_result;
}

function drupal_services_user_roles_and_permissions(uid) {
  try {
    // Clear the previous call.
    drupal_services_user_roles_and_permissions_result = null;

    // Validate the user id.
    valid = true;
    if (!uid) {
      valid = false;
      console.log("drupal_services_user_roles_and_permissions - no user id provided");
    }

    if (valid) {
      // Make the service call.
      resource_path = "drupal_user/roles_and_permissions.json";
      data = 'uid=' + encodeURIComponent(uid);
      options = {
        "resource_path": resource_path,
        "data": data
      };
      drupal_services_user_roles_and_permissions_result = drupal_services.resource_call(options);
    }
  }
  catch (error) {
    console.log("drupal_services_user_roles_and_permissions");
    console.log(error);
  }

  return drupal_services_user_roles_and_permissions_result;
}
