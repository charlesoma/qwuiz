// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd41e460f1587681456f7b3
import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Left,
  Right,
  Body,
  Toast,
  Button
} from "native-base";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import moment from "moment";

import { ProgressBar } from "../../../components/common";
import campaignImage from "../../../assets/campaignImg1.png";
import { COLORS } from "../../../styles/colors";
import { connect } from "react-redux";
import { saveCampaign } from "../../../actions/campaign";
import { Loader } from "../../../components/common";

class CampaignDetail extends Component {
  state = {};

  static navigationOptions = {
    title: "Campaign Detail",
    headerStyle: { backgroundColor: COLORS.tertiary },
    headerTintColor: COLORS.textWhite
  };

  componentDidMount() {
    let end = moment(this.props.navigation.state.params.campaign.goal.end_date)
    let current = moment()
    this.setState({
      img: this.props.navigation.state.params.img,
      title: this.props.navigation.state.params.campaign.title,
      description: this.props.navigation.state.params.campaign.description,
      createdAt: this.props.navigation.state.params.campaign.created_at,
      totalAmount: this.props.navigation.state.params.campaign.goal.amount_to_raise,
      amountRaised: this.props.navigation.state.params.campaign.amountRaised,
      entry: this.props.navigation.state.params.campaign.goal.entry_fee,
      name: this.props.navigation.state.params.campaign.user.firstname + " " + this.props.navigation.state.params.campaign.user.lastname,
      left: end.diff(current, 'days'),
      id: this.props.navigation.state.params.campaign.id
    })
  }

  save = async() => {
    console.log(this.state.id)
    await this.props.saveCampaign(this.state.id);
    if (this.props.saved) {
      return Toast.show({
        text: "Campaign saved successfully",
        type: "success"
      });
    }

    Toast.show({
      text: "Error saving campaign",
      type: "danger"
  });
  }

  render() {
    // TODO
    // Add Read More toggle functionality
    return (
      <Container>
        <Content style={styles.p4}>
          <Image
            source={{ uri: this.state.img }}
            resizeMode="cover"
            style={styles.headerImage}
          />
          <View
            style={[
              styles.flexRow,
              styles.justifyContentBetween,
              styles.alignItemsCenter,
              styles.ph1,
              styles.mb2
            ]}
          >
            <View style={styles.flexRow}>
              <TouchableOpacity onPress={this.save}>
                <Ionicons name="md-heart-empty" size={20} style={styles.mr2} />
              </TouchableOpacity>
              <Ionicons name="md-share" size={20} />
            </View>

            <View style={styles.flexRow}>
              <Text style={[styles.mr1, styles.textGray, styles.textSmall]}>
                {moment(this.state.createdAt).format("MMM Do YYYY")}
              </Text>
              {/* <EvilIcons name="location" size={20} />
              <Text style={[styles.textGray, styles.textSmall]}>Sheffield</Text> */}
            </View>
          </View>
          <Text style={styles.campaignTitle}>
            {this.state.title}
          </Text>
          <Text style={styles.campaignSubtitle}>By {this.state.name}</Text>
          <ProgressBar value={this.state.amountRaised/this.state.totalAmount} style={styles.mb1} />
          <View style={[styles.flexRow, styles.mb2, styles.justifyContentBetween]}>
            <Left>
              <Text style={[styles.textBold, styles.textBig]}>${this.state.amountRaised}</Text>
              <Text style={[styles.textGray, styles.textSmall]}>
                Raised of ${this.state.totalAmount} goal
              </Text>
            </Left>
            <Body style={styles.alignSelfStart}>
              <Text style={[styles.textBold, styles.textBig]}>{this.state.left}</Text>
              <Text style={[styles.textGray, styles.textSmall]}>days left</Text>
            </Body>
            <Right style={styles.alignSelfStart}>
              <Text style={[styles.textBold, styles.textBig, styles.textGray]}>
              {`${Math.floor((this.state.amountRaised/this.state.totalAmount) * 100)}%`}
              </Text>
            </Right>
          </View>
          <Text style={styles.campaignInfo}>
            {this.state.description}
          </Text>
          <Button transparent style={styles.reportBtn}>
            <Text style={styles.reportCampaignText}>Report this campaign</Text>
          </Button>
        </Content>
        <Button onPress={() => this.props.navigation.navigate('campaignSupport', {id: this.state.id, entry: this.state.entry, img: this.state.img, title: this.state.title})} style={styles.supportBtn} block>
          <Text>Support Campaign</Text>
        </Button>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  saveCampaign: (id) => dispatch(saveCampaign(id)),
});

const mapStateToProps = state => ({
  saved: state.campaign.saved,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDetail);

const styles = StyleSheet.create({
  p4: {
    padding: 32,
  },
  ph1: {
    paddingHorizontal: 8
  },
  headerImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 8
  },
  campaignTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4
  },
  campaignSubtitle: {
    fontWeight: "500",
    fontSize: 12,
    color: COLORS.textGrey,
    marginBottom: 16
  },
  campaignInfo: {
    color: COLORS.textGrey,
    fontSize: 14,
    fontWeight: "400"
  },
  supportBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 0,
  },
  reportBtn: {
    marginBottom: 100
  },
  reportCampaignText: {
    fontSize: 14,
    color: COLORS.textRed,
  },
  flexRow: {
    display: "flex",
    flexDirection: "row"
  },
  justifyContentBetween: {
    justifyContent: "space-between"
  },
  alignItemsCenter: {
    alignItems: "center"
  },
  alignSelfStart: {
    alignSelf: "flex-start"
  },
  mr1: {
    marginRight: 8
  },
  mr2: {
    marginRight: 16
  },
  mb1: {
    marginBottom: 8
  },
  mb2: {
    marginBottom: 16
  },
  textGray: {
    color: COLORS.textGrey
  },
  textSmall: {
    fontSize: 12,
    fontWeight: "300"
  },
  textBold: {
    fontWeight: "bold"
  },
  textBig: {
    fontSize: 16
  }
});
