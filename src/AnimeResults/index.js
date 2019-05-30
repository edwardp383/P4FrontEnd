import React, { Component } from 'react';
import SpecificAnime from '../SpecificAnime'

class AnimeResults extends Component {
  constructor() {
    super();
    this.state = {
      showId: null
    }
  }
  revealShow = (e) => {
    this.setState({
      showId: e.currentTarget.id
    });

  }
	render() {
    const anime = this.props.anime;
    const animelist = anime.map((anime, i) => {
      console.log();
      return(
        <div id={anime.id} onClick={this.revealShow.bind(anime.id)} key={i}>
          <img src={anime.attributes.posterImage.tiny}/>
          <p> {anime.attributes.canonicalTitle} </p>
        </div>
      )
    })
		return (
			<div>
        {this.state.showId ? <SpecificAnime id={this.props.id} showId={this.state.showId} /> : animelist}
        
      </div>
		);
	}
}

export default AnimeResults