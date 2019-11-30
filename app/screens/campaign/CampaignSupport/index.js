// https://app.zeplin.io/project/5cd2a8f838bfb567f0e80e20/screen/5cf154651d29b51dc29bde6e
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, CheckBox, Item, Input, Textarea, Toast, Container } from 'native-base';
import { COLORS } from "../../../styles/colors";
import { connect } from "react-redux";
import { donate } from "../../../actions/campaign";
import { fetchUser } from "../../../actions/auth";
import { walletBalance } from "../../../actions/profile";
import { Loader } from "../../../components/common";
import StripeCheckout from "expo-stripe-checkout";
// import console = require("console");

const win = Dimensions.get('window');

class CampaignSupport extends Component {
    static navigationOptions = {
        headerTitle: null,
        headerStyle: {
            backgroundColor: COLORS.tertiary,
            color: COLORS.white
        },
        headerRight: <View />,
        headerTintColor: COLORS.textWhite,
        headerTitleStyle: { flex: 1, color: COLORS.white, textAlign: "center" },
    };

    async componentDidMount() {
        await this.props.getUser();
        await this.props.getWalletBalance();
        this.setState({
            walletBalance: this.props.wallet.wallet,
            loading: false
        })
    }

    state = {
        isChecked1: false,
        isChecked2: false,
        isChecked3: false,
        isChecked4: false,
        anonymous: 0,
        stripe: false,
        clicked: false,
        loading: true
    }

    check1 = () => {
        this.setState({
            isChecked1: !this.state.isChecked1,
            isChecked2: false
        })
    }

    check2 = () => {
        this.setState({
            isChecked2: !this.state.isChecked2,
            isChecked1: false
        })
    }

    check = () => {
        this.setState({
            isChecked3: !this.state.isChecked3,
        })
    }

    checkWallet = () => {
        this.setState({
            isChecked4: !this.state.isChecked4,
        })
    }

