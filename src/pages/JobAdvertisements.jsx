import React, { useEffect, useState } from 'react'
import { Card, Button, Grid, GridColumn } from 'semantic-ui-react'
import JobPositions from '../layouts/JobPositions';
import JobAdvertisementService from '../services/jobAdvertisementService'
import FavoritesService from '../services/favoritesService';

export default function JobAdvertisements() {

    const favoritesService = new FavoritesService()
    var dateFormat = require("dateformat");

    const [activeJobAdvertisements, setActiveJobAdvertisements] = useState([])

    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        jobAdvertisementService.getAllActiveJobAdvertisements().then(result => setActiveJobAdvertisements(result.data.data))
    },[])

    function addFavorites(jobAdvertisementId, jobSeekerId) {
        favoritesService.add(jobAdvertisementId, jobSeekerId)
    }

    return (
        <div>
            <Grid >
                <Grid.Row>
                    <GridColumn width={1}></GridColumn>
                    <Grid.Column width={3}>
                        <JobPositions/>
                    </Grid.Column>
                    
                    <Grid.Column width={12}>
                        <Card.Group>
                            {
                                activeJobAdvertisements.map(advertisement => (
                                    <Card color="blue">
                                        <Card.Content>
                                            <Card.Header>{advertisement.positionName}</Card.Header>
                                            <Card.Meta>{advertisement.companyName}</Card.Meta>
                                            <Card.Description>
                                                <b>Pozisyon Sayısı:</b> {advertisement.numberOfPosition} <br />
                                                <b>Yayınlanma Tarihi:</b> {dateFormat(advertisement.publishDate, "dd/mm/yyyy")} <br />
                                                <b>Son Başvuru Tarihi:</b> {dateFormat(advertisement.deadline, "dd/mm/yyyy")}
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <div className='ui two buttons'>
                                                <Button basic color='blue'>
                                                    Detaylar
                                                </Button>
                                                //TODO: Toastify ekle
                                                <Button onClick={()=>{addFavorites(advertisement.id, 26)}} basic color='orange'>
                                                    Favori
                                                </Button>
                                            </div>
                                        </Card.Content>
                                    </Card>
                                ))
                            }
                        </Card.Group>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
