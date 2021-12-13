import React, { Component } from "react";
import LoginScreen from "./LoginScreen";
import "../App.css";
import MovieScreen from "./MovieScreen";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: true,
    };
  }
  checkLogin(login) {
    this.setState({ logged: login });
  }
  render() {
    return (
      <div className="home">
        <div className="header">
          <p>Movie App</p>
          {this.state.logged ? (
            <div className="signOutBtn">
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.setState({ logged: false });
                }}
              >
                Çıkış Yap
              </p>
            </div>
          ) : null}
        </div>
        {this.state.logged ? (
          <MovieScreen />
        ) : (
          <LoginScreen checkLogin={this.checkLogin.bind(this)} />
        )}
        <div className="footer">
          <p>Movie App İnfocus</p>
        </div>
      </div>
    );
  }
}