    handleDonate = async () => {
        this.setState({
            clicked: true
        })

        if (this.state.isChecked3 === false) {
            this.setState({
                anonymous: 0
            })
        } else if (this.state.isChecked3 === true) {
            this.setState({
                anonymous: 1
            })
        }

        const { amount, comment, anonymous } = this.state;
        if (!amount) {
            this.setState({
                clicked: false
            })
            return Toast.show({
                text: "Amount field cannot be empty",
                type: "danger"
            });
        }

        if (amount < Number(this.props.navigation.state.params.entry)) {
            this.setState({
                clicked: false
            })
            return Toast.show({
                text: `Entry minimum is $${this.props.navigation.state.params.entry}`,
                type: "danger"
            });
        }

        if (this.state.isChecked4 === true) {
            if (Number(amount) > Number(this.state.walletBalance)) {
                this.setState({
                    clicked: false
                })
                return Toast.show({
                    text: "Insufficient wallet balance",
                    type: "danger"
                });
            } else {
                await this.props.donate({ donation_amount: amount, donation_comment: comment, anonymous: anonymous, walletPay: 1 }, this.props.navigation.state.params.id);
                if (this.props.donated) {
                    this.setState({
                        clicked: false
                    })
                    Toast.show({
                        text: `Thank you for your donation of $${this.state.amount}`,
                        type: "success"
                    });
                    return this.props.navigation.navigate("home");
                }
            }
        } else {
            await this.props.donate({ donation_amount: amount, donation_comment: comment, anonymous: anonymous }, this.props.navigation.state.params.id);
            if (this.props.donated) {
                return this.setState({
                    publicKey: this.props.donation.public_key,
                    stripe: true,
                    clicked: false
                })
            }
        }

        this.setState({
            clicked: false
        })
        Toast.show({
            text: "An error occured",
            type: "danger"
        });
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    onSuccess = () => {
        Toast.show({
            text: `Thank you for your donation of $${this.state.amount}`,
            type: "success"
        });
        this.props.navigation.navigate("home");
    }

    onClose = () => {
        this.setState({
            stripe: false
        })
    }

    render() {
        const { user } = this.props;
        return (
            this.state.loading ? <Loader /> :
                <Container>
                    {
                        !this.state.stripe ?
                            <ScrollView contentContainerStyle={styles.content}>
                                <View style={styles.topDiv}>
                                    <View style={styles.textDiv}>
                                        <Text style={styles.topDivText}>Make your donation</Text>
                                    </View>
                                    <View style={styles.check}>
                                        <View style={styles.checkDiv}>
                                            <CheckBox checked={this.state.isChecked1} onPress={this.check1} color={this.state.isChecked1 ? COLORS.textGreen : COLORS.textGrey} style={styles.CheckBox} />
                                            <Text style={styles.checkText}>Cash donation</Text>
                                        </View>
                                        <View style={styles.checkDiv}>
                                            <CheckBox checked={this.state.isChecked2} onPress={this.check2} color={this.state.isChecked2 ? COLORS.textGreen : COLORS.textGrey} style={styles.CheckBox} />
                                            <Text style={styles.checkText}>Campaign Quizz</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.donateDiv}>
                                    <Text>Enter your donation</Text>
                                    <Item regular style={styles.input}>
                                        <View style={styles.currency}>
                                            <Text style={styles.currencyText}>$</Text>
                                            <Text style={styles.currencyTextSmall}>USD</Text>
                                        </View>
                                        <Input
                                            placeholder='Enter amount'
                                            placeholderTextColor={COLORS.placeholder}
                                            onChangeText={text => this.handleChange("amount", text)}
                                            value={this.state.amount}
                                        />
                                    </Item>
                                    <Text style={styles.walletText}>You have <Text style={styles.green}>${this.state.walletBalance}</Text> in your wallet</Text>
                                    {
                                        this.state.walletBalance > 0 &&
                                        <View style={styles.checkDivWallet}>
                                            <CheckBox checked={this.state.isChecked4} onPress={this.checkWallet} color={COLORS.formGrey} style={styles.endCheckBox} />
                                            <Text style={styles.checkTextWallet}>Pay from wallet</Text>
                                        </View>
                                    }
                                    <Text style={styles.smallText}>OctoCrowd has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.</Text>
                                    {
                                        this.state.amount > 0 &&
                                        <View style={styles.thanksDiv}>
                                            <Text style={styles.thanksText}>Thank you for the generous tip of</Text>
                                            <View style={styles.amountDiv}>
                                                <Text style={styles.total}>Total: ${this.state.amount}</Text>
                                            </View>
                                        </View>
                                    }
                                </View>
                                <View style={styles.inputDiv}>
                                    <Text style={styles.label}>Leave a comment</Text>
                                    <Textarea style={styles.textArea}
                                        rowSpan={5}
                                        bordered
                                        placeholder="Enter a comment"
                                        placeholderTextColor={COLORS.placeholder}
                                        onChangeText={text => this.handleChange("comment", text)}
                                    />
                                    <View style={styles.checkDiv}>
                                        <CheckBox checked={this.state.isChecked3} onPress={this.check} color={COLORS.formGrey} style={styles.endCheckBox} />
                                        <Text style={styles.checkText}>Hide name and comment from everyone but the organizer</Text>
                                    </View>
                                </View>
                                <View style={styles.btnDiv}>
                                    <Button onPress={this.handleDonate} style={styles.btn} light >
                                        {
                                            !this.state.clicked ?
                                                <Text style={styles.btnText}>Continue</Text> :
                                                <Text style={styles.btnText}>Loading...</Text>
                                        }
                                    </Button>
                                </View>
                            </ScrollView> :
                            <StripeCheckout
                                publicKey={this.state.publicKey}
                                amount={Number(`${this.state.amount}00`)}
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
    donate: (data, id) => dispatch(donate(data, id)),
    getUser: () => dispatch(fetchUser()),
    getWalletBalance: () => dispatch(walletBalance()),
});

const mapStateToProps = state => ({
    loading: state.campaign.loading,
    user: state.auth.user,
    donated: state.campaign.donated,
    donation: state.campaign.donation,
    wallet: state.profile.wallet,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignSupport);

const styles = StyleSheet.create({
    content: {
    },
    topDiv: {
        padding: 30
    },
    textDiv: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.placeholder
    },
    topDivText: {
        fontSize: 18,
        color: COLORS.text,
        marginBottom: 10
    },
    check: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    checkDiv: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    CheckBox: {
        borderRadius: 15,
        paddingLeft: 7,
        width: 30,
        height: 30,
        fontSize: 20,
        lineHeight: 38,
        paddingTop: 5,
        marginLeft: -10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1
    },
    checkText: {
        fontSize: 12,
        color: COLORS.textGrey,
        marginLeft: 20
    },
    donateDiv: {
        backgroundColor: COLORS.greyBgLight,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30
    },
    input: {
        backgroundColor: COLORS.white,
        borderRadius: 5,
        borderWidth: 0,
        marginTop: 10,
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
    smallText: {
        fontSize: 10,
        color: COLORS.textGrey,
        marginTop: 10
    },
    thanksDiv: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    thanksText: {
        fontSize: 10,
        color: COLORS.textGrey
    },
    amountDiv: {
        backgroundColor: COLORS.bgLightYellow,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    amountText: {
        fontSize: 12
    },
    total: {
        fontSize: 12,
        marginTop: 5,
        color: COLORS.textGrey,
        textAlign: 'right'
    },
    inputDiv: {
        width: '100%',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30
    },
    textArea: {
        width: win.width / 1.2,
        borderColor: COLORS.formGrey,
        borderTopWidth: 1.5,
        borderBottomWidth: 1.5,
        borderLeftWidth: 1.5,
        borderRightWidth: 1.5,
        marginBottom: 15,
        padding: 5
    },
    label: {
        marginBottom: 5,
        color: COLORS.text
    },
    endCheckBox: {
        marginLeft: -10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        paddingLeft: 2
    },
    btnDiv: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 30
    },
    btn: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        width: '90%',
        marginTop: 40,
        marginBottom: 40,
        alignSelf: 'center'
    },
    btnText: {
        color: COLORS.white,
        fontSize: 18,
        textAlign: 'center'
    },
    walletText: {
        marginTop: 5
    },
    green: {
        color: COLORS.textGreen
    },
    checkDivWallet: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    checkTextWallet: {
        fontSize: 10,
        color: COLORS.textGrey,
        marginLeft: 20
    },
});

