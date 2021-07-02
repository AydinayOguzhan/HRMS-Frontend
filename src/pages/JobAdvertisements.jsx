import React, { useEffect, useState } from 'react'
import { Card, Button, Grid, GridColumn, Input, Pagination } from 'semantic-ui-react'
import LeftBar from '../layouts/LeftBar';
import JobAdvertisementService from '../services/jobAdvertisementService'
import FavoritesService from '../services/favoritesService';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

export default function JobAdvertisements() {
    const favoritesService = new FavoritesService()
    var dateFormat = require("dateformat");

    const { jobAdvertisementsCount } = useSelector(state => state.jobAdvertisement)

    const [activeJobAdvertisements, setActiveJobAdvertisements] = useState([])
    const [filteredData, setFilteredData] = useState([])

    const [totalPages, setTotalPages] = useState()
    const [activePage, setActivePage] = useState(1)
    const handlePageChange = (e, pageInfo) => {
        setActivePage(pageInfo.activePage)
    }

    function addFavorites(jobAdvertisementId, jobSeekerId) {
        favoritesService.add(jobAdvertisementId, jobSeekerId)
        toast.success("Favorilere eklendi")
    }

    function handleSearch(event) {
        let value = event.target.value
        let result = []
        result = activeJobAdvertisements.filter((data) => {
            return data.cityName.search(value) != -1 || data.jobPositionName.search(value) != -1 || 
                data.companyName.search(value) != -1
        })
        setFilteredData(result)
    }


    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        jobAdvertisementService.getAllByPage(activePage, jobAdvertisementsCount).then(result => {
            setActiveJobAdvertisements(result.data.data);
            setFilteredData(result.data.data)
        })
        jobAdvertisementService.getTotalPages(1, jobAdvertisementsCount).then(result => setTotalPages(result.data.data))
    }, [jobAdvertisementsCount, activePage, totalPages])

    return (
        <div>
            <br />
            <Grid >
                <Grid.Row>
                    <Grid.Column width={4}>
                        <LeftBar />
                    </Grid.Column>

                    <Grid.Column width={12}>
                        <div>
                            <Input placeholder="search in job advertisements" size="large" fluid icon="search" onChange={(event) => handleSearch(event)} />
                        </div>
                        <br />
                        <Card.Group>
                            {
                                filteredData.map(advertisement => (
                                    <Card fluid color="blue" key={advertisement.id}>
                                        <Card.Content>
                                            <Card.Header>{advertisement.jobPositionName}</Card.Header>
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
                                                {/* TODO: Login işlemlerinden sonra user id bilgisini login yapan kişininkiyle değiştir. */}
                                                <Button onClick={() => { addFavorites(advertisement.id, 26) }} basic color='orange'>
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
            <br />
            <Pagination
                activePage={activePage}
                onPageChange={handlePageChange}
                boundaryRange={0}
                defaultActivePage={1}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={totalPages}
            />
            <br /> <br />
        </div>
    )
}
