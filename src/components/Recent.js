import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
  
} from 'react-native';
import Card from './Recent/Card';

class Recent extends React.Component {

  dummyData = [
    {
      img: require('../assets/food.jpg'),
      title: 'Jelo 1',
      description: 'Jeslo 11111',
      dishType: 'Nest'
    },
    {
      img: require('../assets/food.jpg'),
      title: 'Jelo 1',
      description: 'Jeslo 11111',
      dishType: 'Nest'
    },
    {
      img: require('../assets/food.jpg'),
      title: 'Jelo 1',
      description: 'Jeslo 11111',
      dishType: 'Nest'
    },
    {
      img: require('../assets/food.jpg'),
      title: 'Jelo 1',
      description: 'Jeslo 11111',
      dishType: 'Nest'
    },
  ]

  searchExecute = (searchText) => {
    
    console.log('proslo roki')
  }

  render() {

    let searchTextValue = ''

    return(
      <View style={styles.container}> 

        <View style={styles.bar}>

            <TextInput onChangeText={(value) => searchTextValue = value} placeholder= 'Search...' style={styles.textInput}></TextInput>            

            <TouchableOpacity onPress={(searchTextValue) => this.searchExecute(searchTextValue)} style={{marginBottom: 9, marginLeft: 5, alignItems:'center', width: 40}}>
              <Image style={{width:22, height: 22}} source={require('../assets/search.png')}/>
            </TouchableOpacity>

        </View>

        <View style={styles.titleView}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            What are you
            </Text>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>
            cooking today?
            </Text>
            <Text style={{fontSize: 20, color: '#6C6C6C'}}>
              Need inspiration
            </Text>
        </View>


        <ScrollView style={{marginTop: 50}} horizontal={true}>
          {
            this.dummyData.map(card => {
              return <Card img = {card.img} title={card.title} description={card.description} dishType={card.dishType}/>
            })
          }
        </ScrollView>
        
      </View>
    )
  }

}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF'
  },

  bar: {
    marginTop: 20,
    height: 43,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignItems: 'flex-end'
  },

  titleView: {
    marginTop: 56,
    marginLeft: 19,

  },

  textInput: {
    height: 40,
    width: '85%',
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    alignItems: 'flex-start',
    fontSize: 14,
    lineHeight: 14,
    marginLeft: 10
  }
  
});

export default Recent;