import React, { Component } from 'react'

import TableBody from "@material-ui/core/TableBody"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"

import styled from "styled-components"

export default class Investments extends Component {

    constructor(props) {
        super(props)

        this.state = {
            active: [true, true, true, true, true, true, true, true, true],
            bool: false,
        }

        this.toggleClass = this.toggleClass.bind(this)
    }

    toggleClass(e) {
        e.preventDefault()
        const { bool, active } = this.state
        const setActive = active 
        const id = e.target.id
        setActive[id] = bool
        this.setState({ active: setActive, bool: !bool })
    }

    render() {
        const { data } = this.props
        const { active } = this.state 
        if (!data) { return null }

        return (
            <TableBody>
                {data.map((row, idx) => {
                    let bool = active[idx]
                    return (
                        <React.Fragment key={row.id}>
                        <StyledRow>
                            <StyledCell>{row.name}</StyledCell>
                            <StyledCell></StyledCell>
                            <StyledCell></StyledCell>
                            <StyledCell></StyledCell>
                            <StyledCell></StyledCell>
                            {bool ? 
                            <CustomCell
                                onClick={this.toggleClass}>
                                    <i className='fas fa-minus'
                                    id={idx} />
                            </CustomCell> :
                            <CustomCell
                                onClick={this.toggleClass}>
                                    <i className='fas fa-plus'
                                    id={idx} />
                            </CustomCell>
                        }
                        </StyledRow>
                        <>
                        {row.issued_assets.map(asset => {
                            return (
                                <React.Fragment key={asset.id}>
                                {bool ? 
                                <CustomRow>
                                    <StyledCell></StyledCell>
                                    <StyledCell>{asset.asset_class}</StyledCell>
                                    <StyledCell>{asset.investment_date}</StyledCell>
                                    <StyledCell>{asset.quantity}</StyledCell>
                                    <StyledCell>$ {asset.cost['$']}</StyledCell>
                                </CustomRow> : 
                                <CustomRow></CustomRow>
                                }
                                </React.Fragment>
                            )
                        })}
                        </>
                        </React.Fragment>
                    )
                
                })}
            </TableBody>
        )
    }
}


const StyledRow = styled(TableRow)`
    background: #efefef;
    width: 100%;
`;

const StyledCell = styled(TableCell)`
    width: 22.5%;
`;

const CustomCell = styled(TableCell)`
    cursor: pointer;
    width: 10%;
`;

const CustomRow = styled(TableRow)`
    width: 100%;
`;