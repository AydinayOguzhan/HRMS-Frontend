import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router';
import * as Yup from "yup";
import KodlamaIoSelect from "../utilities/customFormControls/KodlamaIoSelect"
import { Formik, Form } from 'formik';
import { Button, Table, Card } from 'semantic-ui-react'
import UserLanguagesService from '../services/userLanguagesService';
import LanguagesService from '../services/languagesService';

export default function AddUserLanguage() {
    const location = useLocation()
    const { userId } = location.state
    const history = useHistory()

    const [userLanguages, setUserLanguages] = useState([])
    const [languages, setLanguages] = useState([])
    const [userLanguageSetted, setUserLanguageSetted] = useState(false)

    const userLanguagesService = new UserLanguagesService()

    const levels = [{id:1,level:1},{id:2,level:2},{id:3,level:3},{id:4,level:4},{id:5,level:5}]

    const initialValues = {
        userLanguage: "",
        level: ""
    };

    const validationSchema = Yup.object().shape({
        userLanguage: Yup.string().required("Dil seçmek zorunludur!"),
        level: Yup.number().required("Seviye seçmek zorunludur!")
    });

    function handleCancel() {
        history.push("/userCv")
    }

    function handleAddLanguage(params) {
        params.userId = userId
        console.log(params)
        userLanguagesService.add(params)
        setUserLanguageSetted(true)
    }

    function handleDeleteLanguage(params) {
        params.userId = userId
        console.log(params)
        userLanguagesService.delete(params)
        setUserLanguageSetted(true)
    }

    useEffect(() => {
        const userLanguagesService = new UserLanguagesService()
        const languagesService = new LanguagesService()
        languagesService.getAll().then((result) => { setLanguages(result.data.data) })
        userLanguagesService.getByUserId(userId).then((result) => { setUserLanguages(result.data.data); })
        setUserLanguageSetted(false)
    }, [userLanguageSetted, userId])

    return (
        <div>
            <br />
            <h1>Dil Ekle</h1>
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

                        <KodlamaIoSelect fieldName="name" name="userLanguage" placeholder="Dil Seçiniz" values={languages} />
                        <KodlamaIoSelect fieldName="level" name="level" placeholder="Seviye Seçiniz" values={levels} />

                        <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary> Bilgileri Güncelle </Button>
                        <br />
                    </Form>
                )}
            </Formik>
            <br />

            <Card fluid color="blue">
                <Card.Content>
                    <Card.Header>
                        Diller
                    </Card.Header>
                    <Table singleLine color="blue">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Dil Adı</Table.HeaderCell>
                                <Table.HeaderCell>Seviye</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                userLanguages.map(language => (
                                    <Table.Row key={language.id}>
                                        {
                                            <Table.Cell>{
                                                languages.map((item) => {
                                                    if (item.id === language.languageId) {
                                                        return item.name
                                                    }
                                                })
                                            }</Table.Cell>
                                        }
                                        <Table.Cell>{language.level}</Table.Cell>
                                        <Table.Cell><Button floated="right" color="red" onClick={() => { handleDeleteLanguage(language) }}>Sil</Button></Table.Cell>
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
