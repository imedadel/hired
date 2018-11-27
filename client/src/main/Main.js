import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../home/Home';
import Candids from '../candids/Candids';
import Jobs from '../jobs/Jobs';
import Explore from '../explore/Explore';
import Stats from '../stats/Stats';


const Main = () => (

    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/candids' component={Candids}/>
        <Route path='/jobs' component={Jobs}/>
        <Route path='/explore' component={Explore}/>
        <Route path='/stats' component={Stats}/>
    </Switch>

);

export default Main;