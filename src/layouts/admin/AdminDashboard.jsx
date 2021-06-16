import React from 'react'
import VerifyJobAdvertisements from './VerifyJobAdvertisements'
import { Container } from 'semantic-ui-react'

export default function AdminDashboard() {
    return (
        <div>
            <Container>
                <VerifyJobAdvertisements />
            </Container>
        </div>
    )
}