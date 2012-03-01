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

      },

      populateFromJson: function(json) {

          var previousState = this.get('status');

          //TODO Author and user information processing

          this.set({
              id:         json.url,
              url:        json.url,
              building:   json.building,
              changeSet:  json.changeSet,
              duration:   json.duration,
              number:     json.number,
              result:     json.result,
              timestamp:  json.timestamp,
              tests:      _.find(json.actions, function(action){ return action.urlName == 'testReport'; }),
          });

          //Care for current status
          if (json.result != null) {
              this.set({status: json.result.toLowerCase()})
          }

          this.trigger('change', this);

          //Triggers broke event.
          if (previousState != this.get('status')) {

              if (this.isBroken()){
                  var event = 'broke';
              } else {
                  var event = 'fixed';
              }

              this.trigger(event, this);
              console.log('Fired event: '+event+' ('+previousState+'|'+this.get('status')+')');
          }
      },
      
      operationStatus: function() {
          if (this.get('building')) return "building";

          if (this.get('status') == undefined) return 'updating';

          return this.get('status');
      },

      isBroken: function() {
          return (this.operationStatus() == 'failure');
      },
      
    });
});