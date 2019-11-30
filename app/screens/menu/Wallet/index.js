// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd5172b18e9f734ae12dfb6
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ScrollView, KeyboardAvoidingView, WebView } from "react-native";
import { Button, Form, Label, Input, Item, Container, Toast } from 'native-base';
import { COLORS } from "../../../styles/colors";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import { profile, walletTopup, walletBalance } from "../../../actions/profile";
import { fetchUser } from "../../../actions/auth";
import { Loader } from "../../../components/common";
import StripeCheckout from "expo-stripe-checkout"

const win = Dimensions.get("window");

class Wallet extends Component {
    static navigationOptions = {
        headerTitle: "Wallet",
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
        headerRight: <View />
    };

    state = {
        loading: false,
        topup: false,
        payment: false
    }

    async componentDidMount() {
        this.setState({
            loading: true
        })
        await this.props.getProfile()
        await this.props.getUser();
        await this.props.getWalletBalance();

        this.setState({
            firstname: this.props.profile.user.firstname,
            lastname: this.props.profile.user.lastname,
            defaultPic: this.props.profile.defaultPic,
            walletBalance: this.props.wallet.wallet,
            loading: false
        })
    }

    handleTopup = () => {
        this.setState({
            topup: !this.state.topup
        })
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handlePayment = async () => {
        const { amount } = this.state;
        if (!amount) {
            return Toast.show({
                text: "Amount field cannot be empty",
                type: "danger"
            });
        }

        if (amount < 5) {
            return Toast.show({
                text: "Topup amount is $5 minimum",
                type: "danger"
            });
        }

        await this.props.walletTopup({ top_up_amount: Number(amount) });
        this.setState({
            publicKey: this.props.walletRes.public_key
        })
        console.log(this.props.walletRes)
        console.log(this.state.publicKey)

        if (this.props.topup) {
            return this.setState({
                payment: true
            })
        }

        // if it hasn't returned, then authentication failed
        Toast.show({
            text: "An error occured",
            type: "danger"
        });
    };

    onSuccess = () => {
        this.setState({
            payment: false,
            topup: false
        })
        Toast.show({
            text: "Wallet topup successful",
            type: "success"
        });
        this.componentDidMount()
    }

    onClose = () => {
        console.log('closed')
        this.setState({
            payment: false,
            topup: false
        })
    }

    render() {
        const { user } = this.props;

        return (
            this.props.loading || this.state.loading ? <Loader /> :
                <Container>
                    {
                        !this.state.payment ?
                            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps={'handled'}>
                                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={60}>
                                    <View style={styles.imageDiv}>
                                        <Image
                                            source={this.props.profile.user.profile.media ? { uri: this.props.profile.user.profile.media.url } : require("../../../assets/user.png")}
                                            style={styles.image}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={styles.textDiv}>
                                        <Text style={styles.name}>
                                            {user.firstname} {user.lastname}
                                        </Text>
                                        <Text style={styles.balanceText}>
                                            Total Cash
                                </Text>
                                        <Text style={styles.balance}>
                                            ${this.state.walletBalance}
                                        </Text>
                                    </View>
                                    <View style={styles.btns}>
                                        <Button
                                            onPress={this.handleTopup}
                                            style={styles.btn1}
                                        >
                                            <Text style={styles.btnText}>Topup</Text>
                                        </Button>
                                        <Button
                                            onPress={() => this.props.navigation.navigate("home")}
                                            style={styles.btn2}
                                        >
                                            <Text style={styles.btnText}>Donate</Text>
                                        </Button>
                                    </View>
                                    {
                                        this.state.topup &&
                                        <View style={styles.inputDiv}>
                                            <Text style={styles.topupText}>Top up amount (min: $5)</Text>
                                            <Item regular style={styles.input}>
                                                <View style={styles.currency}>
                                                    <Text style={styles.currencyText}>$</Text>
                                                    <Text style={styles.currencyTextSmall}>USD</Text>
                                                </View>
                                                <Input
                                                    placeholder='$5'
                                                    placeholderTextColor={COLORS.placeholder}
                                                    onChangeText={text => this.handleChange("amount", text)}
                                                // value={this.state.amount}
                                                />
                                            </Item>
                                            <Button
                                                onPress={this.handlePayment}
                                                style={styles.btn3}
                                            >
                                                <Text style={styles.btnText}>Continue</Text>
                                            </Button>
                                        </View>
                                    }
                                </KeyboardAvoidingView>
                            </ScrollView> :
                            <StripeCheckout
                                publicKey={this.state.publicKey}
                                amount={Number(`${this.state.amount}00`)}
                                imageUrl={this.props.profile.user.profile.media ? this.props.profile.user.profile.media.url : this.state.defaultPic}
                                storeName="Stripe Checkout"
                                description={'Wallet Topup'}
                                currency="USD"
                                allowRememberMe={false}
                                prepopulatedEmail={user.email}
                                onClose={this.onClose}
                                onPaymentSuccess={this.onSuccess}
                                style={{ flex: 1 }}
                            />
                    }
                </Container>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(profile()),
    getUser: () => dispatch(fetchUser()),
    getWalletBalance: () => dispatch(walletBalance()),
    walletTopup: (data) => dispatch(walletTopup(data))
});

const mapStateToProps = state => ({
    loading: state.profile.loading,
    profile: state.profile.profile,
    wallet: state.profile.wallet,
    topup: state.profile.topup,
    walletRes: state.profile.walletRes,
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Wallet);

const styles = StyleSheet.create({
    content: {
        alignItems: 'center'
    },
    imageDiv: {
        alignItems: 'center',
        paddingTop: 50,
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    changeProfilePic: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: COLORS.secondary,
        justifyContent: "center",
        alignItems: "center",
        marginTop: -25
    },
    icon: {
        color: COLORS.white
    },
    textDiv: {
        marginTop: 15
    },
    topupText: {
        marginTop: 20,
        textAlign: "center"
    },
    name: {
        textAlign: "center",
        fontSize: 24
    },
    balanceText: {
        textAlign: "center",
        fontSize: 22,
        color: COLORS.primary,
        marginTop: 10,
    },
    balance: {
        textAlign: "center",
        marginTop: 15,
        fontWeight: 'bold',
        fontSize: 30
    },
    inputDiv: {
        width: win.width / 1.3,
    },
    input: {
        backgroundColor: COLORS.white,
        borderRadius: 5,
        borderWidth: 0,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: COLORS.shadowColor,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    currency: {
        backgroundColor: COLORS.secondary,
        height: '100%',
        width: 60,
        alignItems: 'center',
        paddingTop: 3,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5
    },
    currencyText: {
        color: COLORS.white,
        fontSize: 20,
        fontWeight: 'bold'
    },
    currencyTextSmall: {
        color: COLORS.white,
        fontSize: 10
    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 5
    },
    btn1: {
        backgroundColor: COLORS.primary,
        borderRadius: 6,
        width: 80,
        marginRight: 10,
        justifyContent: 'center'
    },
    btn2: {
        backgroundColor: COLORS.secondary,
        borderRadius: 6,
        width: 80,
        marginLeft: 10,
        justifyContent: 'center'
    },
    btn3: {
        backgroundColor: COLORS.primary,
        borderRadius: 6,
        width: 100,
        marginRight: 10,
        justifyContent: 'center',
        marginBottom: 40,
        marginTop: 20,
        alignSelf: 'center'
    },
    btnText: {
        color: COLORS.white,
        fontSize: 18,
        textAlign: "center"
    },
});

