import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  BackroundImage
  
} from 'react-native';
import Card from './Recent/Card';

class Recent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showRecipe: 0,
      card: null
    }
  }

  dummyData = [
    {
      img: 'https://www.nkp.ba/wp-content/uploads/2012/12/bosanski-lonac.jpeg',
      title: 'Bosanski lonac',
      dishType: 'Kuhanje',
      description: 'Servings: 4\nTime to prepare: 45min',
      icon2: require('../assets/icon2.png')
    },
    {
      img: 'http://www.velikakuhinja.com/img/s/482x280/recepti/f6b08770b2f590232f4f90a86dddc35e.jpg',
      title: 'Sogan dolma',
      dishType: 'Glavno',
      description: 'Servings: 5\nTime to prepare: 55min',
      icon1: require('../assets/icon1.png'),
      icon2: require('../assets/icon2.png')
    },
    {
      img: 'https://kuharica.kontin.info/wp-content/uploads/2015/01/svecana-pita-s-mesom-darkova-web-kuharica-13.jpg',
      title: 'Svecana pita s mesom',
      dishType: 'Pita',
      description: 'Servings: 6\nTime to prepare: 30min',
      icon2: require('../assets/icon2.png')
    },
    {
      img: 'https://static.klix.ba/media/images/vijesti/141003055.jpg',
      title: 'Baklava',
      dishType: 'Dessert',
      description: 'Servings: 10\nTime to prepare: 50min',
      icon1: require('../assets/icon1.png'),
      icon2: require('../assets/icon2.png')
    },
  ]

  searchExecute = (searchText) => {
    
    console.log('proslo roki')
  }


  render() {


    let searchTextValue = ''

    if(this.state.showRecipe == 1){
      return(
        <View style={{backgroundColor: 'white', width: '100%', height: '100%',flexDirection: 'row'}}>
        <TouchableOpacity style={{top: 20,zIndex: 1000 }} onPress={()=>{this.setState({showRecipe: false})}}>
          <View><Image style={{ marginLeft:20}}source={require('../assets/left-arrow.png')}/></View>
          
        </TouchableOpacity>
        <View style={{position:'absolute', width: '100%', height: '30%', backgroundColor: 'rgba(255,120,120,0.5)',zIndex: 10,borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}></View>
        <Image style={{right: 43,width: '100%', height: '30%', borderBottomLeftRadius: 10,borderBottomRightRadius: 10}} source={{uri: this.state.card.img}}/>
        <Text style={{position: 'absolute',fontSize:28,fontWeight:'bold',top: 210,left: 10,fontFamily:'Montserrat'}}>{this.state.card.title.toUpperCase()}</Text>
        <View style={styles.pill}>
                <Text style={{fontSize: 15, color:'#ff7878',fontFamily:'Montserrat-Light'}}>
                  {this.state.card.dishType}
                </Text>
        </View>
        <Text style={{left: 10,fontSize: 17,top: 275,color: 'gray',fontFamily: 'Montserrat',position: 'absolute',}}>
                {this.state.card.description}
                </Text>
                <Image style={{width: 25, height: 25,position: 'absolute',top: 320,left: 10}} source={require('../assets/icon1.png')}></Image>
                <Image style={{width: 25, height: 25,position: 'absolute',top: 320,left: 40}} source={require('../assets/icon2.png')}></Image>                
                <Text style={{fontSize: 15, color:'rgba(166, 171, 179,0.5)',fontFamily:'Montserrat-Light',position: 'absolute',top: 340, left: 10}}>
                  ___________________________________________________
                </Text>
                <Text style={{position: 'absolute',fontSize:28,top: 360,left: 10,fontFamily:'Montserrat', color: '#ff7878'}}>INGREDIENTS</Text>
                {
                  
                }
        </View>
      )
    }else if (this.state.showRecipe == 0) {
      return(
        <View style={styles.container}>
  
          <View style={styles.bar}>

            <TextInput onChangeText={(value) => searchTextValue = value} placeholder= '  Search...' style={styles.textInput}></TextInput>            

            <TouchableOpacity onPress={(searchTextValue) => this.searchExecute(searchTextValue)} style={{marginBottom: 9, alignItems:'center', width: 40}}>
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
                return (
                  <TouchableOpacity onPress={()=> this.setState({showRecipe: 1, card: card})}>
                    <Card img = {card.img} title={card.title} description={card.description} dishType={card.dishType} icon1={card.icon1} icon2={card.icon2}/>
                  </TouchableOpacity>
                  )
              })
            }
          </ScrollView>
          
        </View>
      )
    } else {
      
    }
    }
    

}

const styles = StyleSheet.create({
  pill: {
    left: 10,
    position: 'absolute', 
    top: 250,
    width: 100,
    height: 20,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#FF7878',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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