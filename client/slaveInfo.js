const emptySlave = { os: {
	platform: '',
	drives: [{total: 0, used: 0}],
	hostname: ''
}}

Template.slaveInfo.onRendered(function() {
	new Vue({
		el: this.find('div.ui.container'),
		data: {slave: emptySlave, message: false},
		sync: {
			slave() {
				const cursor = Slaves.find(FlowRouter.getParam('id'))
				return cursor.count()>0 ? cursor.fetch()[0] : emptySlave
			},
		},
		filters: {
			platformIcon(platform) {console.log(platform); return platformIcons.get(platform)},
			usedPercentage(disk) {
				var {total, available, used} = disk
				return parseFloat(total) == 0 ? 0 : Math.round(parseFloat(used) / parseFloat(total) * 10000)/100
			}
		},
		methods: {
			showAlert(event) {
				Meteor.call('showDialog', this.slave.address, (error, result) => {
					this.message = error ? {
						title: 'Client rejected the dialog',
						content: 'The client has canceled the operation',
						icon: 'big frown'
					} : {
						title: 'Client answered',
						content: `The client answered "${result['text returned']}" and pushed the button: ${result['button returned']}`,
						icon: 'big call'
					}
				})
			},
			dismissAlert() {this.message = false}
		}
	})
})

// t.messageInfo.set('title', 'Hold tight!')
// t.messageInfo.set('content', "We're awaiting client response...")
// t.messageInfo.set('icon', 'big smile loading icon')