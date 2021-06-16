import React, { useEffect, useState } from 'react'
import { Formik, ErrorMessage } from 'formik';
import { Form, SubmitButton, Field } from 'formik-semantic-ui-react';
import { Container } from 'semantic-ui-react'
import CitiesService from '../services/citiesService';
import JobPositionService from '../services/jobPositionService';
import WorkTypeService from '../services/workTypeService';
import WorkingTimeTypeService from '../services/workingTimeTypeService';
import JobAdvertisementService from '../services/jobAdvertisementService';
import * as Yup from "yup";

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
    };

    const validationSchema = Yup.object().shape({
        cityId: Yup.number().required("Şehir seçiniz!"),
        jobDescription: Yup.string().required("İş açıklaması ekleyiniz!"),
        numberOfPosition: Yup.number().required("Pozisyon sayısı girin!"),
        workTypeId: Yup.number().required("Çalışma şekli seçiniz!"),
        workingTimeTypeId: Yup.number().required("Çalışma saati seçiniz!")
    });
    const renderError = (message) => <p className="redText">{message}</p>;


    return (
        <div>
            <Container>
                <h1>İş ilanı ekle</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => { addJobAdvertisement(values); }}
                >
                    {({ validateField, validateForm, errors, touched}) => (
                        <Form Form size="large">

                            <Field name="cityId" as="select" className="my-select" >
                                <option>Şehir seçiniz</option>
                                {
                                    cities.map(city => (
                                        <option value={city.id}>{city.name}</option>
                                    ))
                                }
                            </Field>
                            {/* <ErrorMessage name="cityId" render={renderError} /> */}
                            {errors.cityId || touched.cityId && <div className="redText">{errors.cityId}</div>}

                            <Field style={{ marginTop: '0.7em' }} name="jobPositionId" as="select" className="my-select">
                                <option>Pozisyon Seçiniz</option>
                                {
                                    jobPositions.map(jobPosition => (
                                        <option value={jobPosition.id}>{jobPosition.name}</option>
                                    ))
                                }
                            </Field>

                            <Field style={{ marginTop: '0.7em' }} name="workTypeId" as="select" className="my-select">
                                <option>Çalışma Şekli Seçiniz</option>
                                {
                                    workTypes.map(workType => (
                                        <option value={workType.id}>{workType.type}</option>
                                    ))
                                }
                            </Field>
                            {errors.workTypeId || touched.workTypeId && <div className="redText">{errors.workTypeId}</div>}

                            <Field style={{ marginTop: '0.7em' }} name="workingTimeTypeId" as="select" className="my-select">
                                <option>Çalışma Zamanı Seçiniz</option>
                                {
                                    workingTimeTypes.map(workingTimeType => (
                                        <option value={workingTimeType.id}>{workingTimeType.type}</option>
                                    ))
                                }
                            </Field>
                            {errors.workingTimeTypeId || touched.workingTimeTypeId && <p className="redText">{errors.workingTimeTypeId}</p>}

                            <Field style={{ marginTop: '0.7em' }} name="minSalary" placeholder="Minimum ücret" as="input" type="number" className="my-select" />

                            <Field style={{ marginTop: '0.7em' }} name="maxSalary" placeholder="Maximum ücret" as="input" type="number" className="my-select" />

                            <Field style={{ marginTop: '0.7em' }} name="deadline" placeholder="Son tarih" as="input" type="date" className="my-select" />

                            <Field style={{ marginTop: '0.7em' }} name="numberOfPosition" placeholder="Pozisyon adedi" as="input" type="number" className="my-select" />
                            {errors.numberOfPosition || touched.numberOfPosition && <div className="redText">{errors.numberOfPosition}</div>}

                            <Field style={{ marginTop: '0.7em' }} name="jobDescription" placeholder="İş açıklaması" as="textarea" className="my-select" />
                            {errors.jobDescription || touched.jobDescription && <div className="redText">{errors.jobDescription}</div>}

                            <SubmitButton onClick={()=>{validateField('cityId')}} style={{ marginTop: '0.7em' }} fluid primary>
                                Ekle
                            </SubmitButton>
                            <br />
                        </Form>
                    )}
                </Formik>
            </Container>
        </div >
    )
}
