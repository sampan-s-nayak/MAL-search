import React from "react";

class Output extends React.Component{

	constructor(){
		super();
		this.state ={
			results:[],
			loaded:false
		};
	}

	componentDidMount(){
		let key =0;
		// * async call
		fetch(`https://api.jikan.moe/v3/search/${this.props.type}?q=${this.props.name}&page=1`)
		.then(data => data.json())
		.then(data => {
			this.setState({
				results:data.results.map(anime => {
					return (
						<div className="card" key={key++}>
						<img 
							src={anime.image_url} 
							alt="cover pic" 
							className="card-img"
						/>
						<div className="card-content">
						<h4 className="card-header">{anime.title}</h4>
						<p>{anime.synopsis}</p>
						</div>
						<div className="info">
							<span className="rating">
								rating: {anime.score}
							</span>
							<span>
								status: {
									(anime.airing)?
									"airing"
									:"completed"
								}
							</span>
							<span>
								type: {anime.type}
							</span>
						</div>
						<div className="centre">
						<a 
							href={anime.url}
							className="btn-main btn-card" 
							target="_blank"
							rel="noopener noreferrer"
						>Learn More</a>
						</div>
						</div>
					);
				}),
				loaded:true
			})
		})
		.catch(err => console.log(err));
				}

	render(){
		return (
			<div className="output">
				{
					(!this.state.loaded)&&
					<h4>
						{
							`showing results for 
							name: ${this.props.name}
							category: ${this.props.type}`
						}
					</h4>
				}
				{this.state.results}
			</div>
		)
	}
}

export default Output;