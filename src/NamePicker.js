import React from 'react'
import TextField from "@material-ui/core/TextField"

import styled from 'styled-components'

const NamePicker = (props) => {
    const { value, onChange } = props
    return (
        <StyledField
            id="standard-name"
            label="Company Name"
            value={value}
            onChange={(e) => onChange(e)}
            margin="normal"
        />
    )

}

const StyledField = styled(TextField)`
    width: 200px;
`;

export default NamePicker 