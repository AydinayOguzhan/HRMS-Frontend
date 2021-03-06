import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik';
import { Button } from 'semantic-ui-react'
import CitiesService from '../services/citiesService';
import JobPositionService from '../services/jobPositionService';
import WorkTypeService from '../services/workTypeService';
import WorkingTimeTypeService from '../services/workingTimeTypeService';
import JobAdvertisementService from '../services/jobAdvertisementService';
import * as Yup from "yup";
import KodlamaIoTextArea from '../utilities/customFormControls/KodlamaIoTextArea';
import KodlamaIoNumberInput from '../utilities/customFormControls/KodlamaIoNumberInput';
import KodlamaIoSelect from '../utilities/customFormControls/KodlamaIoSelect';
import KodlamaIoDateInput from '../utilities/customFormControls/KodlamaIoDateInput';

export default function AddJobAdvertisement() {
    const [cities, setCities] = useState([])
    const [jobPositions, setJobPositions] = useState([])
    const [workTypes, setWorkTypes] = useState([])
    const [workingTimeTypes, setWorkingTimeTypes] = useState([])

    let jobAdvertisementService = new JobAdvertisementService()
    function addJobAdvertisement(params) {
        jobAdvertisementService.add(params)
        window.location.reload()
    }

    useEffect(() => {
        let citiesService = new CitiesService()
        citiesService.getAllCities().then(result => setCities(result.data.data))
        let jobPositionService = new JobPositionService()
        jobPositionService.getAllJobPositions().then(result => setJobPositions(result.data.data))
        let workTypeService = new WorkTypeService()
        workTypeService.getAllWorkTypes().then(result => setWorkTypes(result.data.data))
        let workingTimeType = new WorkingTimeTypeService()
        workingTimeType.getAllWorkingTimeTypes().then(result => setWorkingTimeTypes(result.data.data))
    }, [])

    const initialValues = {
        cityId:"",
        jobPositionId:"",
        workTypeId:"",
        workingTimeTypeId:"",
        minSalary:"",
        maxSalary:"",
        deadline:"",
        numberOfPosition:"",
        jobDescription:""
    };

    const validationSchema = Yup.object().shape({
        cityId: Yup.number().required("??ehir se??iniz!"),
        jobDescription: Yup.string().required("???? a????klamas?? ekleyiniz!"),
        numberOfPosition: Yup.number().required("Pozisyon say??s?? giriniz!"),
        workTypeId: Yup.number().required("??al????ma ??ekli se??iniz!"),
        workingTimeTypeId: Yup.number().required("??al????ma saati se??iniz!")
    });

    return (
        <div>
            {/* <Container> */}
            <br />
                <h1>???? ilan?? ekle</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => { addJobAdvertisement(values);  }}
                >
                    <Form className="ui form" Form >

                        <KodlamaIoSelect fieldName="name" name="cityId" placeholder="??ehir se??iniz" values={cities} />
                        <KodlamaIoSelect fieldName="name" style={{ marginTop: '0.7em' }} name="jobPositionId" placeholder="Pozisyon Se??iniz" values={jobPositions} />
                        <KodlamaIoSelect fieldName="type" style={{ marginTop: '0.7em' }} name="workTypeId" placeholder="??al????ma ??ekli Se??iniz" values={workTypes} />
                        <KodlamaIoSelect fieldName="type" style={{ marginTop: '0.7em' }} name="workingTimeTypeId" placeholder="??al????ma Zaman?? Se??iniz" values={workingTimeTypes} />
                        <KodlamaIoNumberInput style={{ marginTop: '0.7em' }} name="minSalary" placeholder="Minimum ??cret" />
                        <KodlamaIoNumberInput style={{ marginTop: '0.7em' }} name="maxSalary" placeholder="Maximum ??cret" />
                        <KodlamaIoDateInput style={{ marginTop: '0.7em' }} name="deadline" placeholder="Son tarih"/>
                        <KodlamaIoNumberInput style={{ marginTop: '0.7em' }} name="numberOfPosition" placeholder="Pozisyon adedi" />
                        <KodlamaIoTextArea style={{ marginTop: '0.7em' }} name="jobDescription" placeholder="???? a????klamas??" />

                        <Button style={{ marginTop: '0.7em' }} type="submit" fluid primary> Ekle </Button>
                        <br />
                    </Form>
                </Formik>
            {/* </Container> */}
        </div >
    )
}
