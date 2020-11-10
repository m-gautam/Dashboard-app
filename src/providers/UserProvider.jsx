import React, { createContext, Component } from "react";
import ReactLoader from "react-loader";
import { auth } from "../components/firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
  state = {
    user: null,
    isLoading: false,
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(async (userAuth) => {
      this.setState({ user: userAuth });
      setTimeout(() => this.setState({ isLoading: true }), 3000);
    });
  };

  render() {
    const { user } = this.state;
    return (
      <ReactLoader loaded={this.state.isLoading}>
        <UserContext.Provider value={user}>
          {this.props.children}
        </UserContext.Provider>
      </ReactLoader>
    );
  }
}
export default UserProvider;
