var platformIcons = new Map();
platformIcons.set('darwin', 'apple');
platformIcons.set('linux', 'linux');
platformIcons.set('win32', 'windows');

Template.slaveList.helpers({
	slaves() {return Slaves.find({connected: true})}
})

Template.slave.helpers({
	platformIcon() {return platformIcons.get(this.os.platform)}
})