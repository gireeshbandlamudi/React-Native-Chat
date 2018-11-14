import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

class ChatBubble extends Component {
  render() {
    return (
        <View
          style={[{justifyContent: "center",marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 20, }, this.props.bubbleType === 'left' ? {alignItems: 'flex-end'} : {alignItems: 'flex-start',}]}
        >
          <View style={styles.talkBubble}>
            <View
              style={[
                styles.talkBubbleSquare,
                { justifyContent: "center", alignItems: "center" },
                this.props.bubbleType === 'left' ? {backgroundColor: "#3498db",} : {backgroundColor: "#34495e",}
              ]}
            >
              <Text style={{ color: "#ffffff", fontSize: 20, padding: 10 }}>
                {this.props.msg}
              </Text>
            </View>
            <View style={ this.props.bubbleType === 'left' ? styles.talkBubbleTriangleRight : styles.talkBubbleTriangleLeft} />
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  talkBubble: {
    backgroundColor: "transparent"
  },
  talkBubbleSquare: {
    width: 280,
    // height: 80,
    flex: 1,
    // backgroundColor: "#3498db",
    borderRadius: 10
  },
  talkBubbleTriangleRight: {
    position: "absolute",
    right: -20,
    top: 10,
    width: 0,
    height: 0,
    borderTopColor: "transparent",
    borderTopWidth: 13,
    borderLeftWidth: 26,
    borderLeftColor: "#3498db",
    borderBottomWidth: 13,
    borderBottomColor: "transparent"
  },
  talkBubbleTriangleLeft: {
    position: "absolute",
    left: -20,
    top: 10,
    width: 0,
    height: 0,
    borderTopColor: "transparent",
    borderTopWidth: 13,
    borderRightWidth: 26,
    borderRightColor: "#34495e",
    borderBottomWidth: 13,
    borderBottomColor: "transparent"
  }
});

export default ChatBubble;
