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


      },

      refresh: function() {

          $.ajax({
              url: this.get("id")+'/api/json',
              success: this.populateFromJson,
              dataType: 'jsonp',
              jsonp: 'jsonp',
              context: this
          });

      },

        populateFromJson: function(json) {
          
//          _.each(json.culprits, function(user){ this.get('culprits').loadUser(user.absoluteUrl, true); }, this);
//          _.each(json.changeSet.items, function(item){
//              if(item.author != undefined) { this.get('authors').loadUser(item.author.absoluteUrl, true); } //full url
//              if(item.user != undefined) { this.get('authors').loadUser("http://hubble.webclusive.net:8080/user/"+item.user, true); } //svn user
//          }, this);

          var result = json.result;

          if (result == null) {
              result = 'Building';
          }

          this.set({
              id:         json.url,
              url:         json.url,
              building:   json.building,
              changeSet:  json.changeSet,
              duration:   json.duration,
              number:     json.number,
              result:     json.result,
              timestamp:  json.timestamp,
              status:     result.toLowerCase(),
              tests:      _.find(json.actions, function(action){ return action.urlName == 'testReport'; }),
          });

      },
      
      currentStatus: function() {
          if (this.get('building')) return "building";
          
          return this.get('status');
      },
      
    });
});