Template.slaveInfo.helpers({
	slave() {
		return Slaves.findOne(FlowRouter.getParam('id'))
	},
	usedPercentage(disk) {
		var {total, available, used} = disk
		return parseFloat(total) == 0 ? 0 : Math.round(parseFloat(used) / parseFloat(total) * 10000)/100
	}
})

Template.slaveInfo.events({
	'click .showAlert'() {
		Meteor.call('showDialog', this.address, function(error, result) {
			console.log('error and result from client', error, result)
		})
	}
})