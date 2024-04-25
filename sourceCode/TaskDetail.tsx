/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
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
// import auth from '@react-native-firebase/auth';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width} = SIZES;

const TaskDetail = ({route}: {route: any}) => {
  const {id} = route.params;
  const navigation: any = useNavigation();
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');

  //   const createTask = () => {
  //     firestore()
  //       .collection('Tasks')
  //       .add({
  //         Title: Title,
  //         Description: Description,
  //         userId: auth().currentUser?.uid,
  //         createdAt: new Date(),
  //       })
  //       .then(() => {
  //         console.log('Task Created Successfully!');
  //         navigation.goBack();
  //       });
  //   };

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

  const deleteTask = () => {
    firestore()
      .doc(`Tasks/${id}`)
      .delete()
      .then(() => {
        ToastAndroid.show('Task Deleted Successfully!', ToastAndroid.SHORT);
      })
      .finally(() => {
        navigation.goBack();
      });
  };

  const deleteConfirmation = () => {
    Alert.alert(
      'Are you sure you want to delete this Task ?',
      'This Action can not be undone',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Delete', onPress: deleteTask},
      ],
    );
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
          <Text style={styles.HeaderText}>Task Detail</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '20%',
          }}>
          <MaterialIcons
            onPress={() => navigation.navigate('EditTask', {id})}
            name="edit"
            color={'#fff'}
            size={FONTS.font26}
          />
          <MaterialIcons
            onPress={deleteConfirmation}
            name="delete"
            color={'#ff0000'}
            size={FONTS.font26}
          />
          {/* <Pressable
            onPress={createTask}
            android_ripple={{color: '#4106FF'}}
            style={styles.HeadersBtn}>
            <Text style={styles.HeadersBtnText}>Delete</Text>
          </Pressable> */}
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
          editable={false}
        />

        <Text style={styles.descriptionInput}>{Description}</Text>
      </ScrollView>
    </View>
  );
};

export default TaskDetail;

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
    marginHorizontal: FONTS.font6,
  },
  HeadersBtn: {
    backgroundColor: '#fff',
    padding: FONTS.font10,
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
    // height: height,
  },
});
