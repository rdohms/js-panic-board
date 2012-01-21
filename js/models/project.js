$(function(){
    window.Project = Backbone.Model.extend({

      // Default attributes for a todo item.
      defaults: function() {
        return {
          prod_version:  '0.0.0',
          stag_version:  '0.0.0',
          
          job: null,
        };
      },
      
      initialize: function() {
          
          this.loadJob();
      },
      
      loadJob: function() {
          
          var source = _.find(this.get("sources"), function(source){ return source.type == 'jenkins'; });
          
          this.set({job: new Job({url: source.address})})
          
          this.get('job').bind('change', this.change, this);
      },
    });
});