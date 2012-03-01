$(function () {
    window.Jenkins = {

        queryApi: function (url, callback, context){

            $.ajax({
                url: url + '/api/json',
                success: callback,
                dataType: 'jsonp',
                jsonp: 'jsonp',
                context: context
            });

            console.debug('Querying Jenkins: '+url);

        }

    };
});