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
 * @constructor
 * @description
 *   Login a user using the specified credentials.
 *   Note this will transfer a plaintext password.
 */
var drupal_services_user_login = {
  /**
   * Resource URL. "user/login.json"
   */
  "resource_path": "user/login.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service User Login Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.name
   *        Required. The username value.
   * @param {string} caller_options.pass
   *        Required. The password value.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
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
 * @description Logout the current user.
 */
var drupal_services_user_logout = {
  /**
   * Resource URL. "user/logout.json"
   */
  "resource_path": "user/logout.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service User Logout Resource.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
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
 * @description Update an existing user.
 */
var drupal_services_user_update = {
  /**
   * Resource URL. "user/uid.json"
   * @param {string} options
   *        Accepts user ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "user/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/user.js 'options.uid' is not a number.");
    }
  },

  /**
   * Default Method: PUT
   */
  "resource_type": "put",

  /**
   * Make a call to a Drupal Service User Update Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.name
   *        Required. The users name.
   * @param {string} caller_options.mail
   *        Required. The users email address.
   * @param {string} caller_options.current_pass
   *        Required. The users current password.
   * @param {string} caller_options.pass
   *        Required. The users new password.
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
 * @description Register a user.
 */
var drupal_services_user_register = {
  /**
   * Resource URL. "user/register.json"
   */
  "resource_path": "user/register.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service User Register Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.name
   *        Required. The users name.
   * @param {string} caller_options.mail
   *        Required. The users email address.
   * @param {string} caller_options.pass
   *        Required. The users new password.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
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
        /**
   * Success handler
   */
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

  /**
   * Error Handler
   */
  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.error(errorThrown);
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
 * @description Get user details.
 */
var drupal_services_user_retrieve = {
  /**
   * Resource URL. "user/uid.json"
   * @param {string} options
   *        Accepts user ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "user/" + encodeURIComponent(options) + ".json";
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
   * Make a call to a Drupal Service User Login Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.uid
   *        Required. The user ID.
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
 * @description Return an array of optionally paged uids based on a set of criteria.
 *
 * @example
 * An example request might look like
 *
 * http://domain/endpoint/user?fields=uid,name,mail&amp;parameters[uid]=1
 *
 * This would return an array of objects with only uid, name and mail defined,
 * where uid = 1.
 */
var drupal_services_user_index = {
  /**
   * Resource URL. "user.json"
   */
  "resource_path": "user.json",

  /**
   * Default Method: GET
   */
  "resource_type": "get",

  /**
   * Make a call to a Drupal Service User Index Resource.
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
      console.log("drupal_services_user_update");
      console.log(error);
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
 * @description Create a new user.
 */
var drupal_services_user_create = {
  /**
   * Resource URL. "user.json"
   */
  "resource_path": "user.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service User Login Resource.
   *
   * @param {Object} caller_options
   *        A object containing account information.
   * @param {string} caller_options.name
   *        Required. The users name.
   * @param {string} caller_options.mail
   *        Required. The users email address.
   * @param {string} caller_options.pass
   *        Required. Plain text unencrypted password.
   * @param {string} caller_options.status
   *        Optional. 0 for blocked, otherwise will be active by default.
   * @param {string} caller_options.notify
   *        Optional. 1 to notify user of new account, will not notify by default.
   * @param {string} caller_options.roles
   *        Optional.
   *        Roles can be passed in a roles property which is an associative
   *        array formatted with '<role id>' => '<role id>', not including
   *        the authenticated user role, which is given by default.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Build the options for the service call.
      data = 'name=' + encodeURIComponent(caller_options.name);
      data += '&mail=' + encodeURIComponent(caller_options.mail);
      data += '&pass=' + encodeURIComponent(caller_options.pass);
      data += '&status=' + encodeURIComponent(caller_options.status);
      data += '&notify=' + encodeURIComponent(caller_options.notify);
      data += '&roles=' + encodeURIComponent(caller_options.roles);

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

  /**
   * Error Handler
   */
  "error": function (jqXHR, textStatus, errorThrown) {
    if (errorThrown) {
      console.error(errorThrown);
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
