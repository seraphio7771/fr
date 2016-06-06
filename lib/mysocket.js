
module.exports.create = function (cfg) {

  return {

    updateInterval: 200,
    timer: null,
    ref: null,
    handlers: {},


    handlerCheck: function (action) {
      return action in this.handlers && 'function' == typeof this.handlers[action];
    },


    handlerRemove: function (action) {
      if (this.handlerCheck(action)) {
        this.handlers[action] = null;
        delete(this.handlers[action]);
      }
    },


    handlerAdd: function (action, callback) {
      this.handlers[action] = callback;
    },


    processActions: function (actions) {
      actions.forEach((function(a) {
        if (this.handlerCheck(a.action)) {
          this.handlers[a.action](a.data);
        }
      }).bind(this));
    },


    init: function (cfg) {
      this.cfg = cfg;

      this.on = this.handlerAdd;

      // Put to 1 string..
      this.ref = cordova.InAppBrowser.open('http://192.168.1.123:8080/webview/index.html?r=' + Math.random(), '_blank', 'hidden=yes');
      this.ref.addEventListener('loadstop', (function () {
        var param =  JSON.stringify(this.cfg);
        this.ref.executeScript({code: 'app.init(' + param + ');'});
      }).bind(this));

      setInterval((function() {
        this.ref.executeScript({code: 'app.getEvents();'}, (function (answer) {
          if (answer && answer.length > 0 && answer[0].length > 0) {
            this.processActions(answer[0]);
          }
        }).bind(this));
      }).bind(this), this.updateInterval);
    },


    emit: function (action, data) {
      this.ref.executeScript({code: 'app.emit(' + JSON.stringify(action) + ', ' + JSON.stringify(data) + ');'});
    }
  }

}
