import React, { useState, useEffect } from 'react'
import { Button, Table, Card, Icon, Modal, Image, Header } from 'semantic-ui-react'
import { toast } from 'react-toastify'
import EmployerUpdateInformationService from '../services/employerUpdateInformationService'
import EmployerService from '../services/employerService'

export default function ApproveEmployerDataUpdate() {
    const [updateInformations, setUpdateInformations] = useState([])
    const [oldInformation, setOldInformation] = useState({})
    const [newInformation, setNewInformation] = useState({})
    const [open, setOpen] = useState(false)

    function getUserDatas(userId) {
        const employerService = new EmployerService()
        const employerUpdateInformationService = new EmployerUpdateInformationService()
        employerUpdateInformationService.getByUserId(userId).then((response) => {setNewInformation(response.data.data)})
        employerService.getByUserId(userId).then((response) => { setOldInformation(response.data.data) })
    }

    function handleUpdate(params) {
        const employerService = new EmployerService()
        employerService.updatePermanently(params).then((response) => {
            if (response.data.success) {
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
            setOpen(false)
        })
    }

    useEffect(() => {
        const employerUpdateInformationService = new EmployerUpdateInformationService()
        employerUpdateInformationService.getAll().then((response) => { setUpdateInformations(response.data.data) })
    }, [])
    console.log(updateInformations)

    return (
        <div>
            <br />
            <Card fluid color="blue">
                <Card.Content>
                    <Card.Header>
                        Güncelleme Onayla
                    </Card.Header>
                    <Table singleLine color="blue">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign="center">Şirket Adı</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Web Sitesi</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Telefon Numarası</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Onaylanma</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Email Onaylaması</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Güncelleme</Table.HeaderCell>
                                <Table.HeaderCell textAlign="center">Güncellemeleri Onayla</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                updateInformations.map(information => (
                                    <Table.Row key={information.userId}>
                                        <Table.Cell textAlign="center">{information.companyName}</Table.Cell>
                                        <Table.Cell textAlign="center">{information.website}</Table.Cell>
                                        <Table.Cell textAlign="center">{information.phoneNumber}</Table.Cell>

                                        {information.approved ?
                                            <Table.Cell textAlign="center" positive>
                                                <Icon color='green' name='checkmark' size='large' />
                                            </Table.Cell>
                                            :
                                            <Table.Cell textAlign="center" negative>
                                                <Icon color='red' name='close' size='large' />
                                            </Table.Cell>}

                                        {information.mailVerified ?
                                            <Table.Cell textAlign="center" positive>
                                                <Icon color='green' name='checkmark' size='large' />
                                            </Table.Cell>
                                            :
                                            <Table.Cell textAlign="center" negative>
                                                <Icon color='red' name='close' size='large' />
                                            </Table.Cell>}

                                        {information.updated ?
                                            <Table.Cell textAlign="center" negative>
                                                <Icon color='red' name='close' size='large' />
                                            </Table.Cell>
                                            :
                                            <Table.Cell textAlign="center" positive>
                                                <Icon color='green' name='checkmark' size='large' />
                                            </Table.Cell>
                                        }

                                        {information.updated ?
                                            <Table.Cell textAlign="center">
                                                <Button color="blue" onClick={() => { setOpen(true); getUserDatas(information.userId) }}>Detayları Gör</Button>
                                            </Table.Cell>
                                            :
                                            <Table.Cell textAlign="center">
                                                <Button color="grey" disabled>Detayları Gör</Button>
                                            </Table.Cell>
                                        }
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>



            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>Detaylar</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Eski Bilgiler</Header>
                        <Table singleLine color="blue">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="center">Şirket Adı</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Web Sitesi</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Telefon Numarası</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell textAlign="center">{oldInformation.companyName}</Table.Cell>
                                    <Table.Cell textAlign="center">{oldInformation.website}</Table.Cell>
                                    <Table.Cell textAlign="center">{oldInformation.phoneNumber}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                        <Header>Yeni Bilgiler</Header>
                        <Table singleLine color="blue">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="center">Şirket Adı</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Web Sitesi</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">Telefon Numarası</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell textAlign="center">{newInformation.companyName}</Table.Cell>
                                    <Table.Cell textAlign="center">{newInformation.website}</Table.Cell>
                                    <Table.Cell textAlign="center">{newInformation.phoneNumber}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                        İptal Et
                    </Button>
                    <Button
                        content="Onayla"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => {handleUpdate(newInformation);}}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
}
