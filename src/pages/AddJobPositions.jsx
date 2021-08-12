import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik';
import { Button, Table, Card } from 'semantic-ui-react'
import JobPositionService from '../services/jobPositionService';
import * as Yup from "yup";
import KodlamaIoTextInput from '../utilities/customFormControls/KodlamaIoTextInput'
import { toast } from "react-toastify";

export default function AddJobPositions() {

    const [positions, setPositions] = useState([])
    const [positionsSetted, setPositionsSetted] = useState(false)

    function handleAddJobPosition(params) {
        const jobPositionService = new JobPositionService()
        jobPositionService.add(params).then((response) => 
        {
            if (response.data.success) {
                toast.success(response.data.message)
                setPositionsSetted(true)
            }else{
                toast.error(response.data.message)
            }
        })
    }

    function handleDelete(params) {
        const jobPositionService = new JobPositionService()
        jobPositionService.delete(params).then((response) => {
            if (response.data.success) {
                toast.success(response.data.message)
                setPositionsSetted(true)
            }else{
                toast.error(response.data.message)
            }
        })
    }

    const initialValues = {
        name: ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("İş pozisyonu ekleyiniz!"),
    });

    useEffect(() => {
        const jobPositionService = new JobPositionService()
        jobPositionService.getAllJobPositions().then((response) => { setPositions(response.data.data) })
        setPositionsSetted(false)
    }, [positionsSetted])

    return (
        <div>
            <br />
            <h1>İş Pozisyonu Ekle</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => { handleAddJobPosition(values); }}
            >
                <Form className="ui form">

                    <KodlamaIoTextInput style={{ marginTop: '0.7em' }} name="name" placeholder="Pozisyon Adı" />


                    <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary> Ekle </Button>
                    <br />
                </Form>
            </Formik>


            <Card fluid color="blue">
                <Card.Content>
                    <Card.Header>
                        İş Pozisyonları
                    </Card.Header>
                    <Table singleLine color="blue">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Pozisyon Adı</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                positions.map(position => ( 
                                    <Table.Row key={position.id}>
                                        {
                                            <Table.Cell>{position.name}</Table.Cell>
                                        }
                                        <Table.Cell><Button floated="right" color="red" onClick={() => { handleDelete(position) }}>Sil</Button></Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
            <br />
        </div >
    )
}
