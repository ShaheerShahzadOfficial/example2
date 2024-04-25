/* eslint-disable prettier/prettier */
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FONTS, SIZES} from './Theme/theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const {height, width} = SIZES;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const navigation: any = useNavigation();

  const login = async () => {
    if (!Email && !Password) {
      return ToastAndroid.show('Enter Email and Password', ToastAndroid.SHORT);
    }

    await auth()
      .signInWithEmailAndPassword(Email, Password)
      .then(() => {
        console.log('User signed in Successfully!');
        ToastAndroid.show('User signed in Successfully!', ToastAndroid.SHORT);
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          ToastAndroid.show(
            'That email address is already in use!',
            ToastAndroid.SHORT,
          );
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          ToastAndroid.show(
            'That email address is invalid!',
            ToastAndroid.SHORT,
          );
        }

        if (error.code === ' auth/invalid-credential') {
          ToastAndroid.show('Credential are invalid!', ToastAndroid.SHORT);
        }

        console.error(error.code);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        style={{flex: 1, flexGrow: 1}}>
        <View style={styles?.View}>
          <View style={styles.headingContainer}>
            <Text style={[styles.heading]}>Login Now</Text>
            <Text style={styles.miniHeading}>
              Please Login to contine using app
            </Text>
          </View>

          <View style={styles.TextInputContainer}>
            <Entypo name="email" size={FONTS.font20} color="#000" />
            <TextInput
              placeholderTextColor={'#545454'}
              value={Email}
              style={styles.TextInput}
              placeholder="Email"
              onChangeText={text => setEmail(text)}
            />
          </View>

          <View style={styles.TextInputContainer}>
            <SimpleLineIcons name="lock" size={FONTS.font20} color="#000" />
            <TextInput
              placeholderTextColor={'#545454'}
              secureTextEntry={!showPassword}
              value={Password}
              style={styles.TextInput}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Entypo name="eye" size={FONTS.font20} color="#000" />
              ) : (
                <Entypo name="eye-with-line" size={FONTS.font20} color="#000" />
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles?.button} onPress={login}>
            <Text style={styles?.text}>Login</Text>
          </TouchableOpacity>

          <View style={styles?.redirect}>
            <Text style={styles?.redirectText}>Don't have an account?</Text>
            <Text
              style={styles?.redirectText2}
              onPress={() => navigation.navigate('Register')}>
              Register
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  View: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height,
    width,
  },
  TextInputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    alignSelf: 'center',
    shadowColor: '#504040',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: FONTS.font10,
    elevation: FONTS.font10,
    marginBottom: FONTS.font20,
    borderRadius: FONTS.font10,
    // justifyContent: 'space-around',
    padding: FONTS.font10,
  },
  TextInput: {
    color: '#000',
    fontFamily: 'KiaBold',
    fontSize: FONTS.font16,
    fontWeight: '600',
    paddingHorizontal: FONTS.font10,
    width: '86%',
  },
  headingContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: FONTS.font38,
  },
  heading: {
    fontFamily: 'KiaBold',
    color: '#4106FF',
    fontSize: FONTS.font22 * 2,
  },
  miniHeading: {
    marginTop: FONTS.font10,
    fontFamily: 'KiaBold',
    color: '#4106FF',
    fontSize: FONTS.font14,
  },
  text: {
    color: 'white',
    fontFamily: 'KiaBold',
    fontSize: FONTS.font20,
    textAlign: 'center',
  },
  button: {
    // alignItems: "center",
    backgroundColor: '#4106FF',
    borderRadius: FONTS.font10,
    color: 'white',
    fontFamily: 'KiaBold',
    // justifyContent: "center",
    marginTop: FONTS.font20,
    paddingVertical: FONTS.font14,
    // paddingBottom: 20,
    width: SIZES.width * 0.9,
  },

  redirect: {
    backgroundColor: 'transparent',
    fontFamily: 'KiaBold',
    marginTop: FONTS.font30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  redirectText: {
    color: 'black',
    fontFamily: 'kiaBold',
    fontSize: FONTS.font16,
    fontWeight: 'bold',
    // marginTop: FONTS.font10,
    textAlign: 'center',
  },
  redirectText2: {
    color: '#4106FF',
    fontFamily: 'KiaBold',
    fontSize: FONTS.font18,
    fontWeight: '900',
    textAlign: 'center',
    marginLeft: FONTS.font6,
  },
});
