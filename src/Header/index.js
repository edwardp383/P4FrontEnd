import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Header extends Component {
	constructor(props) {
		super();
		this.state = {
			logged: false
		}
	}
	render() {
		return (
			<div className="Header">
				<div>
					{this.props.user.logged ?
						<Link to='/MyAnime'>MyAnime</Link>
						:
						[
							<Link key="1" to='/'>Home</Link>,
							<Link key="2" to='/register'>Register</Link>
						]
					}
					<Link to='/animesearch'>FindAnime</Link>
				</div>
				<div>
					{this.props.user.logged ? 
						[
							<b key="username">{this.props.user.username}</b>,
							<button key="logOut" onClick={this.props.userLogout}>Log Out</button>
						] : null
					}
				</div>
			</div>
		);
	}
}

export default Header