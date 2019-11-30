// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd517c46023e067a820897b
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { List, ListItem, Body, Left, Thumbnail } from 'native-base';
import { COLORS } from "../../../styles/colors";

export default class ViewDetails extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerTintColor: COLORS.textWhite,
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.main}>
                    <View style={styles.timer}>
                        <Text style={styles.topDesc}>May 4, 2019</Text>
                    </View>
                    <View style={styles.top}>
                        <Text style={styles.topHeader}>ENGLISH</Text>
                        <Text style={styles.topMain}>Spelling Quizz</Text>
                    </View>
                    <View style={styles.imageDiv}>
                        <Image
                            source={require('../../../assets/user.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.textDiv}>
                        <Text style={styles.name}>
                            Atenaga Collins
                    </Text>
                    </View>
                </View>
                <View style={styles.details}>
                    <View style={styles.scoreDiv}>
                        <View style={styles.scoreBox}>
                            <Text style={styles.figure}>350</Text>
                        </View>
                        <Text style={styles.text}>score</Text>
                    </View>
                    <View style={styles.winDiv}>
                        <View style={styles.winBox}>
                            <Text style={styles.figure}>$10</Text>
                        </View>
                        <Text style={styles.text}>winnings</Text>
                    </View>
                </View>
                <View style={styles.scoreHeader}>
                    <Text style={styles.scoreHeaderText}>Score board</Text>
                </View>
                <View style={styles.scores}>
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
                        <ListItem avatar noBorder style={styles.item}>
                            <Text style={styles.rankText}>1</Text>
                            <Left>
                                <Thumbnail style={styles.rankThumb} source={require('../../../assets/quizImg2.png')} />
                            </Left>
                            <Body>
                                <Text>Vian Blakeman</Text>
                            </Body>
                            <Text style={styles.rankScore}>450</Text>
                        </ListItem>
                        <ListItem avatar noBorder>
                            <Text style={styles.rankText}>2</Text>
                            <Left>
                                <Thumbnail style={styles.rankThumb} source={require('../../../assets/quizImg2.png')} />
                            </Left>
                            <Body>
                                <Text>Strivia Scott</Text>
                            </Body>
                            <Text style={styles.rankScore}>420</Text>
                        </ListItem>
                    </List>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        padding: 15
    },
    timer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'center'
    },
    topDesc: {
        fontSize: 14,
        textAlign: "center"
    },
    top: {
        alignItems: "center",
        paddingTop: 15,
        marginBottom: 15
    },
    topHeader: {
        color: COLORS.primary,
        fontSize: 20
    },
    topMain: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.textNormal
    },
    imageDiv: {
        alignItems: 'center',
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 12
    },
    textDiv: {
        marginTop: 20
    },
    name: {
        textAlign: "center",
        fontSize: 24
    },
    scoreHeader: {
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 6,
        marginBottom: 10,
        width: '100%'
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
        marginRight: -8
    },
    rankScore: {
        marginRight: 20
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 20
    },
    scoreDiv: {
        alignItems: "center",
        marginRight: 5
    },
    winDiv: {
        alignItems: "center",
        marginLeft: 5
    },
    scoreBox: {
        backgroundColor: COLORS.tertiary
    },
    winBox: {
        backgroundColor: COLORS.secondary
    },
    figure: {
        color: COLORS.white,
        fontSize: 35,
        fontWeight: 'bold',
        paddingLeft: 20,
        paddingRight: 20
    }, 
    text: {
        marginTop: 10,
        color: COLORS.textNormal
    },
    scores: {
        marginBottom: 50
    }
});
