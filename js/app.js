// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  window.Dashboard = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#container"),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
    },

    initialize: function() {

        $.getJSON('/js/data.json', function(json){
            $.each(json.projects,function(index) {
                Projects.create(this);
            });
        });

        Projects.bind('add',   this.addProject, this);
        Projects.bind('reset', this.addProjects, this);
        Projects.bind('all',   this.render, this);

    },

    reloadJobs: function(context)
    {
        console.log('updating jobs');
        Projects.each(function (project) { project.loadJob();  });

        _.delay(context.reloadJobs, 10000, context);
    },

    render: function() {
      //nothing to do yet
    },

    addProject: function(project) {
      var view = new ProjectView({model: project, id: 'project-'+project.get('id')});
      $("#project-list").append(view.render().el);
    },

    addProjects: function() {
      Projects.each(this.addProject);
    }
  });

  window.App = new Dashboard();

});
