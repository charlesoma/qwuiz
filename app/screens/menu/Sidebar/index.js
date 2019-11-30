import React from "react";
import { Image, StyleSheet, View, AsyncStorage } from "react-native";
import { fetchUser } from "../../../actions/auth";
import { profile } from "../../../actions/profile";
import {
  Button,
  Text,
  Container,
  ListItem,
  Content,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { connect } from "react-redux";

import {
  Entypo,
  Ionicons,
  MaterialIcons,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
  Foundation
} from "@expo/vector-icons";

import { COLORS } from "../../../styles/colors";

const routes = ["home", "quiz", "campaign"];

const menuItems = [
  {
    label: "My Profile",
    route: "profile",
    icon: <Entypo name="user" size={16} />
  },
  {
    label: "My Campaigns",
    route: "myCampaigns",
    icon: <Foundation name="megaphone" size={16} />
  },
  {
    label: "My Quizes",
    route: "myQuizes",
    icon: <MaterialCommunityIcons name="comment-question" size={16} />
  },
  {
    label: "Wallet",
    route: "wallet",
    icon: <Ionicons name="ios-wallet" size={18} />
  },
  {
    label: "Settings",
    route: "profile",
    icon: <Ionicons name="ios-settings" size={18} />
  }
];

class SideBar extends React.Component {
  async componentDidMount() {
    await this.props.getUser();
    await this.props.getProfile()
  }
  render() {
    const { user } = this.props;
    return (
      <Container style={styles.siderBg}>
        <Content>
          <View style={styles.siderHeader}>
            <Image
              source={user ? user.profile.media?{uri: user.profile.media.url}: require("../../../assets/user.png") : require("../../../assets/user.png")}
              style={styles.profilePic}
            />
            <Text style={styles.profileName}>
              {" "}
              {user ? `${user.firstname} ${user.lastname}` : "Guest"}{" "}
            </Text>
          </View>
          {menuItems.map(({ label, icon, route }, id) => (
            <ListItem
              onPress={() => this.props.navigation.navigate(route)}
              button
              style={styles.menuItem}
              key={id}
            >
              {icon}
              <Text style={styles.menuItemText}>
                {"    "}
                {label}
              </Text>
            </ListItem>
          ))}
          <ListItem
            onPress={() => AsyncStorage.removeItem("token").then(() => this.props.navigation.navigate('login'))}
            button
            style={styles.menuItem}
          // key={id}
          >
            {<Ionicons name="ios-exit" color={COLORS.textRed} size={18} />}
            <Text style={styles.menuItemText}>
              {"    "}
              {'Logout'}
            </Text>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch(fetchUser()),
  getProfile: () => dispatch(profile()),
});

const mapStateToProps = (state, dispatch) => ({
  user: state.auth.user,
  profile: state.profile.profile,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(SideBar);

const styles = StyleSheet.create({
  siderBg: {
    backgroundColor: COLORS.offWhite,
    backgroundColor: COLORS.white
  },
  siderHeader: {
    padding: 32,
    paddingBottom: 16,
    backgroundColor: COLORS.siderHeaderBg,
    marginBottom: 16
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 16
  },
  profileName: {
    fontSize: 20,
    fontWeight: "400"
  },
  menuItem: {
    borderBottomWidth: 0
  },
  menuItemText: {
    fontSize: 15
  }
});
