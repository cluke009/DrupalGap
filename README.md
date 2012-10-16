DrupalGap Setup
========
Requirements
--------
* jQuery 1.5.2 +
* Drupal 7.x
* Services 3.x
* [Clean URLS](http://drupal.org/getting-started/clean-urls "Clean URLS")
 * [Required to send parameters in urls.](http://drupal.org/node/1806140)

1. Enable Module
--------

Enable the [Services](http://drupal.org/project/services "Services") module.

Add a new endpoint and enable all resources

2. Configure client
--------
Place these settings in a javscript file somewhere.

<pre>
var options = {
  sitePath: 'http://localhost:8082',
  endPoint: 'rest',
  basePath: '/',
  debug: 0
};
services.init(options);
</pre>

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

Comparison
========
This Fork has significantly changed from [signalpoint / DrupalGap](https://github.com/signalpoint/DrupalGap "signalpoint / DrupalGap").
Hopefully for the better but everything here is still pretty experimental.

Improvements
--------
 * Now occupies a single namespace: services
 * Built in debugger for hardware devices.
 * Automated documentation with [jsdoc3 / jsdoc](https://github.com/jsdoc3/jsdoc "jsdoc3 / jsdoc")
 * Simplified interface
  * Makes fewer assumptions about your application
  * Stricly provides a simple way of communicating with the services module core components


Regressions
--------
 * The DrupalGap module is no longer supported
 * localStorage is no longer integrated
 * API has changed
