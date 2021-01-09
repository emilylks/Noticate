import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Landing from '../screens/Landing';

function Routes() {
  return (
    <Switch>
      <Route path="/landing" component={Landing} />
      {/* Revert to landing page if user is not authenticated */}
      <Route component={Landing} />
    </Switch>
  )
}

export default Routes;
