Template.slaveInfo.helpers({
	slave() {
		return Slaves.findOne(FlowRouter.getParam('id'))
	}
})