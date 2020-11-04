import React from 'react';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			name: "",
			success: true
		}
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
		this.setState({success: true});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
		this.setState({success: true});
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value});
		this.setState({success: true});
	}

	ifSuccess = (bool) => {
		if (!bool) {
			return <p>Such user already exists!</p>
		}
	}

	onRegister = () => {
		fetch("https://infinite-headland-82185.herokuapp.com/register", {
			method: 'post',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
				name: this.state.name
			})
		})
			.then(res => res.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user)
					this.props.onRouteChange("home");
				} else {
					this.setState({success: false});
				}
			});		
	}

	render() {
		return (
			<article
				className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset
				    	id="sign_up"
				    	className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">
				      	Register
				      </legend>
				      <div className="mt3">
				        <label
				        	className="db fw6 lh-copy f6"
				        	htmlFor="name">
				        		Name
				        </label>
				        <input
				        	className="pa2 input-reset ba bg-transparent hover-black w-100"
				        	type="text"
				        	name="name"
				        	id="name" 
				        	onChange={this.onNameChange} />
				      </div>
				      <div className="mt3">
				        <label
				        	className="db fw6 lh-copy f6"
				        	htmlFor="email-address">
				        		Email
				        </label>
				        <input
				        	
				        	className="pa2 input-reset ba bg-transparent hover-black w-100"
				        	type="email"
				        	name="email-address"
				        	id="email-address" 
				        	onChange={this.onEmailChange} />
				      </div>
				      <div className="mv3">
				        <label
				        	className="db fw6 lh-copy f6"
				        	htmlFor="password">
				        		Password
				        	</label>
				        <input
				        	className="b pa2 input-reset ba bg-transparent hover-black w-100"
				        	type="password"
				        	name="password"
				        	id="password"
				        	onChange={this.onPasswordChange} />
				      </div>
				    </fieldset>
				    <div className="">
				      <input
				      	onClick={this.onRegister}
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
					      type="submit"
					      value="Register" />
				    </div>
				    { this.ifSuccess(this.state.success) }
				  </div>
				</main>
			</article>
		);
	}	
}

export default Register;
