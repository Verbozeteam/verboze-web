/* @flow */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Features from './Features';
import AboutUs from './AboutUs';
import Contact from './Contact'


const Content = () => (
    <Switch>
      <Route path='/features' component={Features}/>
      <Route path='/about-us' component={AboutUs}/>
      <Route path='/contact' component={Contact}/>
      <Route exact path='/' component={Home}/>
    </Switch>
)

export default Content
