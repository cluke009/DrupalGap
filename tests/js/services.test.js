var mockjaxDefaults = $.extend({}, $.mockjaxSettings);
var url = 'http://localhost:8082/?q=rest/';

function noErrorCallbackExpected() {
  ok( false, 'Error callback executed');
}

// Speed up our tests
$.mockjaxSettings.responseTime = 0;

/*******************************************************************************
 *
 * SYSTEM TESTS
 *
 ******************************************************************************/
module('System');
asyncTest('connect (User session: returns json)', function() {
  $.mockjax({
    url: '/rest/system/connect.json',
    proxy: 'json/system.connect.json'
  });

  var options = {
    success: function(data) {
      ok(data && data.sessid, 'Anonymous session retrieved');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.system.connect(options);

  $.mockjaxClear();
});

asyncTest('getVariable (Returns string|json)', function() {
  $.mockjax({
    url: '/rest/system/get_variable.json',
    proxy: 'json/system.getVariable.json'
  });

  var options = {
    name: 'site_mail',
    success: function(response) {
      equal(response, 'user@example.com');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.system.getVariable(options);

  $.mockjaxClear();
});

asyncTest('setVariable (Returns null)', function() {
  $.mockjax({
    url: '/rest/system/set_variable.json',
    proxy: 'json/system.setVariable.json'
  });

  var options = {
    name: 'site_mail',
    value: 'user1@example.com',
    success: function(response) {
      equal(response, 'null');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.system.setVariable(options);

  $.mockjaxClear();
});

asyncTest('delVariable (Returns null)', function() {
  $.mockjax({
    url: '/rest/system/del_variable.json',
    proxy: 'json/system.delVariable.json'
  });

  var options = {
    name: 'site_mail',
    success: function(response) {
      equal(response, 'null');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.system.delVariable(options);

  $.mockjaxClear();
});

/*******************************************************************************
 *
 * COMMENT TESTS
 *
 ******************************************************************************/
module('Comment');
asyncTest('create', function() {
  $.mockjax({
    url: '/rest/comment.json',
    proxy: 'json/comment.create.json'
  });

  var options = {
    subject: 'Acsi appellatio',
    body: 'Adipiscing comis et exerci.',
    nid: '1',
    success: function(data) {
      ok(data && data.cid, 'Comment posted');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.comment.create(options);

  $.mockjaxClear();
});

asyncTest('retrieve', function() {
  $.mockjax({
    url: '/rest/comment/1.json',
    proxy: 'json/comment.retrieve.json'
  });

  var options = {
    cid: '1',
    success: function(data) {
      ok(data && data.cid, 'Comment retrieved');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.comment.retrieve(options);

  $.mockjaxClear();
});

asyncTest('update', function() {
  $.mockjax({
    url: '/rest/comment/1.json',
    proxy: 'json/comment.update.json'
  });

  var options = {
    cid: '1',
    subject: 'Adipiscing comis',
    body: 'Duis persto velit.',
    language: '',
    success: function(response) {
      equal(response, '1');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.comment.update(options);

  $.mockjaxClear();
});

asyncTest('del', function() {
  $.mockjax({
    url: '/rest/comment/1.json',
    proxy: 'json/comment.delete.json'
  });

  var options = {
    cid: '1',
    success: function(response) {
      equal(response, 'true', 'Comment deleted');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.comment.del(options);

  $.mockjaxClear();
});

asyncTest('index', function() {
  $.mockjax({
    url: '/rest/comment.json?fields=nid,cid&parameters[uid]=1',
    proxy: 'json/comment.index.json'
  });
  var params = '{"uid": "1"}';
  var fields = 'nid, cid';
      fields = fields.split(',');

  var options = {
    params: $.parseJSON(params),
    fields: fields,
    success: function(data) {
      ok(data, 'Index retrieved');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.comment.index(options);

  $.mockjaxClear();
});

asyncTest('countAll', function() {
  $.mockjax({
    url: '/rest/comment/countAll.json',
    proxy: 'json/comment.countAll.json'
  });

  var options = {
    nid: '1',
    success: function(response) {
      equal(response, '4', 'countAll comments');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.comment.countAll(options);

  $.mockjaxClear();
});

asyncTest('countNew', function() {
  $.mockjax({
    url: '/rest/comment/countNew.json',
    proxy: 'json/comment.countNew.json'
  });

  var options = {
    nid: '1',
    success: function(response) {
      equal(response, '1', 'countNew comments');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.comment.countNew(options);

  $.mockjaxClear();
});

/*******************************************************************************
 *
 * FILE TESTS
 *
 ******************************************************************************/
module('File');
asyncTest('create', function() {
  $.mockjax({
    url: '/rest/file.json',
    proxy: 'json/file.create.json'
  });

  var options = {
    file: '/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjExNzQwNzIwNjgxMTkxMDlEQUM2MUIyOUNENzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0M3QkY0OEQ3RjdGMTFFMDg2NjRCQUZDOTcwOUEyNzEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0M3QkY0OEM3RjdGMTFFMDg2NjRCQUZDOTcwOUEyNzEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGMTE3NDA3MjA2ODExOTEwOURBQzYxQjI5Q0Q3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGMTE3NDA3MjA2ODExOTEwOURBQzYxQjI5Q0Q3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHB8fHx8fHx8fHx8BBwcHDQwNGBAQGBoVERUaHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fH//AABEIAgACAAMBEQACEQEDEQH/xAC3AAEAAgIDAQEAAAAAAAAAAAAABQgGBwEDBAIJAQEAAgMBAAAAAAAAAAAAAAAAAwQBAgUGEAABAwMBBQMFCAoQBAUFAQABAAIDEQQFBiExEgcIQVETYXEiMhSBkaGxQmJyI8FSgqKyc7QVdTfRkjNDg5OzJDTENYUWNkYYU9OUF+Fjo1QlwtJEZFZVEQEAAgEDBAEEAQQCAwAAAAAAAQIDETEEIUFREhRhcTIFE4GRIkKxM1IjFf/aAAwDAQACEQMRAD8AtSgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgEgCp2Abygp1q3rL1y3PZC307ZYxuHhuZGWFxNFNLNJCxxax7yJms9MUdQN2d6DoxvWxzCie3844XFXUYoD4LbiB5pvPEZZm1P0UGwNNda+jLxzY9QYS9xL3Ghlt3svIh5XbIJAPMxyDcmkOZ+gNYMB05nLa/kpU2wcY7gDvMEoZKB9ygyhAQEBAQEBAQEBAQEBAQEBAQEBAQEBBw5zWtLnENa0Vc47AAEGttX9RXKPS7pIbrOMvr2PfZ40G7fUb2l7PqWkdznhBqTP9cFq1zmae0u+RtfQuMhcCM08sMLZP5RBht31o805XfUY/D2zAdgEFw91O4l05HvAINrdPXUdnOYGpLvTupLWytbsWxucfNZtljEhiIErHtkklq7hdxDhpsBQWBQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEGvufmrP8L8pdQ5CN5ZdT25sbMg0d4t4fBDmnvY17n/coPzsQEBB9RySRSNkieWSMIcx7SQ4EbQQRuKDb+gOqXmfpV0VvfXX+IsUwgOtcgS6YN7fDuhWUH6fGB3ILQ8tOo3l1rp8dlFcnEZt+wYy/LWF7t1IJa+HL5G1DvmoNpICAgICAgICAgICAgICAgICAg6b2+srC0lvL64itLSBpfPczvbHGxo3ue9xDWjzoK/cxusTSmHM9ho61OeyDKsF/LWKxa4VFW7pZqEdnC09jkFZ9dc5OY2t3vGdzEr7J27G258C0ArUAxMoH07C/id5UGFICAgyjlhqt+k+YOB1AHcEVjdxm5I7beQ+HcD3YXuCD9LAQRUbQdxQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEFZut3UDocBprT7Cf55dTX0wHdbRiJlfObh3vIKiICAgICAg3Pyr6oddaNMVhlnu1DgG0b7NcvPtMLd31FweJ1B9o+rewcO9BcDl5zU0Vr/He16dv2yzRtDrrHy0juoK/wDEiJrSppxNq09hQZagIOi9yFhYQG4vrmK1gbvlne2Ng+6cQEGHZbnjyixXELvVmOLmbHNt5hdOBBpTht/FNUGJZDq25LWtfAyF3f0/9vZzNru/44h70GP3fWvy4ZUWuGy85FdsjLaMEjdSk7zQ+ZBFT9cOAbw+z6Vu5N/F4l1HHTupRj6oOr/fHi//AORn/wCtZ/yUD/fHi/8A+Rn/AOtZ/wAlB7Lbre0m4s9p01fxgj6zw5YZKGnZxeHXb5kExY9Z/KufhFxY5e0cacTnwQPYKnvjnc40+igyXGdUXJK/LW/n82kjqUZc21zHSve8RujG/wC2QZlh+ZfLzMlrcXqXGXcjqUhju4TJt3VjLuMV8yDJAQRUbQdxQEGnebPUzorQxnxlgRndRx1Y6ygdSGB//wCxMAQCDvY2ruw8O9BT7mHzb11r+88bUOQc+1a7jt8ZBWO0hO2nBECakVpxPJd5UGHICAgICAg/SPk7n/8AEHK7TGVc7jllx8Mc7++aAeBKf4yNyDMUBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEFKutHJm45nY6xa6sdjioqtrukmmlc732BiDQCAgICAgICD3YbN5fCZKDKYi8lschbO4oLmB5Y9p847DuI3Eb0G9Y+tHmLHgoLP8ANmOlyzBwzZSVslJB2O8Bjo2tf3kHh+aEGBai6huceeLhc6lubWI7obDhsgB3cVuI3n7pxQYDfZC/v7h1zf3Mt3cO9aad7pHnzueSUHnQEBAQEBAQEBAQTWC1rrDAEHCZu+xoHyLW5liafO1rg0+6EGXZLqK5xZLAS4O81FK61mo2SaOOKG4MdCDH48TGP4XV9LbU7q02INboCAgICAgICC9PSDlDecnILcuqMbf3dqBWtOItuaeT+kIN1oCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIKHdWkz5OdeTY7dDbWbGeYwNf8AG4oNOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgILm9E0sh5d5uIn6tmXc9rdmwutoAT96EFh0BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEFEOra3dFzpyLyaie1s5G+QCEM+NiDTSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICC53RPA8cuc1OSOB+YewDtqy1gJ/DCCwyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICCmfWviXQcwMLlAKR3uMEPbtkt55C4/tZmIK7oCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIL49JmJdYcl8dO4EHJXN3d0Nd3imAe+IKoNxoCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIK99aGmHZDl/jM/E3ikwl7wSmnqwXjQxxr+NjiHuoKXoCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIP0r5WWmKs+W+mrXFXMd5YwY63ZHdQniZI5sYEjwfLJxVHYdiDKUBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEFfOq/m/iMNpu50JaMjvs1mIgL1j/SZaW5Ic17qH91cQDGOz1j8moUuQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQbq6c+e9zoPLsweamdJpDISfWV2mzmfQeOwbTwH98aPpDaKOC9EM0U0TJoXtkikaHxyM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vgbs8U1o3i3cTC5h+9IU1OTkrtKC3Fxz2Rc/L3CP2xyTxHuDmuHwtr8Kmjn3jfRDb9fSdtXhm5bN3w35HkfHX4Q77Clj9j5hFP63xZ2WmiL+2icwTxPq7ir6TewDuPcsW5lZnaUc/r79phG5HRGdkuHSRtje0gUo8A7qdtFNj5mOI6o54GT6PC/RWpW1/mnEB2iSP/7qqWOZj8/8tZ4WXx/w63aS1G0VNi+nkLD8RWflY/LX4mTw9uJ07m4vF8SzkbxcNK07K+VR5eRSe5HFyeHXlNN5yW4a6Ozkc0MAqAN9T5VnHyKRG5PFyeHkbpTUTjQWMnu8I+MqT5WPyxHFyeHY3RupXbrI7O98Y+Ny1+Xj8to4eXx/wkcXo3PQyudLE1gLaCr2nbXyEqLJy8cx0lvHByeHrvdD5W6MdJYWBnFxcTnE7abqN8ijpzaV8t//AJ957w+YuW05/db5je/gjLvjc1Zn9hHaG8frp7y9sPLjGNp411M/6PCz4w5RT+wt2iEsfrq95lKWWkcHaVLIXPcaVL3uO7yAgKG/LvbumrwscdklDY2cP7lAxh7w0V99QTe07ymrirXaId61SCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg/9k=',
    filename: 'octocat.jpg',
    success: function(data) {
      ok(data, 'File created');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.file.create(options);

  $.mockjaxClear();
});

asyncTest('retrieve', function() {
  $.mockjax({
    url: '/rest/file/1.json',
    proxy: 'json/file.retrieve.json'
  });

  var options = {
    fid: '1',
    success: function(data) {
      ok(data, 'File retrieved');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.file.retrieve(options);

  $.mockjaxClear();
});

asyncTest('delete', function() {
  $.mockjax({
    url: '/rest/file/1.json',
    proxy: 'json/file.delete.json'
  });

  var options = {
    fid: '1',
    success: function(response) {
      equal(response, 'true', 'File deleted');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.file.del(options);

  $.mockjaxClear();
});

asyncTest('index', function() {
  $.mockjax({
    url: '/rest/file.json?fields=fid,filename&parameters[uid]=1',
    proxy: 'json/file.index.json'
  });

  var params = '{"uid": "1"}';
  var fields = 'fid,filename';
      fields = fields.split(',');

  var options = {
    params: $.parseJSON(params),
    fields: fields,
    success: function(data) {
      ok(data, 'File index');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.file.index(options);

  $.mockjaxClear();
});

asyncTest('createRaw', function() {
  $.mockjax({
    url: '/rest/file.json',
    proxy: 'json/file.createRaw.json'
  });

  var options = {
    file: '/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjExNzQwNzIwNjgxMTkxMDlEQUM2MUIyOUNENzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6N0M3QkY0OEQ3RjdGMTFFMDg2NjRCQUZDOTcwOUEyNzEiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6N0M3QkY0OEM3RjdGMTFFMDg2NjRCQUZDOTcwOUEyNzEiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGMTE3NDA3MjA2ODExOTEwOURBQzYxQjI5Q0Q3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGMTE3NDA3MjA2ODExOTEwOURBQzYxQjI5Q0Q3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAYEBAQFBAYFBQYJBgUGCQsIBgYICwwKCgsKCgwQDAwMDAwMEAwODxAPDgwTExQUExMcGxsbHB8fHx8fHx8fHx8BBwcHDQwNGBAQGBoVERUaHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fH//AABEIAgACAAMBEQACEQEDEQH/xAC3AAEAAgIDAQEAAAAAAAAAAAAABQgGBwEDBAIJAQEAAgMBAAAAAAAAAAAAAAAAAwQBAgUGEAABAwMBBQMFCAoQBAUFAQABAAIDEQQFBiExEgcIQVETYXEiMhSBkaGxQmJyI8FSgqKyc7QVdTfRkjNDg5OzJDTENYUWNkYYU9OUF+Fjo1QlwtJEZFZVEQEAAgEDBAEEAQQCAwAAAAAAAQIDETEEIUFREhRhcTIFE4GRIkKxM1IjFf/aAAwDAQACEQMRAD8AtSgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgEgCp2Abygp1q3rL1y3PZC307ZYxuHhuZGWFxNFNLNJCxxax7yJms9MUdQN2d6DoxvWxzCie3844XFXUYoD4LbiB5pvPEZZm1P0UGwNNda+jLxzY9QYS9xL3Ghlt3svIh5XbIJAPMxyDcmkOZ+gNYMB05nLa/kpU2wcY7gDvMEoZKB9ygyhAQEBAQEBAQEBAQEBAQEBAQEBAQEBBw5zWtLnENa0Vc47AAEGttX9RXKPS7pIbrOMvr2PfZ40G7fUb2l7PqWkdznhBqTP9cFq1zmae0u+RtfQuMhcCM08sMLZP5RBht31o805XfUY/D2zAdgEFw91O4l05HvAINrdPXUdnOYGpLvTupLWytbsWxucfNZtljEhiIErHtkklq7hdxDhpsBQWBQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEGvufmrP8L8pdQ5CN5ZdT25sbMg0d4t4fBDmnvY17n/coPzsQEBB9RySRSNkieWSMIcx7SQ4EbQQRuKDb+gOqXmfpV0VvfXX+IsUwgOtcgS6YN7fDuhWUH6fGB3ILQ8tOo3l1rp8dlFcnEZt+wYy/LWF7t1IJa+HL5G1DvmoNpICAgICAgICAgICAgICAgICAg6b2+srC0lvL64itLSBpfPczvbHGxo3ue9xDWjzoK/cxusTSmHM9ho61OeyDKsF/LWKxa4VFW7pZqEdnC09jkFZ9dc5OY2t3vGdzEr7J27G258C0ArUAxMoH07C/id5UGFICAgyjlhqt+k+YOB1AHcEVjdxm5I7beQ+HcD3YXuCD9LAQRUbQdxQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEFZut3UDocBprT7Cf55dTX0wHdbRiJlfObh3vIKiICAgICAg3Pyr6oddaNMVhlnu1DgG0b7NcvPtMLd31FweJ1B9o+rewcO9BcDl5zU0Vr/He16dv2yzRtDrrHy0juoK/wDEiJrSppxNq09hQZagIOi9yFhYQG4vrmK1gbvlne2Ng+6cQEGHZbnjyixXELvVmOLmbHNt5hdOBBpTht/FNUGJZDq25LWtfAyF3f0/9vZzNru/44h70GP3fWvy4ZUWuGy85FdsjLaMEjdSk7zQ+ZBFT9cOAbw+z6Vu5N/F4l1HHTupRj6oOr/fHi//AORn/wCtZ/yUD/fHi/8A+Rn/AOtZ/wAlB7Lbre0m4s9p01fxgj6zw5YZKGnZxeHXb5kExY9Z/KufhFxY5e0cacTnwQPYKnvjnc40+igyXGdUXJK/LW/n82kjqUZc21zHSve8RujG/wC2QZlh+ZfLzMlrcXqXGXcjqUhju4TJt3VjLuMV8yDJAQRUbQdxQEGnebPUzorQxnxlgRndRx1Y6ygdSGB//wCxMAQCDvY2ruw8O9BT7mHzb11r+88bUOQc+1a7jt8ZBWO0hO2nBECakVpxPJd5UGHICAgICAg/SPk7n/8AEHK7TGVc7jllx8Mc7++aAeBKf4yNyDMUBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEFKutHJm45nY6xa6sdjioqtrukmmlc732BiDQCAgICAgICD3YbN5fCZKDKYi8lschbO4oLmB5Y9p847DuI3Eb0G9Y+tHmLHgoLP8ANmOlyzBwzZSVslJB2O8Bjo2tf3kHh+aEGBai6huceeLhc6lubWI7obDhsgB3cVuI3n7pxQYDfZC/v7h1zf3Mt3cO9aad7pHnzueSUHnQEBAQEBAQEBAQTWC1rrDAEHCZu+xoHyLW5liafO1rg0+6EGXZLqK5xZLAS4O81FK61mo2SaOOKG4MdCDH48TGP4XV9LbU7q02INboCAgICAgICC9PSDlDecnILcuqMbf3dqBWtOItuaeT+kIN1oCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIKHdWkz5OdeTY7dDbWbGeYwNf8AG4oNOICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgILm9E0sh5d5uIn6tmXc9rdmwutoAT96EFh0BAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEFEOra3dFzpyLyaie1s5G+QCEM+NiDTSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICC53RPA8cuc1OSOB+YewDtqy1gJ/DCCwyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICCmfWviXQcwMLlAKR3uMEPbtkt55C4/tZmIK7oCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIL49JmJdYcl8dO4EHJXN3d0Nd3imAe+IKoNxoCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIK99aGmHZDl/jM/E3ikwl7wSmnqwXjQxxr+NjiHuoKXoCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIP0r5WWmKs+W+mrXFXMd5YwY63ZHdQniZI5sYEjwfLJxVHYdiDKUBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEFfOq/m/iMNpu50JaMjvs1mIgL1j/SZaW5Ic17qH91cQDGOz1j8moUuQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQbq6c+e9zoPLsweamdJpDISfWV2mzmfQeOwbTwH98aPpDaKOC9EM0U0TJoXtkikaHxyM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vgbs8U1o3i3cTC5h+9IU1OTkrtKC3Fxz2Rc/L3CP2xyTxHuDmuHwtr8Kmjn3jfRDb9fSdtXhm5bN3w35HkfHX4Q77Clj9j5hFP63xZ2WmiL+2icwTxPq7ir6TewDuPcsW5lZnaUc/r79phG5HRGdkuHSRtje0gUo8A7qdtFNj5mOI6o54GT6PC/RWpW1/mnEB2iSP/7qqWOZj8/8tZ4WXx/w63aS1G0VNi+nkLD8RWflY/LX4mTw9uJ07m4vF8SzkbxcNK07K+VR5eRSe5HFyeHXlNN5yW4a6Ozkc0MAqAN9T5VnHyKRG5PFyeHkbpTUTjQWMnu8I+MqT5WPyxHFyeHY3RupXbrI7O98Y+Ny1+Xj8to4eXx/wkcXo3PQyudLE1gLaCr2nbXyEqLJy8cx0lvHByeHrvdD5W6MdJYWBnFxcTnE7abqN8ijpzaV8t//AJ957w+YuW05/db5je/gjLvjc1Zn9hHaG8frp7y9sPLjGNp411M/6PCz4w5RT+wt2iEsfrq95lKWWkcHaVLIXPcaVL3uO7yAgKG/LvbumrwscdklDY2cP7lAxh7w0V99QTe07ymrirXaId61SCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg/9k=',
    filename: 'octocat.jpg',
    success: function(data) {
      ok(data, 'File created');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.file.createRaw(options);

  $.mockjaxClear();
});

/*******************************************************************************
 *
 * NODE TESTS
 *
 ******************************************************************************/
module('Node');
asyncTest('create', function() {
  $.mockjax({
    url: '/rest/node.json',
    proxy: 'json/node.create.json'
  });

  var options = {
    title: 'Abbas aliquam humo',
    body: 'Cogo hos nulla quadrum tum uxor. Autem decet dolore fere haero loquor quidem saluto sudo utinam. Consequat paulatim pertineo ratis tum. Antehabeo erat imputo oppeto pala refero volutpat. Facilisis illum iusto luctus nutus occuro os premo quae. Consequat conventio et gemino nunc premo quidne vero vulpes vulputate.',
    type: 'page',
    success: function(data) {
      ok(data, 'Node created');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.node.create(options);

  $.mockjaxClear();
});

asyncTest('retrieve', function() {
  $.mockjax({
    url: '/rest/node/1.json',
    proxy: 'json/node.retrieve.json'
  });

  var options = {
    nid: '1',
    success: function(data) {
      ok(data, 'Node retrieved');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.node.retrieve(options);

  $.mockjaxClear();
});

asyncTest('update', function() {
  $.mockjax({
    url: '/rest/node/1.json',
    proxy: 'json/node.update.json'
  });

  var options = {
    title: 'Abbas aliquam humo',
    body: 'Cogo hos nulla quadrum tum uxor. Autem decet dolore fere haero loquor quidem saluto sudo utinam. Consequat paulatim pertineo ratis tum. Antehabeo erat imputo oppeto pala refero volutpat. Facilisis illum iusto luctus nutus occuro os premo quae. Consequat conventio et gemino nunc premo quidne vero vulpes vulputate.',
    nid: '1',
    success: function(data) {
      ok(data, 'Node updated');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.node.update(options);

  $.mockjaxClear();
});

asyncTest('delete', function() {
  $.mockjax({
    url: '/rest/node/1.json',
    proxy: 'json/node.delete.json'
  });

  var options = {
    nid: '1',
    success: function(response) {
      equal(response, 'true', 'Node deleted');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.node.del(options);

  $.mockjaxClear();
});

asyncTest('index', function() {
  $.mockjax({
    url: '/rest/node.json?fields=nid,vid&parameters[uid]=1',
    proxy: 'json/node.index.json'
  });

  var params = '{"uid": "1"}';
  var fields = 'nid,vid';
      fields = fields.split(',');

  var options = {
    params: $.parseJSON(params),
    fields: fields,
    success: function(data) {
      ok(data, 'Node index');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.node.index(options);

  $.mockjaxClear();
});

asyncTest('files', function() {
  $.mockjax({
    url: '/rest/node/1/files.json',
    proxy: 'json/node.files.json'
  });

  var options = {
    nid: '1',
    success: function(data) {
      ok(data, 'Node files');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.node.files(options);

  $.mockjaxClear();
});

asyncTest('comments', function() {
  $.mockjax({
    url: '/rest/node/1/comments.json',
    proxy: 'json/node.comments.json'
  });

  var options = {
    nid: '1',
    success: function(data) {
      ok(data, 'Node comments');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.node.comments(options);

  $.mockjaxClear();
});

/*******************************************************************************
 *
 * TAXONOMY TERM TESTS
 *
 ******************************************************************************/
module('taxonomyTerm');
asyncTest('create', function() {
  $.mockjax({
    url: '/rest/taxonomy_term.json',
    proxy: 'json/taxonomyTerm.create.json'
  });

  var options = {
    vid: '1',
    name: 'lorem',
    description: 'lorem description',
    weight: '0',
    parent: '0',
    success: function(response) {
      equal(response, '1', 'Taxonomy term created');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.taxonomyTerm.create(options);

  $.mockjaxClear();
});

asyncTest('retrieve', function() {
  $.mockjax({
    url: '/rest/taxonomy_term/1.json',
    proxy: 'json/taxonomyTerm.retrieve.json'
  });

  var options = {
    tid: '1',
    success: function(data) {
      ok(data, 'Taxonomy vocabulary created');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.taxonomyTerm.retrieve(options);

  $.mockjaxClear();
});

// asyncTest('update', function() {
//   $.mockjax({
//     url: '/rest/taxonomy_term.json',
//     proxy: 'json/taxonomyTerm.update.json'
//   });

//   var options = {
//     vid: '1',
//     name: 'lorem',
//     description: 'lorem description',
//     weight: '0',
//     parent: '0',
//     success: function(response) {
//       equal(response, '1', 'Taxonomy vocabulary created');
//     },
//     error: noErrorCallbackExpected,
//     complete: function() {
//       start();
//     }
//   };
//   services.taxonomyTerm.update(options);

//   $.mockjaxClear();
// });

asyncTest('delete', function() {
  $.mockjax({
    url: '/rest/taxonomy_term/1.json',
    proxy: 'json/taxonomyTerm.delete.json'
  });

  var options = {
    tid: '1',
    success: function(data) {
      ok(data, 'Taxonomy vocabulary deleted');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.taxonomyTerm.del(options);

  $.mockjaxClear();
});

asyncTest('index', function() {
  $.mockjax({
    url: '/rest/taxonomy_term.json?fields=tid,name&parameters[vid]=1',
    proxy: 'json/taxonomyTerm.index.json'
  });

  var params = '{"vid": "1"}';
  var fields = 'tid,name';
      fields = fields.split(',');

  var options = {
    params: $.parseJSON(params),
    fields: fields,
    success: function(data) {
      ok(data, 'Taxonomy vocabulary index');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.taxonomyTerm.index(options);

  $.mockjaxClear();
});

asyncTest('selectNodes', function() {
  $.mockjax({
    url: '/rest/taxonomy_term/selectNodes.json',
    proxy: 'json/taxonomyTerm.selectNodes.json'
  });

  var options = {
    tid: '1',
    success: function(data) {
      ok(data, 'Taxonomy vocabulary selectNodes');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.taxonomyTerm.selectNodes(options);

  $.mockjaxClear();
});

/*******************************************************************************
 *
 * TAXONOMY VOCABULARY TESTS
 *
 ******************************************************************************/
module('taxonomyVocabulary');
asyncTest('create', function() {
  $.mockjax({
    url: '/rest/taxonomy_vocabulary.json',
    proxy: 'json/taxonomyVocabulary.create.json'
  });

  var options = {
    name: 'lorem',
    machine_name: 'machine_lorem',
    description: 'lorem description',
    success: function(response) {
      equal(response, '1', 'Taxonomy vocabulary created');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.taxonomyVocabulary.create(options);

  $.mockjaxClear();
});

asyncTest('retrieve', function() {
  $.mockjax({
    url: '/rest/taxonomy_vocabulary/1.json',
    proxy: 'json/taxonomyVocabulary.retrieve.json'
  });

  var options = {
    vid: '1',
    success: function(data) {
      ok(data, 'Taxonomy vocabulary created');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.taxonomyVocabulary.retrieve(options);

  $.mockjaxClear();
});

asyncTest('update', function() {
  $.mockjax({
    url: '/rest/taxonomy_vocabulary/1.json',
    proxy: 'json/taxonomyVocabulary.update.json'
  });

  var options = {
    vid: '1',
    name: 'lorem',
    description: 'lorem description',
    weight: '0',
    parent: '0',
    success: function(response) {
      equal(response, '2', 'Taxonomy vocabulary created');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.taxonomyVocabulary.update(options);

  $.mockjaxClear();
});

asyncTest('delete', function() {
  $.mockjax({
    url: '/rest/taxonomy_vocabulary/1.json',
    proxy: 'json/taxonomyVocabulary.delete.json'
  });

  var options = {
    vid: '1',
    success: function(data) {
      ok(data, 'Taxonomy vocabulary deleted');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.taxonomyVocabulary.del(options);

  $.mockjaxClear();
});

asyncTest('index', function() {
  $.mockjax({
    url: '/rest/taxonomy_vocabulary.json?fields=tid,name&parameters[vid]=1',
    proxy: 'json/taxonomyVocabulary.index.json'
  });

  var params = '{"vid": "1"}';
  var fields = 'tid,name';
      fields = fields.split(',');

  var options = {
    params: $.parseJSON(params),
    fields: fields,
    success: function(data) {
      ok(data, 'Taxonomy vocabulary index');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.taxonomyVocabulary.index(options);

  $.mockjaxClear();
});

asyncTest('getTree', function() {
  $.mockjax({
    url: '/rest/taxonomy_vocabulary/getTree.json',
    proxy: 'json/taxonomyVocabulary.getTree.json'
  });

  var options = {
    vid: '1',
    success: function(data) {
      ok(data, 'Taxonomy vocabulary getTree');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.taxonomyVocabulary.getTree(options);

  $.mockjaxClear();
});

/*******************************************************************************
 *
 * USER TESTS
 *
 ******************************************************************************/
module('User');
asyncTest('create', function() {
  $.mockjax({
    url: '/rest/user.json',
    proxy: 'json/user.create.json'
  });

  var options = {
    name: 'test',
    mail: 'test@example.com',
    pass: 'test',
    success: function(data) {
      ok(data, 'User created');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.user.create(options);

  $.mockjaxClear();
});

asyncTest('retrieve', function() {
  $.mockjax({
    url: '/rest/user/1.json',
    proxy: 'json/user.retrieve.json'
  });

  var options = {
    uid: '1',
    success: function(data) {
      ok(data, 'User created');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.user.retrieve(options);

  $.mockjaxClear();
});

asyncTest('update', function() {
  $.mockjax({
    url: '/rest/user/1.json',
    proxy: 'json/user.update.json'
  });

  var options = {
    uid: '1',
    name: 'root',
    mail: 'root@example.com',
    currentPass: 'root',
    pass: 'root',
    success: function(data) {
      ok(data, 'User updated');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.user.update(options);

  $.mockjaxClear();
});

asyncTest('delete', function() {
  $.mockjax({
    url: '/rest/user/2.json',
    proxy: 'json/user.delete.json'
  });

  var options = {
    uid: '2',
    success: function(response) {
      equal(response, 'true', 'User deleted');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.user.del(options);

  $.mockjaxClear();
});

asyncTest('index', function() {
  $.mockjax({
    url: '/rest/user.json?fields=uid,name&parameters[uid]=1',
    proxy: 'json/user.index.json'
  });

  var params = '{"uid": "1"}';
  var fields = 'uid,name';
      fields = fields.split(',');

  var options = {
    params: $.parseJSON(params),
    fields: fields,
    success: function(data) {
      ok(data, 'User index');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.user.index(options);

  $.mockjaxClear();
});

asyncTest('login', function() {
  $.mockjax({
    url: '/rest/user/login.json',
    proxy: 'json/user.login.json'
  });

  var options = {
    name: 'root',
    pass: 'root',
    success: function(data) {
      ok(data && data.sessid, 'User login');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.user.login(options);

  $.mockjaxClear();
});

asyncTest('logout', function() {
  $.mockjax({
    url: '/rest/user/logout.json',
    proxy: 'json/user.logout.json'
  });

  var options = {
    success: function(response) {
      equal(response, 'true', 'User logout');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.user.logout(options);

  $.mockjaxClear();
});

asyncTest('register', function() {
  $.mockjax({
    url: '/rest/user/register.json',
    proxy: 'json/user.register.json'
  });

  var options = {
    name: 'register',
    mail: 'register@example.com',
    pass: 'register',
    success: function(data) {
      ok(data, 'User created');
    },
    error: noErrorCallbackExpected,
    complete: function() {
      start();
    }
  };
  services.user.register(options);

  $.mockjaxClear();
});
