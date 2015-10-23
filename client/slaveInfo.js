Template.slaveInfo.onCreated(function() {
	this.messageInfo = new ReactiveDict('showMessage', false)
})

Template.slaveInfo.helpers({
	slave() {
		return Slaves.findOne(FlowRouter.getParam('id'))
	},
	usedPercentage(disk) {
		var {total, available, used} = disk
		return parseFloat(total) == 0 ? 0 : Math.round(parseFloat(used) / parseFloat(total) * 10000)/100
	},
	alertButtonWasPushed() {
		return Template.instance().messageInfo.get('showMessage')
	},
	messageTitle() {
		return Template.instance().messageInfo.get('title')
	},
	messageContent() {
		return Template.instance().messageInfo.get('content')
	},
	messageIcon() {
		return Template.instance().messageInfo.get('icon')
	}
})

Template.slaveInfo.events({
	'click .showAlert'(e, t) {
		t.messageInfo.set('title', 'Hold tight!')
		t.messageInfo.set('content', "We're awaiting client response...")
		t.messageInfo.set('icon', 'big smile loading icon')
		t.messageInfo.set('showMessage', true)

		Meteor.call('showDialog', this.address, function(error, result) {
			if(result) {
				t.messageInfo.set('title', 'Client answered')
				t.messageInfo.set('content', `The client answered "${result['text returned']}" and pushed the button: ${result['button returned']}`)
				t.messageInfo.set('icon', 'ui big call icon')
			} else {
				t.messageInfo.set('title', 'Client rejected the dialog')
				t.messageInfo.set('content', 'The client has canceled the operation')
				t.messageInfo.set('icon', 'ui big frown icon')
			}	
		})
	},
	'click .close'(e, t) {
		t.messageInfo.set('showMessage', false)
	}
})