import React, { Component } from 'react';
import jsmediatags from 'jsmediatags';//npm install jsmediatags --save 로 설치를해야함
//import siiimpleToast from 'siiimple-toast';//(예상)메세지를 이쁘게 띄우게해주는 역할
//import 'siiimple-toast/dist/style.css';
//npm install --save siiimple-toast 설치
//npm install --save react-addons-update 설치
import update from 'react-addons-update';//배열을 효율적으로 수정할수있게하는 기능
//npm install --save axios
//import axios from 'axios'
//리액트 라우터를 사용하기위함(다중페이지)
import { BrowserRouter, Route } from 'react-router-dom';
import { Link, Switch } from 'react-router-dom';
//npm install node-id3
//import ID3 from 'node-id3';

import Header from './Header';
import LoginPage from './LoginPage';
import Visualizer from './Visualizer';
import MainPage from './MainPage';
import Create from './Create';


class App extends Component {
  constructor(props) {
    super(props);
    this.max_music_id = 0;
    this.state = {
      visualizeSet: {
        circle: 2 * Math.PI,
        radius: 200,
        objWidth: 8,
        objCount: 97,
        data: [],
      },
      playdata:[],
      login: false,
    };
    this.audiohandler = this.audiohandler.bind(this);
    this.visualizing = this.visualizing.bind(this);
    this.Debug_LoginCheck = this.Debug_LoginCheck.bind(this);
    this.fileChange = this.fileChange.bind(this);


    // initialState
    this.initialState = this.state;

    // Init Settings
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.7;
    this.analyser.fftSize = 2048;
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);


    // Toast Settiings
    // this.toast = new siiimpleToast();
    //이유는 모르지만 자꾸 에러걸림
    //웹팩으로 안묶어서 그런듯
  }


  Debug_LoginCheck(id, pass) {
    if (id === "admin" && pass === "qwer") {
      this.setState({
        login: true
      });

    }
  }

  visualizing() {
    const frequencyData = this.frequencyData;
    const analyser = this.analyser;
    requestAnimationFrame(this.visualizing);

    analyser.getByteFrequencyData(frequencyData);

    // visualiz object height changed
    this.setState({
      visualizeSet: update(
        this.state.visualizeSet, {
        data: { $set: frequencyData },
      },
      ),
    });
  }

  audiohandler(e) {
    const audioContext = this.audioContext;
    const source = audioContext.createMediaElementSource(e.target);
    const analyser = this.analyser;

    source.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  fileChange(e) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const dataFile = URL.createObjectURL(file);
      let playlist = this.state.playdata;
      //오디오 메타데이터를 읽어옴
      jsmediatags.read(file, {
        onSuccess: (tag) => {
          const tags = tag.tags;
          const tagTitle = tags.title;
          
        playlist= playlist.concat(
            {id:++this.max_music_id,title:tagTitle,src:dataFile}
            );
          this.setState({
            playdata: playlist
          });
        },
        onError: ()=>{
          console.log("no");
        }
        
      });

    }
  }



  render() {
    return (
      <div className="wrapper">
        <Header />
        {/*component도 있지만 render가 더 효율적이라한다*/}
        <Route exact path='/' render={() =>
          <LoginPage login={this.Debug_LoginCheck} />
        } />
        <Route exact path='/' render={() =>
          <Visualizer
            class='visualizer'
            color='rgb(229, 206, 208)'
            settings={this.state.visualizeSet}
            isMounted={this.visualizing}
            handlePlay={this.audiohandler}
          />} />


        <Route path='/main' render={() =>
          <MainPage />
        } />

        <Route path='/create' render={() =>
          <Create
            fileChange = {this.fileChange}
            music_length = {this.max_music_id}
            data = {this.state.playdata}
            //handlePlay = {this.audiohandler}
          />
        } />



        {/* <LoginPage
            login={this.Debug_LoginCheck}
          />
          <Visualizer
            class='visualizer'
            color='rgb(229, 206, 208)'
            settings={this.state.visualizeSet}
            isMounted={this.visualizing}
            handlePlay={this.audiohandler}
          /> */}
      </div>
    );
  }
}

export default App;
