// Define global variables to hold the latest resource call result json.
var drupal_services_user_access_result;
var drupal_services_user_roles_and_permissions_result;

// @todo - We need a user retrieve service resource implementation here.
var drupal_services_user_login = {
  "resource_path": "user/login.json",
  "resource_type": "post",

  /**
   * Makes a call to Drupal's User Login Service Resource.
   *
   * @param options.name
   *   A string containing the drupal user name.
   * @param options.pass
   *   A string containing the drupal user password.
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
      console.log("drupal_services_user_login");
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

  "success": function (data) {
    // Run 'drupal_services_system_connect' to save session to localStorage.
    try {
      options = {
        "error": function (jqXHR, textStatus, errorThrown) {
          if (errorThrown) {
            console.error(errorThrown);
          }
          else {
            console.error("Error connecting. Please check that the URL is typed correctly, with no trailing slashes.");
          }
        },
        "success": function (inner_data) {
          // Session id came back, everything is ok...
          console.log("Setup Complete!");
        },
      };
      // Make service call.
      drupal_services_system_connect.resource_call(options);
    }
    catch (error) {
      console.log("drupal_services_user_login.system_connect");
      console.log(error);
    }
  },
};

var drupal_services_user_logout = {
  "resource_path": "user/logout.json",
  "resource_type": "post",

  /**
   * Makes a synchronous call to Drupal's User Logout Service Resource.
   *
   * @return
   *   TRUE if the logout was successful, false otherwise.
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
      console.log("drupal_services_user_logout - " + error);
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

var drupal_services_user_update = {

  "resource_path": function (options) {
    // TODO - Need uid validation here.
    return "user/" + options.uid + ".json";
  },
  "resource_type": "put",

  /**
   * Makes a synchronous call to Drupal's User Logout Service Resource.
   *
   * @return
   *   TRUE if the logout was successful, false otherwise.
   */
  "resource_call": function (caller_options) {
    try {

      drupal_services_user_update_result = null; // clear previous call

      if (!caller_options.user) {
        // TODO - do a better job validating incoming user...
        console.log("drupal_services_user_update - user empty");
        return false;
      }

      // make the service call depending on what they're doing to their account...
      data = "";
      data += "name=" + encodeURIComponent(caller_options.name);
      data += "&mail=" + encodeURIComponent(caller_options.mail);
      data += "&current_pass=" + encodeURIComponent(caller_options.current_pass);
      data += "&pass=" + encodeURIComponent(caller_options.pass);

      // Build the service resource call options.
      //, "save_to_local_storage":"0"
      options = {
        "resource_path": this.resource_path(caller_options.user),
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

      // make another call to system connect to refresh global variables if there wasn't any problems
      /*if (!drupal_services_user_update_result.errorThrown) {
        // Make another call to system connect to refresh global variables.
        // TODO - this is a nested service resource call, ideally we should
        // create a custom drupalgap user update resource that bundles up
        // the drupalgap system connect in the results as well.
        //drupal_services_resource_system_connect.resource_call({});
      }

      //return drupal_services_user_update_result;
      */
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


/*function drupal_services_user_update (user) {

  return false; // if it made it this fair, the user update call failed
}*/

var drupal_services_user_register = {
  "resource_path": "user/register.json",
  "resource_type": "post",

  "resource_call": function (caller_options) {
    try {
      // validate input
      if (!caller_options.name) {
        console.log("drupal_services_user_register - name empty");
        return false;
      }
      if (!caller_options.mail) {
        console.log("drupal_services_user_register - mail empty");
        return false;
      }
      if (!caller_options.pass) {
        console.log("drupal_services_user_register - pass empty");
        return false;
      }

      // Build the options for the service call.
      data = 'name=' + encodeURIComponent(caller_options.name);
      data += '&mail=' + encodeURIComponent(caller_options.mail);
      data += '&pass=' + encodeURIComponent(caller_options.pass);
      //, "save_to_local_storage":"0"
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
      console.log("drupal_services_user_register");
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
