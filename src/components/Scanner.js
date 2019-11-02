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
      recipesFetched: false,
      showRecipe: false,
      card: null
    }
  }

  recipeDetails = {}
  recipeInstructinos = {}
  recipeIng = {}

  dummyData = [
    {
      imageURL: null,
      title: 'Dish 1',
      description: '',
      dishType: 'Snack',
      id: 0,
      description: 'Servings: 4\nTime to prepare: 45min',
    },
    {
      imageURL: null,
      title: 'Dish 2',
      description: '',
      dishType: 'Dairy',
      id: 1,
      description: 'Servings: 5\nTime to prepare: 55min',
    },
    {
      imageURL: null,
      title: 'Jelo 1',
      dishType: 'Main',
      id: 2,
      description: 'Servings: 6\nTime to prepare: 30min',
    },
    {
      imageURL: null,
      title: 'Jelo 1',
      dishType: 'Salad',
      id: 3,
      description: 'Servings: 10\nTime to prepare: 50min',
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
            recipes.data.forEach((ele, index) => {
              ele.usedIngredients.forEach(element => {
                if (this.recipeIng[ele.id] == undefined) {
                  this.recipeIng[ele.id] = [element.originalString]
                } else {
                  this.recipeIng[ele.id].push(element.originalString)
                }
              })

              ele.missedIngredients.forEach(element => {
                if (this.recipeIng[ele.id] == undefined) {
                  this.recipeIng[ele.id] = [element.originalString]
                } else {
                  this.recipeIng[ele.id].push(element.originalString)
                }
              })
            })
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

  goToYT = (text) => {
    Axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${text}&key=AIzaSyBOXgzYMf_rD4CzYvu8gKMG4FxotDEsHsg`).then( res => {
      console.log(`https://www.youtube.com/watch?v=${res.items.id.videoId}`)
    })
  }

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
      if(this.state.showRecipe){
        return(<View style={{backgroundColor: 'white', width: '100%', height: '100%',flexDirection: 'row'}}>
        <TouchableOpacity style={{top: 20,zIndex: 1000 }} onPress={()=>{this.setState({showRecipe: false})}}>
          <View><Image style={{ marginLeft:20}}source={require('../assets/left-arrow.png')}/></View>
          
        </TouchableOpacity>
        <View style={{position:'absolute', width: '100%', height: '30%', backgroundColor: 'rgba(255,120,120,0.5)',zIndex: 10,borderBottomLeftRadius: 10,borderBottomRightRadius: 10}}></View>
        <Image style={{right: 43,width: '100%', height: '30%', borderBottomLeftRadius: 10,borderBottomRightRadius: 10}} source={{uri: this.state.card.imageURL}}/>
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
                  this.recipeIng[this.state.card.id].map((ele, index) => {
                    return (<Text style={{position: 'absolute',fontSize:17,top: 390+index*25,left: 10,fontFamily:'Montserrat', color: 'gray'}}>{ele}</Text>)
                  })
                }

                <Text style={{fontSize: 15, color:'rgba(166, 171, 179,0.5)',fontFamily:'Montserrat-Light',position: 'absolute',top: 455, left: 10}}>
                  ___________________________________________________
                </Text>

                  
                  <Text style={{position: 'absolute',fontSize:28,top: 475,left: 10,fontFamily:'Montserrat', color: '#ff7878'}}>INSTRUCTIONS</Text>
                  <TouchableOpacity>
                  <Image style={{position: 'absolute', top: 450, left: 250,width: 30, height: 30}} source={require('../assets/youtube.png')}></Image>
                  </TouchableOpacity>

                {
                  this.recipeInstructinos[this.state.card.id].data[0].steps.map((ele, index) => {
                    return (
                      <Text style={{position: 'absolute',fontSize:17,top: 500+index*25,left: 10,fontFamily:'Montserrat', color: 'gray'}}>{ele.step}</Text>
                    )
                  })
                }
        </View>)
        
      }else{
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
                  <TouchableOpacity onPress={() => this.setState({showRecipe: true, card: card})}>
                        <Card img = {card.imageURL} title={card.title} description={card.description} dishType={card.dishType}/>
                  </TouchableOpacity>
                  )
                })
            }
          </ScrollView>
          </View>
          )    
      }
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