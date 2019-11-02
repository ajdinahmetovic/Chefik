import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity
  
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Clarifai from 'clarifai';
import Axios from 'axios';
import { withNavigationFocus } from 'react-navigation'; 
import LottieView from 'lottie-react-native/src/js';


const clarifaiAPI = new Clarifai.App({
  apiKey: '5752fa421b5046f08055ccfebd3e6c23'
 });


 function getRecipeInstructions(recipeID) {
  Axios.get('https://api.spoonacular.com/recipes/'+recipeID+'/analyzedInstructions', {
          params:{
            apiKey: 'e17b83d1119341a997fcfc6d7b4849d0',
            stepBreakdown: true
          }
    }).then(recipes => console.log(recipes)).catch(error => console.log(error))
};

class Scanner extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: false
    }
  }

  

  takePicture = async() => {
    this.setState({isLoading: true})
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      clarifaiAPI.models.predict('Chefyk', {base64: data.base64}).then(
        function(response) {
          var ingredients = response.outputs[0].data.concepts;
          console.log(ingredients);
  
          /*Axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            params:{
              apiKey: 'e17b83d1119341a997fcfc6d7b4849d0',
              ingredients: ingredients[0].name+','+ingredients[1].name+','+ingredients[2].name+','+ingredients[3].name+','+ingredients[4].name,
              ranking: 2
            }
          }).then(recipes => {
            console.log(recipes);
            recipes.data.forEach(recipe => {
              getRecipeInstructions(recipe.id);
            })

          })*/
        },
        function(err) {
          console.log(err)
        }
      )
    }
  };

  

  render() {
    const { isFocused } = this.props
    if(this.state.isLoading){
      return (
        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
          <LottieView 
            source={require('../assets/cameraanimation.json')} 
            autoPlay 
            loop={true}
            
          />
        </View>
      )
    } else {
    return(
      <View style = { styles.container }>
        {
          (isFocused && !this.state.isLoading) && <RNCamera
          ref={ref => {
            this.camera = ref;
          }}

          style={ styles.preview }
          type={ RNCamera.Constants.Type.back }
          flashMode={ RNCamera.Constants.FlashMode.on }

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

         
        }
       <ImageBackground style={styles.cameraView} source={require('../assets/bottombar.png')}>
        <View style={styles.actionsContainer}>
          <View style={styles.snapContainer}>
            <TouchableOpacity onPress={this.takePicture.bind(this)}>
              <Image style={styles.cameraButton} source={require('../assets/camerabutton.png')}/>
            </TouchableOpacity>
          </View>
        </View>
     
      </ImageBackground>
          
      
      

      {/*
        <View style={{width: 220, height: 220, bottom: 300}}>  
        <LottieView 
        source={require('../assets/cameraanimation.json')} 
        autoPlay 
        loop={true}
        />
        </View>
      */}
    
    </View>
    
    )
    }
  }


  loadingView () {
      return (
        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
          <LottieView 
            source={require('../assets/cameraanimation.json')} 
            autoPlay 
            loop={true}
          />
        </View>
      )
  }
}
  
  const styles = StyleSheet.create({
    cameraButton:{
      width: 65,
      height: 65,
    },
    actionsContainer: {
      width: '100%',
      height: 200,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent:'center',
    },
    snapContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      width: '100%',
      height: 100,
      bottom: 55,
    },
    cameraView:{
      position: 'absolute',
      bottom: -80,
      zIndex: 100,
      width: '100%',
      height: 200,
      },
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



export default withNavigationFocus(Scanner);