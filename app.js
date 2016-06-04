function up() {

  fetch("http://192.168.1.101/riders/api.php?action=add").then(function(response) {
    return response.json();
  }).catch(function(err) {
    console.log('err: ', err);
  }).then(function(json) {
    console.log('update: ', json)
  });

}





var page = new tabris.Page({
  topLevel: true,
  title: "myapp"
});
new tabris.TextView({
  layoutData: {centerX: 0, centerY: 0},
  text: "My First App"
}).appendTo(page);
page.open();

var taskId = setInterval(up, 1000);

