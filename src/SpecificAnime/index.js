import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SpecificAnime extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			img: "",
			synopsis: "",
			episode: 0,
			user_id: ""
		}
	}
	componentDidMount(){
    	this.getAnime();
    	this.setState({
    		user_id: this.props.id
    	})
  	}
	getAnime = async () => {
	    try{
	      const animeResponse = await fetch(`https://kitsu.io/api/edge/anime/${this.props.showId}`);
	      const anime = await animeResponse.json();
	      // const episodes = [];
	      // const episodesWatched = [];
	      // for (let i = 1; i <= anime.data.attributes.episodeCount; i++) {
	      // 	episodes.push(i);
	      // 	episodesWatched.push(false)
	      // }
	      // console.log(episodes);
	      this.setState({
	        title: anime.data.attributes.canonicalTitle,
	        img: anime.data.attributes.posterImage.small,
	        synopsis: anime.data.attributes.synopsis,
	      })

	    }catch(err){
	      console.log('there was an error -- see below');
	      console.log(err);
	    }
  	}
  	saveAnime = async (e) => {
		e.preventDefault();
		console.log(this.state);
		try{

			const saveResponse = await fetch(process.env.REACT_APP_BACK_URL + '/anime', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const parsedResponse = await saveResponse.json();
			console.log(parsedResponse);
			if (parsedResponse.user.id === this.state.user_id) {
				this.props.history.push('/MyAnime')
			}


		} catch(err) {
			console.log(err);
		}
	}
  	
	render() {
		
		return (
			<div>
				<h1>{this.state.title}</h1>
				<img src={this.state.img} />
				<p>{this.state.synopsis}</p>
				<button onClick={this.saveAnime} >Save</button>
			</div>
		);
	}
}

export default withRouter(SpecificAnime)