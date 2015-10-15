FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render('slaveList')
    }
});

FlowRouter.route('/slaveInfo/:id', {
    action: function(params, queryParams) {
        BlazeLayout.render('slaveInfo')
    }
});