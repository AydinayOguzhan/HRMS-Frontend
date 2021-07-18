import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import JobSeekersService from '../services/jobSeekersService'
import { Formik, Form } from 'formik';
import { Button, Card, Image } from 'semantic-ui-react'
import * as Yup from "yup";
import { useHistory } from 'react-router';
import KodlamaIoTextInput from '../utilities/customFormControls/KodlamaIoTextInput';
import KodlamaIoDateInput from '../utilities/customFormControls/KodlamaIoDateInput';
import ImageUploadService from '../services/imageUploadService';


export default function AddUserInformations() {
    const location = useLocation()
    const { userId } = location.state
    const history = useHistory()

    const [userImage, setUserImage] = useState({})
    const [user, setUser] = useState({})

    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        nationalityId: user.nationalityId,
        dateOfBirth: user.dateOfBirth,
    };

    const imageInitialValues = {
        file: userImage
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("İsim alanı boş olamaz!"),
        lastName: Yup.string().required("Soy isim alanı boş olamaz!"),
        nationalityId: Yup.string().required("Kimlik numarası alanı boş olamaz!"),
        dateOfBirth: Yup.date().required("Doğum tarihi alanı boş olamaz!")
    });

    function handleCancel() {
        history.push("/userCv")
    }

    function handleImageUpload(image) {
        // let imageUploadService = new ImageUploadService()
        let formData = new FormData()
        formData.append("file", image, image.name)
        console.log(formData.get("file"))
        // imageUploadService.add(userId, formData.get("file"))
    }

    // const showFileToUpload = (e) => {
    //     // console.log("files", e);
    //     //then perform some requests to save these images
    // };

    function handleUpdateUserInformations(params) {
        const jobSeekersService = new JobSeekersService()
        console.log(params)
        params.userId = userId
        params.verified = user.verified
        jobSeekersService.add(params)
    }

    useEffect(() => {
        const jobSeekersService = new JobSeekersService()
        const imageUploadService = new ImageUploadService()
        jobSeekersService.getByUserId(userId).then((result) => { setUser(result.data.data) })
        imageUploadService.getByUserId(userId).then((result) => { setUserImage(result.data.data) })
    }, [user, userId])
    // console.log(user)
    return (
        <div>
            <br />
            <h1>Kişi bilgilerini değiştir</h1>
            <Card>
                <Image src={userImage} floated="left" />
            </Card>

            <Card>
                <Formik
                    enableReinitialize
                    initialValues={imageInitialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        handleImageUpload(values.files[0])
                    }}
                >
                    {({ setFieldValue, handleSubmit }) => (
                        <Form encType="multipart/form-data" className="ui form">
                            <input
                                id="file"
                                name="file"
                                type="file"
                                multiple={true}
                                onChange={(e) => {
                                    setFieldValue("files", e.currentTarget.files);
                                }}></input>

                            <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary> Profil resmini güncelle </Button>
                            <br />
                        </Form>
                    )}
                </Formik>
            </Card>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    // console.log(values)
                    handleUpdateUserInformations(values)
                }}
            >
                {({ setFieldValue, handleSubmit }) => (
                    <Form encType="multipart/form-data" className="ui form">

                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="firstName" placeholder="Ad" />
                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="lastName" placeholder="Soyad" />
                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="nationalityId" placeholder="Tc Kimlik Numarası" />
                        <KodlamaIoDateInput style={{ marginTop: '0.7em' }} name="dateOfBirth" placeholder="Doğum Tarihi" />

                        <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary> Bilgileri Güncelle </Button>
                        <br />
                    </Form>
                )}
            </Formik>

            <Button style={{ marginTop: '0.7em' }} onClick={handleCancel} fluid color="red" > İptal Et </Button>
            <br />
        </div >
    )
}
