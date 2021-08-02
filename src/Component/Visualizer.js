import React, { Component } from 'react';
import VolumeCtrl from './MusicCtrl/VolumeCtrl';
//npm install react-slick
//손으로 페이지넘기는 라이브러리
//import Slider from 'react-slick';
//import Slider from 'react-slider';

class Visualizer extends Component {
    componentDidMount() {//컴포넌트가 생성되고 render()이후 호출
        this.props.isMounted();//컴포넌트의 마운트가 해제된후 setState()를 호출하지않도록하기위함
    }
    componentDidUpdate() { //props가 업데이트될때 3개의 함수를 거친다음 호출되는 함수 (render()이후 호출)
        const newData = this.props.settings.data;
        const visualizerScale = newData.length ? (newData.reduce((prev, curr, i) => prev + curr) / newData.length / 750) + 1 : 1;

        if (visualizerScale > 1) {
            document.getElementById('visualizer').style.transform = `scale(${visualizerScale})`;

        }
    }


    render() {
        //색상팔레트
        var pallet = ["#F15F5F", "#F29661", "#F2CB61", "#E5D85C", "#BCE55C", "#86E57F", "#5CD1E5", "#6799FF", "#6B66FF", "#A566FF", "#F361DC", "#F361A6", "#A6A6A6", "#8C8C8C"];
        // var pallet = ["#FF0000", "#FF5E00", "#FFBB00", "#FFE400", "#ABF200", "#1DDB16", "#00D8FF", "#0054FF", "#0100FF", "#5F00FF", "#FF00DD", "#FF007F", "#000000", "#FFFFFF",
        // "#FFD8D8", "#FAE0D4", "#FAECC5", "#FAF4C0", "#E4F7BA", "#CEFBC9", "#D4F4FA", "#D9E5FF", "#DAD9FF", "#E8D9FF", "#FFD9FA", "#FFD9EC", "#F6F6F6", "#EAEAEA",
        // "#FFA7A7", "#FFC19E", "#FFE08C", "#FAED7D", "#CEF279", "#B7F0B1", "#B2EBF4", "#B2CCFF", "#B5B2FF", "#D1B2FF", "#FFB2F5", "#FFB2D9", "#D5D5D5", "#BDBDBD",
        // "#F15F5F", "#F29661", "#F2CB61", "#E5D85C", "#BCE55C", "#86E57F", "#5CD1E5", "#6799FF", "#6B66FF", "#A566FF", "#F361DC", "#F361A6", "#A6A6A6", "#8C8C8C",
        // "#CC3D3D", "#CC723D", "#CCA63D", "#C4B73B", "#9FC93C", "#47C83E", "#3DB7CC", "#4374D9", "#4641D9", "#8041D9", "#D941C5", "#D9418C", "#747474", "#5D5D5D",
        // "#980000", "#993800", "#997000", "#998A00", "#6B9900", "#2F9D27", "#008299", "#003399", "#050099", "#3F0099", "#990085", "#99004C", "#4C4C4C", "#353535",
        // "#670000", "#662500", "#664B00", "#665C00", "#476600", "#22741C", "#005766", "#002266", "#030066", "#2A0066", "#660058", "#660033", "#212121", "#191919"];
        // style settings
        const radius = this.props.settings.radius;


        // obj visual sets
        const newData = this.props.settings.data;
        const visualObj = [];
        const objWidth = this.props.settings.objWidth;
        const color = this.props.color;
        const circle = this.props.settings.circle;
        const step = this.props.settings.circle / this.props.settings.objCount;

        const audio_id = 'login_audio';

        const circleStyle = { //기본 원의 스타일
            width: (radius * 2),
            height: (radius * 2),
            background: 'rgb(32,32,32)',
        };

        for (let deg = 0, i = 0, color = 0; deg < circle; deg += step, i += 1, color++) { //degree 각도
            const x = radius * Math.cos(deg);
            const y = radius * Math.sin(deg);
            const rad = deg - 1.57;// minus 90deg


            const styles = {//각 사운드바 스타일
                left: x,
                top: y,
                height: 10 + (newData[i] * 0.8),
                width: objWidth,
                backgroundColor: pallet[color],
                transform: `rotate(${rad}rad)`,
            };

            visualObj.push(
                <div key={i} style={styles} />,
            );
            if (color === pallet.length - 1) {
                color = 0;
            }
        }

        return (
            <div id="visualmusic">
                <div className="Login_Volume">
                    <VolumeCtrl
                        idvalue= {audio_id}
                    />
                </div>
                <div id="visualizer" className={this.props.class}>
                    <div id="innerCircle" style={circleStyle} />
                    <audio id={audio_id}
                        src="Beck - Colors.mp3"
                        autoPlay loop
                        onLoadedData={this.props.handlePlay} />
                    {visualObj}
                </div>
            </div>
        );
    }
}
export default Visualizer;