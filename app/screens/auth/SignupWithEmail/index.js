// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd30ab2fb9c6f349cca53c2
import React, { Component } from "react";
import { StyleSheet, Image, View, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native";
import { connect } from "react-redux";
import { register } from "../../../actions/auth";
import {
  Container,
  Content,
  Form,
  Button,
  Input,
  Item,
  Text,
  Left,
  Right,
  Icon,
  Toast
} from "native-base";
import { Loader } from "../../../components/common";

import { COLORS } from "../../../styles/colors";

class SignupWithEmailScreen extends Component {
  static navigationOptions = {
    headerTitle: "Signup with Email",
    headerStyle: {
      backgroundColor: COLORS.tertiary
    },
    headerTintColor: COLORS.textWhite,
    headerTitleStyle: {}
  };

  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: ""
  };

  handleSubmit = async () => {
    const { firstname, lastname, email, password, password_confirmation } = this.state;
    if (!firstname || !lastname || !email || !password || !password_confirmation) {
      return Alert.alert("Oops. Enter your details to register")
    }

    await this.props.signup({ firstname, lastname, email, password, password_confirmation });

    if (this.props.isAuthenticated) {
      Toast.show({
        text: "Successfully registered. Login now",
        type: "success"
      });
      return this.props.navigation.navigate("loginWithEmail");
    }

    // if it hasn't returned, then registration failed
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
      <Container>
        <Content>
          <View
            style={styles.header}
          >
            <Image
              style={styles.logo}
              resizeMode='contain'
              source={require("../../../assets/logo-dark.png")}
            />
            <Text style={{ textAlign: "center", width: "80%" }}>
              {" "}
              Few seconds away from winning exciting prices and post campaigns{" "}
            </Text>
          </View>
          <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-100}>
            <View style={styles.signupForm}>
              <Form>
                <Item last>
                  <Input
                    placeholder="First name"
                    onChangeText={text => this.handleChange("firstname", text)}
                    value={this.state.firstname}
                  />
                </Item>
                <Item last>
                  <Input
                    placeholder="Last name"
                    onChangeText={text => this.handleChange("lastname", text)}
                    value={this.state.lastname}
                  />
                </Item>
                <Item last>
                  <Left>
                    <Input placeholder="Profile Pic" />
                  </Left>
                  <TouchableOpacity style={{ marginRight: 16 }}>
                    <Icon
                      style={{ color: COLORS.tertiary }}
                      name="md-cloud-upload"
                    />
                  </TouchableOpacity>
                </Item>
                <Item last>
                  <Input
                    placeholder="Email"
                    onChangeText={text => this.handleChange("email", text)}
                    value={this.state.email}
                    autoCapitalize="none"
                    keyboardType="email-address" 
                  />
                </Item>
                <Item last>
                  <Input
                    placeholder="Password, 8 characters min"
                    secureTextEntry
                    onChangeText={text => this.handleChange("password", text)}
                    value={this.state.password}
                  />
                </Item>
                <Item last style={styles.input}>
                  <Input
                    placeholder="Confirm password"
                    secureTextEntry
                    onChangeText={text => this.handleChange("password_confirmation", text)}
                    value={this.state.password_confirmation}
                  />
                </Item>
              </Form>
            </View>
            <View>
              <Button onPress={() => this.handleSubmit()} style={styles.submitBtn} block>
                <Text> Continue </Text>
              </Button>
            </View>
          </KeyboardAvoidingView>
        </Content>
        {this.props.loading ? <Loader /> : null}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signup: data => dispatch(register(data))
});

const mapStateToProps = state => ({
  loading: state.auth.loading,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupWithEmailScreen);

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 32
  },
  logo: {
    width: 200,
    height: 100,
    marginTop: 32,
    marginBottom: 32
  },
  signupForm: {
    backgroundColor: COLORS.offWhite,
    marginHorizontal: 32,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 32
  },
  input: {
    borderColor: COLORS.transparent,
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 32,
    marginBottom: 50,
    borderRadius: 10
  }
});
