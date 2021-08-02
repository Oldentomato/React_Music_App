import React, {Component} from 'react';
import $ from 'jquery';

class DragAndDrop extends Component {
  dragOver(e){
    e.stopPropagation();
    e.preventDefault();
    if(e.type == "dragover"){
      $(e.target).css({
        "background-color": "gray",
        "outline-offset": "-20px"
      });
    }else{
      $(e.target).css({
        "background-color": "black",
        "outline-offset": "-10px"
      });
    }
  }
  render(){
    return(
      <div>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <p>Drag And Drop Your Image!</p>
      <div className="Content"></div>
      <script type="text/javascript">
      $('.Content').on("dragover", this.dragOver(event));
      </script>
      </div>
    );
  }

}

export default DragAndDrop;
