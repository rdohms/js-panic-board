$(function () {
    window.Project = Backbone.Model.extend({

        // Default attributes for a todo item.
        defaults:function () {
            return {
                prod_version:'0.0.0',
                stag_version:'0.0.0',

                job:null,
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

            var url = source.address + '/api/json';

            $.ajax({
                url:url,
                success:this.instantiateJob,
                dataType:'jsonp',
                jsonp:'jsonp',
                context:this
            });
        },

        //Creates new Job based on json data
        instantiateJob:function (json) {

            var job = new Job();
            job.populateFromJson(json);

            this.set({job:job});

            //Render Job Info
            var view = new ProjectStatusView({model: job});
            $("#project-"+this.get('id')+"-status").html(view.render().el);

            //Start refreshing data
            job.refresh(job);
        },
    });
});