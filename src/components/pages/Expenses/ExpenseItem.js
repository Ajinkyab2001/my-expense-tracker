import React, { Fragment } from 'react'
import EditButton from './EditButton'
import DeleteButton from './DeleteButton'
function ExpenseItem(props) {
   
    return (
        <Fragment>
            <tr>
            <td>{props.date}</td>
                <td>{props.description}</td>
                <td>{props.amount}</td>
                <td>{props.category}</td>
                <td>{props.debitOrCredit}</td>
                <td><EditButton expenseObj={props} serverId={props.serverId}  /></td>
                <td><DeleteButton id={props.id} serverId={props.serverId}  /></td>
            </tr>
        </Fragment>
    )
}

export default ExpenseItem