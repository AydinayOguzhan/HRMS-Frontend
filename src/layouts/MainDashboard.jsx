import React from 'react'
import { Container } from 'semantic-ui-react'
import JobAdvertisements from '../pages/JobAdvertisements'
import Navi from './Navi'
import { Route } from 'react-router'
import AddJobAdvertisement from '../pages/AddJobAdvertisement'
import AdminDashboard from './admin/AdminDashboard'

export default function MainDashboard() {
    return (
        <div>
            <Navi />
            <Container fluid className="main">
                <Route exact path="/admin/verifyjobadvertisement" component={AdminDashboard} />

                <Route exact path="/" component={JobAdvertisements} />
                <Route exact path="/jobadvertisements" component={JobAdvertisements} />
                <Route exact path="/jobadvertisement/add" component={AddJobAdvertisement} />
            </Container>
        </div>
    )
}
