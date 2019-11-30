// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd442e41ae7fe3478b78bae
// Create Campaign Screen 2
import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Text,
  Title,
  Button,
  Form,
  Picker,
  Icon,
  Item,
  Label
} from "native-base";
import { campaignType, campaignCategories, campaignStrategy } from "../../../actions/campaign";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../../../styles/colors";
// import console = require("console");

class CreateCampaignIntro extends Component {
  state = { category_id: "", campaign_type_id: "", strategy_id: "" };

  static navigationOptions = {
    title: "Campaign Setup Intro",
    headerStyle: { backgroundColor: COLORS.tertiary },
    headerTintColor: COLORS.textWhite
  };

  onValueChange = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  change = async (value) => {
    this.onValueChange('category_id', value);
    await this.props.getStrategy(value);
  }

  async componentDidMount() {
    await this.props.getCategories();
    await this.props.getTypes();
  }

  render() {
    return (
      <Container>
        <Content style={styles.p4}>
          <Text style={styles.titleText}>First let's get you setup</Text>
          <Text style={styles.subText}>
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              color={COLORS.primary}
              size={24}
            />{" "}
            Tips to effectively launch your campaign
          </Text>

 
          <Form style={styles.mb4}>
            <View style={styles.mb2}>
              <Label style={styles.textLabel}>
                Pick your campaign category
              </Label>
              <Item style={styles.pickerContainer} picker>
                <Picker
                  mode="dropdown"
                  disabled={true}
                  iosIcon={
                    <SimpleLineIcons
                      name="arrow-down"
                      style={{ fontSize: 12 }}
                    />
                  }
                  placeholder="Campaign Category"
                  style={{ width: "80%" }}
                  placeholderStyle={{ maxWidth: "100%", paddingLeft: 0 }}
                  textStyle={{ maxWidth: "100%", fontSize: 14 }}
                  selectedValue={this.state.category_id}
                  onValueChange={(value) => this.change(value)}
                >
                  <Picker.Item label={"Select"} />
                  {
                    this.props.categories.map(category => (
                      <Picker.Item label={category.name} value={category.id} key={category.id} />
                    ))
                  }
                </Picker>
              </Item>
            </View>
            <View style={styles.mb2}>
              <Label style={styles.textLabel}>
                Tell us what your project falls under
              </Label>
              <Item style={styles.pickerContainer} picker>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <SimpleLineIcons
                      name="arrow-down"
                      style={{ fontSize: 12 }}
                    />
                  }
                  placeholder="Project Category"
                  style={{ width: "80%" }}
                  placeholderStyle={{ maxWidth: "100%", paddingLeft: 0 }}
                  textStyle={{ maxWidth: "100%", fontSize: 14 }}
                  selectedValue={this.state.campaign_type_id}
                  onValueChange={(value) => this.onValueChange('campaign_type_id', value)}
                >
                  <Picker.Item label={"Select"} />
                  {
                    this.props.types.map(type => (
                      <Picker.Item label={type.name} value={type.id} key={type.id} />
                    ))
                  }
                </Picker>
              </Item>
            </View>
            <View style={styles.mb2}>
              <Label style={styles.textLabel}>
                Pick your campaign strategy
              </Label>
              <Item style={styles.pickerContainer} picker>
                <Picker
                  mode="dropdown"
                  iosIcon={
                    <SimpleLineIcons
                      name="arrow-down"
                      style={{ fontSize: 12 }}
                    />
                  }
                  placeholder="Donation only fundraising"
                  style={{ width: "80%" }}
                  placeholderStyle={{ maxWidth: "100%", paddingLeft: 0 }}
                  textStyle={{ maxWidth: "100%", fontSize: 14 }}
                  selectedValue={this.state.strategy_id}
                  onValueChange={(value) => this.onValueChange('strategy_id', value)}
                >
                  <Picker.Item label={"Select"} />
                  {
                    this.props.strategy.map(strategy => (
                      <Picker.Item label={strategy.name} value={strategy.id} key={strategy.id} />
                    ))
                  }
                </Picker>
              </Item>
            </View>
          </Form>

          <Button onPress={() => this.props.navigation.navigate('createCampaignSetup', { category_id: this.state.category_id, campaign_type_id: this.state.campaign_type_id, strategy_id: this.state.strategy_id })} style={styles.continueBtn} block>
            <Text>Continue</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTypes: () => dispatch(campaignType()),
  getCategories: () => dispatch(campaignCategories()),
  getStrategy: (data) => dispatch(campaignStrategy(data))
});

const mapStateToProps = state => ({
  types: state.campaign.types,
  categories: state.campaign.categories,
  strategy: state.campaign.strategy
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCampaignIntro);

const styles = StyleSheet.create({
  titleText: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 8,
    textAlign: "center"
  },
  subText: {
    color: COLORS.textGrey,
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 32,
    textAlign: "center"
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
    textAlign: "center"
  },
  pickerContainer: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    paddingLeft: 8
  },
  textLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.tertiary,
    marginBottom: 4
  },
  continueBtn: {
    backgroundColor: COLORS.primary
  },
  p4: {
    padding: 32
  },
  mb2: {
    marginBottom: 16
  },
  mb4: {
    marginBottom: 32
  }
});
