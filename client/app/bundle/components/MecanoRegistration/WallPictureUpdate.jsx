import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import toastr from 'react-redux-toastr';
import { updateMecanoProfile, validateToken, mecanoRegistrationError } from '../../actions/index';
import { Loader } from '../../common/index';
import getBase64 from '../../utils/getBase64'

class WallPictureUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = { loadingImage: false }
  }
  componentWillReceiveProps(nextprops){
    const loadingImage = (nextprops.wall_picture === this.props.wall_picture);
    const loadingError = nextprops.error;
    this.setState({ loadingImage });
    if(!loadingImage && !loadingError){
      $('#wall_picture_modal').modal('close');
    }
  }
  handleImageChange(e) {
    const { mecanoRegistrationError, updateMecanoProfile, mecano_id, validateToken } = this.props;
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => {
      var image = new Image();
      image.src = reader.result;
      image.onload = (e) => {
        if(e.path[0].width < 600 || e.path[0].width > 2400){
          mecanoRegistrationError({wall_picture: "les dimensions de l'image doivent être comprises entre 600x200 et 2400x800"})
        }else{
          this.setState({ loadingImage: true });
          updateMecanoProfile(mecano_id, { wall_picture: reader.result }).then(()=>{
            validateToken();
          })
        }
      };
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  render(){
    const { wall_picture, error } = this.props;
    const img = this.state.loadingImage ? <Loader/> : <div style={{ backgroundImage:`url(${wall_picture})`,
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
        <p className="red-text">{error}</p>
      </div>
    );
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateMecanoProfile, validateToken, mecanoRegistrationError }, dispatch);
}

function mapStateToProps({ mecano }) {
  return {
    mecano_id: mecano.id,
    wall_picture: mecano.wall_picture.url,
    error: mecano.errors.wall_picture
  }
}

WallPictureUpdate = connect(mapStateToProps, mapDispatchToProps)(WallPictureUpdate);

export { WallPictureUpdate };
