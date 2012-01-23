$(function(){
    window.User = Backbone.Model.extend({

      // Default attributes for a todo item.
      defaults: function() {
        return {

        };
      },
      
      initialize: function() {
          
          this.set({id: this.get('url')});
          
      },
      
      loadFromJson: function(json) {
          
          this.set({ 
              id:         this.get('url'),
              fullName:   json.fullName,
              email:      this.extractEmail(json.property),
          });
          
          this.save();
      },
      
      gravatar: function(size) {
          
          size = size || 80;
          var email = this.get('email');
          
          if (email == undefined){ 
              return 'http://www.gravatar.com/avatar/false?s='+size;
          }
          
          var hash = $().crypt({method:"md5",source:this.get('email')});
          
          return 'http://www.gravatar.com/avatar/'+hash+'?s='+size;
      },
      
      extractEmail: function(properties) {
          var emailProperty = _.find(properties, function(property) { return property.address != undefined; } );
          
          if (emailProperty != undefined) return emailProperty.address;
      }
    });
});