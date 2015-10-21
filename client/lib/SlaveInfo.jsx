SlaveInfo = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData() {
		var slave = Slaves.findOne(FlowRouter.getParam('id'))
		return slave ? {
			percentageFree: this.usedPercentage(slave.os.drives[0]),
			hostname: slave.os.hostname,
			platform: slave.os.platform
		} : {}
	},

	usedPercentage(disk) {
			var {total, available, used} = disk
			return parseFloat(total) == 0 ? 0 : Math.round(parseFloat(used) / parseFloat(total) * 10000)/100
	},

	render() {
		return (

			<div className="ui container">
				<div className="ui hidden divider"></div>
				<h1 className="ui centered header">
					<i className={"ui " + platformIcon(this.data.platform) + " icon"}></i>
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
						<td>{os.arch}</td>
						<td>{os.cpuCount}</td>
						<td>Darwin</td>
					</tbody>
				</table>

				<h2 className="ui header">Tasks</h2>
				<div className="ui labeled icon ls button"><i className="ui folder icon"></i>List directory</div>
				<div className="ui labeled icon showAlert button"><i className="ui announcement icon"></i>Show alert</div>
				<div className="ui labeled icon ps button"><i className="ui list layout icon"></i>Show active processes</div>
			</div>


			)
	}
})




