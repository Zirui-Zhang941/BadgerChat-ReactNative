import { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import CS571 from '@cs571/mobile-client'
import * as SecureStore from 'expo-secure-store';
import BadgerChatroomScreen from './screens/BadgerChatroomScreen';
import BadgerRegisterScreen from './screens/BadgerRegisterScreen';
import BadgerLoginScreen from './screens/BadgerLoginScreen';
import BadgerLandingScreen from './screens/BadgerLandingScreen';
import BadgerLogoutScreen from './screens/BadgerLogoutScreen';
import BadgerConversionScreen from './screens/BadgerConversionScreen';
const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [isguest,setIsGuest]=useState(false);
  useEffect(() => {
    fetch("https://cs571.org/api/s24/hw9/chatrooms",{
      method:"Get",
      headers:{
        "X-CS571-ID": 'bid_f797898160368bd8134003297afb0e1e9caa655bdd7e50fd71dda9b6872f0f4a'
      }
    }).then(response=>{
      if(response.ok){
        return response.json();
      }
    }).then(data=>{
      setChatrooms(data);
    })
  }, []);

  function handleLogin(username, password) {
    fetch("https://cs571.org/api/s24/hw9/login",{
      method:"Post",
      headers:{
        "X-CS571-ID": 'bid_f797898160368bd8134003297afb0e1e9caa655bdd7e50fd71dda9b6872f0f4a',
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        "username":username,
        "password":password,
      }),
    }).then(response => {
      if(response.ok){
          alert(`Successful!`);
          setIsLoggedIn(true);
          return response.json();
      }else{
        response.json().then(data => {
          alert(data.msg);
      });
      }
  }).then(data=>{
    //console.log(data);
    if(data){
      SecureStore.setItemAsync("username",data.user.username);
      SecureStore.setItemAsync(data.user.username,data.token);
    }
  }) // I should really do a fetch to login first!
  }

  function handleSignup(username, password) {
    fetch("https://cs571.org/api/s24/hw9/register",{
      method:"Post",
      headers:{
        "X-CS571-ID": 'bid_f797898160368bd8134003297afb0e1e9caa655bdd7e50fd71dda9b6872f0f4a',
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        "username":username,
        "password":password,
      }),
    }).then(response => {
      if(response.ok){
          alert(`Successful!`);
          setIsLoggedIn(true);
          return response.json();
      }else{
        response.json().then(data => {
          alert(data.msg);
      });
      }
  }).then(data=>{
    SecureStore.setItemAsync("username",data.user.username);
    SecureStore.setItemAsync(data.user.username,data.token);
  })
     // I should really do a fetch to register first!
  }

  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} isguest={isguest}/>}
              </ChatDrawer.Screen>
            })
          }
          {
            !isguest?(
              <ChatDrawer.Screen name="Logout">
                {(props) => <BadgerLogoutScreen setIsLoggedIn={setIsLoggedIn} />}
              </ChatDrawer.Screen>
            ) : (
                <ChatDrawer.Screen name="Sign up" >
                  {(props) => <BadgerConversionScreen  setIsLoggedIn={setIsLoggedIn} setIsRegistering={setIsRegistering}/>}
                </ChatDrawer.Screen>
              )
          }

        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen handleLogin={handleLogin} setIsRegistering={setIsRegistering} setIsLoggedIn={setIsLoggedIn} setIsGuest={setIsGuest}/>
  }
}