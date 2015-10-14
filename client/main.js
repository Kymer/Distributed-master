Template.body.helpers({
	slaves() {return Slaves.find({connected: true})}
})

Template.body.events({
	'click button'() {
		Meteor.call('showDialog', this.address, (error, result)=>{console.log(error, result)})
	}
})