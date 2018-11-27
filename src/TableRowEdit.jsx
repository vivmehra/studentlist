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
							id="sname"
							className="form-control"
							defaultValue={props.data.studentData.studentName}
							onChange={(e) => props.data.onChangeHandler(e)}
							maxLength = '255'
						/>
							</td>
							<td>
							<input
							type="text"
							id="score"
							className="form-control"
							defaultValue={props.data.studentData.score}
							onChange={(e) => props.data.onChangeHandler(e)}
							maxLength = '5'
						/>
							</td>
							<td>
								<button type="button" className="btn btn-primary" onClick={(e) => props.data.updateClick(e)}>Update</button>	
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
