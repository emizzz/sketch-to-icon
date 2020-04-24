import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';




const styles = theme => ({

  container: {
    height: "70vh",
    overflow: "scroll",
    overflowX: "hidden",
  },
  paperContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    textAlign: "center",
    padding: "1.5rem !important",
  },
  text: {
    padding: "1.5rem !important",
  }
	
});


class IconsList extends Component {  
    constructor(props){
        super(props)

        this.state = {
            'list' : [],
        }

        this.fontAwesomePath = "https://fontawesome.com/icons/"
    }

    // this is fontawesome dependant
    buildFontAwesomeLink = (data) =>{
        data = data.split("_");
        let cat  = data[0];
        let name =  data[1];
        let style = ""

        switch (cat) {
            case "fas":
                style = "solid";
                break;
            case "far":
                style = "regular";
                break;
            case "fab":
                style = "brands";
                break;
            default:
                return "#";
          }
        return `${this.fontAwesomePath}${name}?style=${style}`
    }

    buildFontAwesomeTagAndName(data){
        data = data.split("_");
        let cat  = data[0];
        let name =  data[1];
        let tag = `<i class='${cat} fa-${name}'></i>`
        return [tag, name]
    }


    // https://stackoverflow.com/questions/44774820/copying-to-clipboard-with-document-execcommandcopy-fails-with-big-texts
    copyToClipboard = (e) => {
        let element = e.currentTarget.querySelector("code")
        let text = element.innerText
              
        // it's a hack
        var textArea = document.createElement('textarea');
        textArea.style.position = 'absolute';
        textArea.style.opacity = '0';
        textArea.value = text;
        document.body.appendChild(textArea);
        
        var execCopy = e => {   
            textArea.select();
            var successful = document.execCommand('copy');
            if (successful) this.props.isCodeCopied()
            document.body.removeChild(textArea);
        };

        element.addEventListener('mouseup', execCopy, {
            once: true 
        });
    }
        
    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.input || [],
        });
    }
    
    render(){ 
        const { classes } = this.props;
        return (
    
                <Paper className={classes.container}>
                    {this.state.list.map((item, i) => {  
                        
                        let tag_and_name = this.buildFontAwesomeTagAndName(item.name)
                        let fontaw_link = this.buildFontAwesomeLink(item.name)

                        return(
                            <Zoom in={true} style={{ transitionDelay: `${i*30}ms` }} key={i}>

                                <Paper>
                                    <Grid container     className={classes.paperContainer}>
                                        <Grid item xs={3} className={classes.icon}>
                                            <a href={fontaw_link} target="_blank" rel="noopener noreferrer">
                                                <img alt={`icon ${tag_and_name[1]}`} width="50" height="50" src={`data:image/svg+xml;utf8,${item.svg_data}`} />
                                            </a>
                                        </Grid>
                                        <Grid item xs={9} className={classes.text}>  
                                            <div>
                                                <Typography variant="h6" color="primary">
                                                    {tag_and_name[1]}
                                                </Typography> 
                                            </div>
                                            <div>
                                                <Typography variant="body1">
                                                    <a href="#" onMouseDown={this.copyToClipboard}><code>{tag_and_name[0]}</code></a>
                                                </Typography>     
                                            </div>
                                        </Grid>                     

                                    </Grid>
                                </Paper>
                            </Zoom>
                        ) 
                    })}
                </Paper>   
            
        )

    }
}

export default withStyles(styles)(IconsList);
