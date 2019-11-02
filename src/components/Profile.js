import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';




class Profile extends React.Component {

  render() {
    return(
      <View >
        <View>
          <TouchableOpacity style={{position: 'absolute', top:20,right: 20}}>
            <Image source={require('../assets/pen.png')}/>
          </TouchableOpacity>
        </View>
        
        <View style={{flex: 1,flexDirection: 'column',alignSelf: 'center', top:100}}>
          <Image style={{ width: 265, height: 270 }} source={require('../assets/sead.png')}/>
        </View>

        <View style={{flex: 1,flexDirection: 'column',alignSelf: 'center', top: 380}}>
           <Text style={{fontFamily: 'Montserrat', fontSize: 42,fontWeight: 'bold'}}>Sead Smailagić</Text>
           <Text style={{fontFamily: 'Montserrat', fontSize: 16,alignSelf: 'center',color: 'gray'}}>Bosnia and Herzegovina</Text>
           <Text style={{fontFamily: 'Montserrat', fontSize: 16,alignSelf: 'center',color: 'gray'}}>Tuzla, 75000</Text>
        </View> 

        <View style={{flex: 1,flexDirection: 'row', top: 550}}>
            <Image style={{left: 50, width: 120,height: 120}} source={require('../assets/star.png')}/>
            <View style={{width: 85}}/>
            <Image style={{height: 155}} source={require('../assets/line.png')}/>
            <View style={{width: 40}}/>
            <Image style={{width: 120,height: 120}} source={require('../assets/doc.png')}/>
        </View>
        <View style={{flex: 1,flexDirection: 'row', top: 675}}>
            <Text style={{left: 50, width: 120,height: 120,fontWeight: 'bold',fontSize: 25,color: 'gray'}}>365 <Text style={{width: 120,height: 120,fontSize: 25,fontWeight: 'normal'}}>points</Text></Text>
            <View style={{width: 85}}/>
            <Text style={{left: 50, width: 120,height: 120,fontWeight: 'bold',fontSize: 25,color: 'gray'}}>17 <Text style={{width: 120,height: 120,fontSize: 25,fontWeight: 'normal'}}>recipes</Text></Text>
            <View style={{width: 40}}/>
        </View>
        <View style={{flex: 1,flexDirection: 'row', top: 710}}>

          <TouchableOpacity style={{position: 'absolute'}}>
            <Text style={{left: 75, width: 120,height: 120,fontSize: 13,color: 'gray',textDecorationLine: 'underline',color: 'red'}}>earn more</Text>
          </TouchableOpacity>
            
          <View style={{width: 105}}/>
          
          <TouchableOpacity style={{position: 'absolute', left: 280}}>
            <Text style={{width: 120,height: 120,fontSize: 13,color: 'gray', textDecorationLine: 'underline',color: 'red'}}>write more</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({

  
});

export default Profile;