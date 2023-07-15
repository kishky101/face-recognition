import React, {Component} from 'react';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/image-form-link/image-form-link';
import Rank from './components/rank/rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/face-recognition/face-recognition';
import SignIn from './components/sign-in/sign-in';
import Register from './components/register/register';
import './App.css'

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }


  loadUser = (data) => {
    this.setState({user: data})
  }
  

  faceDetection = (data) => {
    const clarifiRegions = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifiRegions.left_col * width,
      rightCol: width - (clarifiRegions.right_col * width),
      topRow: clarifiRegions.top_row * height,
      bottomRow: height - (clarifiRegions.bottom_row * height)
    }
  }


  displayFaceBox = (box) => {
    this.setState({box: box})
  }


  // clarifiFunc = (imageUrl) => {
  //   const PAT = '86eb428e996e4529893918b9c66b94e6';
  //   const USER_ID = 'kishky';       
  //   const APP_ID = 'face-recognition';
  //   const MODEL_ID = 'face-detection';  
  //   const IMAGE_URL = imageUrl;
  
  //   const raw = JSON.stringify({
  //       "user_app_id": {
  //           "user_id": USER_ID,
  //           "app_id": APP_ID
  //       },
  //       "inputs": [
  //           {
  //               "data": {
  //                   "image": {
  //                       "url": IMAGE_URL
  //                   }
  //               }
  //           }
  //       ]
  //   });

  //   return {
  //       method: 'POST',
  //       headers: {
  //           'Accept': 'application/json',
  //           'Authorization': 'Key ' + PAT
  //       },
  //       body: raw
  //   };
  // }

  // imageApiCall = async () => {
  //   const data = await fetch('/imageurl', {
  //     method: 'POST',
  //     headers: {
  //         'content-type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       id: this.state.imageUrl
  //     })
  //   })

  //   return data;

  // }


  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }


  onSubmitButton = async () => {
    this.setState({imageUrl: this.state.input}, async () => {
      try {
        const response = await fetch('https://face-recognition-api-xts6.onrender.com/imageurl', {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify({
            imageUrl: this.state.imageUrl
          })
        });

        const result_1 = await response.json();

        if (result_1.status) {
          fetch('https://face-recognition-api-xts6.onrender.com/image', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
        }).then(response => response.json())
        .then(data => {
            this.setState({user: {...this.state.user, entries: data}})
        }).catch(console.log)
        }
        return this.displayFaceBox(this.faceDetection(result_1));
      } catch (error) {
        return console.log('error', error);
      }
    })
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({isSignedIn: true})
    }else {
      this.setState(initialState)
    } 
    this.setState({route})
  }


  render() {
    return (
      <div className="App">
        <ParticlesBg color='#ffffff' num={200} type="cobweb" bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {this.state.route === 'home' ? 
        <div>
          <Logo />
          <Rank userName={this.state.user.name} userRank={this.state.user.entries} />
          <ImageLinkForm 
            onInputChange = {this.onInputChange} 
            onSubmitButton = {this.onSubmitButton} 
          />
          <FaceRecognition imageUrl = {this.state.imageUrl} box = {this.state.box} />
        </div> : 
        (this.state.route === 'signin' ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
        }
      </div>
    )
  }
}


export default App
