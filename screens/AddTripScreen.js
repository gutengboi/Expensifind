import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../theme';
import BackButton from '../components/backButton';
import ScreenWrapper from '../components/ScreenWrapper';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { tripsRef } from '../config/firebase';

export default function AddTripScreen() {
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state=> state.user);

  const navigation = useNavigation();

  const handleAddTrip = async () => {
    if (place && country) {
      // good to go
      //navigation.navigate('Home');
      setLoading(true);
      let doc = await addDoc(tripsRef, {
        place,
        country,
        userId: user.uid
      });
      setLoading(false);
      if(doc && doc.id){
        navigation.goBack();
      }
    } else {
      // show error
      Snackbar.show({
        text: 'Place and Country are required!',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <ScreenWrapper>
      <ScrollView>
        <View className="flex justify-between h-full mx-4">
          <View>
            <View className="relative mt-2">
              <View className="absolute top-0 left-0">
                <BackButton />
              </View>
              <Text
                className={`${colors.heading} font-bold text-xl text-center`}>
                Add Trip
              </Text>
            </View>

            <View className="flex-row justify-center my-3 mt-5">
              <Image
                source={require('../assets/images/4.png')}
                className="w-72 h-72"
              />
            </View>
            <View className="space-y-2 mx-2">
              <Text className={`${colors.heading} font-bold text-lg `}>
                Where On Earth?
              </Text>
              <TextInput
                value={place}
                onChangeText={value => setPlace(value)}
                className="p-4 bg-white rounded-full mb-3 h-12"
              />
              <Text className={`${colors.heading} font-bold text-lg `}>
                Which Country?
              </Text>
              <TextInput
                value={country}
                onChangeText={value => setCountry(value)}
                className="p-4 bg-white rounded-full mb-3 h-12"
              />
            </View>
          </View>
          <View>
            {loading ? (
              <Loading />
            ) : (
              <TouchableOpacity
                onPress={handleAddTrip}
                style={{backgroundColor: colors.button2}}
                className="my-20 rounded-full p-3 shadow-sm mx-2">
                <Text className="text-center text-white text-lg font-bold">
                  Add Trip
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
