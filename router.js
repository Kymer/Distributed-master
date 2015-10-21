FlowRouter.route('/', {
    action: function(params, queryParams) {
        ReactLayout.render(SlaveList)
    }
});

FlowRouter.route('/slaveInfo/:id', {
    action: function(params, queryParams) {
        ReactLayout.render(SlaveInfo)
    }
});