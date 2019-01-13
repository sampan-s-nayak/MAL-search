import React from "react";
import Output from "./Output";
import Input from "./Input"

class Form extends React.Component{

	constructor(){
		super();
		
		// binding functions which manipulate state info
		this.getData = this.getData.bind(this);
		this.submit = this.submit.bind(this);

		this.state ={
			type:"anime",
			submit:false,
			name:"",
			error:false,
			predict:false,
			getData:this.getData,
			submitFun:this.submit,
			getType:this.getType
		};
	}

	render(){
		return (
			<div className="centre">
				<div className="form-wrap">
					<h2>Search MAL</h2>
					{/* 
						* this section handles input
						* and autocomplete 
						*/}
					<Input 
							setFun={this.state.getData} 
							submitFun={this.state.submitFun}
							getType={this.state.type}
							canPredict={this.state.predict}
							getName={this.state.name}
					/>
					{/* 
						*radio buttons section 
						*/}
					<div className="type-select">
						<h4>Search For:</h4>
						<input 
							type="radio" 
							name="type" 
							value="anime"
							onClick={this.getData}
							defaultChecked ="true"
						/>anime
						<input 
							type="radio" 
							name="type"
							value="manga"
							onClick={this.getData}
						/>manga
					</div>
					{/* 
						*submit button 
						*/}
					<div className="centre">
						<button 
							className = "btn-main" 
							onClick={this.submit}>search
						</button>
					</div>
				</div>
				{/* 
					*conditional rendering of output 
					*/}
				{
					(this.state.submit)&&
						(<div className="output-wrap">
							<Output 
							type={this.state.type}
							name={this.state.name}
							/>
						</div>)
				}
				{/* 
					*checking for errors 
					*/}
				{
					(this.state.error)&&
						(<div className="error">
							<div id="error-inner">
								<p>enter atleast three characters</p>
							</div>
						</div>)
				}
			</div>
		);
	}

// ** member functions section **

	getData(event){
		// * normal react form action
		let name = event.target.name;
		let value = event.target.value;
		this.setState({
			[name]:value,
			submit:false
		});

		/* 
			*	starts predicting only when more 
			*	than three letters are entered 
		*/
		if(name === "name"){
			if(value.length >= 3){
				this.setState(prevState =>{
					let newState = prevState;
					newState.predict = true;
					newState.autoComplete = this.autofill;
					return newState;
				});
			}
			else{
				this.setState(prevState =>{
					let newState = prevState;
					newState.predict = false;
					newState.submit = false;
					return newState;
				});
			}
		}
}

	submit(){
		if(this.state.name.length >= 3){
			this.setState({
				submit:true,
				error:false,
				predict:false
			});
		}
		else{
			this.setState({
				error:true
			});
		}
	}

}

export default Form;