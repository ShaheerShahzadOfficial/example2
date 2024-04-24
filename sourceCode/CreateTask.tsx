import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {FONTS, SIZES} from './Theme/theme';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const {width, height} = SIZES;

const CreateTask = () => {
  const navigation = useNavigation();
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');

  const createTask = () => {
    firestore()
      .collection('Tasks')
      .add({
        Title: Title,
        Description: Description,
        userId: auth().currentUser?.uid,
        createdAt:new Date()
      })
      .then(res => {
        console.log('Task Created Successfully!');
        navigation.goBack()
      });
  };

  return (
    <View>
      <View style={styles.Header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              color={'#fff'}
              size={FONTS.font26}
            />
          </Pressable>
          <Text style={styles.HeaderText}>Create Task</Text>
        </View>
        <View>
          <Pressable
            onPress={createTask}
            android_ripple={{color: '#4106FF'}}
            style={styles.HeadersBtn}>
            <Text style={styles.HeadersBtnText}>Save</Text>
          </Pressable>
        </View>
      </View>

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
    </View>
  );
};

export default CreateTask;

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
