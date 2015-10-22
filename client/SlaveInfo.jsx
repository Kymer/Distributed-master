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

	getInitialState() {return {message: false}},

	usedPercentage(disk) {
		var {total, available, used} = disk
		return parseFloat(total) == 0 ? 0 : Math.round(parseFloat(used) / parseFloat(total) * 10000)/100
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
						<tr>
							<td>{this.data.architecture}</td>
							<td>{this.data.cores}</td>
							<td>Darwin</td>
						</tr>
					</tbody>
				</table>

				<h2 className="ui header">Tasks</h2>
				<LabeledIconButton icon="folder">List directory</LabeledIconButton>
				<LabeledIconButton icon="call" action={this.showAlert}>Display dialog</LabeledIconButton>
				<LabeledIconButton icon="list layout">Show active processes</LabeledIconButton>

				{this.message()}
			</div>
		)
	},

	showAlert() {
		Meteor.call('showDialog', this.data.address, (error, result) => {
			const message = error ?
				{
					title: 'Client rejected the dialog',
					content: 'The client has canceled the operation',
					icon: 'call'
				}
			:
				{
					title: 'Client answered',
					content: `The client answered "${result['text returned']}" and pushed the button: ${result['button returned']}`,
					icon: 'call'
				};

			this.setState({message})
		})
	},

	message() {
		if (this.state.message) {
			return (
				<div className="ui icon message">
					<i className={semanticIcon(this.state.message.icon)} />
					<div className="content">
						<div className="header">{this.state.message.title}</div>
						<p>{this.state.message.content}</p>
					</div>
				</div>
			)
		}
	}
})