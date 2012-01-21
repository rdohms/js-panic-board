$(function(){
    window.ProjectList = Backbone.Collection.extend({

      model: Project,
      localStorage: new Store("projects"),

      initialize: function() {
        
      },

    });
    
    window.Projects = new ProjectList;
});