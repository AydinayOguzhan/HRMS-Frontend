import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router';
import * as Yup from "yup";
import KodlamaIoTextInput from '../utilities/customFormControls/KodlamaIoTextInput';
import { Formik, Form } from 'formik';
import { Button, Table, Card } from 'semantic-ui-react'
import UserLinksService from '../services/userLinksService';

export default function AddUserLink() {
    const location = useLocation()
    const { userId } = location.state
    const history = useHistory()

    const [userLinks, setUserLinks] = useState([])
    const [userLinkSetted, setUserLinkSetted] = useState(false)

    const userLinksService = new UserLinksService()

    const initialValues = {
        link: ""
    };

    const validationSchema = Yup.object().shape({
        link: Yup.string().required("Bu alan zorunludur!")
    });

    function handleCancel() {
        history.push("/userCv")
    }

    function handleAddLanguage(params) {
        params.userId = userId
        console.log(params)
        userLinksService.add(params)
        setUserLinkSetted(true)
    }

    function handleDeleteLanguage(params) {
        params.userId = userId
        console.log(params)
        userLinksService.delete(params)
        setUserLinkSetted(true)
    }

    useEffect(() => {
        const userLinksService = new UserLinksService()
        userLinksService.getByUserId(userId).then((result) => { setUserLinks(result.data.data); })
        setUserLinkSetted(false)
    }, [userLinkSetted, userId])

    return (
        <div>
            <br />
            <h1>Link ekle</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleAddLanguage(values)
                }}
            >
                {({ }) => (
                    <Form encType="multipart/form-data" className="ui form">

                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="link" placeholder="Link" />

                        <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary> Bilgileri Güncelle </Button>
                        <br />
                    </Form>
                )}
            </Formik>
            <br />

            <Card fluid color="blue">
                <Card.Content>
                    <Card.Header>
                        Linkler
                    </Card.Header>
                    <Table singleLine color="blue">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Link</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                userLinks.map(link => (
                                    <Table.Row key={link.id}>
                                        <Table.Cell>{link.link}</Table.Cell>
                                        <Table.Cell><Button floated="right" color="red" onClick={() => { handleDeleteLanguage(link) }}>Sil</Button></Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
            <br />
            <Button style={{ marginTop: '0.7em' }} onClick={handleCancel} fluid color="red" > İptal Et </Button>
            <br />
        </div>
    )
}
