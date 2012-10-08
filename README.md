DrupalGap Setup
========
1. Enable Module
--------

Enable the [Services](http://drupal.org/project/services "Services") module.

Add a new endpoint and enable all resources

2. Edit services.js
--------

Open js/services/services.js and configure your site_path and endpoint.

3. Enable CORS
--------

Add this code to the end of settings.php.

This will allow your app to connect to Drupal from any domain.

<pre>
if (isset($_SERVER['HTTP_ORIGIN'])){
  $origin = $_SERVER['HTTP_ORIGIN'];
  drupal_add_http_header('Access-Control-Allow-Origin', $origin);
  drupal_add_http_header('Access-Control-Allow-Credentials', 'true');
  drupal_add_http_header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
}
</pre>
4. Check out some examples
--------

There are currently 2 examples to choose from.

 * The simple example which has a bare minimum of markup and is meant to showcse the quickest way to get started.
 * The twitter bootstrap example which has more markup but looks much nicer.

Goals
--------
Eventually this project should accomplish a few things:

 * Provide simple javascript api for working with Drupal services module
 * Provide bare bones examples of how to connect to each service without anything extra, similar to the examples module
 * Provide a sample "app" with all those extras that aren't packaged into core