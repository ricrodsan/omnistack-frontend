import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Main from '../src/pages/Main'
import Box from '../src/pages/Box'

const Routers = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/box/:id" exact component={Box} />
        </Switch>
    </BrowserRouter>
);

export default Routers
 
