import React, { useEffect, useState } from 'react'
import { Button, Table } from 'semantic-ui-react'
import JobPositionService from '../services/jobPositionService'

export default function JobPositions() {
    const [jobPositions, setJobPositions] = useState([])

    useEffect(() => {
        let jobPositions = new JobPositionService()
        jobPositions.getAllJobPositions().then(result => setJobPositions(result.data.data))
    })

    return (
        <div>

            <Table color="blue">
                <Table.Body>
                    {
                        jobPositions.map(position => (
                            <Table.Row>
                                <Table.Cell>
                                    <Button fluid basic color="blue">
                                        {position.name}
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    )
}
