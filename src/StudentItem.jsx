/* Child Component to show each row for each studenet data and 
pass control to parent component for edit, delete and update functionalities*/
import React, { Component } from 'react';
import './StudentList.css';

export default class StudentItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditClicked: false
		};
		this.name = this.props.studentData.studentName;
		this.score = this.props.studentData.score;
	}
	/* Pass the key to delete, to the parent component*/
	onDeleteClick = () => {
		this.props.studentData.onDeleteClick(this.props.studentData.key);
	};
	onEditClick = () => {
		this.setState({
			isEditClicked: true
		});
	};
	/*Check validation and pass data to parent to edit the state */
	updateClick = () => {
		// if (this.name === '' || this.score === '' || this.score < 0 || this.score > 100 || isNaN(this.score)) {
		// 	alert('Please enter valid data');
		// 	this.setState({
		// 		isEditClicked: false
		// 	});
		// 	return;
		// }

		this.props.studentData.updateClick(this.props.studentData.key, this.name, this.score);
		this.setState({
			isEditClicked: false
		});
	};

	onChangeHandler = (e) => {
		if (e.target.id === 'sname') {
			this.name = e.target.value.trim() === '' ? '' : e.target.value;
		} else {
			this.score = e.target.value.trim() === '' ? '' : e.target.value;
		}
	};

	render() {
		const studentData = this.props.studentData;
		let divElement = '';
		let fail = null;
		if (studentData.score < 65) {
			fail = {
				backgroundColor: '#f8d7da'
			};
		}
		if (!this.state.isEditClicked) {
			divElement = (
				<table className="table">
					<tbody>
						<tr style={fail} className="dividetds">
							<td>
								{studentData.studentName}
							</td>
							<td>
								{studentData.score}
							</td>
							<td>
								<span onClick={this.onDeleteClick} className="p-4">
									<i className="fas fa-trash fa-2x" title="Delete" />
								</span>
								<span onClick={this.onEditClick}>
									<i className="fas fa-edit fa-2x" title="Edit" />
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			);
		}
		if (this.state.isEditClicked) {
			divElement = (
				<form className="form-group">
					<table className="table">
					<tbody>
						<tr className="dividetds">
							<td>
							<input
							type="text"
							id="sname"
							className="form-control"
							defaultValue={this.props.studentData.studentName}
							onChange={(e) => this.onChangeHandler(e)}
							ref={(input) => {
								this.studentNameField = input;
							}}
						/>
							</td>
							<td>
							<input
							type="text"
							id="score"
							className="form-control"
							defaultValue={this.props.studentData.score}
							onChange={(e) => this.onChangeHandler(e)}
							ref={(input) => {
								this.scoreField = input;
							}}
						/>
							</td>
							<td>
								<button type="button" className="btn btn-primary" onClick={(e) => this.updateClick(e)}>Update</button>	
							</td>
						</tr>
					</tbody>
					</table>
				</form>
			);
		}
		return <div>{divElement}</div>;
	}
}
