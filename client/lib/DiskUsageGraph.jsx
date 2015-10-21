DiskUsageGraph = class DiskUsageGraph extends React.Component {
	barStyle() {
		return {
			transition: '300ms',
			webkitTransition: '300ms',
			width: `${this.props.percentage}%`
		}
	}

	render() {

		return (
			<div>
				<h2 className="ui header">Disk usage</h2>
				<div className="ui green progress">
					<div className="bar" style={this.barStyle()}>
						<div className="progress">{this.props.percentage}% used</div>
					</div>
				</div>
			</div>
		)

	} 
}