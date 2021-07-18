import { Button } from 'semantic-ui-react'
import KodlamaIoDateInput from "../utilities/customFormControls/KodlamaIoDateInput"
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { searchDeadline } from "../store/actions/jobAdvertisementsDeadlineSearch"

export default function LeftBarSearchAdvertisementForDeadline() {

    const dispatch = useDispatch();

    const initialValues = {
        deadline: ""
    };

    const validationSchema = Yup.object().shape({
        // deadline: Yup.date().required("Bu alan zorunludur")
    });

    function handleDeadlineSearch(deadline) {
        dispatch(searchDeadline(deadline))
    }

    function handleReset() {
        dispatch(searchDeadline(""))
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    handleDeadlineSearch(values)
                }}
            >
                {({ handleReset}) => (
                    <Form encType="multipart/form-data" className="ui form">

                        <KodlamaIoDateInput style={{ marginTop: '0.7em' }} name="deadline" placeholder="İlan son başvuru tarihi" />

                        <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary> Ara </Button>
                        <br />
                        <Button onClick={() => { handleReset() }} type="submit" fluid color="red"> Sıfırla </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
