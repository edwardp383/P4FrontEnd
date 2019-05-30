import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			email:''
		}
	}
	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit= async (e) => {
		e.preventDefault(); 
		try{

			const registerResponse = await fetch(process.env.REACT_APP_BACK_URL + '/users', {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify(this.state),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const parsedResponse = await registerResponse.json();
			console.log(parsedResponse);
			if (parsedResponse.username === this.state.username) {
				this.props.history.push('/animesearch')
				this.props.userLogin(this.state.username, parsedResponse.id)
			}


		} catch(err) {
			console.log(err);
		}
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				Username: <input type="text" name="username" onChange={this.handleChange} /><br/>
				Password: <input type="password" name="password" onChange={this.handleChange} /><br/>
				Email: <input type="text" name="email" onChange={this.handleChange} /><br/>
				<button type="submit">Register</button>
			</form>
		);
	}
}

export default withRouter(Register)

