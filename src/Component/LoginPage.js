import React, { Component } from 'react';

class LoginPage extends Component {


    render() {
        return (
            <div id="Login" className="LoginForm">
                <p>LOGIN</p>
                <form method="post" onSubmit={
                    function (e) {
                        e.preventDefault();
                        this.props.login(e.target.id.value, e.target.pass.value);
                    }.bind(this)
                }>
                    <input type="text" name="id" placeholder="UserName"></input><br />
                    <input type="password" name="pass" placeholder="Password"></input><br />

                    <input type="submit" value="JOIN"></input>

                </form>
            </div>

        );
    }
}

export default LoginPage;