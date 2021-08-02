import React,{Component} from 'react';
import Volume_Ctrl from './MusicCtrl/VolumeCtrl';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlay,faPause} from '@fortawesome/free-solid-svg-icons';


class Player_Obj extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            duration:0,
            current:0,
        };
        this.misc_playctrl = this.misc_playctrl.bind(this);
        this.TimeUpdate = this.TimeUpdate.bind(this);
    }
    UNSAFE_componentWillUpdate(nextProps, nextState) {
        const misc = document.getElementById(this.props.audio_id);
        nextState.playing||nextProps.is_allplay ? misc.play() : misc.pause();
    } 
    misc_playctrl() {
        this.setState({
            playing: !this.state.playing
        });
    }
    TimeUpdate(e){
        this.setState({
            current:e.target.currentTime,
        });
    }
    render(){ 
        return(
            <div className="Player_Frame">
            <audio
                id= {this.props.audio_id}
                className="audiodata"
                crossOrigin="annonymous"
                src={this.props.src}
                onTimeUpdate={this.TimeUpdate}
                onLoadedData={()=>{
                    this.setState({
                        duration: document.getElementById(this.props.audio_id).duration,
                    });
                }}
                onEnded={()=>{
                    this.setState({
                        playing: false,
                        current : 0,
                    });
                }}
                 
            />
            <div className="Player">
                <button className="play_btn"
                    onClick={this.misc_playctrl}>
                    {this.state.playing?
                    <FontAwesomeIcon className="playericon" icon={faPause} /> :
                    <FontAwesomeIcon className="playericon" icon={faPlay} />   
                }
                </button>
                <p className="misc_title">{this.props.title === undefined ? "NO TITLE" : this.props.title}</p>
                
                <div className="Player_Volume">
                    <Volume_Ctrl
                        idvalue= {this.props.audio_id}
                    />
                </div>

                <input
                    type="range"
                    className="misc_progress"
                    min= '0'
                    max= {this.state.duration}
                    step= '1'
                    value = {this.state.current}
                    onChange={(e)=>{
                        document.getElementById(this.props.audio_id).currentTime=e.target.value;
                    }}
                />
                

            </div>
        </div>
        );
    }
}

export default Player_Obj;