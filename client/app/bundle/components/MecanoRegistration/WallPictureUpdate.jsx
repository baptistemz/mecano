import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateMecanoProfile, validateToken } from '../../actions/index';
import { Loader } from '../../common/index';
import getBase64 from '../../utils/getBase64'

class WallPictureUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = { loadingImage: false }
  }
  componentWillReceiveProps(nextprops){
    const loadingImage = !nextprops.wall_picture
    this.setState({ loadingImage })
    if(!loadingImage){
      $('#wall_picture_modal').modal('close');
    }
  }
  handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setState({ loadingImage: true });
      this.props.updateMecanoProfile(this.props.mecano_id, { wall_picture: reader.result }).then(()=>{
        this.props.validateToken();
      })
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render(){
    const img = this.state.loadingImage ? <Loader/> : <div style={{ backgroundImage:`url(${this.props.wall_picture})`,
                                                                    backgroundSize: "cover",
                                                                    backgroundPosition: "center",
                                                                    height: "200px", width: "70%"}} className="margin-auto"
                                                                    />
    return (
      <div>
        {img}
        <br/>
        <div className="picture-update-group">
          <label htmlFor={"file"} className="fileLabel margin-auto"><div className="btn">Choisir une image</div></label>
          <input id="file" className="fileInput"
            type="file"
            onChange={(e)=>this.handleImageChange(e)} />
        </div>
      </div>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateMecanoProfile, validateToken }, dispatch);
}

function mapStateToProps({ mecano }) {
  return {
    mecano_id: mecano.id,
    wall_picture: mecano.wall_picture.url
  }
}

WallPictureUpdate = connect(mapStateToProps, mapDispatchToProps)(WallPictureUpdate);

export { WallPictureUpdate };
