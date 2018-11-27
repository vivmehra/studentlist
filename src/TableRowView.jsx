import React from 'react';

const TableRowView = ((props)=>{
 return (
    <table className="table">
    <tbody>
        <tr style={(props.data.studentData.score < 65) ? {backgroundColor : '#f8d7da'} : null } className="dividetds">
            <td>
                {props.data.studentData.studentName}
            </td>
            <td>
                {props.data.studentData.score}
            </td>
            <td>
                <span onClick={props.data.onDeleteClick} className="p-4">
                    <i className="fas fa-trash fa-2x" title="Delete" />
                </span>
                <span onClick={props.data.onEditClick}>
                    <i className="fas fa-edit fa-2x" title="Edit" />
                </span>
            </td>
        </tr>
    </tbody>
</table>
 )
});

export default TableRowView;
