import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router';
import * as Yup from "yup";
import { Formik, Form } from 'formik';
import { Button, Table, Card } from 'semantic-ui-react'
import UserSchoolsService from '../services/userSchoolsService';
import KodlamaIoTextInput from '../utilities/customFormControls/KodlamaIoTextInput';
import KodlamaIoDateInput from '../utilities/customFormControls/KodlamaIoDateInput';

export default function AddUserSchools() {
    var dateFormat = require("dateformat");
    const location = useLocation()
    const { userId } = location.state
    const history = useHistory()

    const [userSchools, setUserSchools] = useState([])
    const [userSchoolSetted, setUserSchoolSetted] = useState(false)

    const userSchoolsService = new UserSchoolsService()

    const initialValues = {
        schoolName: "",
        department: "",
        startDate: "",
        graduateDate: ""
    };

    const validationSchema = Yup.object().shape({
        schoolName: Yup.string().required("Okul ismi zorunludur!"),
        department: Yup.string().required("Bölüm ismi zorunludur!"),
        startDate: Yup.date().required("Başlangıç tarihi zorunludur!")
    });

    function handleCancel() {
        history.push("/userCv")
    }

    function handleAddSchool(params) {
        params.userId = userId
        console.log(params)
        userSchoolsService.add(params)
        setUserSchoolSetted(true)
    }

    function handleDeleteSchool(params) {
        params.userId = userId
        console.log(params)
        userSchoolsService.delete(params)
        setUserSchoolSetted(true)
    }

    useEffect(() => {
        const userSchoolsService = new UserSchoolsService()
        userSchoolsService.getByUserId(userId).then((result) => { setUserSchools(result.data.data); })
        setUserSchoolSetted(false)
    }, [userSchoolSetted, userId])
    console.log(userSchools)

    return (
        <div>
            <br />
            <h1>Okul Ekle</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleAddSchool(values)
                }}
            >
                {({ }) => (
                    <Form encType="multipart/form-data" className="ui form">

                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="schoolName" placeholder="Okul Adı" />
                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="department" placeholder="Bölüm Adı" />
                        <KodlamaIoDateInput style={{ marginTop: '0.7em' }} name="startDate" placeholder="Başlama Tarihi" />
                        <KodlamaIoDateInput style={{ marginTop: '0.7em' }} name="graduateDate" placeholder="Mezuniyet Tarihi" />

                        <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary> Bilgileri Güncelle </Button>
                        <br />
                    </Form>
                )}
            </Formik>
            <br />

            <Card fluid color="blue">
                <Card.Content>
                    <Card.Header>
                        Okullar
                    </Card.Header>
                    <Table singleLine color="blue">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Okul Adı</Table.HeaderCell>
                                <Table.HeaderCell>Bölüm Adı</Table.HeaderCell>
                                <Table.HeaderCell>Başlama Tarihi</Table.HeaderCell>
                                <Table.HeaderCell>Bitirme Tarihi</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                userSchools.map(school => (
                                    <Table.Row key={school.id}>
                                        <Table.Cell>{school.schoolName }</Table.Cell>
                                        <Table.Cell>{school.department }</Table.Cell>
                                        <Table.Cell>{dateFormat(school.startDate, "dd/mm/yyyy")}</Table.Cell>
                                        <Table.Cell>{!school.graduateDate?null:dateFormat(school.startDate, "dd/mm/yyyy")}</Table.Cell>
                                        <Table.Cell><Button floated="right" color="red" onClick={() => { handleDeleteSchool(school) }}>Sil</Button></Table.Cell>
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
