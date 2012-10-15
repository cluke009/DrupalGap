// var myModule = {
//   myProperty: 'someValue',
//   // object literals can contain properties and methods.
//   // here, another object is defined for configuration
//   // purposes:
//   myConfig: {
//     useCaching: true,
//     language: 'en'
//   },
//   // a very basic method
//   myMethod: function () {
//     console.log('I can haz functionality?');
//   },
//   // output a value based on current configuration
//   myMethod2: function () {
//     console.log('Caching is:' + (this.myConfig.useCaching) ? 'enabled' : 'disabled');
//   },
//   // override the current configuration
//   myMethod3: function (newConfig) {
//     if (typeof newConfig == 'object') {
//       this.myConfig = newConfig;
//       console.log(this.myConfig.language);
//     }
//   }
// };
// myModule.myMethod(); // I can haz functionality
// myModule.myMethod2(); // outputs enabled
// myModule.myMethod3({
//   language: 'fr',
//   useCaching: false
// }); // fr
// console.log(myModule.myConfig.language);
/**
 * Make services.system.connect call
 */
$('#submit_system_connect').live('click', function () {

  // Make service call.
  services.system.connect();
});

/**
 * Make services.system.get_variable call
 */
$('#submit_system_connect_get_variable').live('click', function () {
  // Build service call options.
  options = {
    "name": $('#input_system_get_variable').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make service call.
  services.system.getVariable(options);
});

/**
 * Make services.system.set_variable call
 */
$('#submit_system_connect_set_variable').live('click', function () {
  // Build service call options.
  options = {
    "name": $('#input_system_get_variable').val(),
    "value": $('#input_system_set_variable').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make service call.
  services.system.setVariable(options);
});

/**
 * Make services.system.set_variable call
 */
$('#submit_system_connect_del_variable').live('click', function () {
  // Build service call options.
  options = {
    // Change 'site_mail' to the variable name you want.
    "name": $('#input_system_get_variable').val(),
    "success": function () {},
    "error": function () {}
  };
  // Make service call.
  services.system.delVariable(options);
});

/**
 * Clear localStorage so we can load new settings.
 */
$('#submit_system_clear').live('click', function () {
  localStorage.clear();
  console.log("localStorage cleared");
})
