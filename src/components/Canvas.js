import React, { Component } from 'react';
import CanvasDraw from "react-canvas-draw";
import ImageUtilities from './ImageUtilities';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';


/*

TODO: install the update version of react-canvas-draw
this is my version with the "save in jpeg" feature
(installed locally with npm install ./some folders.../React\ Canvas\ Draw/react-canvas-draw/)

TODO: initial image when the user trigger the white canvas?
*/



const styles = theme => ({
    container: {
        textAlign: "center",
    },
    canvas: {
        margin: "auto",
        border: `1px solid ${theme.palette.primary.main}`,
    },
    btn:{
        margin: "1rem",
    }
    
	
});



class Canvas extends Component {  
    constructor(props){
        super(props)

        this.canvas = null

        const canvasWidth = 300;
        const brushWidth = canvasWidth / 20; 
        
        this.default_props = {
            onChange: null,
            loadTimeOffset: 1,
            lazyRadius: (window.innerWidth < 1200) ? brushWidth/2 : brushWidth * 1.2, 
            brushRadius: brushWidth, 
            brushColor: "#000",
            catenaryColor: "#ffb300",
            gridColor: "rgba(150,150,150,0.17)",
            hideGrid: false,
            canvasWidth: canvasWidth,
            canvasHeight: canvasWidth,
            disabled: false,
            imgSrc: "",
            saveData: null,
            immediateLoading: false,
            hideInterface: false
        };
    }
    async onSaveImg(im_data){
        let im = null
        if(im_data){
            im = await ImageUtilities.loadImg(im_data, 32, 32)
        }
    
        this.props.output(im)
    }
    clearCanvas(){
        this.canvas.clear()

        this.onSaveImg(null)
    }
    
    render(){ 
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <CanvasDraw {...this.default_props} ref={c => (this.canvas = c)} className={classes.canvas} />  
                
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={() => {this.clearCanvas()}}
                    className={classes.btn}>
                Reset
                </Button>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => {this.onSaveImg(this.canvas.getSaveData('jpeg'))}}
                    className={classes.btn}>
                    Search
                </Button>
            </div>
        )
    }
}

export default withStyles(styles)(Canvas);
