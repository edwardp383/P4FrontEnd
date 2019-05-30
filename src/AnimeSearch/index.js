import React, { Component } from 'react';
import AnimeResults from '../AnimeResults'

class AnimeSearch extends Component {
	constructor(){
		super();
		this.state = {
			search:'',
			anime: [],
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleClick = (e) => {
		e.preventDefault();
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
		this.getAnime()
	}
	getAnime = async () => {
	    try{
	      const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${this.state.search}`)
	      const anime = await response.json()
	      this.setState({
	        anime: anime.data
	      })
	      console.log(this.state.anime);
	    }catch(err){
	      console.log('there was an error -- see below');
	      console.log(err);

	    }
  	}
	render() {
		return (
			<div>
				<h1>Search For An Anime By Title</h1>
				<form onSubmit= {this.handleClick} >
					<input type="text" name="search" onChange={this.handleChange} />
					<button>Search</button>
				</form>
				<AnimeResults id={this.props.id} anime={this.state.anime} />
			</div>
		);
	}
}

export default AnimeSearch


