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

          Jenkins.queryApi( this.get('id'), this.populateFromJson, this);

          //TODO: trigger events based on build status: ok -> broken; broken -> ok
      },

        populateFromJson: function(json) {

            //TODO Author and user information processing

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

          this.change();
      },
      
      currentStatus: function() {
          if (this.get('building')) return "building";
          
          return this.get('status');
      },
      
    });
});