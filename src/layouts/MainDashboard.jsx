import React from 'react'
import JobAdvertisements from '../pages/JobAdvertisements'
import { Route } from 'react-router'
import AddJobAdvertisement from '../pages/AddJobAdvertisement'
import AdminDashboard from './admin/AdminDashboard'
import JobAdvertisementDetail from '../pages/JobAdvertisementDetail'
import AddUserCoverLetter from '../pages/AddUserCoverLetter'
import UserCv from '../pages/UserCv'
import AddUserInformations from '../pages/AddUserInformations'
import AddUserJobExperiences from '../pages/AddUserJobExperiences'
import AddUserProgrammingLanguages from '../pages/AddUserProgrammingLanguages'
import AddUserSchools from '../pages/AddUserSchools'
import AddUserLanguage from '../pages/AddUserLanguage'
import AddUserLink from '../pages/AddUserLink'
import AddJobPositions from '../pages/AddJobPositions'
import HrmsInformation from '../pages/HrmsInformation'
import VerifyJobAdvertisements from '../pages/VerifyJobAdvertisements'
import EmployerInformations from '../pages/EmployerInformations'

export default function MainDashboard() {
    return (
        <div>
            {/* <Container fluid className="main"> */}
                <Route exact path="/admin/verifyjobadvertisement" component={VerifyJobAdvertisements} />
                <Route exact path="/admin/hrmsinformation" component={HrmsInformation} />

                <Route exact path="/" component={JobAdvertisements} />
                <Route exact path="/jobadvertisements" component={JobAdvertisements} />
                <Route exact path="/jobadvertisement/add" component={AddJobAdvertisement} />
                <Route exact path="/jobadvertisement/detail" component={JobAdvertisementDetail} />
                <Route exact path="/usercv" component={UserCv} />
                <Route exact path="/usercv/addusercoverletter" component={AddUserCoverLetter} />
                <Route exact path="/usercv/adduserinformations" component={AddUserInformations} />
                <Route exact path="/usercv/adduserjobexperiences" component={AddUserJobExperiences} />
                <Route exact path="/usercv/adduserprogramminglanguages" component={AddUserProgrammingLanguages} />
                <Route exact path="/usercv/adduserschools" component={AddUserSchools} />
                <Route exact path="/usercv/adduserlanguages" component={AddUserLanguage} />
                <Route exact path="/usercv/adduserlinks" component={AddUserLink} />
                <Route exact path="/jobposition/add" component={AddJobPositions} />
                <Route exact path="/employerinformations" component={EmployerInformations} />
            {/* </Container> */}
        </div>
    )
}
