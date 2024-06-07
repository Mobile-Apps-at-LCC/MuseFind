import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { loginUser } from '../api';
import museFind from '../../assets/musefindLogo.png';
//import the necessary components from react and react-native

//this will recieve the nagivation prop and the hooks with the email and password that the user will input, authorizaed in the register screen
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  //this handles the login, it will attempt to login the user with the email and password that they input
  //it calls the loginUser function from the api file and passes the email and password state vcalues. If the login is succesgul, iut navigates the the "home" screen
  //using the navigation.navigate method. 
  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
      navigation.navigate('Home');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Invalid email or password
        console.error('Invalid email or password:', error);
        // Display an error message to the user
        alert('Invalid email or password. Please try again.');
      } else {
        console.error('Error logging in:', error);
        // Display a generic error message
        alert('An error occurred while logging in. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={museFind} style={styles.logo} />
      <Text style={styles.title}>Store and find your music</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Register now!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 16,
  },
  logo: {
    width: 220,
    height: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'teal',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'teal',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  registerText: {
    color: 'teal',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;