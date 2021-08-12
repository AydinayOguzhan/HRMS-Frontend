import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { Button, Step } from 'semantic-ui-react'
import KodlamaIoTextInput from '../utilities/customFormControls/KodlamaIoTextInput';
import { toast } from "react-toastify";
import EmployerService from '../services/employerService';

export default function EmployerInformations() {
    const userId = 4;

    const history = useHistory()

    const [employer, setEmployer] = useState({})

    const initialValues = {
        companyName: employer.companyName,
        website: employer.website,
        phoneNumber: employer.phoneNumber,
        isApproved: employer.isApproved,
        mailVerified: employer.mailVerified,
        isUpdated: employer.isUpdated
    };

    const validationSchema = Yup.object().shape({
        companyName: Yup.string().required("Şirket adı alanı zorunludur"),
        website: Yup.string().required("Şirket websitesi alanı zorunludur"),
        phoneNumber: Yup.string().required("Telefon numarası alanı zorunludur")
    });

    function handleUpdateEmployer(params) {
        const employerService = new EmployerService()
        params.userId = userId
        employerService.update(params).then((response) => {
            if (response.data.success) {
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
        })
        // console.log(params)
    }

    function handleCancel() {
        history.push("/")
    }

    useEffect(() => {
        const employerService = new EmployerService()
        employerService.getByUserId(userId).then((response) => { setEmployer(response.data.data) })
    }, [userId])

    console.log(employer)

    return (
        <div>
            <br />
            <Step.Group ordered>
                <Step completed>
                    <Step.Content>
                        <Step.Title>Hesap Oluşturuldu</Step.Title>
                        <Step.Description>Hesabınızı başarıyla oluşturdunuz</Step.Description>
                    </Step.Content>
                </Step>

                {employer.mailVerified ?
                    <Step completed>
                        <Step.Content>
                            <Step.Title>Mail Onayı</Step.Title>
                            <Step.Description>Enter billing information</Step.Description>
                        </Step.Content>
                    </Step>
                    :
                    <Step >
                        <Step.Content>
                            <Step.Title>Mail Onayı</Step.Title>
                            <Step.Description>Enter billing information</Step.Description>
                        </Step.Content>
                    </Step>
                }

                {employer.approved ?
                    <Step completed>
                        <Step.Content>
                            <Step.Title>Personel Onayı</Step.Title>
                        </Step.Content>
                    </Step>
                    :
                    <Step active>
                    <Step.Content>
                        <Step.Title>Personel Onayı</Step.Title>
                    </Step.Content>
                </Step>
                }
            </Step.Group>

            <h1>İş Veren Bilgilerini Değiştir</h1>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleUpdateEmployer(values)
                }}
            >
                {({ }) => (
                    <Form encType="multipart/form-data" className="ui form">

                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="companyName" placeholder="Şirket adı" />
                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="website" placeholder="Web sitesi" />
                        <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="phoneNumber" placeholder="Telefon numarası" />

                        {employer.updated ?
                            <Button style={{ marginTop: '0.7em' }} type="submit" fluid color="grey" disabled>Güncelleme için onay bekleniyor</Button> :
                            <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary>Bilgileri güncelle</Button>
                        }
                        <br />
                    </Form>
                )}
            </Formik>

            <Button style={{ marginTop: '0.7em' }} onClick={handleCancel} fluid color="red" > İptal Et </Button>
            <br />
        </div>
    )
}
