// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd30b67a3395903b48f7e41
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { CheckBox, Item, Input, Button, Toast } from "native-base";

import { COLORS } from "../../../styles/colors";
import { loginWithEmail } from "../../../actions/auth";
import { Loader } from "../../../components/common";
import { Ionicons, EvilIcons } from "@expo/vector-icons";

const win = Dimensions.get("window");

class LoginWithEmailScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    isChecked: false,
    email: "",
    password: "" 
  };

  check = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  handleSubmit = async () => {
    const { email, password } = this.state;
    if (!email || !password) {
      return;
    }

    await this.props.login({ email, password });

    if (this.props.isAuthenticated) {
      return this.props.navigation.navigate("main");
    }

    // if it hasn't returned, then authentication failed
    Toast.show({
      text: "An error occured",
      type: "danger"
    });
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  render() {
    return (

      <View style={styles.content}>
        <View style={styles.topContainer} />
        <View style={styles.bottomContainer} />
        <View style={styles.main}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.backDiv}>
            <Ionicons name="md-arrow-back" size={25} style={styles.back} />
          </TouchableOpacity>
          <Image
            source={require("../../../assets/logo.png")}
            resizeMode='contain'
            style={styles.image}
          />
          <View style={styles.textDiv}>
            <Text style={styles.topText}>
              Start and manage campaigns, {"\n"}engage with supporters, {"\n"}
              play quizzes.
            </Text>
          </View>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-10}>
            <View style={styles.form}>
              <Item style={styles.input1}>
                <Input
                  placeholder="Email"
                  onChangeText={text => this.handleChange("email", text)}
                  value={this.state.email}
                  autoCapitalize="none"
                  placeholderTextColor="#858585"
                  keyboardType="email-address"
                />
              </Item>
              <Item style={styles.input2} last>
                <Input
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={text => this.handleChange("password", text)}
                  value={this.state.password}
                  placeholderTextColor="#858585"
                />
              </Item>
            </View>
          </KeyboardAvoidingView>
          {/* <View style={styles.remember}>
            <CheckBox
              checked={this.state.isChecked}
              onPress={this.check}
              color="#8E8E8E"
            />
            <Text style={styles.rememberText}>
              Remember my login details
            </Text>
          </View> */}
          <TouchableOpacity style={styles.forgotDiv}>
            <Text style={styles.forgotText}>Forgot your Password?</Text>
          </TouchableOpacity>
          <View>
            <Button
              //   onPress={() => this.props.navigation.navigate("home")}
              onPress={() => this.handleSubmit()}
              style={styles.btn}
              light
            >
              <Text style={styles.btnText}>Verify</Text>
            </Button>
          </View>
          <View>
            <Button
              onPress={() => this.props.navigation.navigate("signupWithEmail")}
              transparent
            >
              <Text style={styles.registerText}>New User? Register</Text>
            </Button>
          </View>
        </View>
        {this.props.loading ? <Loader /> : null}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(loginWithEmail(data))
});

const mapStateToProps = state => ({
  loading: state.auth.loading,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginWithEmailScreen);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "column"
  },
  topContainer: {
    flex: 1.3,
    backgroundColor: COLORS.primary
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  main: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
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
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22
  },
  form: {
    width: win.width / 1.3,
    backgroundColor: COLORS.offWhite,
    borderRadius: 25,
    marginTop: 50,
    marginBottom: 16,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1
  },
  input1: {
    borderColor: COLORS.borderLineGrey,
    height: 60,
    paddingLeft: 15
  },
  input2: {
    borderColor: COLORS.transparent,
    height: 60,
    paddingLeft: 15
  },
  remember: {
    flex: 1,
    flexDirection: "row"
  },
  rememberText: {
    marginLeft: 25,
    color: COLORS.textGreyDark
  },
  registerText: {
    color: COLORS.textGreyDark
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10
  },
  btnText: {
    color: COLORS.white,
    fontSize: 18,
    width: win.width / 1.5,
    textAlign: "center"
  },
  forgotDiv: {
    marginBottom: 32
  },
  forgotText: {
    fontSize: 16
  },
  back: {
    color: COLORS.white
  },
  backDiv: {
    position: "absolute",
    top: 40,
    left: 20
  }
});
