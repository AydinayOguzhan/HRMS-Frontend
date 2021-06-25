import React, { useState, useEffect } from 'react'
import JobAdvertisementService from '../services/jobAdvertisementService'
import { Button, Card } from 'semantic-ui-react'
import SystemPersonnelService from '../services/systemPersonnelService';

export default function VerifyJobAdvertisements() {
    var dateFormat = require("dateformat");
    const [advertisements, setAdvertisements] = useState([])

    let systemPersonnelService = new SystemPersonnelService()

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        jobAdvertisementService.getAllDetail().then(result => setAdvertisements(result.data.data))
        console.log(advertisements)
    }, [])


    function verifyJobAdvertisement(id,verified){
        systemPersonnelService.verifyJobAdvertisement(id,verified)
        window.location.reload()
    }

    return (
        <div>
            <Card.Group>
                {
                    advertisements.map(advertisement =>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{advertisement.jobPositionName}</Card.Header>
                                <Card.Meta><b>Yayınlanma Tarihi:</b> {dateFormat(advertisement.publishDate, "dd/mm/yyyy")} <br /> <b>Son Başvuru Tarihi:</b> {dateFormat(advertisement.deadline, "dd/mm/yyyy")}</Card.Meta>
                                <Card.Description>
                                    {advertisement.jobDescription}
                                </Card.Description>
                            </Card.Content>
                            <Card.Content>
                                <b>Şehir:</b> {advertisement.cityName} <br />
                                <b>Minimum Ücret: </b> {advertisement.minSalary} /  <b>Maximum Ücret: </b> {advertisement.maxSalary} <br />
                                <b>Alınacak kişi sayısı: </b> {advertisement.numberOfPosition} <br />
                                <b>Çalışma şekli: </b> {advertisement.workTypeName} / {advertisement.workingTimeTypeName} <br />
                            </Card.Content>
                            <Card.Content extra>
                                <div className='ui two buttons'>
                                    {advertisement.approved?<Button onClick={()=> {verifyJobAdvertisement(advertisement.id,false)}} basic color='red'>Onayı Kaldır</Button>
                                    :<Button onClick={()=> {verifyJobAdvertisement(advertisement.id,true)}} basic color='green'>Onayla</Button>}
                                </div>
                            </Card.Content>
                        </Card>
                    )
                }
            </Card.Group>
        </div>
    )
}
