import React, { Component } from 'react';
import Layout from './Layout';
import Model from '../components/Model';
import Canvas from '../components/Canvas';
import IconsList from '../components/IconsList';
import { withDb } from '../commons/DB';
import ImageUtilities from '../components/ImageUtilities';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import Notify from '../components/Notify';


const styles = theme => ({
	container: {
    minHeight: "90vh",
    
    [theme.breakpoints.down('sm')]: {
      marginTop: "1rem",
    },

  },
	
});

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      input_image: null,
      embeddings: null,
      ready_model: false,
      errors: "",
      is_loading: false,
    };
    this.icons = []
  }

  async componentDidMount(){

    try{
      this.icons = await this.props.db.getIcons()
    }
    catch{
      this.setState({
        errors: "Sorry, the server is down :(",
      });
    }
  }


  getSimilarEmbeddings = async(output) => {
    let embeddings = []

    try{
 
      if (this.icons.length === 0) throw "Error";

      embeddings = ImageUtilities.get_most_similar_vectors(output, this.icons, 20)

    }
    catch (e) {

      this.setState({
        errors: "Houston, we have a problem!",
      });

    }

    this.setState({
      embeddings: embeddings,
      input_image: null,
      is_loading: false,
    });
    
  }

  setInputImage = (img) => {
    if (this.state.ready_model){

      this.setState({
        embeddings: null,
        input_image: img,
        errors: "",
        is_loading: (img != null ? true : false)
      });

    }
    else{
      this.setState({
        errors: "The model is not loaded yet",
      });
    }
    
  }

  isModelReady = (res) => {
    this.setState({
      ready_model: res,
    });
    
  }

  codeCopy = () => {
    this.setState({
      errors: "Copied to Clipboard :)",
    });
  }


	render() {
    const { classes } = this.props;
    return (
      
    	<Layout>
    		<section className={classes.container}>

          <Grid container spacing={3} className={classes.container} alignContent="center">
            <Grid item xs={12} sm={6}  >
              <Canvas output = { this.setInputImage } />
            </Grid>
            <Grid item xs={12} sm={4}>
              <IconsList 
                input={ this.state.embeddings } 
                isCodeCopied={this.codeCopy}
              />

            </Grid>
          </Grid>

          <Model 
            input={ this.state.input_image } 
            output ={ this.getSimilarEmbeddings } 
            isModelReady={ this.isModelReady }
          /> 

          <Notify 
            sendMessage={this.state.errors}
            triggerLoading={this.state.is_loading}
          /> 

          </section>
    	</Layout>
    );
  }
}

export default withDb(withStyles(styles)(Home));
