/**
 * @file
 * Controls interactions with the services comment group.
 *
 * @todo Create validation for all passed in values?
 * @todo Add Drupal version checking.
 */

// global variables used to hold the latest system resource call results
var drupal_services_comment_node_comments_result;

/**
 * @constructor
 * @description Adds a new comment to a node and returns the cid.
 */
var drupal_services_comment_create = {
  /**
   * Resource URL. "comment.json"
   */
  "resource_path": "comment.json",

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service Comment Create Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.nid
   *        Required. The node ID the comment belongs to.
   * @param {string} caller_options.body
   *        Required. The comment body you want to post.
   * @param {string} caller_options.subject
   *        Optional. The title of the comment.
   * @param {string} caller_options.language
   *        Optional. The language of the comment.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Set language if not defined.
      if (!caller_options.language) {
        caller_options.language = 'und';
      }

      // Build service call data string.
      data = "nid=" + encodeURIComponent(caller_options.nid);
      data += "&comment_body[" + caller_options.language + "][0][value]=" + encodeURIComponent(caller_options.body);
      data += "&subject=" + encodeURIComponent(caller_options.subject);

      // Make the call.
      options = {
        "resource_path": this.resource_path,
        "type": this.resource_type,
        "async": true,
        "data": data,
        "error": function (jqXHR, textStatus, errorThrown) {},
        "success": function (data) {},
      };

      // Attach error/success hooks if provided.
      if (caller_options.error) {
        options.hook_error = caller_options.error;
      }
      if (caller_options.success) {
        options.hook_success = caller_options.success;
      }

      drupal_services.resource_call(options);
    }
    catch (error) {
      console.log("Error: services/comment.js");
      console.log("Object: drupal_services_comment_create - " + error);
    }
  }
};

/**
 * @constructor
 * @description Returns a specified comment.
 */
