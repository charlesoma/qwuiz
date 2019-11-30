// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd47474e1838d685cd18415
// Create Campaign Screen 1
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Container, Content, Text, Title, Button } from "native-base";
import { COLORS } from "../../../styles/colors";

const requirements = [
  "You must reside in the countries which QWuizz’s services are available.",
  "You must have a registered charity/company",
  "Be above 18 years of age",
  "Have a valid government issued ID",
  "You must have a Cebit or Credit card"
];

export default class CreateCampaignDetail extends Component {
  state = {};

  static navigationOptions = {
    title: "Create a Campaign",
    headerStyle: { backgroundColor: COLORS.tertiary},
    headerTintColor: COLORS.textWhite
  };

  render() {
    return (
      <Container>
        <Content style={styles.p4}>
          <Title style={styles.titleText}>Eligibility Requirements</Title>

          <Text style={[styles.mb2, styles.textNormal]}>
            In order for you to use the campaign services of QWuizz, you
            must meet the following criteria:{" "}
            <Text style={styles.textPrimary}>Learn more</Text>
          </Text>
          {/* Requirements list */}
          {requirements.map((item, id) => (
            <Text key={id} style={[styles.mb2, styles.textNormal]}>
              {"\u2022"} {item}
            </Text>
          ))}
          <Text style={[styles.termsOfUseText, styles.mb2]}>
            By proceeding, you agree to the <Text style={[styles.termsOfUseText, styles.textPrimary]}>Terms of Use</Text> and have read and
            understand the <Text style={[styles.termsOfUseText, styles.textPrimary]}>Privacy Policy</Text>
          </Text>
          <Button onPress={() => this.props.navigation.navigate('createCampaignIntro')} style={styles.continueBtn} block>
            <Text>Continue</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 32,
    color: COLORS.textDark
  },
  textPrimary: {
    color: COLORS.primary
  },
  textNormal: {
    fontWeight: "300",
    lineHeight: 25
  },
  termsOfUseText: {
    fontWeight: "300",
    color: COLORS.textGrey,
    fontSize: 13,
    textAlign: 'center'
  },
  continueBtn: {
    backgroundColor: COLORS.primary,
    marginBottom: 80
  },
  p4: {
    padding: 32
  },
  mb2: {
    marginBottom: 16
  }
});
