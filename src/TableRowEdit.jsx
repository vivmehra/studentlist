import React from 'react';
import ErrorMessage from './ErrorMessage';

const TableRowEdit = ((props)=>{
    return(
    <form className="form-group">
					<table className="table">
					<tbody>
						<tr className="dividetds">
							<td>
							<input
							type="text"
							id="sname_edit"
							className="form-control"
							defaultValue={props.data.studentData.studentName}
							maxLength = '255'
						/>
							</td>
							<td>
							<input
							type="text"
							id="score_edit"
							className="form-control"
							defaultValue={props.data.studentData.score}
							maxLength = '5'
						/>
							</td>
							<td>
								<button type="button" className="btn btn-primary" onClick={(e) => props.data.updateClick(e,document.getElementById('sname_edit').value.trim(),document.getElementById('score_edit').value.trim())}>Update</button>	
							</td>
						</tr>
						{props.data.isInvalid === 1  && 
						<tr>
							<td colSpan = '3'>
							<small><ErrorMessage message={props.data.message}/></small>
							</td> 
						</tr>}
					</tbody>
					</table>
				</form>
    );
});

export default TableRowEdit;
