import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider  } from 'react-redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import pageApp from './reducers';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';


import ItemList from './components/ItemList';
import ItemWrite from './components/ItemWrite';
import MenuWrite from './components/MenuWrite';

const store = createStore(pageApp);


const theme = createMuiTheme({
   
  });

ReactDOM.render(
<MuiThemeProvider theme={theme}>
<Provider store = {store}>
<BrowserRouter> 
    <Route path="/" component={App}></Route> 
    </BrowserRouter>
</Provider>
</MuiThemeProvider>, 
document.getElementById('root'));

    
registerServiceWorker();
