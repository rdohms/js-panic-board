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
            this.bind('change',   this.render, this);
        },

        render: function() {

            //Render Job Info
            var view = new ProjectStatusView({model: this});
            $("#project-"+this.get('project')+" > .status").html(view.render().el);

        },

        //Refreshes the volatile information of a Job (builds)
        refresh: function(context) {

            //Update Builds
            Jenkins.queryApi(context.get('id'), context.updateBuildsFromJson, context);

            if (context.get('lastBuild') != false) {
                context.get('lastBuild').refresh();
            }

            _.delay(context.refresh, 10000, context);
        },

        //For refreshes
        updateBuildsFromJson: function(json) {

            if ( ! this.get('lastBuild') || this.get('lastBuild').url != json.lastBuild.url) {

                this.grabBuildInformation( 'lastBuild', json.lastBuild.url );
                this.grabBuildInformation( 'lastSuccessfulBuild', json.lastSuccessfulBuild.url );

            }

        },

        //For creation
        populateFromJson:function (json) {

            this.set({
                id: json.url,
                url: json.url,
                description:json.description,
                inQueue:json.inQueue,
                //TODO: implement past builds processing
                //builds:new BuildList(_.first(json.builds, 5)),
            });

            this.grabBuildInformation( 'lastBuild', json.lastBuild.url );
            this.grabBuildInformation( 'lastSuccessfulBuild', json.lastSuccessfulBuild.url );
        },

        //Queues build to be loaded into property after json load
        grabBuildInformation: function ( property, url ) {

            Jenkins.queryApi(
                url,
                function(json) {
                    this.instantiateBuild(property, json)
                },
                this
            );
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
