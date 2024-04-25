/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './sourceCode/Home';
import Login from './sourceCode/login';
import Register from './sourceCode/Register';
import CreateTask from './sourceCode/CreateTask';
import EditTask from './sourceCode/EditTask';
import TaskDetail from './sourceCode/TaskDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (initializing) {
    return null;
  }

  return (
    // <View>
    //   <Text>Welcome {user?.email}</Text>
    // </View>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="createTask" component={CreateTask} />
            <Stack.Screen name="EditTask" component={EditTask} />
            <Stack.Screen name="TaskDetail" component={TaskDetail} />

            {/* EditTask */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
