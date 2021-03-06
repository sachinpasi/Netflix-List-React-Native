import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Text, Button, H1, Container, Form, Input, Item} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const Edit = ({navigation, route}) => {
  const [name, setName] = useState('');
  const [totalNoSeason, setTotalNoSeason] = useState('');
  const [id, setId] = useState(null);

  const update = async () => {
    try {
      if (!name || !totalNoSeason) {
        return alert('please enter value');
      }
      const seasonToUpdate = {
        id,
        name,
        totalNoSeason,
        isWatched: false,
      };
      const storedValue = await AsyncStorage.getItem('@season_list');
      const list = await JSON.parse(storedValue);

      list.map((singleSeason) => {
        if (singleSeason.id == id) {
          singleSeason.name = name;
          singleSeason.totalNoSeason = totalNoSeason;
        }
        return singleSeason;
      });

      await AsyncStorage.setItem('@season_list', JSON.stringify(list));

      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const {season} = route.params;
    const {id, name, totalNoSeason} = season;

    setId(id);
    setName(name);
    setTotalNoSeason(totalNoSeason);
  }, []);

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
            onPress={update}>
            <Text style={styles.addbutton}>Update To List</Text>
          </Button>
        </Form>
      </ScrollView>
    </Container>
  );
};

export default Edit;

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
    marginTop: 50,
    marginBottom: 20,
    fontFamily: 'BebasNeue-Regular',
  },
  formItem: {
    marginBottom: 20,
    backgroundColor: '#151919',
    borderColor: '#151919',
  },
  addbutton: {color: '#eee', fontFamily: 'BebasNeue-Regular', fontSize: 20},
});
