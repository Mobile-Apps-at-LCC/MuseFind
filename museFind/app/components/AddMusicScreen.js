import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import RNPickerSelect from 'react-native-picker-select';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { saveMusicEntry } from '../api';
//import the necessary components from react and react-native

//an array of objects that represent the genres that the user can select from
const genres = [

  { label: 'Rap', value: 'Rap' },
  { label: 'Rock', value: 'Rock' },
  { label: 'Pop', value: 'Pop' },
  { label: 'Country', value: 'Country' },
  { label: 'Jazz', value: 'Jazz' },
  { label: 'Classical', value: 'Classical' },
  { label: 'Electronic', value: 'Electronic' },
  { label: 'Reggae', value: 'Reggae' },
  { label: 'Metal', value: 'Metal' },
  { label: 'Blues', value: 'Blues' },
  { label: 'Folk', value: 'Folk' },
  { label: 'R&B', value: 'R&B' },
  { label: 'Indie', value: 'Indie' },
];


//AddMusicScreen is the screen that allows the user to add music to the app, it contains a large amount of hooks
//it also recieves the navigation prop
//the audiofiles is retreived from the audio context using the useContext hook. It is initialized with selectedAudio, trackName, artistName, and genre, and image using the useState hook.
const AddMusicScreen = ({ navigation }) => {
  const { audioFiles } = useContext(AudioContext);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [genre, setGenre] = useState(null);
  const [image, setImage] = useState(null);
//saveFileToLocalDirectory is an async function that will save the file to the local directory
//it will take the uri of the file as a parameter and return the local uri
//it will also split the uri and get the filename, then it will copy the file to the local directory
//it will then return the local uri
  const saveFileToLocalDirectory = async (uri) => {
    const filename = uri.split('/').pop();
    const localUri = FileSystem.documentDirectory + filename;
    await FileSystem.copyAsync({ from: uri, to: localUri });
    return localUri;
  };


  //handleSubmit is an async function that will save the music entry to the database
  //

  /* 
   It constructs a musicEntry object with the values from the component's state (trackName, artistName, genre, selectedAudio, and image). 
   Then, it calls the saveMusicEntry function from the ../api module, passing the musicEntry object. 
   If the save operation is successful, it navigates to the 'MusicFeed' screen using the navigation.navigate method.
  */

  const handleSubmit = async () => {
    try {
      const musicEntry = {
        trackName: trackName,
        artistName: artistName,
        genre: genre,
        audioFile: selectedAudio,
        image: image,
      };

      await saveMusicEntry(musicEntry);
      navigation.navigate('MusicFeed');
    } catch (error) {
      console.error('Error saving music entry:', error);
     
    }
  };


  /* first requests permission to access the media library using ImagePicker.requestMediaLibraryPermissionsAsync. 
  If the permission is not granted, it shows an alert to the user.If the permission is granted, 
  it launches the image picker using ImagePicker.launchImageLibraryAsync, allowing the user to select an image. 
  If an image is selected, it calls the saveFileToLocalDirectory function with the image URI to save the image to the local file system. 
Then, it updates the image state with the local URI of the saved image.*/

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please grant permission to access the photo library.');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled && result.assets.length > 0) {
        const pickedImage = result.assets[0];
        const localUri = await saveFileToLocalDirectory(pickedImage.uri);
        setImage(localUri);
      } else {
        console.error('Error: No image URI found in ImagePicker result.', result);
        Alert.alert('Error', 'No image URI found in ImagePicker result.');
      }
    } catch (error) {
      console.error('Error while picking image:', error);
      Alert.alert('Error', 'An error occurred while picking an image.');
    }
  };


  //below is the form for the application, it contains a header, and input fields for the track name, artist name, genre, audio file, and image as well as
  //a submit button that calls the handleSubmit function when pressed. 
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add Music</Text>
      <Text style={styles.label}>Track Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter track name"
        value={trackName}
        onChangeText={setTrackName}
      />
      <Text style={styles.label}>Artist Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter artist name"
        value={artistName}
        onChangeText={setArtistName}
      />
      <Text style={styles.label}>Genre</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Genre', value: null }}
        items={genres}
        onValueChange={(value) => setGenre(value)}
        value={genre}
      />
      <Text style={styles.label}>Audio File</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{ label: 'Select Audio File', value: null }}
        items={audioFiles.map((audio) => ({
          label: audio.filename,
          value: audio.uri,
        }))}
        onValueChange={(value) => setSelectedAudio(value)}
        value={selectedAudio}
      />
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>Select Image</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 15,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
    
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    color: 'black',
  },
  imagePicker: {
    backgroundColor: 'teal',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  imagePickerText: {
    color: 'white',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginBottom: 15,
    alignSelf: 'center',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'teal',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddMusicScreen;