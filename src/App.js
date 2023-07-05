import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    isLoading: false,
    isBrandSticky: false
  };

  fetchUsers = () => {
    this.setState({ isLoading: true });
    fetch("https://reqres.in/api/users?page=1")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ users: data.data, isLoading: false });
      })
      .catch((error) => {
        console.log("Error:", error);
        this.setState({ isLoading: false });
      });
  };

  handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isBrandSticky = scrollTop > 0;
    this.setState({ isBrandSticky });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { users, isLoading, isBrandSticky } = this.state;

    return (
      <div className="App">

        <nav className={isBrandSticky ? "sticky" : ""}>
          <div id="brand" className="brand">
            Orange Inc.
          </div>
          <button onClick={this.fetchUsers} disabled={isLoading}>
            Get Users
          </button>
        </nav>
        <div className="user-card-grid">
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : (
            users.map((user, index) => (
              <div
                key={user.id}
                className="user-card"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <img src={user.avatar} alt={user.first_name} />
                <h3>
                  {user.first_name} {user.last_name}
                </h3>
                <p>{user.email}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default App;
