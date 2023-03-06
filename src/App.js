import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";

function randomName() {
  const adjectives = [
    "Ana",
    "Anamarija",
    "Branka",
    "Bojana",
    "Ante",
    "Andrej",
    "Bruno",
    "Darko",
    "Dajana",
    "Franko",
    "Floria",
    "Goran",
    "Hrvoje",
    "Ivona",
    "Ivana",
    "Maja",
    "Marko",
    "Mia",
    "Lucija",
    "Nika",
    "Ema",
    "Sara",
    "Marta",
    "Eva",
    "Petra",
    "Elena",
    "Marija",
    "Rita",
    "Mila",
    "Lana",
    "Klara",
    "Laura",
    "Luka",
    "David",
    "Petar",
    "Jakov",
    "Ivan",
    "Matej",
    "Leon",
    "Mateo",
    "Mihael",
    "Filip",
    "Borna",
    "Karlo",
    "Fran",
    "Josip",
    "Lovro",
    "Noa",
    "Niko",
    "Gabriel",
    "Vito",
    "Tomas",
    "Jan",
    "Roko",
    "Lara",
    "Katja",
    "Tena",
    "Lena",
    "Maša",
    "Una",
    "Vita",
    "Sofia",
    "Korina",
    "Tin",
  ];
  const nouns = [
    " Voda",
    " Rijeka",
    " Lipa",
    " Mjesec",
    " Kiša",
    " Vjetar",
    " More",
    " Jutro",
    " Snijeg",
    " Jezero",
    " Sunce",
    " Bor",
    " Sjena",
    " List",
    " Zora",
    " Sjaj",
    " Šuma",
    " Brdo",
    " Planina",
    " Oblak",
    " Ptica",
    " Konj",
    " Knjiga",
    " Lisac",
    " Leptir",
    " Grm",
    " Prašina",
    " Polje",
    " Vatra",
    " Cvijet",
    " Ruža",
    " Konjic",
    " Lav",
    " Trava",
    " Munja",
    " Dan",
    " Noć",
    " Tama",
    " Pahuljica",
    " Tišina",
    " Glas",
    " Glazba",
    " Nebo",
    " Oblik",
    " Lotus",
    " Drvo",
    " Pero",
    " Stablo",
    " Tigar",
    " Pjetao",
    " Zec",
    " Trešnja",
    " Dunja",
    " San",
    " Žaba",
    " Magla",
    " Dim",
    " Zvijezda",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor(),
    },
  };

  constructor() {
    super();
    this.drone = new window.Scaledrone("NMfBD5CvH8KY6q23", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

export default App;
