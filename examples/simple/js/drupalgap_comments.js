/*global services*/
services.viewsDataSource.drupalgapComments = function (options) {
  try {
    // Build the options for the service call.
    options = {
      type: 'get',
      endPoint: '',
      url: 'drupalgap/views_datasource/drupalgap_comments',
      async: true,
      success: this.successs,
      error: this.error
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: drupalgap_comments.js');
    console.log('Object: services.viewsDataSource.drupalgapComments - ' + error);
  }
};
services.viewsDataSource.drupalgap_content = function (options) {
  try {
    // Build the options for the service call.
    options = {
      endPoint: '',
      type: 'get',
      url: 'drupalgap/views_datasource/drupalgap_content',
      async: true,
      success: this.successs,
      error: this.error
    };

    // Make the service call.
    services.resource(options);
  }
  catch (error) {
    console.log('Error: drupalgap_content');
    console.log('Object: services.viewsDataSource.drupalgap_content - ' + error);
  }
};

$('#submit_drupalgap_comments').live('click', function () {
  // Build service call options.

  // Make service call.
  services.viewsDataSource.drupalgap_content();
});
