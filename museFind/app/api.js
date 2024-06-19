import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
/// import the necessary libraries


//base url for the api based on the ngrok url
const BASE_URL = ' https://22f9-2601-1c2-c101-f970-95be-6000-f39b-2ce8.ngrok-free.app'; // Replace with your ngrok URL



//send the user data to the api to register a new user - using axios to make a post request to the api endpoint with the user data as the resuest body. 
// it recieves the token in AsyncStore  and returns the response data
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    await AsyncStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Take userData as a parameter and send a POST request to the /signin endpoint of the API.

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signin`, userData);
    await AsyncStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};


// take musicEntry as a parameter and send a POST request to the /music endpoint of the API.
export const saveMusicEntry = async (musicEntry) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.post(`${BASE_URL}/music`, musicEntry, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error saving music entry:', error);
    throw error;
  }
};
//this will retreive the token from the asyncStorage using AsyncStorage.getItem, then make a get request to the /music endpoint using axios,
//with the bear token. If successfull, it will return the response data. 
export const fetchMusicEntries = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/music`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching music entries:', error);
    throw error;
  }
};