import React from 'react';

const VolumeCtrl = (props) => {
    return (
        <div className="Volume_Ctrl">
            <input className="Volume_bar"
                type='range'
                min='0'
                max='1'
                step='0.05'
                defaultValue='1'
                onChange={(e)=>{
                    document.getElementById(props.idvalue).volume = e.target.value;
                }}
            />
        </div>
    );
}

export default VolumeCtrl;