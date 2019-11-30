// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd2a97b04853b68b052fb28
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, AsyncStorage, Alert } from "react-native";
import { CheckBox, ListItem, List, Button } from 'native-base';
import { COLORS } from "../../../styles/colors";
import * as Facebook from 'expo-facebook';
import * as Expo from 'expo'
import { socialLogin } from "../../../actions/auth";
import { connect } from "react-redux";
// import console = require("console");

const win = Dimensions.get('window');

class LoginWithEmailScreen extends Component {
  static navigationOptions = {
    header: null,
  };
 
  state = {
    isChecked: false
  }

  check = () => {
    this.setState({
      isChecked: !this.state.isChecked
    })
  }

  facebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('371380566885058', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=email,name,picture.type(large)`);
        const responseJson = await response.json()
        console.log(responseJson.picture.data.url)
        const firstname = responseJson.name.split(' ')[0];
        const lastname = responseJson.name.split(' ')[1];
        const email = responseJson.email;
        const photoUrl = responseJson.picture.data.url;
        await this.props.socialLogin({ firstname, lastname, token, email, photoUrl });

        if (this.props.isAuthenticated) {
          return this.props.navigation.navigate("main");
        }
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  google = async () => {
    try {
      console.log('google')
      const result = await Expo.Google.logInAsync({
        androidClientId: "1051531186705-im33goq8feqvfb79cjiq8jeedgqeo63t.apps.googleusercontent.com",
        iosClientId: "1051531186705-v816kdefsrdekin20im25jm25vh1oq9v.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })
      if (result.type === 'success') {
        console.log(result)
        const firstname = result.user.givenName;
        const lastname = result.user.familyName;
        const token = result.accessToken;
        const email = result.user.email;
        const photoUrl = result.user.photoUrl;
        await this.props.socialLogin({ firstname, lastname, token, email, photoUrl });

        if (this.props.isAuthenticated) {
          return this.props.navigation.navigate("main");
        }
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.topContainer}></View>
        <View style={styles.bottomContainer}></View>
        <View style={styles.main}>
          <Image
            source={require('../../../assets/logo.png')}
            resizeMode='contain'
            style={styles.image}
          />
          <View style={styles.textDiv}>
            <Text style={styles.topText}>Play smart. Play Qwuizz. {"\n"}Sign up today.</Text>
          </View>
          <List style={styles.list}>
            <ListItem onPress={this.facebook} last style={styles.listItem}>
              <Image
                source={require('../../../assets/facebook.png')}
                style={styles.icon}
                resizeMode='contain'
              />
              <Text>Login with Facebook</Text>
            </ListItem>
            <ListItem onPress={this.google} last style={styles.listItem}>
              <Image
                source={require('../../../assets/google.png')}
                style={styles.icon}
                resizeMode='contain'
              />
              <Text>Login with Google</Text>
            </ListItem>
            <ListItem button onPress={() => this.props.navigation.navigate('loginWithEmail')} last style={styles.listItem}>
              <Image
                source={require('../../../assets/email.png')}
                style={styles.icon}
                resizeMode='contain'
              />
              <Text>Login with Email</Text>
            </ListItem>
            <ListItem button onPress={() => this.props.navigation.navigate('home')} last style={styles.listItem}>
              <Image
                source={require('../../../assets/guest.png')}
                style={styles.icon}
                resizeMode='contain'
              />
              <Text>Play as GUEST</Text>
            </ListItem>
          </List>
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  socialLogin: (data) => dispatch(socialLogin(data)),
});

const mapStateToProps = (state, dispatch) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(LoginWithEmailScreen);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column'

  },
  topContainer: {
    flex: 1.5,
    backgroundColor: COLORS.primary,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.white,

  },
  main: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
    width: win.width
  },
  image: {
    width: 200,
    height: 100,
    marginBottom: 35
  },
  topText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 22
  },
  list: {
    width: win.width / 1.3,
    backgroundColor: COLORS.offWhite,
    borderRadius: 25,
    marginTop: 60,
    marginBottom: 30,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
    overflow: 'hidden'
  },
  listItem: {
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: COLORS.black,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15
  }
});

