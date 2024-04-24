import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FONTS, SIZES} from './Theme/theme';
import auth from '@react-native-firebase/auth';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = SIZES;
const Home = () => {
  const navigation: any = useNavigation();
  const [Tasks, setTasks] = useState<any>([]);
  const [FilteredTasks, setFilteredTasks] = useState<any>([]);

  const [search, setSearch] = useState('');
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  useEffect(() => {
    // firestore()
    //   .collection('Tasks')
    //   // Filter results
    //   .where('userId', '==', auth().currentUser?.uid)
    //   .get()
    //   .then(querySnapshot => {
    //     console.log(querySnapshot.docs);
    //     setTasks(querySnapshot.docs);
    //   });
    function onResult(QuerySnapshot: any) {
      console.log('QuerySnapshot.docs changes');
      setTasks(
        QuerySnapshot.docs.sort(
          (a: any, b: any) =>
            new Date(b._data.createdAt) - new Date(a._data.createdAt),
        ),
      );

      setFilteredTasks(
        QuerySnapshot.docs.sort(
          (a: any, b: any) =>
            new Date(b._data.createdAt) - new Date(a._data.createdAt),
        ),
      );
    }

    function onError(error: any) {
      console.error(error);
    }

    firestore()
      .collection('Tasks')
      // .orderBy('createdAt', 'desc')
      .where('userId', '==', auth().currentUser?.uid)
      .onSnapshot(onResult, onError);
  }, []);

  useEffect(() => {
    if (search) {
      setFilteredTasks(
        Tasks.filter((item:any) => item?._data?.Title.includes(search)),
      );
      console.log(search)
    }
  }, [search]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.TextInputContainer}>
        <FontAwesome name="search" size={FONTS.font20} color="#000" />
        <TextInput
          placeholderTextColor={'#545454'}
          value={search}
          style={styles.TextInput}
          placeholder="Search with title"
          onChangeText={text => setSearch(text)}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        style={{flex: 1}}>
        <View style={styles.View}>
          {FilteredTasks.map((item: any, i: number) => {
            const id = item?._ref?._documentPath?._parts[1];
            return (
              <View style={styles.taskContainer} key={String(i)}>
                <Text style={styles.title}>{item?._data?.Title}</Text>
                <Text style={styles.description}>
                  {item?._data?.Description}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => navigation.navigate('createTask')}
        style={styles.floatingBtn}>
        <Octicons name="plus" size={FONTS.font20} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  View: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: FONTS.font10,
  },
  taskContainer: {
    backgroundColor: '#fff',
    // flexDirection: 'row',
    // alignItems: 'center',
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
  floatingBtn: {
    width: FONTS.font38,
    height: FONTS.font38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    position: 'absolute',
    bottom: FONTS.font14,
    right: FONTS.font10,
    backgroundColor: '#4106FF',
  },
  description: {
    fontSize: FONTS.font10,
    // fontWeight:"600",
    color: '#000',
  },
  title: {
    fontSize: FONTS.font14,
    fontWeight: '600',
    color: '#000',
  },

  TextInputContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.96,
    alignSelf: 'center',
    shadowColor: '#504040',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: FONTS.font10,
    elevation: FONTS.font10,
    marginBottom: FONTS.font20,
    borderRadius: FONTS.font32,
    // justifyContent: 'space-around',
    paddingVertical: FONTS.font10 / 2,
    paddingHorizontal: FONTS.font14,
  },
  TextInput: {
    color: '#000',
    fontFamily: 'KiaBold',
    fontSize: FONTS.font16,
    fontWeight: '600',
    paddingHorizontal: FONTS.font10,
    width: '86%',
  },
});
