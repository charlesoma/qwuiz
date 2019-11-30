// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd516d38504b367a2872bbb

import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Header,
  Body,
  Left,
  Button,
  Right,
  Title,
  ListItem,
  Icon
} from "native-base";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../../styles/colors";

export default class MyCampaigns extends Component {
  state = {};

  static navigationOptions = {
    headerStyle: {
      backgroundColor: COLORS.primary,
      elevation: 0,
      borderBottomWidth: 0,
      height: 30
    },
    headerTintColor: COLORS.white
  };

  render() {
    return (
      <Container>
        <View style={styles.subHeader}>
          <Text style={styles.headerTitle}>Campaigns</Text>
          <View>
            <Button onPress={() => this.props.navigation.navigate('createCampaignDetail')} style={styles.createBtn} rounded small>
              <Text style={styles.textPrimary}>Create a Campaign</Text>
            </Button>
          </View>
        </View>
        <Content style={styles.contentContainer}>
          <Text style={styles.subTitle1}> Your ongoing Campaigns </Text>
          <Text style={styles.subTitle2}>
            {" "}
            You have no ongoing campaigns at this time
          </Text>

          <View style={{marginBottom: 100}}>
            <ListItem
              button
              onPress={() =>
                this.props.navigation.navigate("manageCampaigns")
              }
            >
              <Left>
                <Text style={styles.navText}>Manage Campaigns</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              button
              onPress={() =>
                this.props.navigation.navigate("savedCampaigns")
              }
            >
              <Left>
                <Text style={styles.navText}>Saved Campaigns</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem button onPress={() => {this.props.navigation.navigate("donations")}}>
              <Left>
                <Text style={styles.navText}>
                  Campaigns you have donated to
                </Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              button
              onPress={() =>
                this.props.navigation.navigate("endedCampaigns")
              }
            >
              <Left>
                <Text style={styles.navText}>Ended Campaigns</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            {/* <ListItem button onPress={() => { }}>
              <Left>
                <Text style={styles.navText}>Drafts</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem> */}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {},
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 40
  },
  subHeader: {
    backgroundColor: COLORS.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8
  },
  createBtn: {
    backgroundColor: COLORS.white,
    marginBottom: 64
  },
  contentContainer: {
    padding: 16,
    paddingTop: 32
  },
  subTitle1: {
    textAlign: "center",
    marginBottom: 16,
    fontWeight: '500',
    fontSize: 18,
    color: COLORS.textDark

  },
  subTitle2: {
    textAlign: "center",
    fontWeight: '300',
    color: COLORS.textGrey,
    fontSize: 13,
    marginBottom: 32
  },
  navText: {
    fontWeight: '400',
    fontSize: 16
  },
  textPrimary: {
    color: COLORS.secondary,
    fontWeight: "600"
  },
  mb2: {
    marginBottom: 16
  }
});
