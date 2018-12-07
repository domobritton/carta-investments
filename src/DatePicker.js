import React from 'react'
import TextField from '@material-ui/core/TextField'

import styled from 'styled-components'

const DatePicker = (props) => {
    const { onChange, value } = props 
   
    return (
        <Form noValidate>
            <StyledField
                id="date"
                label="Select Date"
                type="date"
                onChange={onChange}
                value={value}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </Form>
    )    
}

export default DatePicker 

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

const StyledField = styled(TextField)`
    width: 200px;
`;