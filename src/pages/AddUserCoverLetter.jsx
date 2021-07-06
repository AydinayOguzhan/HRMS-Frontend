import React from 'react'
import { useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik';
import KodlamaIoTextArea from '../utilities/customFormControls/KodlamaIoTextArea'
import { Button } from 'semantic-ui-react'
import * as Yup from "yup";
import { useEffect, useState } from 'react'
import UserCoverLettersService from '../services/userCoverLettersService';
import { useHistory } from 'react-router';

export default function AddUserCoverLetter() {
    const location = useLocation()
    const { userId } = location.state
    const history = useHistory()

    const [userCoverLetter, setUserCoverLetter] = useState({})

    const initialValues = {
        letter:userCoverLetter.letter
    };

    const validationSchema = Yup.object().shape({
        
    });

    let userCoverLettersService = new UserCoverLettersService()
    function handleAddCoverLetter(letter) {
        userCoverLettersService.update(userId,letter.letter)
        window.location.reload()
    }

    function handleCancel() {
        history.push("/userCv")
    }

    useEffect(() => {
        let userCoverLettersService = new UserCoverLettersService()
        userCoverLettersService.getByUserId(userId).then((result) => {setUserCoverLetter(result.data.data)})
    }, [])

    return (
        <div>
            <br />
             <h1>Ön Yazı Ekle/Güncelle</h1>
                <Formik 
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => { handleAddCoverLetter(values) }}
                >
                    <Form className="ui form">

                        <KodlamaIoTextArea style={{ marginTop: '0.7em' }} name="letter" placeholder="Ön Yazı" />

                        <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary> Ekle </Button>
                        <br />
                    </Form>
                </Formik>
                <Button style={{ marginTop: '0.7em' }} onClick={handleCancel} fluid color="red" > İptal Et </Button>
        </div>
    )
}
