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
import Card from './Recent/Card'
import { ScrollView } from 'react-native-gesture-handler';


const clarifaiAPI = new Clarifai.App({
  apiKey: '5752fa421b5046f08055ccfebd3e6c23'
 });



 async function getRecipeInstructions(recipeID) {
  return await Axios.get('https://api.spoonacular.com/recipes/'+recipeID+'/analyzedInstructions', {
          params:{
            apiKey: 'e17b83d1119341a997fcfc6d7b4849d0',
            stepBreakdown: true
          }
    })
    
}

async function getRecipeDetails(recipeID) {
  return await Axios.get(`https://api.spoonacular.com/recipes/${recipeID}/information`, {
    params: {
      apiKey: 'e17b83d1119341a997fcfc6d7b4849d0',
    }
  }).then(details => {

  })
}

class Scanner extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      recipesFetched: false
    }
  }

  recipeDetails = {}
  recipeInstructinos = {}

  dummyData = [
    {
      imageURL: null,
      title: 'Dish 1',
      description: '',
      dishType: 'Snack',
      id: 0
    },
    {
      imageURL: null,
      title: 'Dish 2',
      description: '',
      dishType: 'Dairy',
      id: 1
    },
    {
      imageURL: null,
      title: 'Jelo 1',
      dishType: 'Main',
      id: 2
    },
    {
      imageURL: null,
      title: 'Jelo 1',
      dishType: 'Salad',
      id: 3
    },
  ]

  takePicture = async() => {
    this.setState({recipesFetched: false})
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      this.setState({isLoading: true})
      clarifaiAPI.models.predict('Chefyk', {base64: data.base64}).then(response => {
          var ingredients = response.outputs[0].data.concepts;
          console.log(ingredients);
  
          Axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            params:{
              number: 5,
              apiKey: 'e17b83d1119341a997fcfc6d7b4849d0',
              ingredients: ingredients[0].name+','+ingredients[1].name+','+ingredients[2].name+','+ingredients[3].name+','+ingredients[4].name,
              ranking: 2
            }
          }).then(recipes => {
            this.dummyData.forEach((card,i) => {
              card.imageURL = recipes.data[i].image
              card.title = recipes.data[i].title
              card.id = recipes.data[i].id
            })
            console.log(recipes);
            recipes.data.forEach(async recipe => {
              const [instructions, details] = await Promise.all([getRecipeInstructions(recipe.id), getRecipeDetails(recipe.id)])

              this.recipeInstructinos[recipe.id] = instructions
              this.recipeDetails[recipe.id] = details
            })
              this.setState({isLoading: false});
              this.setState({recipesFetched: true})
          })
        },
        function(err) {
          console.log(err)
        }
      )
      
    }
  };

  openCard = (card) => {
    let details = this.recipeDetails[card.id]
    let instructions = this.recipeInstructinos[card.id]

    return(
      <View style={{backgroundColor: '#ff7878', width: '100%', height: '100%', alignItems: 'center', flexDirection: 'row'}}>
        <View>
          <Text>{details.title}</Text>

          <View></View>

          <Text>Servings: {details.servings}</Text>
          <Text>Time to prepare: {details.readyInMinutes} minutes</Text>

          <View></View>

          <View></View>

          <Text>INGRIDIENTS</Text>

          <View></View>

          <View></View>

          <View>
            <Text>INSTRUCTIONS</Text>
            <Image></Image>
          </View>

          <View></View>
        </View>
      </View>
    )
  }
 

  render() {
    const { isFocused } = this.props
    if(this.state.recipesFetched){
      return(
      <View>
        <View style={{backgroundColor: '#ff7878', width: '100%', height: 50,alignItems: 'center',flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=>{
          this.setState({isLoading: false});
          this.setState({recipesFetched: false})
        }}>
          <Image style={{ marginLeft:20 }}source={require('../assets/left-arrow.png')}/>
        </TouchableOpacity>
         <View style={{width: 100}}/>
          <Text style={{color: 'white',fontWeight: 'bold',fontSize:25}}>RECIPES</Text>
        </View>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        {
        this.dummyData.map(card => {
              return (
              <TouchableOpacity onPress={() => this.openCard(card)}>
                    <Card img = {card.imageURL} title={card.title} description={card.description} dishType={card.dishType}/>
              </TouchableOpacity>
              )
            })
        }
      </ScrollView>
      </View>
      )
      
    }
    else if(this.state.isLoading){
      return (
        <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
          <LottieView 
            source={require('../assets/cameraanimation.json')} 
            autoPlay 
            loop={true}
            
          />
          <Text style={{fontFamily: 'Montserrat-Light', color:'#707070', fontSize: 23, top: 100}}>Mixing your ingredients</Text>
        </View>
      )
    } else {
    return(
      <View style = { styles.container }>
        {
          (isFocused && !this.state.isLoading && !this.state.recipesFetched) && <RNCamera
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