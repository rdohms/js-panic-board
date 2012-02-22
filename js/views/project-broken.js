$(function(){
    window.ProjectBrokenView = Backbone.View.extend({

        //... is a tr tag.
        tagName:  "tr",

        // Cache the template function for a single item.
        template: _.template($('#project-broken').html()),

        // The DOM events specific to an item.
        events: {

        },

        // The TodoView listens for changes to its model, re-rendering.
        initialize: function() {
        },

        // Re-render the contents of the project
        render: function() {
            console.log(this.model.toJSON());
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