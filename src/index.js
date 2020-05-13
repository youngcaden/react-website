<<<<<<< HEAD
// import React from 'react';

import ReactDOM from 'react-dom';

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'    //react-router-dom


// import './css/index.css';
// import App from './App';
// import Profile from './components/profile'
// import Administrator from './components/administrator'
// import EditArticle from './components/editArticle'
// import ArticleContent from './components/articleContent'
// import Notfound from './components/notfound'
// // import Test from './components/Test'
// import Demo from './components/demo'
// import CommitSuccess from './components/commitSuccess'

import routings from './router/router'
import * as serviceWorker from './serviceWorker';


// const routings = (
//     //    <Router  basename="/blog"></Router>
//         <Router>
//             <Switch>
//                 <Route exact path="/" component={App}></Route>
//                 <Route exact path="/more" component={Profile}></Route>
//                 <Route exact path="/administrator" component={Administrator}></Route>
//                 <Route exact path="/article" component={EditArticle}></Route>
//                 <Route exact path="/article/:index" component={ArticleContent}></Route>
//                 <Route eaact path="/test" component={CommitSuccess}></Route>
//                 <Route exact path="/board" component={Notfound}></Route>
//             </Switch>
//         </Router>

// )
=======
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'    //react-router-dom


import './css/index.css';
import App from './App';
import Profile from './components/profile'
import Administrator from './components/administrator'
import EditArticle from './components/editArticle'
import ArticleContent from './components/articleContent'
import Notfound from './components/notfound'
// import Test from './components/Test'
import Demo from './components/demo'
import CommitSuccess from './components/commitSuccess'

import * as serviceWorker from './serviceWorker';


const routings = (

        <Router  basename="/blog">
            <Switch>
                <Route exact path="/" component={App}></Route>
                <Route exact path="/more" component={Profile}></Route>
                <Route exact path="/administrator" component={Administrator}></Route>
                <Route exact path="/article" component={EditArticle}></Route>
                <Route exact path="/article/:index" component={ArticleContent}></Route>
                <Route eaact path="/test" component={CommitSuccess}></Route>
                <Route component={Notfound}></Route>
            </Switch>
        </Router>

)
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a

ReactDOM.render( routings, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
