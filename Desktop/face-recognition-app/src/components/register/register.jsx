import React from "react"

class Register extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            signUpName: '',
            signUpEmail: '',
            signUpPassword: '',
            error: ''
        }
    }

    onNameChange = (e) => {
        this.setState({signUpName: e.target.value})
    }

    onEmailChange = (e) => {
        this.setState({signUpEmail: e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({signUpPassword: e.target.value})
    }

    onSubmitHandler = () => {
        if(!this.state.signUpName || !this.state.signUpEmail || !this.state.signUpPassword) {
            return this.setState({error: '* All fields are required'})
        }
        fetch('https://face-recognition-api-xts6.onrender.com/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.signUpName,
                email: this.state.signUpEmail,
                password: this.state.signUpPassword
            })
        }).then(response => response.json()).then(data => {
            if (data.id) {
                this.props.loadUser(data)
                this.props.onRouteChange('home')
            }  
        })
    }

    render() {
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 center fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name"
                                    onChange={this.onNameChange}    
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        {this.state.error && <span className="dark-red">{this.state.error}</span>}
                        <div className="">
                        <input onClick={this.onSubmitHandler} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('signin')} className="f6 link dim black pointer db">Already have an account? <span className="underline">Sign in</span></p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register