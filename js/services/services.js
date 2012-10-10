/**
 * @file
 */


/**
 * Hold all static settings for the application.
 * @type {Object}
 */
var config = {
  sitePath: 'http://localhost:8082',
  endPoint: 'rest',
  basePath: '?q=',
  debug: 0
};

// Dynamically load debug files
$(document).ready(function() {
  if (config.debug === 1) {
    $('head').append('<link>');
    var css = $('head').children(':last');
    css.attr({
      rel: 'stylesheet',
      type: 'text/css',
      href: '/css/debug.css'
    });
    var js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = '/js/debug.js';
    $('head').append(js);
  }
});

var servicesResourceCallResult;
var result;

/**
 * Handle all ajax calls to and from drupal services.
 *
 * @global
 */
var services = services || {
  /**
   * @namespace
   * @name services.comment
   */
  comment: {},
  /**
   * @namespace
   * @name services.system
   */
  file: {},
  /**
   * @namespace
   * @name services.node
   */
  node: {},
  /**
   * @namespace
   * @name services.system
   */
  system: {},
  /**
   * @namespace
   * @name services.taxonomyTerm
   */
  taxonomyTerm: {},
  /**
   * @namespace
   * @name services.taxonomyVocabulary
   */
  taxonomyVocabulary: {},
  /**
   * @namespace
   * @name services.user
   */
  user: {}
};

/**
 * Drupal services configuration settings.
 *
 * @param {object} options
 * @param {string} options.sitePath
 *        Defaults to 'http://localhost:8082'. For use with acquia stack.
 * @param {string} options.endPoint
 *        Defaults to 'rest'. Services endpoint.
 * @param {string} options.basePath
 *        Defaults to '?q='. For use without clean urls. Can be set to empty for clean urls.
 * @param {bool} options.debug
 *        Defaults to 0 or off. 1 to enable for easier debugging on hardware devices.
 */
services.config = function(options) {
  var defaultOptions = {
    sitePath: 'http://localhost:8082',
    endPoint: 'rest',
    basePath: '?q=',
    debug: 0
  };

  if (typeof options == 'object') {
    options = $.extend(defaultOptions, options);
  } else {
    options = defaultOptions;
  }

  return options;
};

/**
 * Make a call to a Drupal Service Resource.
 *
 * @param  {Object} options
 * @param  {string} options.url
 *    The path to the resource (required)
 * @param  {string} options.sitePath
 *    The full site path (default: config.sitePath)
 * @param  {string} options.basePath
 *    The drupal base path (default: config.basePath)
 * @param  {string} options.endPoint
 *    The endPoint name (default : config.services_endPoint_default)
 * @param  {string} options.type
 *    The method to use: get, post (default), put, delete
 * @param  {string} options.dataType
 *    The data type to use in the ajax call (default: json)
 * @param  {string} options.data
 *    The data string to send with the ajax call (optional)
 * @param  {string} options.loadFromLocalStorage
 *    Load service resource call from local storage.
 *    '0' = force reload from service resource
 *    '1' = grab from local storage if possible
 * @param  {string} options.saveToLocalStorage
 *    Load service resource call from local storage.
 *    '0' = force reload from service resource
 *    '1' = grab from local storage if possible
 * @param  {string} options.localStorageKey
 *    The key to use when storing the service resource call result
 *    in local storage. Default key formula: [options.type].[serviceResourceCallUrl]
 *    For example, a POST on the system connect resource would have a default key of
 *    post.http://www.drupalgap.org/?q=drupalgap/system/connect.json
 * @param  {boolean} options.async
 *    Whether or not to make the service call asynchronously.
 *    false - make the call synchronously (default) - @todo default should be true
 *    true - make the call asynchronously
 * @param  {function} options.error
 *    The error call back function.j
 * @param  {function} options.success
 *    The success call back function.
 * @param  {function} options.hookError
 *    The user's error call back function.
 * @param  {function} options.hookSuccess
 *    The user's success call back function.
 */
