import React from 'react';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: "",
			signInPassword: "",
			success: true
		}
	}

	onEmailChange = (event) => {
		this.setState({signInEmail: event.target.value});
		this.setState({success: true});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
		this.setState({success: true});
	}

	ifSuccess = (bool) => {
		if (!bool) {
			return <p className="dark-red">Wrong credentials!</p>
		}
	}

	onSubmitSignIn = () => {
		fetch("https://infinite-headland-82185.herokuapp.com/signin", {
			method: 'post',
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(res => res.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange("home");
				} else {
					this.setState({success: false});
				}
			});		
	}

	onSignInKeyPress = key => {
		if (key.charCode === 13) {
      this.onSubmitSignIn();
    }
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<article
				className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-2 center">
				<main className="pa4 black-80">
				  <div className="measure">
				    <fieldset
				    	id="sign_up"
				    	className="ba b--transparent ph0 mh0">
				      <legend className="f1 fw6 ph0 mh0">
				      	Sign In
				      </legend>
				      <div className="mt3">
				        <label
				        	className="db fw6 lh-copy f6"
				        	htmlFor="email-address">
				        		Email
				        </label>
				        <input
				        	onChange={this.onEmailChange}
				        	onKeyPress={this.onSignInKeyPress}
				        	className="h2 pa2 input-reset ba bg-transparent hover-black w-100"
				        	type="email"
				        	name="email-address"
				        	id="email-address" />
				      </div>
				      <div className="mv3">
				        <label
				        	className="db fw6 lh-copy f6"
				        	htmlFor="password">
				        		Password
				        	</label>
				        <input
				        	onChange={this.onPasswordChange}
				        	onKeyPress={this.onSignInKeyPress}
				        	className="h2 b pa2 input-reset ba bg-transparent hover-black w-100"
				        	type="password"
				        	name="password"
				        	id="password" />
				      </div>
				    </fieldset>
				    <div className="">
				      <input
				      	onClick={this.onSubmitSignIn}
					      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
					      type="submit"
					      value="Sign in" />
				    </div>
				    { this.ifSuccess(this.state.success) }
				    <div className="lh-copy mt3">
				      <p
				      	onClick={() => onRouteChange('register')}
				      	className="f5 link dim black db pointer"
				      >
				      	Register
				      </p>
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default SignIn;
