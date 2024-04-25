/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FONTS, SIZES} from './Theme/theme';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const {width} = SIZES;

const EditTask = ({route}: {route: any}) => {
  const {id} = route.params;

  const navigation: any = useNavigation();
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');

  useEffect(() => {
    firestore()
      .doc(`Tasks/${id}`)
      .get()
      .then(res => {
        // console.log(res.data());
        setTitle(res.data()?.Title);
        setDescription(res.data()?.Description);
      });
  }, [id]);

  const updateTask = () => {
    firestore()
      .doc(`Tasks/${id}`)
      .update({
        Title: Title,
        Description: Description,
        createdAt: new Date(),
      })
      .then(() => {
        ToastAndroid.show('Task updated Successfully!', ToastAndroid.SHORT);
        console.log('Task updated Successfully!');
      })
      .finally(() => navigation.navigate('Home'));
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.Header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              color={'#fff'}
              size={FONTS.font26}
            />
          </Pressable>
          <Text style={styles.HeaderText}>Update Task</Text>
        </View>
        <View>
          <Pressable
            onPress={updateTask}
            android_ripple={{color: '#4106FF'}}
            style={styles.HeadersBtn}>
            <Text style={styles.HeadersBtnText}>update</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        style={{flex: 1}}>
        <TextInput
          placeholder="Title"
          style={styles.titleInput}
          multiline
          maxLength={300}
          keyboardType="default"
          value={Title}
          onChangeText={text => setTitle(text)}
        />

        <TextInput
          placeholder="Decription"
          style={styles.descriptionInput}
          multiline
          keyboardType="default"
          value={Description}
          onChangeText={text => setDescription(text)}
        />
      </ScrollView>
    </View>
  );
};

export default EditTask;

const styles = StyleSheet.create({
  Header: {
    width,
    paddingHorizontal: FONTS.font12,
    height: FONTS.font30 * 2,
    backgroundColor: '#4106FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#493D8A',
  },
  HeaderText: {
    color: '#fff',
    fontFamily: 'KiaBold',
    fontWeight: '800',
    fontSize: FONTS.font18,
    marginHorizontal: FONTS.font12,
  },
  HeadersBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: FONTS.font16,
    paddingVertical: FONTS.font14 / 2,
    borderRadius: FONTS.font10 / 2,
  },
  HeadersBtnText: {
    color: '#4106FF',
    fontFamily: 'KiaBold',
    fontSize: FONTS.font16,
    fontWeight: '900',
  },
  titleInput: {
    width,
    padding: FONTS.font12,
    fontSize: FONTS.font16,
    color: '#000',
  },
  descriptionInput: {
    width,
    padding: FONTS.font12,
    fontSize: FONTS.font12,
    color: '#000',
  },
});
