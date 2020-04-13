import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { withDb } from './commons/DB';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './commons/theme/theme';

class App extends Component {  
    constructor(props){
        super(props)
        
        this.state = {
            insecure_psw: ""
        }
        this.dummy_password = "dummypassword"
    }
    dummyPsw = (e) =>{
        console.log(e.currentTarget)

        let booo = window.prompt("","");

        if (booo === this.dummy_password){
            this.setState({
                insecure_psw: this.dummy_password,
            })
        }
    }

    render(){ 
        
        return (
            <main>

                {this.state.insecure_psw !== "" && this.state.insecure_psw === this.dummy_password && (
                    <ThemeProvider theme={theme}>
                        <Switch>
                            <Route path="/" component={Home} exact />
                        </Switch>
                    </ThemeProvider>
                )}

                {this.state.insecure_psw !== "" && this.state.insecure_psw !== this.dummy_password && (
                    <p>site under construction...</p>
                )}

                {this.state.insecure_psw === "" && (
                    <p onClick={this.dummyPsw}>site under construction...</p>
                )}      

                



            </main>
        )
    }
}

export default withDb(App);
