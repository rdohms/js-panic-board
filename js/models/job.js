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
            this.bind('change', this.render, this);
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

            _.delay(context.refresh, 10000, context);
        },

        //For refreshes
        updateBuildsFromJson: function(json) {

            if ( ! this.get('lastBuild') || this.get('lastBuild').url != json.lastBuild.url) {

                this.grabBuildInformation( 'lastBuild', json.lastBuild.url );
                this.grabBuildInformation( 'lastSuccessfulBuild', json.lastSuccessfulBuild.url );

            } else {

                if (this.get('lastBuild') != false) {
                    this.get('lastBuild').refresh();
                }
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

            var currentBuild = this.get(property);

            if (!currentBuild) {
                var build = new Build({id: url});
                var data = {};

                build.bind('change', this.change, this);
                build.bind('broke', this.renderCulprit, this);
                build.bind('fixed', this.hideCulprit, this);

                data[property] = build;
                this.set(data);
            }

            this.get(property).set({ id: url});
            this.get(property).refresh();

            this.trigger('change', this);
        },

        renderCulprit: function(build) {
            console.log('render culprit');

            var view = new ProjectBrokenView({model: build, id: 'project-'+this.get('project')+'-broken'});
            $("#project-"+this.get('project')).after(view.render().el);
        },

        hideCulprit: function(data) {
            console.log('hiding culprit');

            $("#project-"+this.get('project')+"-broken").remove();
        },
    });
});
