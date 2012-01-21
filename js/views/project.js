$(function(){
    window.ProjectView = Backbone.View.extend({

        //... is a list tag.
        tagName:  "li",

        // Cache the template function for a single item.
        template: _.template($('#project-view').html()),

        // The DOM events specific to an item.
        events: {

        },

        // The TodoView listens for changes to its model, re-rendering.
        initialize: function() {
          this.model.bind('change', this.render, this);
          this.model.bind('destroy', this.remove, this);
        },

        // Re-render the contents of the todo item.
        render: function() {
          $(this.el).html(this.template(this.model.toJSON()));
          return this;
        },

        // Switch this view into `"editing"` mode, displaying the input field.
        edit: function() {
          $(this.el).addClass("editing");
          this.input.focus();
        },

        // Close the `"editing"` mode, saving changes to the todo.
        close: function() {
          this.model.save({text: this.input.val()});
          $(this.el).removeClass("editing");
        },

        // Remove this view from the DOM.
        remove: function() {
          $(this.el).remove();
        },

        // Remove the item, destroy the model.
        clear: function() {
          this.model.destroy();
        }
    });
});