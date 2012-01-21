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
      "keypress #new-project":  "createProjectOnEnter",
    },

    initialize: function() {

        Projects.fetch();

        Projects.each(function(project){ 
            project.destroy(); }
        );

        $.getJSON('/js/data.json', function(json){
            $.each(json.projects,function(index) {
                Projects.create(this)
            });
        });
        
        Projects.bind('add',   this.addProject, this);
        Projects.bind('reset', this.addProjects, this);
        Projects.bind('all',   this.render, this);
        
        this.reloadJobs(this);
    },

    reloadJobs: function(context)
    {
        console.log('updating jobs');
        Projects.each(function (project) { project.loadJob();  });
        
        _.delay(context.reloadJobs, 10000, context);
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      //nothing to do yet
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addProject: function(project) {
      var view = new ProjectView({model: project});
      $("#project-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addProjects: function() {
      Projects.each(this.addProject);
    },

    // If you hit return in the main input field, and there is text to save,
    // create new **Todo** model persisting it to *localStorage*.
    createProjectOnEnter: function(e) {
        
        var input = this.$("#new-project");
        var text = input.val();
        
        if (!text || e.keyCode != 13) return;
        
        Projects.create({name: text});
        
        input.val('');
    },

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new Dashboard;

});
