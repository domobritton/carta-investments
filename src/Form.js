import React, {Component} from 'react'

import Table from '@material-ui/core/Table'
import TableBody from "@material-ui/core/TableBody"
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import NamePicker from './NamePicker'
import DatePicker from './DatePicker'
import Investments from './Investments'

import styled from 'styled-components'


export default class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            investDate: '',
            active: true,
            name: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.toggleClass = this.toggleClass.bind(this)
        this.updateName = this.updateName.bind(this)
    }

    componentDidMount() {
        fetch(`https://gist.githubusercontent.com/cranium/d8b83184bf0750f2c834760b7c9203dc/raw/a73a70716951f77b90e84b8848ff1fee46938dd1/soi.json`)
            .then(response => response.json())
            .then(data => this.setState({ data }))
    }

    handleChange(e) {
        const date = e.target.value 
        this.setState({ investDate: date })
        fetch(`https://gist.githubusercontent.com/cranium/d8b83184bf0750f2c834760b7c9203dc/raw/a73a70716951f77b90e84b8848ff1fee46938dd1/soi.json?date=${date}`)
            .then(response => response.json())
            .then(data => this.setState({ data }))
    }

    toggleClass() {
        const currentState = this.state.active
        this.setState({ active: !currentState })
    }

    updateName(e) {
        this.setState({
            name: e.target.value,
        });
    };

    render() {
        const { data, investDate, active, name } = this.state
        return (
            <Main>
                {name.length === 0 ? 
                <Company>Krakatoa Ventures Fund I, L.P.</Company>
                 : 
                 <Company>{name}</Company>
                 }
                <Calendar>
                    <NamePicker onChange={this.updateName} value={name} />
                    <DatePicker onChange={this.handleChange} value={investDate} />
                </Calendar>
                <StyledPaper>
                    <StyledTable>
                        <StyledHead>
                        <StyledRow>
                            <StyledCell>Investment</StyledCell>
                            <StyledCell>Asset</StyledCell>
                            <StyledCell>Investment Date</StyledCell>
                            <StyledCell>Shares</StyledCell>
                            <StyledCell>Cost</StyledCell>
                            {active ? 
                            <CustomCell
                                onClick={this.toggleClass}>
                                <i className="fas fa-minus" />
                            </CustomCell> : 
                            <CustomCell
                                onClick={this.toggleClass}>
                                <i className="fas fa-plus" />
                            </CustomCell>
                            }
                        </StyledRow>
                        </StyledHead>
                            { active ? <Investments data={data} /> : <TableBody></TableBody>}
                    </StyledTable>
                </StyledPaper>
            </Main>
          )
    }
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    padding-bottom: 100px;
`;

const Company = styled.div`
    font-size: 40px;
    color: #8d8d8d;
    height: 50px;
    margin: 50px auto;
`;

const StyledPaper = styled(Paper)`
    width: 75%;
    margin-top: 80px;

    @media all and (max-width: 1020px) {
        width: 98%;
    }
`;

const StyledTable = styled(Table)`
    width: 100%;
`;

const StyledHead = styled(TableHead)`
    width: 100%;
`;

const StyledRow = styled(TableRow)`
    width: 100%;
`;

const StyledCell = styled(TableCell)`
    width: 22.5%;
`;

const CustomCell = styled(TableCell)`
    cursor: pointer;
    width: 10%;
`;

const Calendar = styled(Paper)`
    padding: 2.5rem 5rem 5rem 5rem;
`;