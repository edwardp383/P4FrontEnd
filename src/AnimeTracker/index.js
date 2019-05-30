import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AnimeTracker extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			img: "",
			synopsis: "",
			episode: null
		}
	}
	componentDidMount() {
		this.getAnime()
	}
	getAnime = async () => {
	    try{
	      	const animeResponse = await fetch(process.env.REACT_APP_BACK_URL + `/anime/${this.props.animeId}`);
	      	
	      	// if(animeResponse.status !== 200){
	       //  	throw Error(animeResponse.statusText);
	      	// }

	      	const anime = await animeResponse.json();
	      	console.log(anime);
	      	this.setState({
	        	title: anime.title,
	        	img: anime.img,
	        	synopsis: anime.synopsis,
	        	episode: anime.episode,
	        	user_id: anime.user.id
	      	})

	    }catch(err){
	      console.log('there was an error -- see below');
	      console.log(err);
	    }
  	}
  	// handleChange = (e) => {
  	// 	let episodesWatched = this.state.episodesWatched;
  	// 	if (episodesWatched[e.target.name] == false) {

  	// 		episodesWatched[e.target.name] = true;

  	// 	} else if(episodesWatched[e.target.name]) {

  	// 		episodesWatched[e.target.name] = false;

  	// 	}
 		// this.setState({
 		// 	episodesWatched: episodesWatched
 		// })
  	// 	console.log(this.state.episodesWatched);
  	// }
  	plusEpisode = (e) => {
  		e.preventDefault()
  		this.setState({
  			episode: this.state.episode + 1
  		}, () => {
  			this.saveEpisode() 
  		})
  	}
  	minusEpisode = (e) => {
  		e.preventDefault()
  		this.setState({
  			episode: this.state.episode - 1
  		}, () => {
  			this.saveEpisode() 
  		});
  	}
  	saveEpisode = async () => {
  		
		try{
			console.log(this.state);
			const saveResponse = await fetch(process.env.REACT_APP_BACK_URL + `/anime/${this.props.animeId}`, {
				method: 'PUT',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})

		} catch(err) {
			console.log(err);
		}
  	}
  	deleteAnime = async (e) => {
		try{
			
			e.preventDefault()
			const deleteResponse = await fetch(process.env.REACT_APP_BACK_URL + `/anime/${this.props.animeId}`, {
				method: 'DELETE',
          		credentials: 'include',
          		headers: {
					'Content-Type': 'application/json'
				}
			})
			const parsedResponse = await deleteResponse.json();
			console.log(parsedResponse);
			if (parsedResponse == "deleted route hit, deleted") {
				this.props.history.push("/animesearch")
			}
		} catch(err) {
			console.log(err);
		}
  	}
	render() {
		console.log(this.state);
		console.log(this.props);
		// const episodes = this.state.episodes;
		// const episodeList = episodes.map((episode, i) => {
		// 	if (this.state.episodesWatched[i] == false) {
		// 		return(
		// 			<div className="EpChecks" key={i}>
		// 				<p> {this.state.title} episode {episode}</p>
		// 				<input type="checkbox" name={i} onChange={ this.handleChange } /><br/>
		// 			</div>
		// 		)
		// 	} else if (this.state.episodesWatched[i]) {
		// 		return(
		// 			<div className="EpChecks" key={i}>
		// 				<p> {this.state.title} episode {episode}</p>
		// 				<input type="checkbox" name={i} onChange={ this.handleChange } checked="checked"/><br/>
		// 			</div>
		// 		)
		// 	}
		// })

		return (
			<div>
				<h1>{this.state.title}</h1>
				<img src={this.state.img} />
				<p>{this.state.synopsis}</p>
				<form onSubmit={this.deleteAnime}>
					<button>Remove Anime</button>
				</form>
				<div>
					<div>
						<form onSubmit={ this.plusEpisode }>
							<h2>{ this.state.episode}</h2>
							<button>+</button>
						</form>
						<form onSubmit={ this.minusEpisode }>
							<button>-</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
export default withRouter(AnimeTracker)