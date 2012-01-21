$(function(){
    window.Job = Backbone.Model.extend({

      // Default attributes for a todo item.
      defaults: function() {
        return {
          builds:       new BuildList,
        };
      },
      
      initialize: function() {
          
          var url = this.get("url")+'/api/json';
          
          $.ajax({
            url: url,
            success: this.loadFromJson,
            dataType: 'jsonp',
            jsonp: 'jsonp',
            context: this
          });
              
              //this.get("url")+'/api/json', this.loadFromJson);
      },
      
      loadFromJson: function(json) {
          this.set({ 
              description: json.description,
              inQueue:     json.inQueue,
              lastBuild:   new Build(json.lastBuild),
              lastSuccessfulBuild: new Build(json.lastSuccessfulBuild),
              builds:      new BuildList( _.first(json.builds, 5) ),
          });
          
          this.get('lastBuild').bind('change', this.change, this);
          this.get('lastSuccessfulBuild').bind('change', this.change, this);
          this.get('builds').each(function(build){ build.bind('change', this.change, this) }, this);
      }
    });
});