var drupal_services_comment_retrieve = {
  /**
   * Resource URL. "comment/cid.json"
   * @param {string} options
   *        Accepts Comment ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "comment/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/comment.js 'options.cid' is not a number.");
    }
  },

  /**
   * Default Method: GET
   */
  "resource_type": "get",

  /**
   * Make a call to a Drupal Service Comment Retrieve Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.cid
   *        Required. The Comment ID the comment you want.
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
        "resource_path": this.resource_path(caller_options.cid),
        "type": this.resource_type,
        "async": true,
        "error": function (jqXHR, textStatus, errorThrown) {},
        "success": function (data) {}
      }

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
      console.log("Error: services/comment.js");
      console.log("Object: drupal_services_comment_retrieve - " + error);
    }
  },

  /**
   * Removes a comment from local storage.
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
 * @description Updates a comment and returns the cid.
 */
var drupal_services_comment_update = {
  /**
   * Resource URL. "comment/cid.json"
   * @param {string} options
   *        Accepts Comment ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "comment/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/comment.js 'options.cid' is not a number.");
    }
  },

  /**
   * Default Method: PUT
   */
  "resource_type": "put",

  /**
   * Make a call to a Drupal Service Comment Update Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.body
   *        Required. The comment body you want to post.
   * @param {string} caller_options.subject
   *        Optional. The title of the comment.
   * @param {string} caller_options.language
   *        Optional. The language of the comment.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Set language if not defined.
      if (!caller_options.language) {
        caller_options.language = 'und';
      }

      // Build service call data string.
      data = "comment_body[" + caller_options.language + "][0][value]=" + encodeURIComponent(caller_options.body);
      data += "&subject=" + encodeURIComponent(caller_options.subject);

      // Build the options for the service call.
      options = {
        "resource_path": this.resource_path(caller_options.cid),
        "type": this.resource_type,
        "data": data,
        "async": true,
        "error": function (jqXHR, textStatus, errorThrown) {},
        "success": function (data) {},
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
      console.log("Error: services/comment.js");
      console.log("Object: drupal_services_comment_update - " + error);
    }
  }
};

/**
 * @constructor
 * @description Returns true if delete was successful.
 */
var drupal_services_comment_delete = {
  /**
   * Resource URL. "comment/cid.json"
   * @param {string} options
   *        Accepts Comment ID.
   */
  "resource_path": function (options) {
    if ($.isNumeric(options)) {
      return "comment/" + encodeURIComponent(options) + ".json";
    }
    else {
      console.log("Error: services/comment.js 'options.cid' is not a number.");
    }
  },

  /**
   * Default Method: DELETE
   */
  "resource_type": "delete",

  /**
   * Make a call to a Drupal Service Comment Delete Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.cid
   *        Required. The comment ID to delete.
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
        "resource_path": this.resource_path(caller_options.cid),
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
      console.log("Error: services/comment.js");
      console.log("Object: drupal_services_comment_delete - " + error);
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
 * Return an array of optionally paged cids based on a set of criteria.
 *
 * @example
 * An example request might look like
 *
 * http://domain/endpoint/comment?fields=cid,nid&amp;parameters[nid]=7&amp;parameters[uid]=2
 *
 * This would return an array of objects with only cid and nid defined
 * where nid = 7 and uid = 1.
 *
 * @todo Get parameters working.
 * @todo Figure out if parameters can be used without clean urls.
 */
var drupal_services_comment_index = {
  /**
   * Resource URL. "comment.json"
   */
  "resource_path": "comment.json",

  /**
   * Default Method: GET
   */
  "resource_type": "get",

  /**
   * Make a call to a Drupal Service Comment Index Resource.
   *
   * @param {Object} caller_options
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
      console.log("Error: services/comment.js");
      console.log("Object: drupal_services_comment_index - " + error);
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
 * @description Returns the number of comments for a given node id.
 */
var drupal_services_comment_count_all = {
  /**
   * Resource URL. "comment/countAll.json"
   */
  "resource_path": function (options) {
    return "comment/countAll.json";
  },

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service Comment Count All Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.nid
   *        Required. The node ID the comment belongs to.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = "nid=" + caller_options.nid;

      // Build the options for the service call.
      options = {
        "resource_path": this.resource_path(caller_options.cid),
        "type": this.resource_type,
        "data": data,
        "async": true,
        "error": function (jqXHR, textStatus, errorThrown) {},
        "success": function (data) {},
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
      console.log("Error: services/comment.js");
      console.log("Object: drupal_services_comment_count_all - " + error);
    }
  }
};

/**
 * @constructor
 * @description Returns the number of new comments on a given node id since timestamp.
 */
var drupal_services_comment_count_new = {
  /**
   * Resource URL. "comment/countNew.json"
   */
  "resource_path": function (options) {
    return "comment/countNew.json";
  },

  /**
   * Default Method: POST
   */
  "resource_type": "post",

  /**
   * Make a call to a Drupal Service Comment Count New Resource.
   *
   * @param {Object} caller_options
   * @param {string} caller_options.nid
   *        Required. The node ID the comment belongs to.
   *
   * @param {string} caller_options.error
   *        Error handler hook.
   * @param {string} caller_options.success
   *        Success handler hook.
   */
  "resource_call": function (caller_options) {
    try {
      // Build service call data string.
      data = "nid=" + caller_options.nid;
      data += "&since=" + caller_options.since;

      // Build the options for the service call.
      options = {
        "resource_path": this.resource_path(caller_options.cid),
        "type": this.resource_type,
        "data": data,
        "async": true,
        "error": function (jqXHR, textStatus, errorThrown) {},
        "success": function (data) {},
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
      console.log("Error: services/comment.js");
      console.log("Object: drupal_services_comment_count_new - " + error);
    }
  }
};

/**
 * Helper functions.
 * @todo Move/delete these.
 */

var drupal_services_comment_node_comments = {
  /**
   * Resource URL.
   */
  "resource_path": function (options) {
    return "views_datasource/drupal_comments/" + options.nid;
  },
  "resource_call": function (caller_options) {
    try {
      // Validate incoming parameters.
      valid = true;
      if (!caller_options) {
        alert("drupal_services_comment_node_comments - no node id provided");
        valid = false;
      }

      // If everything is valid, make the service resource call.
      if (valid) {

        views_options = {
          "path": this.resource_path({
            "nid": caller_options.nid
          }),
        };

        // Override error/success hooks if provided.
        // (this is a views datasource special case)
        if (caller_options.error) {
          views_options.error = caller_options.error;
        }
        if (caller_options.success) {
          views_options.success = caller_options.success;
        }

        drupal_views_datasource_retrieve.resource_call(views_options);
      }
    }
    catch (error) {
      console.log("drupal_services_comment_node_comments");
      console.log(error);
    }
  }
};

function drupal_services_comment_render(comment) {
  try {
    // Can the user administer comments?
    // administer_comments = drupal_services_user_access({
    //   "permission": "administer comments"
    // });

    // // Can the user edit their own comments?
    // edit_own_comments = drupal_services_user_access({
    //   "permission": "edit own comments"
    // });

    // Determine if edit link should be shown.
    show_edit_link = false;
    // if (administer_comments || (edit_own_comments && comment.uid == drupal_user.uid)) {
    //   show_edit_link = true;
    // }

    // Extract comment creation date depending on where it came from.
    if (drupal_site_settings.variable.drupal_core == "6") {
      if (comment.timestamp % 1 != 0) {
        // Views JSON.
        created = comment.timestamp;
      }
      else {
        // Comment Retrieve.
        created = new Date(parseInt(comment.timestamp) * 1000);
        created = created.toDateString();
      }
    }
    else if (drupal_site_settings.variable.drupal_core == "7") {
      if (comment.created % 1 != 0) {
        // Views JSON.
        created = comment.created;
      }
      else {
        // Comment Retrieve.
        created = new Date(parseInt(comment.created) * 1000);
        created = created.toDateString();
      }
    }

    // Extract body depending on where it came from.
    var body;
    if (typeof (comment.comment_body) == 'object') {
      // The comment retrieve service resource returns the body stuffed into an object.
      if (drupal_site_settings.variable.drupal_core == "6") {
        body = comment.comment;
      }
      else if (drupal_site_settings.variable.drupal_core == "7") {
        body = comment.comment_body.und[0].value;
      }
    }
    else {
      // Views datasource returns the body as a field.
      if (drupal_site_settings.variable.drupal_core == "6") {
        body = comment.comment;
      }
      else if (drupal_site_settings.variable.drupal_core == "7") {
        body = comment.comment_body;
      }
    }

    // Build comment html.
    html = "<div><strong>" + comment.subject + "</strong></div>";
    html += "<div><p>" + comment.name + "</p></div>";
    html += "<div><p>" + created + "</p></div>";
    html += "<div><p>" + body + "</p></div>";

    if (show_edit_link) {
      html += "<div><a href='comment_edit.html' cid='" + comment.cid + "' nid='" + comment.nid + "' class='drupal_comment_edit'>edit</a></div>";
    }
    html += "<div><hr /></div>";
    return html;
  }
  catch (error) {
    console.log("drupal_services_comment_render");
    console.log(error);
  }
}

function drupal_comment_load() {
  drupal_comment = window.localStorage.getItem("drupal_comment");
  if (!drupal_comment) {
    // no settings found in local storage, setup defaults...
    drupal_comment = {};
    drupal_comment.nid = "";
    drupal_comment.cid = "";
    drupal_comment_save(drupal_comment);
  }
  else {
    drupal_comment = JSON.parse(drupal_comment);
  }
  return drupal_comment;
}

function drupal_comment_save(settings) {
  window.localStorage.setItem("drupal_comment", JSON.stringify(settings));
  drupal_comment = settings;
  return drupal_comment;
}
