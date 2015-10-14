Slaves = new Mongo.Collection('slaves');
if (Meteor.isServer) {
	Slaves.update({}, {$set: {connected: false}})
}