// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd41e29df6a8967aee16b8a
import React, { Component } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Container, Content, Button, Text, Icon, Body } from "native-base";

import { COLORS } from "../../../styles/colors";
import { CampaignCard } from "../../../components/common";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { allCampaign } from "../../../actions/campaign";
import { Loader } from "../../../components/common";

// dummy data for the screen
const categories = ["1", "2", "3"];
const campaigns = [1, 2, 3, 4, 5, 6].map(num => {
  if (num % 2 == 0) {
    return require("../../../assets/campaignImg2.png");
  }
  return require("../../../assets/campaignImg1.png");
});

class CampaignList extends Component {
  static navigationOptions = {
    title: "All Campaigns"
  };

  state = {
    newestCampaings: [],
    popularCampaings: [],
    topCampaings: [],
    noteWorthyCampaings: [],
    endingSoonCampaings: [],
    charitableCampaings: [],
    categories: []
  }

  async componentDidMount() {
    await this.props.getAllCampaign();
    console.log(this.props.campaign.img)
    this.setState({
      newestCampaings: this.props.campaign.newestCampaings,
      popularCampaings: this.props.campaign.popularCampaings,
      topCampaings: this.props.campaign.topCampaings,
      noteWorthyCampaings: this.props.campaign.noteWorthyCampaings,
      endingSoonCampaings: this.props.campaign.endingSoonCampaings,
      charitableCampaings: this.props.campaign.charitableCampaings,
      categories: this.props.campaign.categories,
      img: this.props.campaign.img,
    })
  }

