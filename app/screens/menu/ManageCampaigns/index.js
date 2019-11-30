import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { connect } from "react-redux";
import { campaignActive, campaignActiveMore } from "../../../actions/campaign";
import {
    Container,
    Content,
    Text,
    Card,
    CardItem,
    // Image,
    Body,
    Badge,
    View,
    Button,
    Toast
} from 'native-base';
import { Loader } from "../../../components/common";

import { CampaignCard } from '../../../components/common'
import { COLORS } from '../../../styles/colors'
// import console = require('console');

const campaigns = [1, 2, 3, 4, 5, 6].map(num => {
    if (num % 2 == 0) {
        return require("../../../assets/campaignImg2.png");
    }
    return require("../../../assets/campaignImg1.png");
});

class manageCampaigns extends Component {
    state = {
        data: [],
        page: 1,
        clicked: false
    }

    async componentDidMount() {
        await this.props.getActive();
        this.setState({
            data: this.props.active.data,
            check: this.props.active.next_page_url
        })
        console.log(this.props.active.data)
    }

    static navigationOptions = {
        headerTitle: "Active Campaigns",
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerRight: <View />,
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
    };

    more = async () => {
        this.setState({
            clicked: true
        })
        await this.props.getMore(this.state.page + 1)
        this.setState({
            more: this.props.activeMore,
            data: this.state.data.concat(this.props.activeMore),
            check: this.props.activeMore.next_page_url,
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
        return (
            <Container>
                {this.props.loading ? <Loader /> :
                    <Content>
                        {this.state.data.length < 1 ?
                            <View style={styles.empty}>
                                <Text>Nothing to show</Text>
                            </View> :
                            <ScrollView contentContainerStyle={styles.campaignList}>
                                {
                                    this.state.data.map((item, index) =>
                                        <TouchableOpacity key={index} onPress={item.published === 0 ? () => this.props.navigation.navigate('campaignGoals', { id: item.id, strategy: item.strategy_id }) : () => console.log('Published')}>
                                            <Card style={styles.cardContainer}>
                                                <CardItem cardBody>
                                                    <Image style={styles.cardImg} resizeMode="cover" source={require("../../../assets/campaignImg2.png")} />
                                                </CardItem>
                                                <CardItem>
                                                    <Body>
                                                        <Text style={styles.campaignTitle}>{item.title}</Text>
                                                        <Text style={[styles.campaignInfo, styles.mb2]}>{item.description}</Text>
                                                        {
                                                            item.published === 0 &&
                                                            <Badge style={styles.timeLeftBadge} warning>
                                                                <Text style={styles.timeLeftText}>Unpublished</Text>
                                                            </Badge>
                                                        }
                                                        {
                                                            item.published === 1 &&
                                                            <Badge style={styles.timeLeftBadge} success>
                                                                <Text style={styles.timeLeftText}>Published</Text>
                                                            </Badge>
                                                        }
                                                        {
                                                            item.published === 0 &&
                                                            <Text style={styles.edit}>Edit campaign</Text>
                                                        }
                                                        {/* {
                                                            item.published === 1 &&
                                                            <Text style={styles.edit}>Manage campaign</Text>
                                                        } */}
                                                        <View style={styles.flexRow}>
                                                            <Text style={styles.campaignPrice}>Date created: </Text>
                                                            <Text style={styles.campaignPrice}> {item.created_at.split(' ')[0]} </Text>
                                                        </View>
                                                    </Body>
                                                </CardItem>
                                            </Card>
                                        </TouchableOpacity>
                                    )
                                }
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
    getActive: () => dispatch(campaignActive()),
    getMore: (page) => dispatch(campaignActiveMore(page))
});

const mapStateToProps = state => ({
    loading: state.campaign.loading,
    active: state.campaign.active,
    activeMore: state.campaign.activeMore,
    loaded: state.campaign.loaded,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(manageCampaigns);

const styles = StyleSheet.create({
    campaignList: {
        paddingVertical: 32,
        alignItems: "center"
    },
    mb2: {
        marginBottom: 16
    },
    cardContainer: {
        width: 300,
        overflow: "hidden",
        borderRadius: 12,
        marginRight: 16,
        elevation: 1,
        marginBottom: 20
    },
    cardImg: { width: "100%", height: 120 },
    alignItemsCenter: {
        alignItems: "center"
    },
    campaignTitle: {
        color: COLORS.textDark,
        fontSize: 14,
        fontWeight: "700",
        marginBottom: 16
    },
    campaignInfo: {
        color: COLORS.textNormal,
        fontWeight: "300",
        fontSize: 14,
        marginBottom: 8
    },
    timeLeftBadge: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        marginBottom: 16,
        borderRadius: 4
    },
    timeLeftText: {
        fontSize: 12,
        color: COLORS.textDark
    },
    mb1: {
        marginBottom: 8
    },
    mb2: {
        marginBottom: 16
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        padding: 0,
    },
    campaignPrice: {
        color: COLORS.textNormal,
        fontSize: 16
    },
    edit: {
        color: COLORS.secondary
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