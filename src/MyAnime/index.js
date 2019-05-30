import React, { Component } from 'react';
import AnimeList from '../AnimeList'

class MyAnime extends Component {
	constructor() {
		super();
		this.state = {
			anime: [],
			id: null
		}
	}
	componentDidMount(){
		this.getAnime()

	}
  	getAnime = async () => {
	    try {
	      	const response = await fetch(process.env.REACT_APP_BACK_URL + `/anime/list/${this.props.id}`);

	      	// if(response !== 200){
	       //  	throw Error(response.statusText);
	      	// }

	      	const animeParsed = await response.json();
	      	console.log(animeParsed);
	      	this.setState({anime: animeParsed.anime});

	    } catch (err){
	      	console.log(err);
	    }
  	}
	render() {
		console.log(this.state.anime);
		return (
			<div>
				<h1>My Anime</h1>
				<AnimeList anime={this.state.anime} />
			</div>
		);
	}
}

export default MyAnime