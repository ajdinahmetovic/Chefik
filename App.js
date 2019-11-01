/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StatusBar,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Clarifai from 'clarifai'
import Axios from 'axios';



const clarifaiAPI = new Clarifai.App({
  apiKey: '5752fa421b5046f08055ccfebd3e6c23'
 });

class App extends React.Component {

  
  constructor (props){
    super(props)

  }

  render (){
    return(
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      clarifaiAPI.models.predict('Chefyk', {base64: data.base64}).then(
        function(response) {
          var ingredients = response.outputs[0].data.concepts;
          console.log(ingredients);

          Axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            params:{
              apiKey: 'e17b83d1119341a997fcfc6d7b4849d0',
              ingredients: 'tomato sauce,pepperoni,cheese',
              ranking: 2
              //ingredients[0].name+','+ingredients[1].name+','+ingredients[2].name 
            }
          }).then(recipes => console.log(recipes))
        },
        function(err) {
          console.log(err)
        }
      );

    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  
});

export default App;
