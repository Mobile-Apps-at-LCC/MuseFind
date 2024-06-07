import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import { fetchMusicEntries } from '../api';
import { useFocusEffect } from '@react-navigation/native';


// MusicFeedScreen is the screen that displays the music entries that the user has uploaded
const MusicFeedScreen = () => {

  //set up the hooks, sound is used to hold the currently playing audio instance. 
  //musicentries is used to store the fetched music entries
  //searchQuery is used to store the seartch query entered by the user
  const [sound, setSound] = useState(null);
  const [musicEntries, setMusicEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');



  //useEffect hook is used to fetch the music entries and cleans up the sound instance when the component is unmounted
  useFocusEffect(
    React.useCallback(() => {
      const fetchEntries = async () => {
        try {
          const entries = await fetchMusicEntries();
          setMusicEntries(entries);
        } catch (error) {
          console.error('Error fetching music entries:', error);
          
        }
      };

      fetchEntries();
    }, [])
  );

  //this creates a entriesByGenre object that groups the music entries by genre, the reduce method is used to group the entries by genre,
  //while the matchesQuery variable is used to check if the search query matches the track name, artist name or genre of the music entry
  const entriesByGenre = musicEntries.reduce((acc, entry) => {
    const genre = entry.genre || 'Other';
    const matchesQuery =
      entry.trackName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.artistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      genre.toLowerCase().includes(searchQuery.toLowerCase());

    if (matchesQuery) {
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(entry);
    }
    return acc;
  }, {});
//PlayAUdio will check if sound is already playing and unload it, then it will play the audio file, This uses the Audio.Sound.CreateAsync method and the audio url. 

  const playAudio = async (audioURI) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioURI },
        { shouldPlay: true }
      );
      setSound(newSound);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <ScrollView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <Text style={styles.recentlySubmitted}>Your Music</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.entriesContainer}>
          {entriesByGenre[''] && entriesByGenre[''].map((entry, index) => (
            <TouchableOpacity key={index} onPress={() => playAudio(entry.audioFile)}>
              <View style={styles.musicEntryContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: entry.image }} style={styles.image} />
                </View>
                <View style={styles.musicEntriesText}>
                  <Text style={styles.entryText}>{entry.trackName}</Text>
                  <Text style={styles.entryText}>{entry.artistName}</Text>
                  <Text style={styles.entryText}>{entry.genre}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {Object.entries(entriesByGenre).map(([genre, entries], index) => {
          if (genre !== '') {
            return (
              <View key={index}>
                <Text style={styles.genreHeader}>{genre}</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.entriesContainer}>
                  {entries.map((entry, index) => (
                    <TouchableOpacity key={index} onPress={() => playAudio(entry.audioFile)}>
                      <View style={styles.musicEntryContainer}>
                        <View style={styles.imageContainer}>
                          <Image source={{ uri: entry.image }} style={styles.image} />
                        </View>
                        <View style={styles.musicEntriesText}>
                          <Text style={styles.entryText}>{entry.trackName}</Text>
                          <Text style={styles.entryText}>{entry.artistName}</Text>
                          <Text style={styles.entryText}>{entry.genre}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            );
          }
          return null;
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  recentlySubmitted: {
    color: 'white',
    fontSize: 20,
    marginBottom: 10,
  },
  entriesContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  musicEntryContainer: {
    backgroundColor: '#033E3E',
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 120,
  },
  imageContainer: {
    backgroundColor: '#1a1a1a',
  },
  image: {
    width: 120,
    height: 120,
  },
  musicEntriesText: {
    padding: 8,
  },
  entryText: {
    color: 'white',
    fontSize: 14,
  },
  genreHeader: {
    color: 'white',
    fontSize: 18,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    color: 'black',
  },
});

export default MusicFeedScreen;