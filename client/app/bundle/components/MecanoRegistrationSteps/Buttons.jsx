import React, { Component } from 'react';
import { Button } from '../../common/Button';


class Buttons extends Component {
  renderButtonGroup(){
    const { step, onNext, onPrevious } = this.props;
    if(step === 1){
      return (
        <div className="space-between">
          <div></div>
          <a onClick={onNext} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_right</i></a>
        </div>
      );
    }else if(step === 2){
      return (
        <div className="space-between">
          <a onClick={onPrevious} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_left</i></a>
          <a onClick={onNext} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_right</i></a>
        </div>
      );
    }else if(step === 3){
      return (
        <div>
          <a onClick={onPrevious} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_left</i></a>
          <Button className="col s12 m6 offset-m3 l4 offset-l4">Etape suivante</Button>
        </div>
      );
    }else{
      return (
        <div className="space-between">
          <div></div>
          <a onClick={onNext} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">keyboard_arrow_right</i></a>
        </div>
      );
    }
  }
  render(){
    return (
      <div className="margin-top-50">
        {this.renderButtonGroup()}
      </div>
    );
  }
}

export { Buttons };
