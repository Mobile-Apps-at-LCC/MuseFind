import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MusicFeedScreen from '../screens/MusicFeedScreen';
import AddMusicScreen from '../components/AddMusicScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import { StyleSheet, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import museFind from '../../assets/musefindLogo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import the neccasray components from react and react-native


// the tab and stack const are used to create the navigation for the app at both the top and bottom of the screen
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


//the handle logout function is an asynchronous function that removes the token from AsyncStorage and navigates to the 'Login' screen, using the navigation prop.
const handleLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};


//the AppNavigator function is used to create the navigation for the app, it uses the stack navigator to create the all of the screens that the user will see and navigate to.
const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        options={({ navigation }) => ({
          headerShown: false,
          headerRight: () => (
            <View style={styles.headerRight}>
              <MaterialIcons
                name="notifications"
                size={24}
                color="teal"
                style={styles.headerIcon}
              />
              <MaterialIcons
                name="message"
                size={24}
                color="teal"
                style={styles.headerIcon}
              />
              <TouchableOpacity onPress={() => handleLogout(navigation)}>
                <MaterialIcons
                  name="logout"
                  size={24}
                  color="teal"
                  style={styles.headerIcon}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      >
        {({ navigation }) => <TabNavigator navigation={navigation} handleLogout={() => handleLogout(navigation)} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const TabNavigator = ({ navigation, handleLogout }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabNavigation,
        tabBarActiveTintColor: 'teal',
        tabBarInactiveTintColor: 'white',
        headerShown: true,
        headerTitle: () => <Image source={museFind} style={styles.logo} />,
        headerRight: () => (
          <View style={styles.headerRight}>
          
            <TouchableOpacity onPress={() => handleLogout(navigation)}>
              <MaterialIcons
                name="logout"
                size={24}
                color="teal"
                style={styles.headerIcon}
              />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: {
          backgroundColor: 'black',
        },
      }}
    >
      <Tab.Screen
        name="MusicFeed"
        component={MusicFeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="AddMusic"
        component={AddMusicScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="music" size={size} color={color} />
          ),
          tabBarLabel: 'Add Music',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabNavigation: {
    backgroundColor: 'black',
  },
  logo: {
    width: 118,
    height: 20,
  },
  headerRight: {
    flexDirection: 'row',
    marginRight: 10,
  },
  headerIcon: {
    marginLeft: 10,
  },
});

export default AppNavigator;