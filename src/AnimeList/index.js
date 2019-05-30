import React, { Component } from 'react';
import AnimeTracker from '../AnimeTracker'

class AnimeList extends Component {
	constructor() {
		super();
		this.state = {
			animeId: ""
		}
	}
	revealShow = (e) => {
    	this.setState({
      		animeId: e.currentTarget.id
    	});
  	}
	render() {
		console.log(this.state.animeId);
	    const anime = this.props.anime;
	    const animelist = anime.map((anime, i) => {
	      	return(
	        	<div id={anime.id} onClick={this.revealShow.bind(anime._id)} key={i}>
	          		<img src={anime.img}/>
	          		<p> {anime.title} </p>
	        	</div>
	      	)
	    })
		return (
			<div>
	        	{this.state.animeId ? <AnimeTracker animeId={this.state.animeId} /> : animelist}
	        </div>
		);
	}
}

export default AnimeList