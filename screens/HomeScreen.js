import {View, Text, TouchableOpacity, Image, FlatList, ScrollView} from 'react-native';
import React, { useEffect, useState } from 'react';
import {colors} from '../theme';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ScreenWrapper from '../components/ScreenWrapper';
import {signOut} from 'firebase/auth';
import {auth, tripsRef} from '../config/firebase';
import {useSelector} from 'react-redux';
import {doc, getDocs, query, where} from 'firebase/firestore';

const items = [
  {
    id: 1,
    place: 'London',
    country: 'England',
  },
  {
    id: 2,
    place: 'New york',
    country: 'America',
  },
  {
    id: 3,
    place: 'washington dc',
    country: 'America',
  },
  {
    id: 4,
    place: 'mancherster',
    country: 'England',
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);
  const isFocused = useIsFocused()

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      //console.log('documents', doc.data());
      data.push({...doc.data(),id: doc.id})
    })
    setTrips(data);
  };

  const handleLogOut = async () => {
    await signOut(auth);
  };

  useEffect(()=>{
      if(isFocused)
          fetchTrips();
  },[isFocused])

  return (
    <ScreenWrapper className="flex-1">
    {/* <ScrollView> */}
      <View className="flex-row justify-between items-center p-4">
        <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>
          Expensifind
        </Text>
        <TouchableOpacity
          onPress={handleLogOut}
          className="p-2 bg-white border-grey-200 rounded-full">
          <Text className={colors.heading}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center bg-red-100 rounded-xl mx-4 mb-4">
        <Image
          source={require('../assets/images/banner.png')}
          className="w-60 h-60"
        />
      </View>
      <View className="px-4 space-y-4">
        <View className="flex-row justify-between items-center">
          <Text className={`${colors.heading} font-bold text-xl`}>
            Recent Trips
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddTrip')}
            className="p-2 bg-white border-grey-200 rounded-full">
            <Text className={colors.heading}>Add Trip</Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 430}}>
          <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={
              <EmptyList message={"You haven't recorded any trips yet"} />
            }
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
            className="mx-1 mb-3"
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('TripExpenses', {...item})}
                  className="bg-white p-4 rounded-2xl mb-5 shadow-sm">
                  <View>
                    <Image source={randomImage()} className="w-36 h-36 mb-2" />
                    <Text className={`${colors.heading} font-bold`}>
                      {item.place}
                    </Text>
                    <Text className={`${colors.heading} text-xs`}>
                      {item.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      {/* </ScrollView> */}
    </ScreenWrapper>
  );
}
