import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import JobAdvertisementService from '../services/jobAdvertisementService'
import { Card, Grid, Table, Icon, Button } from 'semantic-ui-react'

export default function JobAdvertisementDetail({ }) {
    const location = useLocation()
    const { advertisementId } = location.state
    var dateFormat = require("dateformat");

    const [advertisement, setAdvertisement] = useState({})
    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService()
        jobAdvertisementService.getDetailById(advertisementId).then((result) => {
            setAdvertisement(result.data.data)
        })
    }, [advertisementId])


    return (
        <div>
            <br />
            <Grid divided="vertically">
                <Grid.Row>
                    {
                        <Card fluid color="blue">
                            <Card.Content header="Açıklama" />
                            <Card.Content description={advertisement.jobDescription} />
                        </Card>
                    }
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Card fluid color="blue">
                            <Card.Content header="Firma Bilgileri" />
                            <Card.Content>
                                <Table color="blue">
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell><Icon name="building"></Icon><b> Şirket Adı</b></Table.Cell>
                                            <Table.Cell>{advertisement.companyName}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><Icon name="world"></Icon><b> Web sitesi</b></Table.Cell>
                                            <Table.Cell>{advertisement.webSite}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><Icon name="phone"></Icon><b> Telefon Numarası</b></Table.Cell>
                                            <Table.Cell>{advertisement.phoneNumber}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><Button inverted color="blue">Firma Detayları</Button></Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card fluid color="blue">
                            <Card.Content header="İlan Bilgileri" />
                            <Card.Content>
                                <Table color="blue">
                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell><Icon name="briefcase"></Icon><b>Pozisyon Adı</b></Table.Cell>
                                            <Table.Cell>{advertisement.jobPositionName}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><Icon name="map"></Icon><b>Şehir</b></Table.Cell>
                                            <Table.Cell>{advertisement.cityName}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><Icon name="info"></Icon><b>Çalışma Tipi</b></Table.Cell>
                                            <Table.Cell>{advertisement.workTypeName}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><Icon name="clock"></Icon><b>Çalışma Zamanı</b></Table.Cell>
                                            <Table.Cell>{advertisement.workingTimeTypeName}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><Icon name="lira sign"></Icon><b>Minimum Maaş</b></Table.Cell>
                                            <Table.Cell>{advertisement.minSalary}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><Icon name="lira sign"></Icon><b>Maximum Maaş</b></Table.Cell>
                                            <Table.Cell>{advertisement.maxSalary}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><Icon name="plus"></Icon><b>Pozisyon Adedi</b></Table.Cell>
                                            <Table.Cell>{advertisement.numberOfPosition}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><Icon name="calendar alternate"></Icon><b>Yayınlanma Tarihi</b></Table.Cell>
                                            <Table.Cell>{dateFormat(advertisement.publishDate, "dd/mm/yyyy")}</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell><Icon name="calendar alternate"></Icon><b>Son Geçerlilik Tarihi</b></Table.Cell>
                                            <Table.Cell>{dateFormat(advertisement.deadline, "dd/mm/yyyy")}</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}
