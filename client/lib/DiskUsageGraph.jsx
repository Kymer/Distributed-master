DiskUsageGraph = class DiskUsageGraph extends React.Component {
	render() {

		return (
			<div>
				<h2 className="ui header">Disk usage</h2>
				<div className="ui green progress">
				  <div className="bar" style="transition: 300ms; -webkit-transition: 300ms; width: {usedPercentage os.drives.[0]}%;">
				    <div className="progress">{this.props.percentage}% used</div>
				  </div>
				</div>
			</div>
		)

	} 
}