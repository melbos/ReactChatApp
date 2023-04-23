import { useEffect, useState } from "react";
import "./App.css";
import Messages from "./components/Messages";
import Input from "./components/Input";
import randomName from "./helpers/RandomUser";
import randomColor from "./helpers/RandomColor";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });

  const [drone, setDrone] = useState();

  useEffect(() => {
    const drone = new window.Scaledrone(process.env.REACT_APP_CHANNEL_ID, {
      data: member,
    });
    setDrone(drone);
  }, [member]);

  useEffect(() => {
    if (drone) {
      drone.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        member.id = drone.clientId;
        console.log("Successfully connected to Scaledrone");
        setMember(member);
      });
      const room = drone.subscribe("observable-room");
      room.on("data", (data, member) => {
        setMessages((prevArray) => [...prevArray, { member, text: data }]);
      });
    }
  }, [drone, member]);

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>React Chat @ Algebra</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
};
export default App;
