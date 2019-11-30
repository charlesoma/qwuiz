// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd517aace9a42346caa0eee
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Card, CardItem, Body, Content } from 'native-base';
import { connect } from "react-redux";
import { gamesPlayed } from "../../../actions/profile";
import { Loader } from "../../../components/common";
import { COLORS } from "../../../styles/colors";
import moment from "moment";

class GamesWon extends Component {
    static navigationOptions = {
        headerTitle: "Games played",
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerRight: <View />,
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
    };

    state = {
        games: []
    }

    async componentDidMount() {
        await this.props.gamesPlayed()
        if (this.props.games !== null) {
            this.setState({
                games: this.props.games
            })
            console.log(this.props.games)
        }
    }

    render() {
        return (
            this.props.games === null ? <Loader /> :
                <Content>
                    {this.props.games.games.data.length < 1 ?
                        <View style={styles.empty}>
                            <Text>Nothing to show</Text>
                        </View> :
                        <ScrollView contentContainerStyle={styles.content}>
                            {
                                this.props.games.games.data.map((games, index) =>
                                    <Card style={styles.cardMain} key={index}>
                                        <CardItem style={styles.card}>
                                            <Body style={{ alignItems: 'center' }}>
                                                <View style={styles.cardBody}>
                                                    <View style={styles.timer}>
                                                        <Text style={styles.topDesc}>{moment(games.created_at).format("MMM D YYYY")}</Text>
                                                    </View>
                                                    <View style={styles.top}>
                                                        <Text style={styles.topHeader}>Rank: {games.rank}</Text>
                                                        <Text style={styles.topMain}>{games.campaign.title}</Text>
                                                    </View>
                                                    <View style={styles.imageDiv}>
                                                        <Image
                                                            source={require('../../../assets/quizImg2.png')}
                                                            style={styles.image}
                                                            resizeMode="cover"
                                                        />
                                                    </View>
                                                    <View style={styles.scoreDiv}>
                                                        <Text style={styles.text}>{games.campaign.amountRaised} / {games.campaign.goal.amount_to_raise}</Text>
                                                        <View style={styles.timer}>
                                                            <Image
                                                                source={require('../../../assets/cash.png')}
                                                                style={styles.cash}
                                                                resizeMode="cover"
                                                            />
                                                            <Text style={styles.amount}>{games.campaign.goal.entry_fee}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                {/* <TouchableOpacity style={styles.viewBtn} onPress={() => this.props.navigation.navigate('viewDetails')}>
                                <Text style={styles.viewText}>View Details</Text>
                            </TouchableOpacity> */}
                                            </Body>
                                        </CardItem>
                                    </Card>
                                )
                            }
                        </ScrollView>
                    }
                </Content>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    gamesPlayed: () => dispatch(gamesPlayed())
});

const mapStateToProps = state => ({
    loading: state.profile.loading,
    games: state.profile.games
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GamesWon);

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        padding: 40
    },
    cardMain: {
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 8,
        // borderBottomLeftRadius: 8,
        marginBottom: 20
    },
    card: {
        backgroundColor: COLORS.card,
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        // borderBottomRightRadius: 8,
        // borderBottomLeftRadius: 8,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
    },
    cardBody: {
        padding: 10
    },
    timer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'center'
    },
    icon: {
        color: COLORS.textGrey,
        marginRight: 5,
        textAlign: 'center'
    },
    topDesc: {
        marginTop: 5,
        fontSize: 14,
        textAlign: "center"
    },
    top: {
        alignItems: "center",
        paddingTop: 10,
        marginBottom: 15
    },
    topHeader: {
        color: COLORS.primary,
        fontSize: 20
    },
    topMain: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.textNormal
    },
    imageDiv: {
        alignItems: "center"
    },
    image: {
        height: 95,
        width: 130,
        borderRadius: 12
    },
    scoreDiv: {
        alignItems: "center",
        marginTop: 20
    },
    text: {
        color: COLORS.textGrey,
        fontSize: 16,
        marginBottom: 10
    },
    amount: {
        marginBottom: 10,
        marginTop: 5,
        marginLeft: 5
    },
    cash: {
        width: 30,
        height: 30
    },
    viewBtn: {
        backgroundColor: COLORS.primary,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    viewText: {
        fontSize: 18,
        color: COLORS.white
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
