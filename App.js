import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    FlatList,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { DeckSwiper, Card, Button, Header, Left, Body, Right, Title } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';

const RANDOM_API = 'https://randomuser.me/api/0.4/?randomapi';
const WIDTH = Dimensions.get('window').width;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
        cards: [],
        selectedType: 1,
        favoriteList: [],
        favoriteItem: {},
        isPressFavorites: false,
        isModalVisible: false
    }
  }

  componentDidMount = () => {
      this.getRandomData();
      this.getListFavoritesOffline();
  };

  getListFavoritesOffline = () => {
      AsyncStorage.getItem('cards').then((cards) => {
          if (cards) {
              this.setState({favoriteList: JSON.parse(cards)})
          }
      });
  };

  getRandomData = () => {
      this.setState({cards: []});
      axios.get(RANDOM_API)
          .then(response => {
              let newCards = this.state.cards;
              newCards[0] = response.data.results[0].user;
              this.setState({cards: newCards});
          })
          .catch(error => {
              console.log(error);
          })
  };

  storeCardsOffline = (card) => {
      AsyncStorage.getItem('cards').then((cards) => {
          let favoriteList = [];
          if (cards) {
              favoriteList = JSON.parse(cards);
          }
          favoriteList.push(card);
          AsyncStorage.setItem('cards', JSON.stringify(favoriteList));
      })
          .then(() => this.getRandomData());
  };

  pressFavoriteBtn = () => {
      this.setState({isPressFavorites: true});
      this.getListFavoritesOffline();
  };

  renderCardItem = (item) => {
        return (
            <Card style={{
                width: WIDTH * 0.9,
                borderRadius: 10,
                height: WIDTH * 0.95
            }}>
                <View style={{
                    backgroundColor: '#f9f9f9',
                    height: WIDTH * 0.3,
                    borderBottomWidth: 1,
                    borderColor: '#d4d4d4',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10
                }}>

                </View>
                <View style={{
                    width: WIDTH * 0.42,
                    height: WIDTH * 0.42,
                    borderRadius: WIDTH * 0.42,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#d4d4d4',
                    position: 'absolute',
                    alignSelf: 'center',
                    marginTop: WIDTH * 0.05
                }}>
                    <Image source={{uri: item.picture}} style={{
                        width: WIDTH * 0.4,
                        height: WIDTH * 0.4,
                        borderRadius: WIDTH * 0.4
                    }}/>
                </View>
                <View style={{
                    height: WIDTH * 0.3,
                    marginTop: WIDTH * 0.23,
                    alignItems: 'center',
                }}>
                    {this.state.selectedType === 1 ?
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: 'gray',
                                fontSize: WIDTH * 0.045
                            }}>My name is</Text>
                            <Text style={{
                                fontSize: WIDTH * 0.07
                            }} numberOfLines={1}>
                                {item.name.first + ' ' + item.name.last}
                            </Text>
                        </View> : <View/>}

                    {this.state.selectedType === 2 ?
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: 'gray',
                                fontSize: WIDTH * 0.045
                            }}>Date of birth</Text>
                            <Text style={{
                                fontSize: WIDTH * 0.07
                            }} numberOfLines={1}>
                                {new Date(Number(item.dob)).toDateString()}
                            </Text>
                        </View> : <View/>}

                    {this.state.selectedType === 3 ?
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: 'gray',
                                fontSize: WIDTH * 0.045
                            }}>My address is</Text>
                            <Text style={{
                                fontSize: WIDTH * 0.07
                            }} numberOfLines={1}>
                                {item.location.street}
                            </Text>
                        </View> : <View/>}

                    {this.state.selectedType === 4 ?
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: 'gray',
                                fontSize: WIDTH * 0.045
                            }}>My phone is</Text>
                            <Text style={{
                                fontSize: WIDTH * 0.07
                            }} numberOfLines={1}>
                                {item.phone}
                            </Text>
                        </View> : <View/>}

                    {this.state.selectedType === 5 ?
                        <View style={{
                            alignItems: 'center',
                        }}>
                            <Text style={{
                                color: 'gray',
                                fontSize: WIDTH * 0.045
                            }}>My password is</Text>
                            <Text style={{
                                fontSize: WIDTH * 0.07
                            }} numberOfLines={1}>
                                {item.password}
                            </Text>
                        </View> : <View/>}

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: WIDTH * 0.6,
                    }}>
                        <TouchableOpacity style={{
                            marginTop: WIDTH * 0.1,
                            alignItems: 'center'
                        }} onPress={() => {this.setState({selectedType: 1})}}>
                            <View style={{
                                width: WIDTH * 0.1,
                                height: 2,
                                backgroundColor: this.state.selectedType === 1 ? '#8fb755' : 'white',
                                marginBottom: WIDTH * 0.02
                            }}/>
                            <Icon name={'ios-person'} size={WIDTH * 0.1} color={this.state.selectedType === 1 ? '#8fb755' : 'grey'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginTop: WIDTH * 0.1,
                            alignItems: 'center'
                        }} onPress={() => {this.setState({selectedType: 2})}}>
                            <View style={{
                                width: WIDTH * 0.1,
                                height: 2,
                                backgroundColor: this.state.selectedType === 2 ? '#8fb755' : 'white',
                                marginBottom: WIDTH * 0.02
                            }}/>
                            <Icon name={'ios-calendar'} size={WIDTH * 0.1} color={this.state.selectedType === 2 ? '#8fb755' : 'grey'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginTop: WIDTH * 0.1,
                            alignItems: 'center'
                        }} onPress={() => {this.setState({selectedType: 3})}}>
                            <View style={{
                                width: WIDTH * 0.1,
                                height: 2,
                                backgroundColor: this.state.selectedType === 3 ? '#8fb755' : 'white',
                                marginBottom: WIDTH * 0.02
                            }}/>
                            <Icon name={'ios-map'} size={WIDTH * 0.1} color={this.state.selectedType === 3 ? '#8fb755' : 'grey'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginTop: WIDTH * 0.1,
                            alignItems: 'center'
                        }} onPress={() => {this.setState({selectedType: 4})}}>
                            <View style={{
                                width: WIDTH * 0.1,
                                height: 2,
                                backgroundColor: this.state.selectedType === 4 ? '#8fb755' : 'white',
                                marginBottom: WIDTH * 0.02
                            }}/>
                            <Icon name={'ios-call'} size={WIDTH * 0.1} color={this.state.selectedType === 4 ? '#8fb755' : 'grey'}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginTop: WIDTH * 0.1,
                            alignItems: 'center'
                        }} onPress={() => {this.setState({selectedType: 5})}}>
                            <View style={{
                                width: WIDTH * 0.1,
                                height: 2,
                                backgroundColor: this.state.selectedType === 5 ? '#8fb755' : 'white',
                                marginBottom: WIDTH * 0.02
                            }}/>
                            <Icon name={'ios-lock'} size={WIDTH * 0.1} color={this.state.selectedType === 5 ? '#8fb755' : 'grey'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Card>
        );
  };

  renderItemFavorites = ({item}) => {
      return (
          <TouchableOpacity onPress={() => {
              this.setState({
                  favoriteItem: item,
                  isModalVisible: true,
              })
          }}>
              <Card style={{
                  flexDirection: 'row',
                  width: WIDTH * 0.9,
                  marginVertical: WIDTH * 0.05,
                  alignSelf: 'center',
              }}>
                  <Image source={{uri: item.picture}} style={{
                      width: WIDTH * 0.1,
                      height: WIDTH * 0.1,
                      borderRadius: WIDTH * 0.1,
                      marginVertical: WIDTH * 0.02,
                      marginHorizontal: WIDTH * 0.02
                  }}/>
                  <View style={{
                      justifyContent: 'space-around',
                      marginVertical: WIDTH * 0.02
                  }}>
                      <Text style={{fontWeight: 'bold'}}>{item.name.first + ' ' + item.name.last}</Text>
                      <Text>{item.location.street}</Text>
                  </View>
              </Card>
          </TouchableOpacity>
      );
  };

  render () {
      if (this.state.isPressFavorites) {
          return (
              <SafeAreaView>
                  <Header>
                      <Left>
                          <Button transparent onPress={() => {this.setState({isPressFavorites: false})}}>
                              <Icon name='ios-arrow-back' size={WIDTH * 0.05} style={{marginLeft: WIDTH * 0.02}}/>
                              <Text style={{marginLeft: WIDTH * 0.01}}>back</Text>
                          </Button>
                      </Left>
                      <Body>
                          <Title>Favorites</Title>
                      </Body>
                      <Right/>
                  </Header>
                  <FlatList
                      data={this.state.favoriteList.slice().reverse()}
                      renderItem={this.renderItemFavorites}
                  />
                  <Modal
                      animationIn={'slideInUp'}
                      animationOut={'slideOutDown'}
                      onBackdropPress={() => {
                          this.setState({
                              isModalVisible: !this.state.isModalVisible,
                          });
                      }}
                      propagateSwipe={true}
                      isVisible={this.state.isModalVisible}
                      avoidKeyboard={true}
                      onBackButtonPress={() => {
                          this.setState({
                              isModalVisible: !this.state.isModalVisible,
                          });
                      }}
                      style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                      }}
                  >
                      {
                          this.state.favoriteItem && this.state.isModalVisible
                          ?
                          this.renderCardItem(this.state.favoriteItem)
                          :
                          <View/>
                      }
                  </Modal>
              </SafeAreaView>
          );
      } else {
          return (
              <SafeAreaView>
                  <View>
                      <View style={{
                          width: WIDTH,
                          height: '20%',
                          backgroundColor: '#2c2e31',
                      }}/>
                      <View style={{
                          width: WIDTH,
                          height: '80%',
                          backgroundColor: '#f9f9f9',
                          alignItems: 'center',
                          paddingTop: WIDTH * 1.3
                      }}>
                          <Button style={{
                              width: WIDTH * 0.3,
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#8fb755'
                          }} onPress={() => {this.pressFavoriteBtn()}}>
                              <Text style={{color: 'white'}}>Favorites</Text>
                          </Button>
                      </View>
                      <View style={{
                          position: 'absolute',
                          marginTop: WIDTH * 0.2,
                          marginHorizontal: WIDTH * 0.05,
                      }}>
                          {
                              this.state.cards.length > 0
                                  ?
                                  <DeckSwiper
                                      dataSource={this.state.cards}
                                      onSwipeLeft={() => {this.getRandomData()}}
                                      onSwipeRight={(item) => {this.storeCardsOffline(item);}}
                                      renderItem={item =>
                                          this.renderCardItem(item)
                                      }
                                  />
                                  :
                                  <ActivityIndicator
                                      size={'large'} color={'#8fb755'}
                                      style={{marginTop: WIDTH * 0.5, marginLeft: WIDTH * 0.41}}
                                  />
                          }
                      </View>
                  </View>
              </SafeAreaView>
          );
      }
  }
}
