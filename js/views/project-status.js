$(function(){
    window.ProjectStatusView = Backbone.View.extend({

        //... is a tr tag.
        tagName:  "div",

        // Cache the template function for a single item.
        template: _.template($('#project-status').html()),

        // The DOM events specific to an item.
        events: {

        },

        // The TodoView listens for changes to its model, re-rendering.
        initialize: function() {
            this.model.bind('add', this.render, this);
            this.model.bind('change', this.render, this);
            this.model.bind('destroy', this.remove, this);
        },

        // Re-render the contents of the job
        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
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