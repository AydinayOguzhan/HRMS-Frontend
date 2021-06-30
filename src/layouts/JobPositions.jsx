import React, { useEffect, useState } from 'react'
import { Button, Table, Select } from 'semantic-ui-react'
import JobPositionService from '../services/jobPositionService'
import { useDispatch } from "react-redux";
import { changeCount } from "../store/actions/jobAdvertisementsCount.js"

export default function JobPositions() {
    const [jobPositions, setJobPositions] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        let jobPositions = new JobPositionService()
        jobPositions.getAllJobPositions().then(result => setJobPositions(result.data.data))
    })
    const totalAdvertisements = [
        { key: '12', value: '12', text: '12' },
        { key: '21', value: '21', text: '21' },
        { key: '51', value: '51', text: '51' },
        { key: '102', value: '102', text: '102' },
    ]

    const handleCountChange = (event, data) => {
        dispatch(changeCount(data.value));
    };

    return (
        <div>
            <div>
                <Select placeholder='Select Advertisement Count' onChange={handleCountChange} options={totalAdvertisements} />
            </div>
            <br />
            <Table color="blue">
                <Table.Body>
                    {
                        jobPositions.map(position => (
                            <Table.Row key={position.id}>
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
