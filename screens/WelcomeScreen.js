import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import {colors} from '../theme';
import {useNavigation} from '@react-navigation/native';

// import statusCodes along with GoogleSignin
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebase';

GoogleSignin.configure({
   webClientId: '-446o9lrkher5l6le2k1n6vocfh074ato.apps.go 78140454630 ogleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
  });

export default function WelcomeScreen() {
  const navigation = useNavigation();

  // Somewhere in your code
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth,googleCredentials);
    } catch (error) {
        console.log('got an error',error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <ScreenWrapper>
      <View className="h-full flex justify-around" style={{backgroundColor: '#CADCFC'}}>
        <View className="flex-row justify-center items-center bg-white rounded-xl mx-4 mb-4 h-60 w-100 ">
          <Image
            source={require('../assets/images/welcomelogo.png')}
            className="h-20 w-20 shadow"
          />
        </View>
        <View className="mx-5 mb-20">
          <Text
            className={`text-center font-bold text-4xl ${colors.heading} mb-10`}>
            Expensifind
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            className="shadow p-3 rounded-full mb-5"
            style={{backgroundColor: colors.button2}}>
            <Text className="text-center text-white text-lg font-bold">
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            className="shadow p-3 rounded-full mb-5"
            style={{backgroundColor: colors.button2}}>
            <Text className="text-center text-white text-lg font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => signIn()}
            className="shadow p-3 rounded-full mb-5 bg-white">
            <View className="flex-row justify-center items-center space-x-3">
            <Image source={require('../assets/images/googleIcon.png')} className="h-8 w-8"/>
            <Text className="text-center text-grey-600 text-lg font-bold">
              Sign In with Google
            </Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </ScreenWrapper>
  );
}
