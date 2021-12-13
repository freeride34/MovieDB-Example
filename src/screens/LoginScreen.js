import React, { Component } from "react";
import "../App.css";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passwd: "",
    };
  }

  checkUser() {
    let password = document.forms["loginForm"]["password"].value;
    let username = document.forms["loginForm"]["userName"].value;
    let pwregex = /^\d{6,12}$/;
    let userregex = /^\w+@\w+.*(\.\w{2,3})+$/;
    if (password.match(pwregex) && username.match(userregex)) {
      if (
        this.state.userName === "admin@admin.com" &&
        this.state.passwd === "123456"
      ) {
        this.props.checkLogin(true);
      } else {
        document.getElementsByClassName("err")[0].innerHTML =
          "Eposta veya Şifre Yanlış";
      }
    } else {
      document.getElementsByClassName("err")[0].innerHTML =
        "Eposta formatı hatalı veya Parola 6-12 karakter arasında rakam değil.";
    }
  }
  render() {
    return (
      <div className="LoginContainer">
        <div className="LoginForm">
          <form className="form" name="loginForm">
            <p>Giriş Yap</p>
            <label>E-Posta:</label>
            <input
              type="email"
              name="userName"
              onChange={(e) => this.setState({ userName: e.target.value })}
            />
            <label>Parola:</label>
            <input
              type="password"
              name="password"
              formNoValidate={false}
              onChange={(e) => this.setState({ passwd: e.target.value })}
            />
            <div>
              <span className="err"></span>
              <input
                type="button"
                value="Giriş Yap"
                onClick={() => this.checkUser()}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
