
import { Component } from 'react';
import * as tf from '@tensorflow/tfjs';

import { withDb } from '../commons/DB';
import ImageUtilities from './ImageUtilities';

class Model extends Component {


  constructor(props){
    super(props)

    this.state = {
      model: null
    }

  
  }
  predict(t){
    if (this.state.model){
      return this.state.model.predict(t)
    }
    return null
  }
  
  async componentDidMount() {
    await tf.ready()

    let modelPath = this.props.db.getModelPath()

    tf.loadLayersModel(modelPath).then((model) => {
      this.setState({
        model: model
      })
      this.props.isModelReady(true)
    });
  
  }


  async componentWillReceiveProps(nextProps) {

    if (nextProps.input){

      let im = await ImageUtilities.loadImg(nextProps.input.src, 32, 32)
      
      im = await ImageUtilities.contour_img(im)
      
      let tensor = ImageUtilities.im_to_tensor(im)
      tensor = ImageUtilities.tensor_preprocess(tensor)
      tensor = ImageUtilities.expand_tensor(tensor)         
      
      let prediction = this.predict(tensor);

      if (prediction){
        prediction = ImageUtilities.tensor_to_array(prediction)[0]
        nextProps.output(prediction)
      }
      
    }
  }

  render() {
    return null;
  }
}

export default withDb(Model);
