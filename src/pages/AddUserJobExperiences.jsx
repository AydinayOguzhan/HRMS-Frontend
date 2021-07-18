import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useHistory } from 'react-router';
import UserJobExperiencesService from '../services/userJobExperiencesService';
import * as Yup from "yup";
import KodlamaIoTextInput from '../utilities/customFormControls/KodlamaIoTextInput';
import KodlamaIoDateInput from '../utilities/customFormControls/KodlamaIoDateInput';
import { Formik, Form } from 'formik';
import { Button, Table, Card } from 'semantic-ui-react'

export default function AddUserJobExperiences() {
    var dateFormat = require("dateformat");
    const location = useLocation()
    const { userId } = location.state
    const history = useHistory()

    const [userJobExperiences, setUserJobExperiences] = useState([])
    const [experienceSetted, setExperienceSetted] = useState(false)

    const userJobExperiencesService = new UserJobExperiencesService() 

    const initialValues = {
        companyName: "",
        position: "",
        startDate: "",
        quitDate: ""
    };

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required("Şirket adı alanı zorunludur!"),
        position: Yup.string().required("Pozisyon alanı zorunludur!"),
        startDate: Yup.date().required("Giriş tarihi alanı zorunludur!")
    });

    function handleCancel() {
        history.push("/userCv")
    }

    function handleAddExperience(params) {
        params.userId=userId
        userJobExperiencesService.add(params)
        setExperienceSetted(true)
    }

    function handleDeleteExperience(params) {
        params.userId=userId
        userJobExperiencesService.delete(params)
        setExperienceSetted(true)
    }

    useEffect(() => {
        const userJobExperiencesService = new UserJobExperiencesService()
        userJobExperiencesService.getByUserId(userId).then((result) => { setUserJobExperiences(result.data.data); })
        setExperienceSetted(false)
    }, [experienceSetted, userId])

    return (
        <div>
            <br />
            <h1>Tecrübe ekle</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleAddExperience(values)
                }}
            >
                {({ setFieldValue, handleSubmit }) => (
                    <Form encType="multipart/form-data" className="ui form">

                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="companyName" placeholder="Firma Adı" />
                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="position" placeholder="Pozisyon" />
                        <KodlamaIoDateInput style={{ marginTop: '0.7em' }} name="startDate" placeholder="Başlama Tarihi" />
                        <KodlamaIoDateInput style={{ marginTop: '0.7em' }} name="quitDate" placeholder="Çıkış Tarihi" />

                        <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary> Bilgileri Güncelle </Button>
                        <br />
                    </Form>
                )}
            </Formik>
            <br />

            <Card fluid color="blue">
                <Card.Content>
                    <Card.Header>
                        İş Tecrübeleri
                    </Card.Header>
                    <Table singleLine color="blue">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                                <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                                <Table.HeaderCell>Başlama tarihi</Table.HeaderCell>
                                <Table.HeaderCell>Çıkış tarihi</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                userJobExperiences.map(job => (
                                    <Table.Row key={job.id}>
                                        <Table.Cell>{job.companyName}</Table.Cell>
                                        <Table.Cell>{job.position}</Table.Cell>
                                        <Table.Cell>{dateFormat(job.startDate, "dd/mm/yyyy")}</Table.Cell>
                                        <Table.Cell>{!job.quitDate?null:dateFormat(job.quitDate, "dd/mm/yyyy")}</Table.Cell>
                                        <Table.Cell><Button color="red" onClick={()=>{handleDeleteExperience(job)}}>Sil</Button></Table.Cell>
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
