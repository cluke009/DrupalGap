
var drupal_services_system_connect = {
  "resource_path": "system/connect.json",
  "resource_type": "post",

  /**
   * Makes a Service call to Drupal's System Connect resource.
   *
   * @return
   *   A JSON object containing information about the drupal user who made the service call, and NULL if the service call failed.
   */
  "resource_call": function (caller_options) {
    try {
      // Clear the last result.
      // this.resource_result = null;

      // Set default options.
      options = {
        "resource_path": this.resource_path,
        "async": true,
        "success": this.success,
        "error": this.error,
      };

      // Attach error/success hooks if provided.
      if (caller_options.error) {
        options.hook_error = caller_options.error;
      }
      if (caller_options.success) {
        options.hook_success = caller_options.success;
      }

      // this.resource_result = drupal_services_resource_call(options);
      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("errorThrown: drupal_services_system_connect.resource_call");
      console.error(error);
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

  "success": function (data) {
    // Save a copy of the current user.
    drupal_user = data.user;

    // Make sure authenticated user's account is active.
    if (drupal_user.uid != 0 && drupal_user.status != 1) {
      // TODO - this alert doesn't work... the forced logout seems to work though...
      alert("The username " + drupal_user.name + " has not been activated or is blocked.");
      drupal_services_user_logout();
    }
  },

  "local_storage_remove": function () {
    type = this.resource_type;
    resource_path = this.resource_path;
    key = drupal_services_default_local_storage_key(type, resource_path);
    window.localStorage.removeItem(key);
    console.log("Removed from local storage (" + key + ")");
  },
};

var drupal_services_system_get_variable = {
  "resource_path": "system/get_variable.json",
  "resource_type": "post",

  /**
   * Makes a Service call to Drupal's System Get Variable resource.
   *
   * @return
   *   The value of the drupal variable, and NULL if the service call failed.
   */
  "resource_call": function (caller_options) {
    try {
      // Set default options.
      options = {
        "resource_path": this.resource_path,
        "async": true,
        "success": this.success,
        "error": this.error,
        "data": 'name=' + encodeURIComponent(caller_options.name)
      };

      // Attach error/success hooks if provided.
      if (caller_options.error) {
        options.hook_error = caller_options.error;
      }
      if (caller_options.success) {
        options.hook_success = caller_options.success;
      }

      // this.resource_result = drupal_services_resource_call(options);
      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("errorThrown: drupal_services_system_get_variable.resource_call");
      console.error(error);
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

  "local_storage_remove": function () {
    type = this.resource_type;
    resource_path = this.resource_path;
    key = drupal_services_default_local_storage_key(type, resource_path);
    window.localStorage.removeItem(key);
    console.log("Removed from local storage (" + key + ")");
  },
};

var drupal_services_system_set_variable = {
  "resource_path": "system/set_variable.json",
  "resource_type": "post",

  /**
   * Makes a Service call to Drupal's System Set Variable resource.
   *
   * @return
   *   The value of the drupal variable, and NULL if the service call failed.
   */
  "resource_call": function (caller_options) {
    try {
      data = 'name=' + encodeURIComponent(caller_options.name);
      data += '&value=' + encodeURIComponent(caller_options.value);
      // Set default options.
      options = {
        "load_from_local_storage": "0",
        "resource_path": this.resource_path,
        "async": true,
        "success": this.success,
        "error": this.error,
        "data": data
      };

      // Attach error/success hooks if provided.
      if (caller_options.error) {
        options.hook_error = caller_options.error;
      }
      if (caller_options.success) {
        options.hook_success = caller_options.success;
      }

      // this.resource_result = drupal_services_resource_call(options);
      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("errorThrown: drupal_services_system_set_variable.resource_call");
      console.error(error);
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

  "success": function (data) {
    // Reset get variable.
    drupal_services_system_get_variable.local_storage_remove();
  },
};

var drupal_services_system_del_variable = {
  "resource_path": "system/del_variable.json",
  "resource_type": "post",

  /**
   * Makes a Service call to Drupal's System Del Variable resource.
   *
   * @return
   *   The value of the drupal variable, and NULL if the service call failed.
   */
  "resource_call": function (caller_options) {
    try {
      // Set default options.
      options = {
        "load_from_local_storage": "0",
        "resource_path": this.resource_path,
        "async": true,
        "success": this.success,
        "error": this.error,
        "data": 'name=' + encodeURIComponent(caller_options.name)
      };

      // Attach error/success hooks if provided.
      if (caller_options.error) {
        options.hook_error = caller_options.error;
      }
      if (caller_options.success) {
        options.hook_success = caller_options.success;
      }

      // this.resource_result = drupal_services_resource_call(options);
      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("errorThrown: drupal_services_system_set_variable.resource_call");
      console.error(error);
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

  "success": function (data) {
    // Reset get variable.
    drupal_services_system_get_variable.local_storage_remove();
  },
};
