import React from 'react'
import { Container } from 'semantic-ui-react'
import JobAdvertisements from '../pages/JobAdvertisements'
import Navi from './Navi'

export default function MainDashboard() {
    return (
        <div>
            <Navi />
            <Container fluid className="main">
                <JobAdvertisements />
            </Container>
        </div>
    )
}
