Template.slaveList.onRendered(function() {
	slaveListVM = new Vue({
		el: this.find('div.ui.container'),
		data: {
			slaves: []
		},
	   	sync: {
	   		slaves() {
	   			return Slaves.find({connected: true})
	   		}
	   	},
		filters: {
			platformIcon(platform) {return platformIcons.get(platform)},
			underscore(object, property) {
				console.log(object, property)
				return object[property]
			}
		}		
	})
})