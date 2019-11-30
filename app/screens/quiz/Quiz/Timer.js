import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { CountDownText } from 'react-native-countdown-timer-text';

import { COLORS } from "../../../styles/colors";

export default class Timer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            time: 180,
            // time: 1
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.time === nextState.time) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <CountDownText
                style={styles.timerText}
                countType='date'
                auto={true}
                afterEnd={this.props.end}
                timeLeft={this.state.time}
                step={-1}
                startText=''
                endText='00:00'
                intervalText={(date, hour, min, sec) => min + ':' + sec}
            />
        );
    }
}

const styles = StyleSheet.create({
    timerText: {
        color: COLORS.textWhite,
        fontSize: 10,
        textAlign: "center"
    },
});
