import React from "react";
import Predictor from "./Predictor";

class Input extends React.Component{
	constructor(){
		super();

		this.removePredictions = this.removePredictions.bind(this);

		this.state ={
			canPredict:false,
			autoComplete:this.autoComplete,
			removePredictions:this.removePredictions,
		}
	}

	componentDidUpdate(){
		if(this.props.canPredict !== this.state.canPredict){
			this.setState({
				canPredict:this.props.canPredict
			});
		}
	}

	render(){
		let placeholder = `enter the name of the ${this.props.getType} you want to search`;
		return (
			<div>
				<input 
							type="text" 
							name="name" 	
							id="name" 
							autoComplete="off"
							autoCorrect="off"
							placeholder={placeholder} 
							onChange={
								event=>{
										this.props.setFun(event);
							}}
							onKeyDown={
								(event)=>{
								if(event.keyCode === 13)
									this.props.submitFun();
								}
				}/>
				{/* 
					*predictions section 
					*/}
				{
					(this.state.canPredict)&&
							<Predictor 
								name={this.props.getName} 
								type ={this.props.getType}
								autofill = 	{this.state.autoComplete}
								removePredictions = {this.state.removePredictions}
							/>
					}
			</div>
		);
	}

	// * 	autocompletes input field based on prediction 
	autoComplete(value){
		document.getElementById("name").value = value;
	}

	removePredictions(){
		this.setState({
			canPredict:false
		});
		// !passing a fake event object to mimic change event 
		const fakeEvent = {
			target:{
				name:"name",
				value:document.getElementById("name").value
			}
		};
		this.props.setFun(fakeEvent);
	}
}

export default Input;
