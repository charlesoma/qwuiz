// single ==> https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd310006aa24f3490f996a2
// double ==> https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd310827a40b8038fa8b93f
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, BackHandler } from "react-native";
import { Icon, Button, Container } from 'native-base';
import { COLORS } from "../../../styles/colors";
import { Popup } from "../../../components/common"
import { connect } from "react-redux";
import { fetchUser } from "../../../actions/auth";
import { submitQuiz } from "../../../actions/quiz";
import { Loader } from "../../../components/common";
// import console = require("console");

const win = Dimensions.get('window');

class QuizResult extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            play: false,
            mode: props.navigation.getParam('mode', 'single')
        }
    }

    async componentDidMount() {
        await this.props.submitQuiz(this.props.navigation.state.params.id);
        await this.props.getUser();
        this.setState({
            score: this.props.response.data.score,
            entry: this.props.response.data.campaign.goal.entry_fee,
            rankings: this.props.response.data.rankings
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        return true;
    }

    showPlayModal = () => {
        this.setState({
            play: !this.state.play
        })
    }

    close = () => {
        this.props.navigation.navigate("home");
    }

    enterScore = async () => {
        await this.showPlayModal();
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        setTimeout(() => this.props.navigation.navigate("payment", {
            category: this.props.navigation.state.params.category,
            title: this.props.navigation.state.params.title,
            img: this.props.navigation.state.params.img,
            entry: this.props.response.data.campaign.goal.entry_fee,
            id: this.props.navigation.state.params.id
        }), 100);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    render() {
        const { score, entry } = this.state;
        const { user } = this.props;
        return (
            <Container>
                <TouchableOpacity onPress={this.close} style={styles.close}><Text style={styles.x}>&times;</Text></TouchableOpacity>
                {this.props.loading ? <Loader /> :
                    <ScrollView>
                        <View style={styles.top}>
                            <Text style={styles.topHeader}>{this.props.navigation.state.params.category}</Text>
                            <Text style={styles.topMain}>{this.props.navigation.state.params.title}</Text>
                        </View>
                        {
                            (this.state.mode === 'single') &&
                            <View>
                                <View style={styles.imageDiv}>
                                    <Image
                                        source={{ uri: this.props.navigation.state.params.img }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                    <Text style={styles.name}>{user ? `${user.firstname} ${user.lastname}` : "Guest"}{" "}</Text>
                                </View>
                                <View style={styles.scoreDiv}>
                                    <View style={styles.scoreBoard}>
                                        <Text style={styles.score}>{score}</Text>
                                    </View>
                                    <Text style={styles.scoreText}>Score</Text>
                                </View>
                            </View>
                        }
                        {
                            (this.state.mode === 'double') &&
                            <View>
                                <Text style={styles.announce}>YOU LOSE!</Text>
                                <View style={styles.doubleScoreBoard}>
                                    <Text style={styles.ownScore}>
                                        250
                        </Text>
                                    <Image
                                        source={require('../../../assets/quizImg2.png')}
                                        style={styles.ownImg}
                                        resizeMode="cover"
                                    />
                                    <Image
                                        source={require('../../../assets/icon.png')}
                                        style={styles.scoreIcon}
                                        resizeMode="cover"
                                    />
                                    <Image
                                        source={require('../../../assets/quizImg2.png')}
                                        style={styles.opponentImg}
                                        resizeMode="cover"
                                    />
                                    <Text style={styles.opponentScore}>
                                        300
                        </Text>
                                </View>
                                <Text style={styles.playerName}>Atenaga Collins VS Vivian Ross</Text>
                            </View>
                        }
                        <View style={styles.btnDiv}>
                            <Button style={styles.btn3} light onPress={this.showPlayModal}>
                                <Image
                                    source={require('../../../assets/play.png')}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                                <Text style={styles.btnText}>Play again</Text>
                            </Button>
                            <Button style={styles.btn2} light onPress={() => this.props.navigation.navigate("rankings", { rankings: this.state.rankings })}>
                                <Image
                                    source={require('../../../assets/rankings.png')}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                                <Text style={styles.btnText}>Current ranking</Text>
                            </Button>
                        </View>
                        <View style={styles.bottom}>
                            <View style={styles.flex}>
                                <View>
                                    <TouchableOpacity style={styles.column}>
                                        <Icon
                                            style={{ color: COLORS.textNormal }}
                                            name="share"
                                        />
                                        <Text style={styles.bottomText}>Share Result</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity style={styles.column}>
                                        <View style={styles.bottomImgDiv}>
                                            <Image
                                                source={require('../../../assets/quizImg2.png')}
                                                style={styles.bottomImg}
                                                resizeMode="cover"
                                            />
                                            <Text style={styles.question}>?</Text>
                                        </View>
                                        <Text style={styles.bottomText}>Challenge a Friend</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Popup isModalVisible={this.state.play} close={this.showPlayModal}>
                            <View style={styles.topModal}>
                                <Text style={styles.topHeaderModal}>Well done Champ</Text>
                            </View>
                            <View style={styles.imageDiv}>
                                <Image
                                    source={{ uri: this.props.navigation.state.params.img }}
                                    style={styles.imageModal}
                                    resizeMode="cover"
                                />
                            </View>
                            <ScrollView>
                                <View style={styles.modalTextDiv}>
                                    <Text style={styles.modalText}>{score} is an impressive score{"\n"}{"\n"}enter your result into a competition and win exciting prizes{"\n"}{"\n"}Entry Fee is ${entry}</Text>
                                </View>
                            </ScrollView>
                            <View style={styles.playBtnDiv}>
                                <TouchableOpacity style={styles.playBtn} onPress={this.enterScore}>
                                    <View style={styles.btnTextDiv}>
                                        <Text style={styles.playBtnText}>Enter score</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </Popup>
                    </ScrollView>
                }
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    submitQuiz: (id) => dispatch(submitQuiz(id)),
    getUser: () => dispatch(fetchUser()),
});

const mapStateToProps = state => ({
    user: state.auth.user,
    loading: state.quiz.loading,
    submitted: state.quiz.submitted,
    response: state.quiz.response,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuizResult);

const styles = StyleSheet.create({
    closeDiv: {
        marginTop: 30,
        display: 'flex'
    },
    click: {
        width: 30,
        height: 30
        // marginTop: 40,
        // marginLeft: 20,
    },
    close: {
        width: 30,
        height: 30,
        backgroundColor: COLORS.secondary,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.white,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10,
        alignSelf: 'center',
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 50,
    },
    x: {
        fontSize: 30,
        marginBottom: 5,
        fontWeight: 'bold',
        color: COLORS.white
    },
    top: {
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 80
    },
    topHeader: {
        color: COLORS.primary,
        fontSize: 20,
        marginBottom: 7
    },
    topMain: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: COLORS.textNormal
    },
    imageDiv: {
        alignItems: 'center'
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5
    },
    scoreDiv: {
        alignItems: 'center'
    },
    scoreBoard: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: COLORS.tertiary,
        borderRadius: 8,
        marginTop: 10
    },
    score: {
        fontSize: 25,
        fontWeight: 'bold',
        color: COLORS.white
    },
    scoreText: {
        fontSize: 16,
        color: COLORS.textNormal,
        marginTop: 5
    },
    btnDiv: {
        marginBottom: 40,
        marginTop: 20,
    },
    btn2: {
        backgroundColor: COLORS.secondary,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        width: win.width / 1.4,
        alignSelf: 'center'
    },
    btn3: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        width: win.width / 1.4,
        alignSelf: 'center'
    },
    btnText: {
        color: COLORS.white,
        fontSize: 18,
        textAlign: 'center'
    },
    icon: {
        width: 12,
        height: 12,
        marginRight: 10,
        marginTop: 2
    },
    bottom: {
        backgroundColor: COLORS.bgLightYellow,
        paddingBottom: 100
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'space-between'
    },
    bottomImg: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    bottomText: {
        color: COLORS.textNormal,
        fontSize: 16,
        marginTop: 8
    },
    column: {
        alignItems: 'center'
    },
    bottomImgDiv: {
        display: 'flex',
        flexDirection: 'row'
    },
    question: {
        color: COLORS.primary,
        fontSize: 16,
        marginLeft: 3,
        marginTop: -5,
        fontWeight: 'bold'
    },
    doubleScoreBoard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    ownScore: {
        fontSize: 25,
        color: COLORS.textRed,
    },
    announce: {
        textAlign: 'center',
        fontSize: 40,
        color: COLORS.textRed,
        fontWeight: 'bold',
        marginBottom: 20
    },
    ownImg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: COLORS.textRed
    },
    scoreIcon: {
        width: 30,
        height: 30
    },
    opponentImg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: COLORS.textGreen
    },
    opponentScore: {
        fontSize: 25,
        color: COLORS.textGreen
    },
    playerName: {
        textAlign: 'center',
        marginTop: 5
    },
    topModal: {
        alignItems: 'center',
        marginBottom: 15
    },
    topHeaderModal: {
        color: COLORS.primary,
        fontSize: 18,
    },
    imageDiv: {
        alignItems: 'center',
        marginBottom: 15
    },
    imageModal: {
        height: 95,
        width: 120,
        borderRadius: 12
    },
    playBtnDiv: {
        width: '100%',
        marginTop: 20
    },
    playBtn: {
        backgroundColor: COLORS.primary,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    playBtnText: {
        color: COLORS.white,
        fontSize: 18
    },
    modalTextDiv: {
        paddingLeft: 50,
        paddingRight: 50
    },
    modalText: {
        color: COLORS.textGrey,
        fontSize: 16,
        textAlign: 'center'
    }
});
