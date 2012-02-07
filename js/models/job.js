$(function () {
    window.Job = Backbone.Model.extend({

        // Default attributes for a todo item.
        defaults:function () {
            return {
                builds:new BuildList,
                lastBuild: false,
            };
        },

        initialize: function () {

        },

        //Refreshes the volatile information of a Job (builds)
        refresh: function(context) {

            //console.log("Updating job: "+context.get('id'));

            if (context.get('lastBuild') != false) {
                context.get('lastBuild').refresh();
            }

            _.delay(context.refresh, 10000, context);
        },

        populateFromJson:function (json) {

            this.set({
                id: json.url,
                url: json.url,
                description:json.description,
                inQueue:json.inQueue,
                //builds:new BuildList(_.first(json.builds, 5)),
            });

            this.grabBuildInformation( 'lastBuild', json.lastBuild.url + '/api/json' );
            this.grabBuildInformation( 'lastSuccessfulBuild', json.lastSuccessfulBuild.url + '/api/json' );
        },

        //Queues build to be loaded into property after json load
        grabBuildInformation: function ( property, url ) {

            $.ajax({
                url: url,
                success: function(json) {
                    this.instantiateBuild(property, json)
                },
                dataType:'jsonp',
                jsonp:'jsonp',
                context:this
            });
        },

        //Creates new build with JSON data
        instantiateBuild: function (property, json) {

            var build = new Build();
            build.populateFromJson(json);

            var data = {};
            data[property] = build;

            this.set(data);

            build.bind('change', this.change, this);
        },
    });
});
