import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";
import { getDonations, getDonationsMore } from "../../../actions/campaign";
import { Loader } from "../../../components/common";
import moment from "moment";
import {
  Container,
  Content,
  Text,
  Toast,
  View
} from 'native-base';

import { CampaignCard } from '../../../components/common'
import { COLORS } from '../../../styles/colors'

const campaigns = [1, 2, 3, 4, 5, 6].map(num => {
  if (num % 2 == 0) {
    return require("../../../assets/campaignImg2.png");
  }
  return require("../../../assets/campaignImg1.png");
});

class Donations extends Component {
  state = {
    data: [],
    page: 1,
    clicked: false
  }

  static navigationOptions = {
    headerTitle: "Donations made",
    headerStyle: {
      backgroundColor: COLORS.tertiary,
      color: COLORS.white
    },
    headerRight: <View />,
    headerTintColor: COLORS.textWhite,
    headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
  }

  async componentDidMount() {
    await this.props.getDonations();
    this.setState({
      data: this.props.donations.data.campaigns.data,
      check: this.props.donations.data.campaigns.next_page_url
    })
    console.log(this.props.donations.data.campaigns.data)
  }

  more = async () => {
    this.setState({
      clicked: true
    })
    await this.props.getMore(this.state.page + 1)
    this.setState({
      more: this.props.savedMore,
      data: this.state.data.concat(this.props.savedMore),
      check: this.props.savedMore.next_page_url,
      page: this.state.page + 1,
      clicked: false
    })

    if (!this.props.loaded) {
      return Toast.show({
        text: "Error loading more",
        type: "danger"
      });
    }
  }

  render() {
    const { data } = this.state;
    let current = moment()
    return (
      <Container>
        {
          this.props.loading ? <Loader /> :
            <Content>
              {this.state.data.length < 1 ?
                <View style={styles.empty}>
                  <Text>Nothing to show</Text>
                </View> :
                <ScrollView contentContainerStyle={styles.campaignList}>
                  {data.map((data) => (
                    <CampaignCard
                      key={data.id}
                      image={require("../../../assets/campaignImg2.png")}
                      description={data.campaign.description}
                      amount={data.amount}
                      title={data.campaign.title}
                      left={moment(data.campaign.goal.end_date).diff(current, 'days')}
                      style={styles.mb2}
                      progress={data.campaign.amountRaised/data.campaign.goal.amount_to_raise}
                    />
                  ))}
                  {
                    this.state.check &&
                    <TouchableOpacity
                      onPress={this.more}
                      style={styles.more}
                    >
                      {
                        this.state.clicked ?
                          <Text style={styles.btnText}>Loading...</Text> :
                          <Text style={styles.btnText}>Show more</Text>
                      }
                    </TouchableOpacity>
                  }
                </ScrollView>
              }
            </Content>
        }
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getDonations: () => dispatch(getDonations()),
  getMore: (page) => dispatch(getDonationsMore(page))
});

const mapStateToProps = state => ({
  loading: state.campaign.loading,
  donations: state.campaign.donations,
  donationsMore: state.campaign.donationsMore,
  loaded: state.campaign.loaded,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Donations);

const styles = StyleSheet.create({
  campaignList: {
    paddingVertical: 32,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  mb2: {
    marginBottom: 16
  },
  more: {
    backgroundColor: COLORS.secondary,
    borderRadius: 6,
    marginTop: 10,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  btnText: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: "center"
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});