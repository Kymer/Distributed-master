LabeledIconButton = class LabeledIconButton extends React.Component {
	render() {
		return (
			<div className="ui labeled icon button" onClick={this.props.action}>
				<i className={semanticIcon(this.props.icon)}></i>
				{this.props.children}
			</div>
		)
	}
}