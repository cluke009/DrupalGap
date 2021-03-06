/*global services*/

/**
 * @file
 * Controls interactions with the services user group.
 *
 * @todo Create validation for all passed in values?
 * @todo Add Drupal version checking.
 * @todo Merge create/register like in user_resource.inc
 */

/**
 * Create a new user.
 *
 * @param {object} options
 *        A object containing account information.
 * @param {string} options.name
 *        Required. The users name.
 * @param {string} options.mail
 *        Required. The users email address.
 * @param {string} options.pass
 *        Required. Plain text unencrypted password.
 * @param {string} options.status
 *        Optional. 0 for blocked, otherwise will be active by default.
 * @param {string} options.notify
 *        Optional. 1 to notify user of new account, will not notify by default.
 * @param {string} options.roles
 *        Optional.
 *        Roles can be passed in a roles property which is an associative
 *        array formatted with '<role id>' => '<role id>', not including
 *        the authenticated user role, which is given by default.
 *
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
 *        Success handler hook.
 */
services.user.create = function (options) {
  try {
    // Build the options for the service call.
    var data  = 'name=' + encodeURIComponent(options.name);
        data += '&mail=' + encodeURIComponent(options.mail);
        data += '&pass=' + encodeURIComponent(options.pass);
        data += '&status=' + encodeURIComponent(options.status);
        data += '&notify=' + encodeURIComponent(options.notify);
        data += '&roles=' + encodeURIComponent(options.roles);

    // Build the options for the service call.
    var props = {
      type: 'post',
      url: 'user.json',
      async: true,
      data: data,
      fields: options.fields
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
  }
  catch (error) {
    console.log('Error: services/user.js');
    console.log('Object: services.user.create - ' + error);
  }
};

/**
 * Get user details.
 *
 * @param {object} options
 * @param {string} options.uid
 *        Required. The user ID.
 *
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
 *        Success handler hook.
 */
services.user.retrieve = function (options) {
  try {
    // Build the options for the service call.
    var props = {
      type: 'get',
      url: 'user/' + options.uid + '.json',
      async: true
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
  }
  catch (error) {
    console.log('Error: services/user.js');
    console.log('Object: services.user.retrieve - ' + error);
  }
};

/**
 * Update an existing user.
 *
 * @param {object} options
 * @param {string} options.uid
 *        Required. The user ID.
 * @param {string} options.name
 *        Required. The users name.
 * @param {string} options.mail
 *        Required. The users email address.
 * @param {string} options.currentPass
 *        Required. The users current password.
 * @param {string} options.pass
 *        Required. The users new password.
 * @param {string} options.status
 *        Optional. 0 for blocked, otherwise will be active by default.
 * @param {string} options.roles
 *        Optional.
 *        Roles can be passed in a roles property which is an associative
 *        array formatted with '<role id>' => '<role id>', not including
 *        the authenticated user role, which is given by default.
 *
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
 *        Success handler hook.
 */
services.user.update = function (options) {
  try {
    // Build the options for the service call.
    var data  = 'name=' + encodeURIComponent(options.name);
        data += '&mail=' + encodeURIComponent(options.mail);
        data += '&current_pass=' + encodeURIComponent(options.currentPass);
        data += '&pass=' + encodeURIComponent(options.pass);

    // Add status and roles.
    if (options.status) {
      data += '&status=' + encodeURIComponent(options.status);
    }
    if (options.roles) {
      data += '&roles=' + encodeURIComponent(options.roles);
    }


    // Build the options for the service call.
    var props = {
      type: 'put',
      url: 'user/' + options.uid + '.json',
      async: true,
      data: data,
      fields: options.fields
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
  }
  catch (error) {
    console.log('Error: services/user.js');
    console.log('Object: services.user.update - ' + error);
  }
};

/**
 * Delete a user.
 *
 * @param {string} options.uid
 *        Required. The user ID.
 */
services.user.del = function (options) {
  try {
    // Build the options for the service call.
    var props = {
      type: 'delete',
      url: 'user/' + options.uid + '.json',
      async: true
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
  }
  catch (error) {
    console.log('Error: services/user.js');
    console.log('Object: services.user.del - ' + error);
  }
};

/**
 * Return an array of optionally paged uids based on a set of criteria.
 *
 * @example
 * An example request might look like
 *
 * http://domain/endpoint/user?fields=uid,name,mail&amp;parameters[uid]=1
 *
 * This would return an array of objects with only uid, name and mail defined,
 * where uid = 1.
 *
 * @param {object} options
 * @param {array} options.fields
 *        An array of fields to pass in the url.
 * @param {object} options.param
 *        A json object containing url parameters.
 *
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
 *        Success handler hook.
 */
services.user.index = function (options) {
  try {
    // @see http://pkarl.com/articles/remove-undefined-and-empty-elements-javascript-arr/
    var fields = options.fields;
    var newArr = [];

    // remove 'falsey' items by creating new array of true-y stuff
    for (var index in fields) {
      if(fields[index]) {
        newArr.push( fields[index] );
      }
    }
    fields = newArr;

    // Append fields to urls.
    var args = '';
    if (fields.length > 0) {
      args = 'fields=';
      for (var i = 0; i < fields.length; i++) {
        if (i !== fields.length - 1) {
          args += $.trim(fields[i]) + ',';
        }
        else {
          args += $.trim(fields[i]);
        }
      }
    }

    // Append parameters to url.
    var params = options.params;
    var args1 = '';
    if (params) {
      for (var k in params) {
        if (params.hasOwnProperty(k)) {
          args1 += '&parameters[' + $.trim(k) + ']=' + $.trim(params[k]);
        }
      }
    }

    // Build the options for the service call.
    var props = {
      type: 'get',
      url: 'user.json?' + args + args1,
      async: true
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
  }
  catch (error) {
    console.log('Error: services/user.js');
    console.log('Object: services.user.index - ' + error);
  }
};

/**
 * Login a user using the specified credentials.
 *
 * Note this will transfer a plaintext password.
 *
 * @param {object} options
 * @param {string} options.name
 *        Required. The username value.
 * @param {string} options.pass
 *        Required. The password value.
 *
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
 *        Success handler hook.
 */
services.user.login = function (options) {
  try {
    // Build service call data string.
    var data  = 'username=' + encodeURIComponent(options.name);
        data += '&password=' + encodeURIComponent(options.pass);

    // Build the options for the service call.
    var props = {
      type: 'post',
      url: 'user/login.json',
      async: true,
      data: data,
      fields: options.fields
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
  }
  catch (error) {
    console.log('Error: services/user.js');
    console.log('Object: services.user.login - ' + error);
  }
};

/**
 * Logout the current user.
 *
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
 *        Success handler hook.
 */
services.user.logout = function (options) {
  try {
    // Build the options for the service call.
    var props = {
      type: 'post',
      url: 'user/logout.json',
      async: true
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
  }
  catch (error) {
    console.log('Error: services/user.js');
    console.log('Object: services.user.logout - ' + error);
  }
};

/**
 * Register a user.
 *
 * @param {object} options
 * @param {string} options.name
 *        Required. The users name.
 * @param {string} options.mail
 *        Required. The users email address.
 * @param {string} options.pass
 *        Required. The users password.
 *
 * @param {string} options.error
 *        Error handler hook.
 * @param {string} options.successs
 *        Success handler hook.
 */
services.user.register = function (options) {
  try {
    // Build the options for the service call.
    var data  = 'name=' + encodeURIComponent(options.name);
        data += '&mail=' + encodeURIComponent(options.mail);
        data += '&pass=' + encodeURIComponent(options.pass);

    // Build the options for the service call.
    var props = {
      type: 'post',
      url: 'user/register.json',
      async: true,
      data: data,
      fields: options.fields
    };

    // Attach error/success hooks if provided.
    if (options !== undefined) {
      if (options.success){
        props.success = options.success;
      }
      if (options.error){
        props.error = options.error;
      }
      if (options.complete){
        props.complete = options.complete;
      }
    }

    // Make the service call.
    services.resource(props);
  }
  catch (error) {
    console.log('Error: services/user.js');
    console.log('Object: services.user.register - ' + error);
  }
};
