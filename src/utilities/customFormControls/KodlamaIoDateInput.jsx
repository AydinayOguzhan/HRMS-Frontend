import { useField } from 'formik'
import React from 'react'
import { FormField, Label, Segment } from 'semantic-ui-react'

export default function KodlamaIoDateInput({ ...props }) {
    const [field, meta] = useField(props)
    return (
        <FormField error={meta.touched && !!meta.error}>
            <Segment>
                <Label pointing="below" basic color="grey" attached="top">{props.placeholder}</Label>
                <input {...field} {...props} type="date" />
                {meta.touched && !!meta.error ? (
                    <Label pointing basic color="red" content={meta.error}></Label>
                ) : null}
            </Segment>
        </FormField>
    )
}
