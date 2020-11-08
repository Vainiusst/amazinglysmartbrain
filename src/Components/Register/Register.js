import React from 'react';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			name: "",
			success: true,
			errorCode: ""
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
			return <p className="dark-red">Unable to register!</p>
		}
	}

	errorHandler = (errorCode) => {
		if (errorCode === "1") {
			return <p className="dark-red">Please enter a name!</p>
		} else if (errorCode === "3") {
			return <p className="dark-red">Password must be at least 6 characters long!</p>
		} else if (errorCode === "2") {
			return <p className="dark-red">Please enter a valid email!</p>
		}
	}
 
	onRegister = () => {
		const { email, password, name } = this.state;
		const emailPattern = new RegExp("^[a-z0-9]+[a-z0-9.\-_]*@{1}[a-z0-9\-]+\.{1}[a-z]{1,4}\.?[a-z]{1,4}$")
		if (name.length === 0) {
			return this.setState({errorCode: "1"})
		} else if (password.length < 6) {
			return this.setState({errorCode: "3"})
		} else if (!emailPattern.test(email)) {
			return this.setState({errorCode: "2"})
		}
		fetch("https://infinite-headland-82185.herokuapp.com/register", {
			method: 'post',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				email: email,
				password: password,
				name: name
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

	onRegisterKeyPress = key => {
		if (key.charCode === 13) {
      this.onRegister();
    }
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
				        	className="h2 pa2 input-reset ba bg-transparent hover-black w-100"
				        	type="text"
				        	name="name"
				        	id="name" 
				        	onChange={this.onNameChange}
				        	onKeyPress={this.onRegisterKeyPress}
				        />
				      </div>
				      <div className="mt3">
				        <label
				        	className="db fw6 lh-copy f6"
				        	htmlFor="email-address">
				        		Email
				        </label>
				        <input				        	
				        	className="h2 pa2 input-reset ba bg-transparent hover-black w-100"
				        	type="email"
				        	name="email-address"
				        	id="email-address" 
				        	onChange={this.onEmailChange}
				        	onKeyPress={this.onRegisterKeyPress}
								/>
				      </div>
				      <div className="mv3">
				        <label
				        	className="db fw6 lh-copy f6"
				        	htmlFor="password">
				        		Password
				        </label>
				        <input
				        	className="h2 b pa2 input-reset ba bg-transparent hover-black w-100"
				        	type="password"
				        	name="password"
				        	id="password"
				        	onChange={this.onPasswordChange}
				        	onKeyPress={this.onRegisterKeyPress}
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input
				      	onClick={this.onRegister}
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
					      type="submit"
					      value="Register" />
				    </div>
				    { this.errorHandler(this.state.errorCode) }
				    { this.ifSuccess(this.state.success) }
				  </div>
				</main>
			</article>
		);
	}	
}

export default Register;
