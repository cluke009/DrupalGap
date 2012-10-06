
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

/**
 * Makes an synchronous call to Drupal's System Get Variable Resource.
 *
 * @param
 *   name The name of the Drupal Variable to retrieve.
 *
 * @return
 *   The value of the drupal variable, FALSE otherwise.
 */
function drupal_services_system_get_variable(name) {
  try {
    if (!name) {
      return false;
    }
    options = {
      "resource_path": "system/get_variable.json",
      "data": 'name=' + encodeURIComponent(name)
    };
    drupal_services_system_get_variable_result = drupal_services.resource_call(options);
    return drupal_services_system_get_variable_result;
  }
  catch (error) {
    console.log("drupal_services_system_get_variable");
    console.log(error);
  }
  return FALSE;
}
