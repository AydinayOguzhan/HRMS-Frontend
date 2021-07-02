import React, { useEffect, useState } from 'react'
import { Select } from 'semantic-ui-react'
import { useDispatch } from "react-redux";
import { changeCount } from "../store/actions/jobAdvertisementsCount.js"

export default function LeftBar() {
    // const [jobPositions, setJobPositions] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        // let jobPositions = new JobPositionService()
        // jobPositions.getAllJobPositions().then(result => setJobPositions(result.data.data))
    })
    const totalAdvertisements = [
        { key: '10', value: '10', text: '10' },
        { key: '20', value: '20', text: '20' },
        { key: '50', value: '50', text: '50' },
        { key: '100', value: '100', text: '100' },
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
            {/* <Table color="blue">
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
            </Table> */}


        </div>
    )
}
