import React, { Component } from 'react';
import Player_Obj from './Player_Obj';
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Create extends Component {
    constructor(props) {
        super(props);
        this.state={
            all_playing: false,
        };
        this.selectMusic = this.selectMusic.bind(this);
        this.getaudio = this.getaudio.bind(this);
        this.all_playing = this.all_playing.bind(this);
    }
    
    selectMusic() {
        const file = document.getElementById('inputFile');
        file.click();
    }

    all_playing(){
        this.setState({
            all_playing: !this.state.all_playing,
        });
    }


    getaudio() {
        var getaudio = [];
        const audioid= "audioFile ";
        for (let i = 0; i < this.props.music_length; i++) {
            //UNSAFE_componentWillUpdate()함수를 사용하기위해서는
            //audio객체가 생성되어있어야하기때문에 따로 나눠놓았다
            getaudio[i] = 
                <Player_Obj
                src = {this.props.data[i].src}
                audio_id = {audioid+i}
                key = {i}
                title = {this.props.data[i].title}
                is_allplay = {this.state.all_playing}
            />

        }
        return getaudio;
    }
    render() {
        
        const invisible = {
            width: 0,
            height: 0,
            opacity: 0,
        };
        const btn = {
            width: '150px',
            height: '100px',
            border: `1px solid rgb(255, 255, 255)`,
            color: 'white',
            backgroundColor: 'black',
        };
        return (
            <div className="Create">
                <div className="File_Input">
                    <input
                        id="inputFile"
                        type="file"
                        accept="audio/*"
                        style={invisible}
                        multiple
                        onChange={this.props.fileChange}
                    />
                    <button
                        id = "input_btn"
                        style={btn}
                        onClick={this.selectMusic}
                    >Open files</button>
                </div>
                <div className = "AudioPlayer">
                    {/* <button className="allplaybtn"
                        onClick={this.all_playing}>
                        {this.state.all_playing?
                        <FontAwesomeIcon className="allplayericon" icon={faPause}/> :
                        <FontAwesomeIcon className="allplayericon" icon={faPlay}/>    
                    }
                    </button> */}
                    {this.getaudio()}   
                </div>
                

            </div>
        );
    }
}

export default Create;