import React, {useEffect, useState} from 'react'
import { Formik } from 'formik';
import { Form, SubmitButton, Field } from 'formik-semantic-ui-react';
import { Container } from 'semantic-ui-react'
import CitiesService from '../services/citiesService';
import JobPositionService from '../services/jobPositionService';
import WorkTypeService from '../services/workTypeService';
import WorkingTimeTypeService from '../services/workingTimeTypeService';
import JobAdvertisementService from '../services/jobAdvertisementService';

export default function AddJobAdvertisement() {
    const [cities, setCities] = useState([])
    const [jobPositions, setJobPositions] = useState([])
    const [workTypes, setWorkTypes] = useState([])
    const [workingTimeTypes, setWorkingTimeTypes] = useState([])
    
    let jobAdvertisementService = new JobAdvertisementService()

    useEffect(() => {
        let citiesService = new CitiesService()
        citiesService.getAllCities().then(result => setCities(result.data.data))
        let jobPositionService = new JobPositionService()
        jobPositionService.getAllJobPositions().then(result => setJobPositions(result.data.data))
        let workTypeService = new WorkTypeService()
        workTypeService.getAllWorkTypes().then(result => setWorkTypes(result.data.data))
        let workingTimeType = new WorkingTimeTypeService()
        workingTimeType.getAllWorkingTimeTypes().then(result => setWorkingTimeTypes(result.data.data))
    },[])
    
    const initialValues = {

    };

    return (
        <div>
            <Container>
                <h1>İş ilanı ekle</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => { jobAdvertisementService.add(values) }}
                >
                    <Form size="large">

                        <Field name="cityId" as="select" className="my-select">
                            <option>Şehir seçiniz</option>
                            {
                                cities.map(city => (
                                    <option value={city.id}>{city.name}</option>
                                ))
                            }
                        </Field>
                       
                        <Field style={{marginTop:'0.7em'}} name="jobPositionId" as="select" className="my-select">
                            <option>Pozisyon Seçiniz</option>
                            {
                                jobPositions.map(jobPosition => (
                                    <option value={jobPosition.id}>{jobPosition.name}</option>
                                ))
                            }
                        </Field>

                        <Field style={{marginTop:'0.7em'}} name="workTypeId" as="select" className="my-select">
                            <option>Çalışma Şekli Seçiniz</option>
                            {
                                workTypes.map(workType => (
                                    <option value={workType.id}>{workType.type}</option>
                                ))
                            }
                        </Field>

                        <Field style={{marginTop:'0.7em'}} name="workingTimeTypeId" as="select" className="my-select">
                            <option>Çalışma Zamanı Seçiniz</option>
                            {
                                workingTimeTypes.map(workingTimeType => (
                                    <option value={workingTimeType.id}>{workingTimeType.type}</option>
                                ))
                            }
                        </Field>

                        <Field style={{marginTop:'0.7em'}} name="minSalary" placeholder="Minimum ücret" as="input" type="number" className="my-select"/>
                      
                        <Field style={{marginTop:'0.7em'}} name="maxSalary" placeholder="Maximum ücret" as="input" type="number" className="my-select"/>
                        
                        <Field style={{marginTop:'0.7em'}} name="deadline" placeholder="Son tarih" as="input" type="date" className="my-select"/>

                        <Field style={{marginTop:'0.7em'}} name="numberOfPosition" placeholder="Pozisyon adedi" as="input" type="number" className="my-select"/>
                       
                        <Field style={{marginTop:'0.7em'}} name="jobDescription" placeholder="İş açıklaması" as="textarea" className="my-select"/>

                        <SubmitButton style={{marginTop:'0.7em'}} fluid primary>
                            Ekle
                        </SubmitButton>
                        <br />
                    </Form>
                </Formik>
            </Container>
        </div>
    )
}
