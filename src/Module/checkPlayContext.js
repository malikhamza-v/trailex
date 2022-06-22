import React, { createContext } from "react";

export const checkPlayContext = createContext();

class CheckPlayContextProvider extends React.Component {
  state = {
    isAlreadyPlay: false,
  };

  chnageState = () => {
    this.setState({ isAlreadyPlay: !this.state.isAlreadyPlay });
  };

  render() {
    return (
      <checkPlayContext.Provider
        value={{ ...this.state, chnageState: this.chnageState }}
      >
        {this.props.children}
      </checkPlayContext.Provider>
    );
  }
}

export default CheckPlayContextProvider;
