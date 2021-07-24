import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import JobSeekersService from '../services/jobSeekersService'
import { Formik, Form } from 'formik';
import { Button, Card, Image, Dimmer, Loader, Segment } from 'semantic-ui-react'
import * as Yup from "yup";
import { useHistory } from 'react-router';
import KodlamaIoTextInput from '../utilities/customFormControls/KodlamaIoTextInput';
import KodlamaIoDateInput from '../utilities/customFormControls/KodlamaIoDateInput';
import ImageUploadService from '../services/imageUploadService';
import { toast } from "react-toastify";

export default function AddUserInformations() {
    const location = useLocation()
    const { userId } = location.state
    const history = useHistory()

    const [userImage, setUserImage] = useState({})
    const [user, setUser] = useState({})
    const maxImageSize = 5000000

    const [upload, setUpload] = useState(false)

    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        nationalityId: user.nationalityId,
        dateOfBirth: user.dateOfBirth,
    };

    const imageInitialValues = {
        file: ""
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("İsim alanı boş olamaz!"),
        lastName: Yup.string().required("Soy isim alanı boş olamaz!"),
        nationalityId: Yup.string().required("Kimlik numarası alanı boş olamaz!"),
        dateOfBirth: Yup.date().required("Doğum tarihi alanı boş olamaz!")
    });

    const imageValidationSchema = Yup.object().shape({

    });

    function handleCancel() {
        history.push("/userCv")
    }

    function handleImageUpload(image) {
        let imageUploadService = new ImageUploadService()
        if (image.size >= maxImageSize) {
            toast.error("Dosya boyutu 5 mb den büyük olamaz")
        } else {
            setUpload(true)
            imageUploadService.add(userId, image).then((response) => {
                if (response.data.success) {
                    toast.success(response.data.message)
                    setUpload(false)
                } else {
                    setUpload(false)
                    toast.error(response.data.message)
                }
            })
        }
    }

    function handleDeleteImage() {
        let imageUploadService = new ImageUploadService()
        setUpload(true)
        imageUploadService.delete(userId).then((response) => {
            if (response.data.success) {
                toast.success(response.data.message)
                setUpload(false)
            } else {
                toast.error(response.data.message)
                setUpload(false)
            }
        })
    }

    function handleUpdateUserInformations(params) {
        const jobSeekersService = new JobSeekersService()
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

    return (
        <div>
            <br />
            <h1>Kişi bilgilerini değiştir</h1>
            <Card>
                <Image src={userImage} />
            </Card>

            <Card>
                <Formik
                    enableReinitialize
                    initialValues={imageInitialValues}
                    validationSchema={imageValidationSchema}
                    onSubmit={(values) => {
                        handleImageUpload(values.files[0])
                    }}
                >
                    {({ setFieldValue }) => (
                        <Form method="post" encType="multipart/form-data" className="ui form">
                            <input
                                id="file"
                                name="file"
                                type="file"
                                multiple={false}
                                onChange={(e) => {
                                    setFieldValue("files", e.currentTarget.files);
                                }}></input>

                            {upload && <Segment>
                                <Dimmer active={true} inverted>
                                    <Loader />
                                </Dimmer>
                            </Segment>}

                            <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary> Profil resmini güncelle </Button>
                        </Form>
                    )}
                </Formik>
                <Button style={{ marginTop: '0.7em' }} onClick={() => { handleDeleteImage() }} color="red" fluid> Profil resmini sil </Button>
            </Card>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleUpdateUserInformations(values)
                }}
            >
                {({ }) => (
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