  render() {
    const { newestCampaings, popularCampaings, topCampaings, noteWorthyCampaings, endingSoonCampaings, charitableCampaings } = this.state;

    return (
      this.props.loading ? <Loader /> :
        <Container>
          <Content>
            <View style={styles.createCampaignSection}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('createCampaignDetail')} style={styles.p0_5}>
                <Button style={styles.createCampaignBtn} rounded small>
                  <Text style={styles.createCampaignBtnText}>
                    Create a Campaign
                </Text>
                </Button>
              </TouchableOpacity>
            </View>

            {newestCampaings.length === 0 && popularCampaings.length === 0 && topCampaings.length === 0 && noteWorthyCampaings.length === 0 && endingSoonCampaings.length === 0 && charitableCampaings.length === 0 ?
              <View style={styles.empty}>
                <Text>No campaigns to show</Text>
              </View> : 
              <View>
                {newestCampaings.length > 0 &&
                  <View style={styles.mb2}>
                    <View style={styles.categoryHeaderStyle}>
                      <Text style={styles.textBig}> Newest Campaigns </Text>
                      {/* <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("campaignCategory")
                    }
                    style={[styles.flexRow, styles.alignItemsCenter]}
                  >
                    <Text style={[styles.mr1, styles.textSmall]}> See All</Text>
                    <Icon
                      name="ios-arrow-forward"

                      style={{ color: COLORS.tertiary, fontSize: 12 }}
                    />
                  </TouchableOpacity> */}
                    </View>
                    <ScrollView
                      horizontal="true"
                      style={styles.mr2}
                      contentContainerStyle={[styles.p0_5, styles.pl2]}
                      showsHorizontalScrollIndicator={false}
                    >
                      {newestCampaings.map((campaign) => (
                        <CampaignCard
                          onPress={() => this.props.navigation.navigate('campaignDetail', { campaign: campaign, img: this.state.img })}
                          key={campaign.id}
                          image={{ uri: this.state.img }}
                          title={campaign.title}
                          description={campaign.description}
                          amount={campaign.goal.amount_to_raise}
                          progress={campaign.amountRaised/campaign.goal.amount_to_raise}
                        />
                      ))}
                    </ScrollView>
                  </View>
                }
                {popularCampaings.length > 0 &&
                  <View style={styles.mb2}>
                    <View style={styles.categoryHeaderStyle}>
                      <Text style={styles.textBig}> Popular Campaigns </Text>
                      {/* <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("campaignCategory")
                    }
                    style={[styles.flexRow, styles.alignItemsCenter]}
                  >
                    <Text style={[styles.mr1, styles.textSmall]}> See All</Text>
                    <Icon
                      name="ios-arrow-forward"

                      style={{ color: COLORS.tertiary, fontSize: 12 }}
                    />
                  </TouchableOpacity> */}
                    </View>
                    <ScrollView
                      horizontal="true"
                      style={styles.mr2}
                      contentContainerStyle={[styles.p0_5, styles.pl2]}
                      showsHorizontalScrollIndicator={false}
                    >
                      {popularCampaings.map((campaign) => (
                        <CampaignCard
                          onPress={() => this.props.navigation.navigate('campaignDetail', { campaign: campaign, img: this.state.img })}
                          key={campaign.id}
                          image={{ uri: this.state.img }}
                          title={campaign.title}
                          description={campaign.description}
                          amount={campaign.goal.amount_to_raise}
                          progress={campaign.amountRaised/campaign.goal.amount_to_raise}
                        />
                      ))}
                    </ScrollView>
                  </View>
                }
                {topCampaings.length > 0 &&
                  <View style={styles.mb2}>
                    <View style={styles.categoryHeaderStyle}>
                      <Text style={styles.textBig}> Top Campaigns </Text>
                      {/* <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("campaignCategory")
                    }
                    style={[styles.flexRow, styles.alignItemsCenter]}
                  >
                    <Text style={[styles.mr1, styles.textSmall]}> See All</Text>
                    <Icon
                      name="ios-arrow-forward"

                      style={{ color: COLORS.tertiary, fontSize: 12 }}
                    />
                  </TouchableOpacity> */}
                    </View>
                    <ScrollView
                      horizontal="true"
                      style={styles.mr2}
                      contentContainerStyle={[styles.p0_5, styles.pl2]}
                      showsHorizontalScrollIndicator={false}
                    >
                      {topCampaings.map((campaign) => (
                        <CampaignCard
                          onPress={() => this.props.navigation.navigate('campaignDetail', { campaign: campaign, img: this.state.img })}
                          key={campaign.id}
                          image={{ uri: this.state.img }}
                          title={campaign.title}
                          description={campaign.description}
                          amount={campaign.goal.amount_to_raise}
                          progress={campaign.amountRaised/campaign.goal.amount_to_raise}
                        />
                      ))}
                    </ScrollView>
                  </View>
                }
                {noteWorthyCampaings.length > 0 &&
                  <View style={styles.mb2}>
                    <View style={styles.categoryHeaderStyle}>
                      <Text style={styles.textBig}> Note Worthy Campaigns </Text>
                      {/* <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("campaignCategory")
                    }
                    style={[styles.flexRow, styles.alignItemsCenter]}
                  >
                    <Text style={[styles.mr1, styles.textSmall]}> See All</Text>
                    <Icon
                      name="ios-arrow-forward"

                      style={{ color: COLORS.tertiary, fontSize: 12 }}
                    />
                  </TouchableOpacity> */}
                    </View>
                    <ScrollView
                      horizontal="true"
                      style={styles.mr2}
                      contentContainerStyle={[styles.p0_5, styles.pl2]}
                      showsHorizontalScrollIndicator={false}
                    >
                      {noteWorthyCampaings.map((campaign) => (
                        <CampaignCard
                          onPress={() => this.props.navigation.navigate('campaignDetail', { campaign: campaign, img: this.state.img })}
                          key={campaign.id}
                          image={{ uri: this.state.img }}
                          title={campaign.title}
                          description={campaign.description}
                          amount={campaign.goal.amount_to_raise}
                          progress={campaign.amountRaised/campaign.goal.amount_to_raise}
                        />
                      ))}
                    </ScrollView>
                  </View>
                }
                {endingSoonCampaings.length > 0 &&
                  <View style={styles.mb2}>
                    <View style={styles.categoryHeaderStyle}>
                      <Text style={styles.textBig}> Ending Soon Campaigns </Text>
                      {/* <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("campaignCategory")
                    }
                    style={[styles.flexRow, styles.alignItemsCenter]}
                  >
                    <Text style={[styles.mr1, styles.textSmall]}> See All</Text>
                    <Icon
                      name="ios-arrow-forward"

                      style={{ color: COLORS.tertiary, fontSize: 12 }}
                    />
                  </TouchableOpacity> */}
                    </View>
                    <ScrollView
                      horizontal="true"
                      style={styles.mr2}
                      contentContainerStyle={[styles.p0_5, styles.pl2]}
                      showsHorizontalScrollIndicator={false}
                    >
                      {endingSoonCampaings.map((campaign) => (
                        <CampaignCard
                          onPress={() => this.props.navigation.navigate('campaignDetail', { campaign: campaign, img: this.state.img })}
                          key={campaign.id}
                          image={{ uri: this.state.img }}
                          title={campaign.title}
                          description={campaign.description}
                          amount={campaign.goal.amount_to_raise}
                          progress={campaign.amountRaised/campaign.goal.amount_to_raise}
                        />
                      ))}
                    </ScrollView>
                  </View>
                }
                {charitableCampaings.length > 0 &&
                  <View style={styles.mb2}>
                    <View style={styles.categoryHeaderStyle}>
                      <Text style={styles.textBig}> Charitable Campaigns </Text>
                      {/* <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("campaignCategory")
                    }
                    style={[styles.flexRow, styles.alignItemsCenter]}
                  >
                    <Text style={[styles.mr1, styles.textSmall]}> See All</Text>
                    <Icon
                      name="ios-arrow-forward"

                      style={{ color: COLORS.tertiary, fontSize: 12 }}
                    />
                  </TouchableOpacity> */}
                    </View>
                    <ScrollView
                      horizontal="true"
                      style={styles.mr2}
                      contentContainerStyle={[styles.p0_5, styles.pl2]}
                      showsHorizontalScrollIndicator={false}
                    >
                      {charitableCampaings.map((campaign) => (
                        <CampaignCard
                          onPress={() => this.props.navigation.navigate('campaignDetail', { campaign: campaign, img: this.state.img })}
                          key={campaign.id}
                          image={{ uri: this.state.img }}
                          title={campaign.title}
                          description={campaign.description}
                          amount={campaign.goal.amount_to_raise}
                          progress={campaign.amountRaised/campaign.goal.amount_to_raise}
                        />
                      ))}
                    </ScrollView>
                  </View>
                }
              </View>
            }
          </Content>
        </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAllCampaign: () => dispatch(allCampaign()),
});

const mapStateToProps = state => ({
  loading: state.campaign.loading,
  campaign: state.campaign.campaign,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignList);

const styles = StyleSheet.create({
  createCampaignSection: {
    backgroundColor: COLORS.offWhite,
    paddingVertical: 32,
    marginBottom: 16,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  createCampaignBtn: {
    backgroundColor: COLORS.white,
    elevation: 3,
    shadowRadius: 4,
    shadowColor: COLORS.shadowColor,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  createCampaignBtnText: {
    color: COLORS.primary
  },
  categoryHeaderStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  alignItemsCenter: {
    alignItems: "center"
  },
  mb2: {
    marginBottom: 16
  },
  mr1: {
    marginRight: 8
  },
  mr2: {
    marginRight: 16
  },
  p0_5: {
    padding: 4
  },
  pl2: {
    paddingLeft: 16
  },
  pt4: {
    paddingTop: 32
  },
  p0_5: {
    padding: 4
  },
  textBig: {
    fontSize: 18
  },
  textSmall: {
    fontSize: 12
  },
  empty: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
