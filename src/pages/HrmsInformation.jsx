import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik';
import { Button } from 'semantic-ui-react'
import * as Yup from "yup";
import { useHistory } from 'react-router';
import KodlamaIoTextInput from '../utilities/customFormControls/KodlamaIoTextInput';
import { toast } from "react-toastify";
import SystemPersonnelService from '../services/systemPersonnelService';

export default function HrmsInformation() {
    // const location = useLocation()
    // const { userId } = location.state
    const userId = 33
    const history = useHistory()

    const [personnel, setPersonnel] = useState({})


    const initialValues = {
        firstName:personnel.firstName,
        lastName:personnel.lastName
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("İsim alanı zorunludur"),
        lastName: Yup.string().required("Soy isim alanı zorunludur"),
    });

    function handleCancel() {
        history.push("/")
    }

    function handleUpdatePersonnelInformation(params) {
        params.userId = userId
        const systemPersonnelService = new SystemPersonnelService()
        systemPersonnelService.update(params).then((response) => {
            if (response.data.success) {
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
        })
    }

    useEffect(() => {
        const systemPersonnelService = new SystemPersonnelService()
        systemPersonnelService.getByUserId(userId).then((result) => {setPersonnel(result.data.data)})
    }, [userId, personnel])

    return (
        <div>
            <br />
            <h1>Personel Bilgilerini Değiştir</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleUpdatePersonnelInformation(values)
                }}
            >
                {({ }) => (
                    <Form encType="multipart/form-data" className="ui form">

                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="firstName" placeholder="Ad" />
                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="lastName" placeholder="Soyad" />

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
