Template.slaveList.helpers({
	slaves() {return Slaves.find({connected: true})}
})

Template.registerHelper('platformIcon', platform => {return platformIcons.get(platform)})