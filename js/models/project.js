$(function () {
    window.Project = Backbone.Model.extend({

        // Default attributes for a todo item.
        defaults:function () {
            return {
                prod_version:'0.0.0',
                stag_version:'0.0.0',

                job:null
            };
        },

        initialize:function () {
            this.loadJob();
        },

        //Loads Jobs
        loadJob:function () {

            var source = _.find(this.get("sources"), function (source) {
                return source.type == 'jenkins';
            });

            Jenkins.queryApi(source.address, this.instantiateJob, this);
        },

        //Creates new Job based on json data
        instantiateJob:function (json) {

            var job = new Job({project: this.get('id')});
            job.populateFromJson(json);

            this.set({job:job});

            //Render
            job.render();

            //Start refreshing data
            job.refresh(job);
        }
    });
});