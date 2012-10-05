/**
 * All comments page is ready.
 */
$(document).ready(function () {
  try {
    // Clear the list.
    $("#drupalgap_page_comments_all_list").html("");

    // Build options to retrieve comments.
    views_options = {
      "path": "views_datasource/drupalgap_comments",
      "error": function (jqXHR, textStatus, errorThrown) {
        // Refresh the list.
        // $("#drupalgap_page_comments_all_list").listview("destroy").listview();
      },
      "success": function (comments_result) {

        // If there are any comments, add them to the list.
        if ($(comments_result.comments).length > 0) {
          $.each(comments_result.comments, function (index, obj) {
            $("#drupalgap_page_comments_all_list").append($("<li></li>", {
              "html": "<a href='comment.html' cid='" + obj.comment.cid + "'>" + obj.comment.subject + "</a>"
            }));
          });
        }
        else {
          $("#drupalgap_page_comments_all_list").append($("<li></li>", {
            "html": "Sorry, there are no published comments."
          }));
        }
        // Refresh the list.
        // $("#drupalgap_page_comments_all_list").listview("destroy").listview();
      },
    };
    // Retrieve comments
    drupalgap_views_datasource_retrieve.resource_call(views_options);
  }
  catch (error) {
    console.log("drupalgap_page_comments_all");
    console.log(error);
  }
});

/**
 * Preserve comment ID between pages.
 */
$('#drupalgap_page_comments_all_list li a').live("click", function () {
  // Save a reference to the comment id.
  var drupalgap_comment = drupalgap_comment_load();
  drupalgap_comment.cid = $(this).attr('cid');
  drupalgap_comment_save(drupalgap_comment);
});
