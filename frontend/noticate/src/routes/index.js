import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Landing from '../screens/Landing';
import Feed from '../screens/Feed';

function Routes() {
  return (
    <Switch>
      <Route path="/landing" exact component={Landing} />
      <Route path="/feed" component={Feed} />
      {/* Revert to landing page if user is not authenticated */}
      <Route component={Landing} />
    </Switch>
  )
}

export default Routes;
