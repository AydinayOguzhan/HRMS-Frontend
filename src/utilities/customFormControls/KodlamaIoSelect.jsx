import { FieldArray, useField } from 'formik'
import React from 'react'
import { FormField, Label } from 'semantic-ui-react'
import { Select } from 'formik-semantic-ui-react';

export default function KodlamaIoSelect({ ...props }) {
    const [field, meta] = useField(props)
    const fieldName = props.fieldName
    const mapped = props.values.map(function (value) {
        return { key: value.id, value: value.id, text: eval("value." + fieldName) }
    })

    return (
        <FormField error={meta.touched && !!meta.error}>
           <Select {...field} {...props} options={mapped}/>
            {meta.touched && !!meta.error ? (
                <Label pointing basic color="red" content={meta.error}></Label>
            ) : null}
        </FormField>
    )
}
