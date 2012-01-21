$(function(){
    window.Build = Backbone.Model.extend({

      // Default attributes for a todo item.
      defaults: function() {
        return {

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
      }
    });
});