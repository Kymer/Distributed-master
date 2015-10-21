Modal = class Modal extends React.Component {
	link(modal) {
		$(modal.getDOMNode()).modal('show')
	}

	render() {
		return (
			<div className="ui modal" ref={this.link}>
				{this.props.children}
			</div>
		)
	}
}