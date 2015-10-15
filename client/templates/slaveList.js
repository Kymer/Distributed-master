var platformIcons = new Map();
platformIcons.set('darwin', 'apple');
platformIcons.set('linux', 'linux');
platformIcons.set('win32', 'windows');

Template.slaveList.helpers({
	slaves() {return Slaves.find({connected: true})}
})

Template.registerHelper('platformIcon', platform => {return platformIcons.get(platform)})