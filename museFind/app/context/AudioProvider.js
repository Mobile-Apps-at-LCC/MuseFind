import React, { useState, useEffect  } from 'react';
import { Text, View, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

// defining AudioContext to equal react createContext. Given how I was going to be passing audio across the entire application, I felt prop drilling may get confusing. 
// I know how to use Redux for state managment but would of been way to heavy. Decided to learn a bit about useContext to make up for the difference. 
const AudioContext = React.createContext();

// within the AudioProvider you want to pass the parameter of children. As the AudioProvider will be used to wrap across the entire application. 
const AudioProvider = ({ children }) => {
  //setting up the audioFiles and permission hooks to be used below. 
  const [audioFiles, setAudioFiles] = useState([]);
  const [permissionError, setPermissionError] = useState(false);

  //Learned through going through expo-media-libraries Documentation I found that you need to be able to acess the users documents, this needs user persmission. 
  //this by far was the most complicated part for me, as I had no idea on how to implement user permissions nor knew it was neccasary. AFter going through a long amount of hours,
  //I was able to understand how to set user permissions. 
  const getPermission = async () => {
    //using a variable with status, and canAskAgain descructured, it needs to be equal to an await of MediaLibrary.requestPermissionsAsync. This is critical for sending a requestPermission.
    const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
   //if the user grants permission. then it will await the getAudioFiles function defined below. 
    if (status === 'granted') {
      await getAudioFiles();
    } else if (status === 'denied' && canAskAgain) {
      Alert.alert(
        'Permission Required',
        'This app needs to read audio files!',
        [
          { text: 'I am ready', onPress: () => getPermission() },
          { text: 'Cancel', onPress: () => {} }, // Empty onPress to prevent infinite loop
        ]
      );
    } else {
      setPermissionError(true);
    }
  };
 // this is in charge of actually retrieving the audioFiles, it is another async function that will do a try catch. where within the try a variable media will await the mediaLibraries getAssetsAsync.
 //the getAssetsAsync will retrieve the mediaType of audio on the phone and setAudio files will be equal to the media assets found. 
  const getAudioFiles = async () => {
    try {
      const media = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
      setAudioFiles(media.assets);
    } catch (error) {
      console.error('Error fetching audio files:', error);
    }
  };

  // you want to store getPermission in a useEffect, with its dependancy set to a empty array. 
  useEffect(() => {
    getPermission();
  }, []);

  

  return (
    // within the AudioContext you want useContext to be able to retreive the audiofiles and place all children within the provider, this ensures that these values are global. 
    <AudioContext.Provider value={{ audioFiles }}>
      {children}
    </AudioContext.Provider>
  );
};
// set up both the function and the context to be exported
export default AudioProvider;
export { AudioContext };