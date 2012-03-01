$(function(){
    window.BuildList = Backbone.Collection.extend({

      model: Build,
      localStorage: new Store("builds")

    });

});