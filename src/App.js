import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { withDb } from './commons/DB';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './commons/theme/theme';

class App extends Component {  

    render(){ 
        
        return (
            <main>

                <ThemeProvider theme={theme}>
                    <Switch>
                        <Route path="/" component={Home} exact />
                    </Switch>
                </ThemeProvider>
            
            </main>
        )
    }
}

export default withDb(App);
