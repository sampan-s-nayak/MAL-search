import React from "react";

class Predictor extends React.Component{

	constructor(){
		super();
		// * to cancel fetch when component is unmounted
		this.unMounted = false;
		this.state = {
			predictions:[],
			unMounted:false
		}
		this.name ="";
	}
	
	componentDidUpdate(){
		// * called each time there is a change
		// * checks if there is any need to change the predictions
		if(this.name !== this.props.name){
			this.name = this.props.name;
			if(this.name.lenght < 3){
				return;
			}
			// * async call
			fetch(`https://api.jikan.moe/v3/search/${this.props.type}?q=${this.props.name}&page=1`)
				.then(data => data.json())
				.then(data => 
					{
						/* 
						 * checks to see if the component has unmounted
						 * read more: 
						 ? http://stackoverflow.com/questions/49906437/ddg#49906662
						 *
						 */
							 if(!this.unMounted){
								let key = 0;
								this.setState({
									predictions: data.results
									.slice(0,7)
									.map(item => {
										return (
											<p className="predict-item"
												 key = {key++}
												 onMouseOver = {
												 	() => {
												 		 this.props.autofill (item.title);
												 	 }}
												 onClick={
													 this.props.removePredictions
													}
												 // todo: allow movement using  arrow keys
											>{item.title}</p>);
									})
								})
							 }
					}) 
					.catch(err => {
						console.log(err);
					});
		}	
	}

	componentWillUnmount(){
			this.unMounted = true;
	}

	render(){
		return (
			<div className="autocomplete">
				{this.state.predictions}
			</div>
			)
	}
}

export default Predictor;