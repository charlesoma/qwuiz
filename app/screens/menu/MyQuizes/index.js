// Just like MyCampaigns but for quiz
// Instead of EndedCampaign and SavedCampaigns, use Free Quizes and Games won

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
          <Text style={styles.headerTitle}>Quizzes</Text>
        </View>
        <Content style={styles.contentContainer}>
          <Text style={styles.subTitle1}>Your ongoing Quizzes</Text>
          <Text style={styles.subTitle2}>
            You have no ongoing quizzes at this time
          </Text>

          <View>
            {/* <ListItem
              button
              onPress={() => this.props.navigation.navigate("freeQuiz")}
            >
              <Left>
                <Text style={styles.navText}>Free Quizzes</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem> */}
            <ListItem
              button
              onPress={() =>
                this.props.navigation.navigate("gamesWon")
              }
            >
              <Left>
                <Text style={styles.navText}>Games played</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
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
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 60
  },
  subHeader: {
    backgroundColor: COLORS.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8
  },
  contentContainer: {
    padding: 16,
    paddingTop: 32
  },
  subTitle1: {
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "500",
    fontSize: 18,
    color: COLORS.textDark
  },
  subTitle2: {
    textAlign: "center",
    fontWeight: "300",
    color: COLORS.textGrey,
    fontSize: 13,
    marginBottom: 32
  },
  navText: {
    fontWeight: "400",
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