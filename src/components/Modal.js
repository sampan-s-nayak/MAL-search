import React from "react";
import ReactDOM from "react-dom";

// todo:  fix the modal part

class Modal extends React.Component{

	constructor(){
		super();
		this.state = {
			reviews:[]
		}
	}

	componentDidMount(){
		fetch(`https://api.jikan.moe/v3/${this.props.type}/${this.props.uniqueId}/reviews/1`)
			.then(data => data.json())
			.then(data => {
				this.setState({
					reviews:data.reviews.map(review => {
						return (
							<p id="review">{review.content}</p>
						);
					})
				})
				console.log(data)
			})
			.catch(err => console.log(err));
	}
	render(){
		/*
		 * using React portal to render the modal on a 
		 * different DOM element (id="modal")
		 */
		return ReactDOM.createPortal(
			<div>
				{this.state.reviews}
			</div>,
			document.getElementById("modal")
		);
	}
};

export default Modal;