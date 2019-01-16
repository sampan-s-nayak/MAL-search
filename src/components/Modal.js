import React from "react";
import ReactDOM from "react-dom";

// todo:  fix the modal part

class Modal extends React.Component{

	constructor(){
		super();
		this.check = this.check.bind(this);
		this.changeReview = this.changeReview.bind(this);
		this.state = {
			reviews:[],
			uniquekey:0,
			totalKey:0
		}
	}

	componentDidMount(){
		let key = 1;
		fetch(`https://api.jikan.moe/v3/${this.props.type}/${this.props.uniqueId}/reviews/1`)
			.then(data => data.json())
			.then(data => {
				this.setState({
					reviews:data.reviews.map(review => {
						return (
							<p 
								id="review" 
								key={key++}
							>
									{review.content}
							</p>
						);
					}),
					totalKey:key-1
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
			<div 
				className="modal-container"
				onClick={this.check}
			>
				<div 
					id="modal-inner"
					onClick={this.changeReview}
				>
					{this.state.reviews[this.state.uniquekey]}
				</div>
			</div>,
			document.getElementById("modal")
		);
	}

	check(event){
		const modalOuter = document.querySelector(".modal-container");

		if(event.target === modalOuter)
			this.props.removeModal();
	}

	changeReview(){
		this.setState(prevState => {
			let newstate = {
				uniquekey:(++prevState.uniquekey)%prevState.totalKey
			}
			return newstate;
		});
		console.log("change");
	}
};

export default Modal;