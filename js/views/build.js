$(function(){
    window.BuildView = Backbone.View.extend({

        tagName:  "li",
        template: _.template($('#build-view').html()),
        events: {

        },

        initialize: function() {
          this.model.bind('change', this.render, this);
          this.model.bind('destroy', this.remove, this);
        },

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