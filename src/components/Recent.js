import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  
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

  render() {
    return(
      <View style={styles.container}>

        <View style={styles.bar}>
            <TouchableOpacity style={{marginTop: 20}}>
              <Image style={{width:22, height: 22}} source={require('../assets/search.png')}/>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop: 20, marginLeft: 20}}>
              <Image style={{width:22, height: 22}} source={require('../assets/staring.png')}/>
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
  container:{
    flex: 1,
    backgroundColor: '#EFEFEF'
  },
  bar:{
    paddingLeft: '80%',
    height: 43,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignItems: 'flex-end'
  },

  titleView:{
    marginTop: 56,
    marginLeft: 19,

  }
  
});

export default Recent;