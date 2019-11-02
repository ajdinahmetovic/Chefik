import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text
  
} from 'react-native';




class Card extends React.Component {

  render() {
    return(
      <View style={styles.container}>
            <Image source={{uri: this.props.img.toString()}} style={{width: 238, height: 185, borderTopLeftRadius: 20, borderTopRightRadius: 20}}/>
            <View style={{marginLeft: 10}}>
              <Text style={{marginTop: 11, fontSize: 21, fontWeight: 'bold',fontFamily: 'Montserrat'}}>
                {this.props.title}
              </Text>
              <View style={styles.pill}>
                <Text style={{fontSize: 10}}>
                  {this.props.dishType}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{left: 5,fontSize: 10,top: 2,color: 'gray',fontFamily: 'Montserrat'}}>
                {this.props.description}
                </Text>
                <View style={{width: 68}}/>
                <Image style={{width: 25, height: 25}} source={this.props.icon1}></Image>
                <Image style={{width: 25, height: 25}} source={this.props.icon2}></Image>
              </View>
              
            </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    width: 238,
    height: 276,
    borderRadius: 20,
    margin: 10
  },
  pill: {
    width: 50,
    height: 20,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#FF7878',
    alignItems: 'center',
    justifyContent: 'center'
  }
 
});

export default Card;