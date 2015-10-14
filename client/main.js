Template.body.helpers({
	slaves() {return Slaves.find({connected: true})}
})

Template.slave.onRendered(function(){
	this.resultField = this.find('.alertResult')
})

Template.slave.events({
	'click button'(event, template) {
		Meteor.call('showDialog', this.address, (error, result)=>{template.resultField.textContent = result['text returned']})
	}
})