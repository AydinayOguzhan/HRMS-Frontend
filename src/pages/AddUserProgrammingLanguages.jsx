import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router';
import * as Yup from "yup";
import KodlamaIoSelect from "../utilities/customFormControls/KodlamaIoSelect"
import { Formik, Form } from 'formik';
import { Button, Table, Grid, Icon, Card } from 'semantic-ui-react'
import UserProgrammingLanguagesService from '../services/userProgrammingLanguagesService';
import ProgrammingLanguagesService from '../services/programmingLanguagesService';

export default function AddUserProgrammingLanguages() {
    const location = useLocation()
    const { userId } = location.state
    const history = useHistory()

    const [userProgrammingLanguages, setUserProgrammingLanguages] = useState([])
    const [programmingLanguages, setProgrammingLanguages] = useState([])
    const [userProgrammingLanguageSetted, setuserProgrammingLanguageSett] = useState(false)

    const userProgrammingLanguagesService = new UserProgrammingLanguagesService()

    const initialValues = {
        programmingLanguage: ""
    };

    const validationSchema = Yup.object().shape({
        programmingLanguage: Yup.number().required("Teknoloji seçmek zorunludur!")
    });

    function handleCancel() {
        history.push("/userCv")
    }

    function handleAddLanguage(params) {
        params.userId = userId
        console.log(params)
        userProgrammingLanguagesService.add(params)
        setuserProgrammingLanguageSett(true)
    }

    function handleDeleteLanguage(params) {
        params.userId = userId
        userProgrammingLanguagesService.delete(params)
        setuserProgrammingLanguageSett(true)
    }

    useEffect(() => {
        const userProgrammingLanguagesService = new UserProgrammingLanguagesService()
        const programmingLanguagesService = new ProgrammingLanguagesService()
        programmingLanguagesService.getAll().then((result) => { setProgrammingLanguages(result.data.data) })
        userProgrammingLanguagesService.getByUserId(userId).then((result) => { setUserProgrammingLanguages(result.data.data); })
        setuserProgrammingLanguageSett(false)
    }, [userProgrammingLanguageSetted])
    console.log(userProgrammingLanguages)

    return (
        <div>
            <br />
            <h1>Teknoloji ekle</h1>
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

                        <KodlamaIoSelect fieldName="language" name="programmingLanguage" placeholder="Teknoloji Seçiniz" values={programmingLanguages} />

                        <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary> Bilgileri Güncelle </Button>
                        <br />
                    </Form>
                )}
            </Formik>
            <br />

            <Card fluid color="blue">
                <Card.Content>
                    <Card.Header>
                        Kullandığı Teknolojiler
                    </Card.Header>
                    <Table singleLine color="blue">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Teknoloji Adı</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                userProgrammingLanguages.map(language => (
                                    <Table.Row key={language.id}>
                                        {
                                            <Table.Cell>{
                                                programmingLanguages.map((item) => {
                                                    if (item.id === language.programmingLanguageId) {
                                                        return item.language
                                                    }
                                                })
                                            }</Table.Cell>
                                        }
                                        <Table.Cell><Button floated="right"  color="red" onClick={() => { handleDeleteLanguage(language) }}>Sil</Button></Table.Cell>
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
