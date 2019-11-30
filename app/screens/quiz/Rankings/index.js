// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd30d7f956e1668b71957e8 
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Icon, List, ListItem, Left, Body, Thumbnail, } from 'native-base';
import { COLORS } from "../../../styles/colors";
import moment from "moment";

export default class Rankings extends Component {
    static navigationOptions = {
        headerTitle: "Rankings",
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerRight: <View />,
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
    };

    state = {
        rankings: []
    }

    async componentDidMount() {
        console.log(this.props.navigation.state.params.rankings)
        await this.setState({
            rankings: this.props.navigation.state.params.rankings
        })
    }

    render() {
        const { rankings } = this.state;
        return (
            <ScrollView>
                <View style={styles.top}>
                    <Text style={styles.topHeader}>{moment().format("MMM YYYY")}</Text>
                    <Text style={styles.topMain}>TIME LEFT</Text>
                    <View style={styles.timer}>
                        <Icon
                            name="alarm"
                            style={{ color: COLORS.textGrey, marginRight: 5 }}
                        />
                        <Text style={styles.topDesc}>1m 19h 7m and 12s</Text>
                    </View>
                </View>
                <View style={styles.scoreHeader}>
                    <Text style={styles.scoreHeaderText}>Score board</Text>
                </View>
                <View>
                    <List>
                        <ListItem avatar noBorder>
                            <Text style={styles.rank}>Rank</Text>
                            <Body>
                                <Text style={styles.rank}>Name</Text>
                            </Body>
                            <Text style={styles.score}>Score</Text>
                        </ListItem>
                    </List>
                    <List>
                        {rankings.map((rank, id) => (
                            <ListItem avatar noBorder style={styles.item} key={id}>
                                <Text style={styles.rankText}>{rank.rank}</Text>
                                <Left>
                                    <Thumbnail style={styles.rankThumb} source={require('../../../assets/quizImg2.png')} />
                                </Left>
                                <Body>
                                    <Text>{rank.user.firstname} {rank.user.lastname}</Text>
                                </Body>
                                <Text style={styles.rankScore}>{rank.score}</Text>
                            </ListItem>
                        ))}
                    </List>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center'
    },
    top: {
        alignItems: 'center',
        paddingTop: 30,
        marginBottom: 20
    },
    topHeader: {
        color: COLORS.primary,
        fontSize: 20,
        marginBottom: 5,
        textTransform: "uppercase"
    },
    topMain: {
        color: COLORS.textGrey,
        fontSize: 14,
        textAlign: 'center'
    },
    timer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 5
    },
    icon: {
        color: COLORS.textGrey,
        marginRight: 20
    },
    topDesc: {
        marginTop: 5,
        fontSize: 14,
        textAlign: 'center'
    },
    scoreHeader: {
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 6,
        marginBottom: 10
    },
    scoreHeaderText: {
        color: COLORS.white,
        fontSize: 18
    },
    item: {
        marginBottom: -12
    },
    rank: {
        color: COLORS.textGrey
    },
    score: {
        marginRight: 20,
        color: COLORS.textGrey
    },
    rankText: {
        marginLeft: 10
    },
    rankThumb: {
        width: 30,
        height: 30,
        marginLeft: 30,
        marginBottom: 10,
        marginRight: -8,
        borderRadius: 15
    },
    rankScore: {
        marginRight: 20
    }
});
