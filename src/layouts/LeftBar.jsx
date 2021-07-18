import React, { useEffect } from 'react'
import { Select, Card } from 'semantic-ui-react'
import { useDispatch } from "react-redux";
import { changeCount } from "../store/actions/jobAdvertisementsCount.js"
import LeftBarSearchAdvertisementForDeadline from '../pages/LeftBarSearchAdvertisementForDeadline.jsx';

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
                <Select fluid placeholder='Select Advertisement Count' onChange={handleCountChange} options={totalAdvertisements} />
            </div>
            <br />
            <div>
                <Card color="blue">
                    <Card.Content>
                        <LeftBarSearchAdvertisementForDeadline/>
                    </Card.Content>
                </Card>
            </div>

        </div>
    )
}
