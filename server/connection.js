connections = new Map();

function makeConnection(address){
	const connection = DDP.connect(address)
	connection._stream.on('disconnect', Meteor.bindEnvironment(function() {
		Slaves.update({address}, {$set: {connected: false}})
	}))
	Slaves.upsert({address}, {$set: {connected: true}})

	connection.call('getOSInfo', (err, result) => {
		Slaves.upsert({address}, {$set: {os: result}})
	})
	connections.set(address, connection)

	return connection
}

Meteor.startup(function() {
	Slaves.find().forEach(slave => {
		makeConnection(slave.address)
	})
})

Meteor.methods({
	register({address}) {
		console.log("registering", address)
		makeConnection(address)
	},
	showDialog(address) {
		this.unblock();
		return connections.get(address).call("showDialog")
	}
})