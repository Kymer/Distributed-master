SlaveList = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData() {
	  return {
	    slaves: Slaves.find({connected: true}).fetch()
	  }
	},

	renderSlaves() {
		return this.data.slaves.map(slave => <SlaveList.Row slave={slave} />)
	},

	render() {
		return (
			<div className="ui container">
				<div className="ui hidden divider"></div>
				<h1 className="ui header">Distributed application</h1>
				<p>Only 113 lines of code!</p>
				<table className="ui single line table">
					<thead>
						<tr>
							<th>Platform</th>
							<th colSpan="2">Hostname</th>
						</tr>
					</thead>
					<tbody>
						{this.renderSlaves()}
					</tbody>
				</table>
			</div>
		)
	}
})

class Row extends React.Component {
	render() {
		return (
			<tr>
				<td><i className={"ui " + platformIcon(this.props.slave.os.platform) + " icon"}></i></td>
				<td><a href={"slaveInfo/" + this.props.slave._id}>{this.props.slave.os.hostname}</a></td>
				<td className="right aligned"><i className="ui right angle icon"></i></td>
			</tr>
		)
	}
}

SlaveList.Row = Row