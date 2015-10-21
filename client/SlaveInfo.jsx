SlaveInfo = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData() {
		var slave = Slaves.findOne(FlowRouter.getParam('id'))
		return slave ? {
			address: slave.address,
			percentageFree: this.usedPercentage(slave.os.drives[0]),
			hostname: slave.os.hostname,
			platform: slave.os.platform,
			cores: slave.os.cpuCount,
			architecture: slave.os.arch
		} : {}
	},

	usedPercentage(disk) {
		var {total, available, used} = disk
		return parseFloat(total) == 0 ? 0 : Math.round(parseFloat(used) / parseFloat(total) * 10000)/100
	},

	showAlert() {
		Meteor.call('showDialog', this.data.address)
	},

	render() {
		return (
			<div className="ui container">
				<div className="ui hidden divider"></div>
				<h1 className="ui centered header">
					<i className={semanticIcon(platformIcons.get(this.data.platform))}></i>
					{this.data.hostname}
				</h1>

				<DiskUsageGraph percentage={this.data.percentageFree} />

				<h2 className="ui header">System info</h2>
				<table className="ui table">
					<thead>
						<tr>
							<th>Architecture</th>
							<th>Cores</th>
							<th>Platform</th>
						</tr>
					</thead>
					<tbody>
						<td>{this.data.architecture}</td>
						<td>{this.data.cores}</td>
						<td>Darwin</td>
					</tbody>
				</table>

				<h2 className="ui header">Tasks</h2>
				<LabeledIconButton icon="folder">List directory</LabeledIconButton>
				<LabeledIconButton icon="announcement" action={this.showAlert}>Show alert</LabeledIconButton>
				<LabeledIconButton icon="list layout">Show active processes</LabeledIconButton>
			</div>
		)
	}
})