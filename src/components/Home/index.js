import React from 'react';
import { Card } from 'react-bootstrap';

import { withAuthorization } from '../Session';

const HomePage = () => (
    <div className="p-5">
        <h1>Your Dashboard</h1>
        {/*https://demos.creative-tim.com/material-dashboard-react/#/admin/dashboard */}
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);