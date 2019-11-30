import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image, AsyncStorage } from "react-native";
import { Root } from "native-base";
import { Provider } from "react-redux";
import { createAppContainer } from "react-navigation";

import { withDrawerNavigator } from "./app/routes";
import { configureStore } from "./app/store";

const store = configureStore();

const cacheImages = async images => {
  return await images.map(image => {
    if (typeof image == "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

export default class App extends Component {
  state = {
    isReady: false,
    signedIn: false
  };

  isSignedIn = async () => {
    try {
      let value = await AsyncStorage.getItem('token');
      if (value != null) {
        this.setState({
          signedIn: true
        })
      }
      else {
        this.setState({
          signedIn: false
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // async componentDidMount() {
  //   await AsyncStorage.removeItem('token');
  // }

  async _loadAssetsAsync() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });

    await cacheImages([
      require("./app/assets/logo.png"),
      require("./app/assets/quizImg1.png"),
      require("./app/assets/quizImg2.png"),
      require("./app/assets/user1.png"),
      require("./app/assets/user2.png"),
      require("./app/assets/rules.png"),
      require("./app/assets/single.png"),
      require("./app/assets/opponent.png"),
      require("./app/assets/user.png"),
      require("./app/assets/cash.png"),
      require("./app/assets/projector.png"),
      require("./app/assets/camera.png"),
      require("./app/assets/email.png"),
      require("./app/assets/google.png"),
      require("./app/assets/facebook.png"),
      require("./app/assets/guest.png")
    ]);    
  }
  
  render() {
    const { signedIn } = this.state;

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={() => this._loadAssetsAsync().then(() => this.isSignedIn())}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    const AppContainer = createAppContainer(withDrawerNavigator(signedIn))

    return (
      <Root>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </Root>
    );
  }
}
