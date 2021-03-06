import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {
  Text,
  Fab,
  Icon,
  List,
  ListItem,
  Left,
  Button,
  Body,
  CheckBox,
  Right,
  Title,
  H1,
  Subtitle,
  Container,
  Spinner,
  Image,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';

import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation, route}) => {
  const [listOfSeasons, setListOfSeasons] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused();
  const getList = async () => {
    setLoading(true);

    const storedValue = await AsyncStorage.getItem('@season_list');

    if (!storedValue) {
      setListOfSeasons([]);
    } else {
      const list = JSON.parse(storedValue);
      setListOfSeasons(list);
    }

    setLoading(false);
  };

  const deleteSeason = async (id) => {
    const newList = await listOfSeason.filter((list) => list.id !== id);
    await AsyncStorage.setItem('@season_list', JSON.stringify(newList));

    setListOfSeasons(newList);
  };

  const markComplete = async (id) => {
    const newArr = listOfSeason.map((list) => {
      if (list.id == id) {
        list.isWatched = !list.isWatched;
      }
      return list;
    });

    await AsyncStorage.setItem('@season_list', JSON.stringify(newArr));
    setListOfSeasons(newArr);
  };
  useEffect(() => {
    getList();
  }, [isFocused]);
  if (loading) {
    return (
      <Container style={styles.container}>
        <Spinner color="#00b7c2" />
      </Container>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {listOfSeasons.length == 0 ? (
        <Container style={styles.container}>
          <H1 style={styles.heading}>Watch List Empty</H1>
        </Container>
      ) : (
        <>
          <H1 style={styles.heading}>Next Series To Watch</H1>

          <List>
            {listOfSeasons.map((season) => (
              <ListItem key={season.id} style={styles.listItem} noBorder>
                <Left style={styles.leftbuttons}>
                  <Button
                    onPress={() => deleteSeason(season.id)}
                    danger
                    style={styles.actionButton}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                  <Button
                    onPress={() => {
                      navigation.navigate('Edit', {season});
                    }}
                    style={styles.actionButton}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                </Left>

                <Body>
                  <Title style={styles.seasonName}>{season.name}</Title>
                  <Text style={styles.totalNoSeason} note>
                    {season.totalNoSeason} Seasons To Watch
                  </Text>
                </Body>
                <Right style={styles.rightbutton}>
                  <CheckBox
                    style={{
                      borderRadius: 20,
                    }}
                    checked={season.isWatched}
                    onPress={() => markComplete(season.id)}
                  />
                </Right>
              </ListItem>
            ))}
          </List>
        </>
      )}

      <Fab
        onPress={() => navigation.navigate('Add')}
        style={{backgroundColor: '#E50914'}}
        position="bottomRight">
        <Icon name="add" />
      </Fab>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#0E1111',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#0E1111',
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    fontFamily: 'BebasNeue-Regular',
  },
  actionButton: {
    marginLeft: 5,
    width: 35,
    height: 35,
    justifyContent: 'center',
    borderRadius: 20,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'center',
    fontSize: 15,
  },
  listItem: {
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 5,
    backgroundColor: '#151919',
    borderRadius: 25,
  },
  totalNoSeason: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 9,
  },
  leftbuttons: {
    marginLeft: 5,
  },
  rightbutton: {
    marginRight: 5,
  },
});
