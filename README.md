Comparison
========
This branch has significantly changed from [signalpoint / DrupalGap](https://github.com/signalpoint/DrupalGap "signalpoint / DrupalGap").
Hopefully for the better but everything here is still pretty experimental.

Improvements
--------
 * Now occupies a single namespace: services
 * Automated documentation with [jsdoc3 / jsdoc](https://github.com/jsdoc3/jsdoc "jsdoc3 / jsdoc")
 * Simplified interface
  * Makes fewer assumptions about your application
  * Stricly provides a simple way of communicating with the services module core components


Regressions
--------
 * The DrupalGap module is no longer supported
 * localStorage is no longer integrated
 * API has changed


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
