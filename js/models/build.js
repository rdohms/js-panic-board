$(function(){
    window.Build = Backbone.Model.extend({

      // Default attributes for a todo item.
      defaults: function() {
        return {
            culprits: new UserList(),
            authors:  new UserList(),
        };
      },
      
      initialize: function() {
          
          $.ajax({
            url: this.get("url")+'/api/json',
            success: this.loadFromJson,
            dataType: 'jsonp',
            jsonp: 'jsonp',
            context: this
          });
          
      },
      
      loadFromJson: function(json) {
          
          _.each(json.culprits, function(user){ this.get('culprits').loadUser(user.absoluteUrl, true); }, this);
          _.each(json.changeSet.items, function(item){ 
              if(item.author != undefined) { this.get('authors').loadUser(item.author.absoluteUrl, true); } //full url
              if(item.user != undefined) { this.get('authors').loadUser("http://hubble.webclusive.net:8080/user/"+item.user, true); } //svn user
          }, this);
          
          
          
          this.set({ 
              building:   json.building,
              changeSet:  json.changeSet,
              duration:   json.duration,
              number:     json.number,
              result:     json.result,
              timestamp:  json.timestamp,
              status:     json.result.toLowerCase(),
              tests:      _.find(json.actions, function(action){ return action.urlName == 'testReport'; }),
          });

      },
      
      currentStatus: function() {
          if (this.get('building')) return "building";
          
          return this.get('status');
      },
      
    });
});