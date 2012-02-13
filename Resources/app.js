(function(){
	var accessTokenKey = Ti.App.Properties.getString('twitterAccessTokenKey')
    var accessTokenSecret = Ti.App.Properties.getString('twitterAccessTokenSecret');
    var Twitter = require('twitter').Twitter;
	var client = Twitter({
      consumerKey: "wVIdZtjBGyXxSpIkXFf97Q",
      consumerSecret: "C8sJLgMaivWzl2cglxrlnduj1D83H9vXRwEEBZxaM",
      accessTokenKey: accessTokenKey, 
      accessTokenSecret: accessTokenSecret
    });
    var win = Ti.UI.createWindow({backgroundColor: 'white'})
    var table = Ti.UI.createTableView();
    win.add(table);
    win.open();
    
client.addEventListener('login', function(e) {
	if (e.success) {
      	Ti.API.info('loggedin');
        Ti.App.Properties.setString('twitterAccessTokenKey', e.accessTokenKey);
        Ti.App.Properties.setString('twitterAccessTokenSecret', e.accessTokenSecret);
        
        client.request("1/statuses/home_timeline.json", {count: 10}, 'GET', function(e) {
          if (e.success) {
            var json = JSON.parse(e.result.text), 
                tweets = json.map(function(tweet) {
                  return {title: tweet.text};
                });
            
            table.setData(tweets);
          } else  {
            alert(e.error);
          }
        });
      } else {
        alert(e.error);
      }
    });
    
    client.authorize();
  })()
