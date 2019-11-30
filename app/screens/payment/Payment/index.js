// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cd31236e1838d685cc7ecdd
import React, { Component } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Container, Toast, Text, Button } from 'native-base';
import { COLORS } from "../../../styles/colors";
import StripeCheckout from "expo-stripe-checkout";
import { connect } from "react-redux";
import { payment } from "../../../actions/quiz";
import { fetchUser } from "../../../actions/auth";
import { walletBalance } from "../../../actions/profile";
import { Loader } from "../../../components/common";

const win = Dimensions.get('window');

class Payment extends Component {
    static navigationOptions = {
        headerTitle: "Checkout",
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerRight: <View />,
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
    };

    state = {
        isChecked: false,
        payment: [],
        stripe: false,
        loading: false
    }

    async componentDidMount() {
        this.setState({
            loading: true
        })
        await this.props.getWalletBalance();
        await this.props.getUser();

        this.setState({
            walletBalance: this.props.wallet.wallet,
            loading: false
        })
    }

    stripePay = async () => {
        await this.props.paymentInit({ donation_amount: this.props.navigation.state.params.entry }, this.props.navigation.state.params.id);
        console.log(this.props.payment.public_key)
        this.setState({
            publicKey: this.props.payment.public_key,
            amount: this.props.payment.amount,
            stripe: true
        })
    }

    walletPay = async () => {
        if (this.props.navigation.state.params.entry > this.state.walletBalance) {
            return Toast.show({
                text: "Insufficient wallet balance",
                type: "danger"
            });
        }
        await this.props.paymentInit({ donation_amount: this.props.navigation.state.params.entry, walletpay: true }, this.props.navigation.state.params.id);
        Toast.show({
            text: "Thank you for your donation",
            type: "success"
        });
        this.props.navigation.navigate("home");
    }

    check = () => {
        this.setState({
            isChecked: !this.state.isChecked
        })
    }

    onSuccess = () => {
        Toast.show({
            text: "Thank you for your donation",
            type: "success"
        });
        this.props.navigation.navigate("home");
    }

    onClose = () => {
        this.props.navigation.navigate("home");
    }

    render() {
        const { user } = this.props
        return (
            this.state.loading ? <Loader /> :
            <Container>
                {
                    !this.state.stripe ?
                <View style={styles.main}>
                    <Text style={styles.text}>How would you like to pay?</Text>
                    <View style={styles.btnDiv}>
                        <Button style={styles.btn2} light onPress={this.walletPay}>
                            <Text style={styles.btnText}>Wallet</Text>
                        </Button>
                        <Button style={styles.btn3} light onPress={this.stripePay}>
                            <Text style={styles.btnText}>Stripe</Text>
                        </Button>
                    </View>
                </View> :
                    <StripeCheckout
                        publicKey={this.props.payment.public_key}
                        amount={Number(`${this.props.payment.amount}00`)}
                        imageUrl={this.props.navigation.state.params.img}
                        storeName="Stripe Checkout"
                        description={this.props.navigation.state.params.title}
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
    paymentInit: (data, id) => dispatch(payment(data, id)),
    getWalletBalance: () => dispatch(walletBalance()),
    getUser: () => dispatch(fetchUser()),
});

const mapStateToProps = state => ({
    loading: state.quiz.loading,
    payment: state.quiz.payment,
    wallet: state.profile.wallet,
    user: state.auth.user,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Payment);

const styles = StyleSheet.create({
    btnDiv: {
        marginBottom: 100,
        marginTop: 10
    },
    btn1: {
        backgroundColor: COLORS.tertiary,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        width: win.width / 1.4,
    },
    btn2: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        width: win.width / 1.4,
    },
    btn3: {
        backgroundColor: COLORS.secondary,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        width: win.width / 1.4,
    },
    btnText: {
        color: COLORS.white,
        fontSize: 18,
        textAlign: 'center'
    },
    main: {
        alignItems: 'center',
        marginTop: 30
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
    }
})