services.resource = function(options) {
  // Clear previous service call result stored in global variable.
  servicesResourceCallResult = null;
  result = null;

  try {
    // Validate options.
    // @todo - need to validate all other options and turn this into a function.
    if (!options.url) {
      console.log('resource_call - no url provided');
      return false;
    }

    // Get the default options (this does not override any options passed in).
    options = servicesResourceGetDefaultOptions(options);


    // Build URL to service resource.
    var serviceResourceCallUrl = options.sitePath + options.basePath + options.endPoint + '/' + options.url;


    // If we loaded the service resource result from local storage,
    // parse it out, otherwise make the service resource call.
    if (result) {
      console.log('loaded service resource from local storage (' + options.localStorageKey + ')');
      result = JSON.parse(result);

      // If the call is async, then we need to send this result back
      // to the success call back function(s). If it wasn't async,
      // then return the result to the caller.
      if (options.async) {
        options.success(result);
        if (options.hookSuccess) {
          options.hookSuccess(result);
        }
      }
      // Return the result if the call was not async.
      else {
        return result;
      }
    }
    else {
      // Print service resource call debug info to console.
      console.log('REQUEST:\n' + JSON.stringify({
        'path': serviceResourceCallUrl,
        'options': options
      }, undefined, 2));

      // Make the call, synchronously or asynchronously...
      if (options.async === false) {
        // Synchronously.
        $.ajax({
          url: serviceResourceCallUrl,
          type: options.type,
          data: options.data,
          dataType: options.dataType,
          async: options.async,
          success: function(data, textStatus, errorThrown) {
            // alert('success')
            services.resourceSuccess(data, textStatus, errorThrown);
          },
          error: function(jqXHR, textStatus, errorThrown)  {
            // alert('fail')
            services.resourceError(jqXHR, textStatus, errorThrown);
          },
          contentType: 'application/x-www-form-urlencoded',
          xhrFields: {
            withCredentials: true
          },
          beforeSend: function(jqXHR) {
            jqXHR.withCredentials = true;
          }
        });
      }
      else {
        // Asynchronously...
        $.ajax({
          url: serviceResourceCallUrl,
          type: options.type,
          data: options.data,
          dataType: options.dataType,
          async: options.async,
          contentType: 'application/x-www-form-urlencoded',
          xhrFields: {
            withCredentials: true
          },
          beforeSend: function(jqXHR) {
            jqXHR.withCredentials = true;
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          services.resourceError(jqXHR, textStatus, errorThrown);
        })
        .done(function(data) {
          services.resourceSuccess(data);
        });
      }
    }
  }
  catch (error) {
    console.log('Error: services/services.js');
    console.log('Object: services.resource - ' + error);
    console.log(JSON.stringify(options, undefined, 2));
  }

};

/**
 * Asynchronous ajax error call back function.
 *
 * @param  {Object} jqXHR
 * @param  {Object} textStatus
 * @param  {Object} errorThrown
 * @return Returns errors to the console.
 */
services.resourceError = function(jqXHR, textStatus, errorThrown) {
  // Log the error to the console.
  var result = {
    'jqXHR': jqXHR,
    'textStatus': textStatus,
    'errorThrown': errorThrown
  };
  console.log('RESPONSE:\n' + JSON.stringify(result, undefined, 2));

  // Alert the user.
  if (errorThrown) {
    console.log(errorThrown);
  }
  else {
    console.log(textStatus);
  }
};

/**
 * Asynchronous ajax success call back function.
 *
 * @param  {Object} data
 */
services.resourceSuccess = function(data) {
  // Hide the page loading message.
  // $.mobile.hidePageLoadingMsg();
  // Print data to console.
  console.log('RESPONSE:\n' + JSON.stringify(data, undefined, 2));
  // @todo - Understand why the options variable is available here,
  // and why the this.options approach didn't work as expected earlier.
  // Save the result to local storage, if necessary.
  if (data.saveToLocalStorage == '1') {

    window.localStorage.setItem(data.localStorageKey, JSON.stringify(data, undefined, 2));
    console.log('saving service resource to local storage (' + data.localStorageKey + ')');
  }
  else {
    console.log('NOT saving service resource to local storage (' + data.localStorageKey + ')');
  }
  result = data;
  // Clean up service resource result local storage dependencies.
  // servicesResourceCleanLocalStorageDependencies(data);
};

/**
 * Returns a URL to the service resource based on the incoming options.
 *
 * @param {Object} options
 * @param {string} options.url
 *    The path to the resource (required)
 * @param {string} options.sitePath
 *    The full site path (default: config.sitePath)
 * @param {string} options.basePath
 *    The drupal base path (default: config.basePath)
 * @param {string} options.endPoint
 *    The endPoint name (default : config.services_endPoint_default)
 */
services.resourceUrl = function(options) {
  return options.sitePath + options.basePath + options.endPoint + '/' + options.url;
};

/**
 * Returns a string key for local storage of a service call result.
 *
 * @param  {string} type
 *   The method to use: get, post, put, delete
 * @param  {string} url
 *   The full URL to the service resource. (e.g. system/connect.json)
 */

function servicesDefaultLocalStorageKey(type, url) {
  return type + '.' + url;
}

/**
 * Set default values for options if none were provided.
 */

function servicesResourceGetDefaultOptions(options) {
  if (!options.sitePath) {
    options.sitePath = config.sitePath;
  }
  if (!options.basePath) {
    options.basePath = config.basePath;
  }
  if (!options.endPoint) {
    options.endPoint = config.endPoint;
  }
  if (!options.type) {
    options.type = 'post';
  }
  if (!options.data) {
    options.data = '';
  }
  if (!options.dataType) {
    options.dataType = 'json';
  }
  if (!options.async) {
    options.async = false;
  }
  return options;
}

/**
 * If no loadFromLocalStorage option was set, set the default
 * for best performance based on the service resource call.
 *
 * @todo  Use regex here instead of indexOf to avoid collisions.
 * @todo  This needs to be smarter, for example this is getting set when the node
 *        is saved or deleted, which isn't necessarily the best for performance.
 *        I think we need to add some kind of 'op' parameter similar to what
 *        Drupal uses to handle special cases like this.
 */

function servicesGetLoadFromLocalStorageDefault(options) {
  // Determine cases where we do not want to load from local
  // storage here.
  switch (options.type.toLowerCase()) {
  case 'get':
    // Node retrieve resource.
    if (options.url.indexOf('node/') != -1) {
      if ($('div').attr('id') == 'drupal_page_node_edit') {
        options.loadFromLocalStorage = '0';
      }
    }
    else if (options.url.indexOf('comment/') != -1) {
      if ($('div').attr('id') == 'drupal_page_comment_edit') {
        options.loadFromLocalStorage = '0';
      }
    }
    break;
  case 'post':
    // User login/logout/register resources.
    var login = options.url.indexOf('user/login');
    var register = options.url.indexOf('user/register');
    var logout = options.url.indexOf('user/logout');

    if (login != -1 || logout != -1 || register != -1) {}
    // Node create resource.
    else if (options.url.indexOf('node.json') != -1) {}
    // Comment create resource.
    else if (options.url.indexOf('comment.json') != -1) {}
    break;
  case 'put':
    // User update resource.
    if (options.url.indexOf('user/') != -1) {}
    // Node update resource.
    else if (options.url.indexOf('node/') != -1) {}
    // Comment update resource.
    else if (options.url.indexOf('comment/') != -1) {}
    break;
  case 'delete':
    // Node delete resource.
    if (options.url.indexOf('node/') != -1) {}
    break;
  }

  // If we still haven't made a decision on whether or not to
  // try and load from local storage, do it now.
  if (!options.loadFromLocalStorage) {
    // We assume we will try to load from local storage.
    options.loadFromLocalStorage = '1';
  }
  if (options.loadFromLocalStorage == '0') {
    console.log('services.js - decided NOT to load from local storage');
  }

  return options;
}

/**
 * Set the default save to local storage option.
 *
 * @todo  Regex needs to be used instead of indexOf here.
 * @todo  The decision to save something into local storage here needs to be
 *        more intelligent. i.e. In offline mode we would want to store in local
 *        storage. Basically, we know 'put', 'delete' and some 'post' calls
 *        don't need local storage unless in offline mode. Right now the C.U.D.
 *        implementations decide this setting which is ok, but we could bring
 *        that decision into here so the C.U.D. implementations are cleaner.
 */

function servicesGetSaveToLocalStorageDefault(options) {
  switch (options.type.toLowerCase()) {
  case 'get':
    break;
  case 'post':
    // User login/logout/register resources.
    if (
    options.url.indexOf('user/login') != -1 || options.url.indexOf('user/logout') != -1 || options.url.indexOf('user/register') != -1) {
      options.saveToLocalStorage = '0';
    }
    // Node create resource.
    else if (options.url.indexOf('node.json') != -1) {
      options.saveToLocalStorage = '0';
    }
    // Comment create resource.
    else if (options.url.indexOf('comment.json') != -1) {
      options.saveToLocalStorage = '0';
    }
    break;
  case 'put':
    options.saveToLocalStorage = '0';
    break;
  case 'delete':
    options.saveToLocalStorage = '0';
    break;
  }

  // If we didn't figure out whether or not to save the result to
  // local storage, we'll assume it is OK to save to local storage.
  if (!options.saveToLocalStorage) {
    options.saveToLocalStorage = '1';
  }
  if (options.saveToLocalStorage == '0') {
    console.log('services.js - decided NOT to save in local storage');
  }

  return options;
}

/**
 * If this service resource call has local storage items dependent on result,
 * then remove those items from local storage.
 *
 * Stuff with dependents:
 *    user: create/update/delete/login/logout/registration
 *    node: create/update/delete
 *    comment: create/update/delete
 *
 * @todo  Need to use regex here instead of indexOf...
 * @todo  Our JS implementation of these service resources should include an
 *        array variable that allows us to stack a list of local storage keys,
 *        that way this dependency removal mechanism can be more dynamic/automated.
 */

function servicesResourceCleanLocalStorageDependencies(options) {
  console.log('servicesResourceCleanLocalStorageDependencies');
  // console.log(JSON.stringify(options, undefined, 2));
  switch (options.type.toLowerCase()) {
  case 'get':
    break;
  case 'post':
    // User login/logout/register resources.
    if (
    options.url.indexOf('user/login') != -1 || options.url.indexOf('user/logout') != -1 || options.url.indexOf('user/register') != -1) {
      // system/connect.json
      servicesSystemConnect.localStorageRemove();
    }
    // Node create resource.
    else if (options.url.indexOf('node.json') != -1) {
      // Remove views datasource content json.
      // views_options = {
      //   'path': 'views_datasource/drupal_content'
      // };
      // drupal_views_datasource_retrieve.localStorageRemove(views_options);
    }
    // Comment create resource.
    else if (options.url.indexOf('comment.json') != -1) {
      // Remove views datasource comment json.
      // views_options = {
      //   'path': 'views_datasource/drupal_comments'
      // };
      // drupal_views_datasource_retrieve.localStorageRemove(views_options);
      // Remove the comment's node comment views json.
      // views_options = {
      //   'path': 'views_datasource/drupal_comments/' + options.nid
      // };
      // drupal_views_datasource_retrieve.localStorageRemove(views_options);
      // Remove the comment's node.
      servicesNodeRetrieve.localStorageRemove({
        'nid': options.nid
      });
    }
    break;
  case 'put':
    // User update resource.
    if (options.url.indexOf('user/') != -1) {
      // Remove system/connect.json.
      servicesSystemConnect.localStorageRemove();
      // Remove drupal_system/connect.json.
      servicesResourceSystemConnect.localStorageRemove();
    }
    // Node update resource.
    else if (options.url.indexOf('node/') != -1) {
      // Remove the node from local storage.
      // @todo - Node id validation here.
      servicesNodeRetrieve.localStorageRemove({
        'nid': options.nid
      });
      // Remove views datasource content json.
      // views_options = {
      //   'path': 'views_datasource/drupal_content'
      // };
      // drupal_views_datasource_retrieve.localStorageRemove(views_options);
    }
    // Comment update resource.
    else if (options.url.indexOf('comment/') != -1) {
      // Remove the comment from local storage.
      // @todo - Comment id validation here.
      servicesCommentRetrieve.localStorageRemove({
        'cid': options.cid
      });
      // Remove views datasource comment json.
      // views_options = {
      //   'path': 'views_datasource/drupal_comments'
      // };
      // drupal_views_datasource_retrieve.localStorageRemove(views_options);
      // Remove the comment's node from local storage.
      // @todo - Node id validation here.
      servicesNodeRetrieve.localStorageRemove({
        'nid': options.nid
      });
      // Remove views datasource comments json.
      // views_options = {
      //   'path': 'views_datasource/drupal_comments/' + options.nid
      // };
      // drupal_views_datasource_retrieve.localStorageRemove(views_options);
    }
    break;
  case 'delete':
    // Node delete resource.
    if (options.url.indexOf('node/') != -1) {
      // Remove the node from local storage.
      // @todo - Node id validation here.
      servicesNodeRetrieve.localStorageRemove({
        'nid': options.nid
      });
      // Remove views datasource content json.
      // views_options = {
      //   'path': 'views_datasource/drupal_content'
      // };
      // drupal_views_datasource_retrieve.localStorageRemove(views_options);
      // Remove views datasource comment json.
      // views_options = {
      //   'path': 'views_datasource/drupal_comments'
      // };
      // drupal_views_datasource_retrieve.localStorageRemove(views_options);
      // @todo - remove any comments from this node from local storage.
    }
    // Comment delete resource.
    else if (options.url.indexOf('comment/') != -1) {
      // Remove the comment from local storage.
      // @todo - Comment id validation here.
      servicesCommentRetrieve.localStorageRemove({
        'cid': options.cid
      });
      // Remove views datasource comment json.
      // views_options = {
      //   'path': 'views_datasource/drupal_comments'
      // };
      // drupal_views_datasource_retrieve.localStorageRemove(views_options);
      // Remove the comment's node from local storage.
      // @todo - Node id validation here.
      servicesNodeRetrieve.localStorageRemove({
        'nid': options.nid
      });
      // Remove views datasource comments json.
      // views_options = {
      //   'path': 'views_datasource/drupal_comments/' + options.nid
      // };
      // drupal_views_datasource_retrieve.localStorageRemove(views_options);
    }
    break;
  }
}
