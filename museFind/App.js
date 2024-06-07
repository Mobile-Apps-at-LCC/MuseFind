import React, {useState} from "react";

import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppNavigator";
import AudioProvider from "./app/context/AudioProvider";
// Neccasary imports above 


export default function App() {
  //set up a hook to store music entries
  const [musicEntries, setMusicEntries] = useState([]);
  return (
//return the app navigator with the music entries and set music entries as props
 //navigation container is the root component of the app
 //audio provider is a context provider that provides audio context to all the components in the app
 //context is set up in the app in order to share state between components, prop drilling in this app would get very messy
<AudioProvider> 
    <NavigationContainer>
    <AppNavigator  musicEntries={musicEntries} setMusicEntries={setMusicEntries}/>

  </NavigationContainer>

    </AudioProvider>




  ); 
}                                                       