import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";

import * as axios from "axios";

import ChatBubble from "./chatBubble";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatData: [
        {
          msg: "Hello, Welcome!!! I am Gireesh Bandlamudi. Don't panic you are chatting with my spirit. \n\nA piece of advice give respect.",
          type: "from"
        }
      ],
      msgInput: ""
    };
  }

  componentDidMount(){
    this.queryText.focus();
  }

  // Code to handle return key press.
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.sendMessage();
    }
  }

  //Code to handle to sendMessage
  sendMessage = () => {
    // console.log(this.state.msgInput);
    if (this.state.msgInput !== "") {
      var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer ad88fd304469481cbebd9bff06b4154b"
      };

      //Code to make ajax call to dialog flow
      axios
        .post(
          "https://api.dialogflow.com/v1/query?v=20150910",
          {
            lang: "en",
            query: this.state.msgInput,
            sessionId: "12345"
          },
          { headers: headers }
        )
        .then(response => {
          // console.log(response.data);
          this.setState({
            chatData: this.state.chatData.concat({
              msg: response.data.result.fulfillment.speech,
              type: "from"
            }),
            msgInput: ""
          }, ()=> {
            setTimeout(() => {
              this.scrollView.scrollToEnd({ animated: true });
            }, 100);
          });
        });

      setTimeout(() => {
        //Code to set the users typed text to DOM.
        this.setState({
          chatData: this.state.chatData.concat({
            msg: this.state.msgInput,
            type: "to"
          }),
          msgInput: ""
        });
        this.scrollView.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View
          style={{
            width: "100%",
            height: 80,
            backgroundColor: "#e67e22",
            padding: 10,
            flexDirection: "row",
            justifyContent: "flex-start"
          }}
        >
          <Image
            style={{ width: 50, height: 50 }}
            source={require("./images/ghost.png")}
          />
          <View style={{justifyContent: 'center', alignItems: 'center', padding: 10,}}> 
            <Text style={{fontSize: 25, color: '#ffffff', fontWeight: 'bold',}}>I'm GIREESH BANDLAMUDI</Text>
          </View>
        </View>
        <ScrollView
          ref={scrollView => (this.scrollView = scrollView)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true });
          }}
        >
          {this.state.chatData.map((item, index) => {
            return (
              <ChatBubble
                key={index}
                bubbleType={item.type === "from" ? "right" : "left"}
                msg={item.msg}
              />
            );
          })}
        </ScrollView>

        <View
          style={{
            width: "100%",
            height: 60,
            backgroundColor: "#bdc3c7",
            flexDirection: "row"
          }}
        >
          <TextInput
            ref={(input) => { this.queryText = input; }}
            placeholder="Please type your query here"
            onChangeText={text => {
              this.setState({ msgInput: text });
            }}
            value={this.state.msgInput}
            style={{
              width: "80%",
              padding: 10,
              backgroundColor: "#ecf0f1",
              fontSize: 20
            }}
            onSubmitEditing={this._handleKeyDown}
          />
          <TouchableOpacity
            style={{
              height: "auto",
              width: "20%",
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              this.sendMessage();
            }}
          >
            <Text
              style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default App;
