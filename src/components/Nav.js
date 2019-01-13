import React from "react";

class Nav extends React.Component{
	render(){
		return (
			<nav>
				<img 
					src="icon.svg" 	alt="logo"
					id="logo"/>
				<p>MAL Search</p>
			</nav>
		);
	}
}

export default Nav;