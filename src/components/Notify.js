import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";
import Fade from '@material-ui/core/Fade';



const styles = theme => ({
    spinner: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(50%, -50%)",
    }
});

class Notify extends Component {  
    constructor(props){
        super(props);
        this.state = {
            messageSnackbar: '',
            openedSnackbar: false,
            isLoading: false
        };
        
    }
    closeSnackbar = () => {
        this.setState({
            openedSnackbar: false,
            messageSnackbar: "",
        })
    }
    openSnackbar = (message) => {

        if (message !== null && message !== "" && message !== this.state.messageSnackbar){
            this.setState({
                messageSnackbar: message,
                openedSnackbar: true
            })

            console.warn(message)
        }
        
    }
    triggerLoading = (val) => {
        if ( val !== this.state.isLoading){

            this.setState({
                isLoading: val
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sendMessage != null){
            this.openSnackbar(nextProps.sendMessage)
        }

        if (nextProps.triggerLoading != null){
            this.triggerLoading(nextProps.triggerLoading)
        }
     
    }

    render(){ 
        const { classes } = this.props;

        return (
           <div>
            <Snackbar
                open={this.state.openedSnackbar}
                autoHideDuration={2000}
                onClose={this.closeSnackbar}
                message={this.state.messageSnackbar}
                action={
                <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.closeSnackbar}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
                }
            />

                <div className={classes.spinner}>
                    <Fade
                        in={this.state.isLoading}
                        style={{
                            transitionDelay: '1000ms',
                        }}
                        unmountOnExit
                    >
                        <CircularProgress color="secondary" />
                    </Fade>
                </div>
            

           </div>
        )
    }
}

export default withStyles(styles)(Notify);
