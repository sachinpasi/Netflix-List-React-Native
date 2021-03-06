import React, {useState} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {Container, Form, Item, Input, Button, H1} from 'native-base';

import shortid from 'shortid';
import AsyncStorage from '@react-native-community/async-storage';

const Add = ({navigation}) => {
  const [name, setName] = useState('');
  const [totalNoSeason, setTotalNoSeason] = useState('');

  const addToList = async () => {
    try {
      if (!name || !totalNoSeason) {
        return alert('Please add both fields');
      }

      const seasonToAdd = {
        id: shortid.generate(),
        name,
        totalNoSeason,
        isWatched: false,
      };

      const storedValue = await AsyncStorage.getItem('@season_list');
      const prevList = await JSON.parse(storedValue);

      if (!prevList) {
        const newList = [seasonToAdd];
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
      } else {
        prevList.push(seasonToAdd);
        await AsyncStorage.setItem('@season_list', JSON.stringify(prevList));
      }

      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }

    setName('');
    setTotalNoSeason('');
  };

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <H1 style={styles.heading}>Add to watch List</H1>
        <Form>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="Season name"
              style={{color: '#eee', textAlign: 'center'}}
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </Item>
          <Item rounded style={styles.formItem}>
            <Input
              placeholder="Total no of seasons"
              style={{color: '#eee', textAlign: 'center'}}
              value={totalNoSeason}
              onChangeText={(text) => setTotalNoSeason(text)}
            />
          </Item>
          <Button
            style={{backgroundColor: '#E50914'}}
            rounded
            block
            onPress={addToList}>
            <Text style={styles.addbutton}>Add To List</Text>
          </Button>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default Add;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0E1111',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
  },
  heading: {
    textAlign: 'center',
    color: '#fff',
    marginHorizontal: 5,
    marginTop: 30,
    marginBottom: 30,
    fontFamily: 'BebasNeue-Regular',
  },
  formItem: {
    marginBottom: 20,
    backgroundColor: '#151919',
    borderColor: '#151919',
  },
  addbutton: {color: '#eee', fontFamily: 'BebasNeue-Regular', fontSize: 20},
});
