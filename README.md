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

You will want to test these on a web server or from a hardware device.

There are currently 3 examples to choose from.

 * The Simple example which has a bare minimum of markup and is meant to showcase the quickest way to get started.
 * The Twitter Bootstrap example which has more markup but looks much nicer.
 * The jQuery Mobile example which is ready to drop into PhoneGap.
 * You can also read some [documentation](https://github.com/cluke009/DrupalGap/tree/master/jsdocs "documentation")

Goals
--------
Eventually this project should accomplish a few things:

 * Provide simple javascript api for working with Drupal services module
 * Provide bare bones examples of how to connect to each service without anything extra, similar to the [Examples](http://drupal.org/project/examples "Examples") module
 * Provide a sample "app" with all those extras that aren't packaged into core


Current state
--------
The master branch is fairly stable at the moment and probably will not change considerably in the future.

Master should also be mostly compatible with any existing DrupalGap apps.

I have moved my development to the [dev branch](https://github.com/cluke009/DrupalGap/tree/dev "dev branch") as I have some significant refactoring I would like to do.

This branch will probably exist without working examples for some time. You will have to rely on jsdocs for help.


TODO
--------
Every project has a todo list and this is mine.

 * Reintegrate the DrupalGap module support
 * Figure out the best way to deal with localStorage
 * Determine how/at what point validation should be handled
 * Add support to check Drupal version (Currently only works with 7)
 * [Get url parameters working without clean urls](http://drupal.org/node/1806140 "Get url parameters working without clean urls")
