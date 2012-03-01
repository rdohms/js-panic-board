$(function(){
    window.UserList = Backbone.Collection.extend({

      model: User,
      localStorage: new Store("users"),

      loadUser: function(url, autoAdd){

          var user = Users.get(url);

          if (user === undefined) {

              user = new User();

              $.ajax({
                  url: url+'/api/json',
                  success: user.loadFromJson,
                  dataType: 'jsonp',
                  jsonp: 'jsonp',
                  context: user
                });

          }

          if (!autoAdd) {
              return user;
          }

          if (this.get(url) === undefined) {
              this.add(user);
          }

      },

    });

    window.Users = new UserList();
});