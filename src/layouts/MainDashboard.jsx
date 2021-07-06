import React from 'react'
import JobAdvertisements from '../pages/JobAdvertisements'
import { Route } from 'react-router'
import AddJobAdvertisement from '../pages/AddJobAdvertisement'
import AdminDashboard from './admin/AdminDashboard'
import JobAdvertisementDetail from '../pages/JobAdvertisementDetail'
import AddUserCoverLetter from '../pages/AddUserCoverLetter'
import UserCv from '../pages/UserCv'

export default function MainDashboard() {
    return (
        <div>
            {/* <Container fluid className="main"> */}
                <Route exact path="/admin/verifyjobadvertisement" component={AdminDashboard} />

                <Route exact path="/" component={JobAdvertisements} />
                <Route exact path="/jobadvertisements" component={JobAdvertisements} />
                <Route exact path="/jobadvertisement/add" component={AddJobAdvertisement} />
                <Route exact path="/jobadvertisement/detail" component={JobAdvertisementDetail} />
                <Route exact path="/usercv" component={UserCv} />
                <Route exact path="/usercv/addusercoverletter" component={AddUserCoverLetter} />
            {/* </Container> */}
        </div>
    )
}
