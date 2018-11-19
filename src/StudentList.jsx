/* Component to add Student Info and
   Call StudentItem iteratively on the basis of number of students added. */

import React, { Component } from 'react';
import './StudentList.css';
import StudentItem from './StudentItem';
import ErrorMessage from './ErrorMessage';

export default class StudentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentsList: [],
			isInvalid: 0
		};
	}
    /*  Function to calculate min max and average values of the class */
	calculateSummaryData = () => {
		let studentsList = this.state.studentsList;
		let scoreArray = '';
		scoreArray = studentsList.map((student) => Number(student.score));
		this.min = Math.min(...scoreArray);
		this.max = Math.max(...scoreArray);
		this.avg = +(scoreArray.reduce((a, b) => Number(a) + Number(b), 0) / studentsList.length).toFixed(2);
	};

	/*  Function to delete corresponding student data, data passed by child component*/
	onDeleteClick = (index) => {
		let studentsList = this.state.studentsList;
		studentsList.splice(index, 1);
		this.setState({
			studentsList: studentsList
		});
		this.calculateSummaryData();
	};
	/* Function to fetch the values: name and score, on onChange event */ 
	onChangeHandler = (e) => {
		if (e.target.id === 'sname') {
			this.name = e.target.value.trim() === '' ? '' : e.target.value;
		} else {
			this.score = e.target.value.trim() === '' ? '' : e.target.value;
		}
	};
	/*  Function to Add corresponding student data in state */
	addStudent = (e) => {
		if (this.name === '' || this.score === '' || this.score < 0 || this.score > 100 || isNaN(this.score)) {
			this.setState({
				isInvalid: 1
			});
			return;
		}else{
			let studentData = {
				studentName: this.name,
				score: Number(this.score)
			};
			let studentsList = this.state.studentsList;
			studentsList.push(studentData);
			this.setState({
				studentsList: studentsList,
				isInvalid: 0
			});
			this.calculateSummaryData();
			this.name = this.score = this.studentNameField.value = this.scoreField.value = '';	
		}
	};

	/*Function to handle update event triggered from child component(StudentLit)
	 and update the correspodnig student data in state */
	updateClick = (key, name, score) => {
		if (name === '' || score === '' || score < 0 || score > 100 || isNaN(score)) {
			this.setState({
				isInvalid: 1
			});
			return;
		}else{
			const studentsList = this.state.studentsList;
			studentsList[key] = {
				studentName: name,
				score: score
			};
			this.setState({
				studentsList: studentsList,
				isInvalid: 0
			});
			this.calculateSummaryData();
		}
			
	};
/* Function to add student on enterkey stroke*/
	handleKeyPress(e) {
		if (e.charCode === 13) {
			if (this.name === '' || this.score === '') {
				this.setState({
					isInvalid: 1
				});
			}
			this.addStudent(e);
		}
	}
	render() {
		const studentsList = this.state.studentsList;
		let studentData = '';
		return (
			<div className="container-fluid mt-2" id='main-container'>
			{/* Add Student Section */}
			{this.state.isInvalid === 1 && <ErrorMessage message='Please enter valid data'/>}
				<form className="form-inline p-3" id='addStudent'>
					<div className="form-group mb-2">
						<label htmlFor="sname" className="m-2">
							Student Name <sup className="mandatory">*</sup>
						</label>
						<input
							type="text"
							id="sname"
							className="form-control"
							placeholder="Student Name"
							onChange={(e) => this.onChangeHandler(e)}
							onKeyPress={(e) => this.handleKeyPress(e)}
							ref={(input) => {
								this.studentNameField = input;
							}}
						/>
					</div>
					<div className="form-group mx-sm-3 mb-2">
						<label htmlFor="score" className="m-2">
							Marks Obtained <sup className="mandatory">*</sup>
						</label>
						<input
							type="text"
							className="form-control"
							id="score"
							placeholder="Score"
							onChange={(e) => this.onChangeHandler(e)}
							onKeyPress={(e) => this.handleKeyPress(e)}
							ref={(input) => {
								this.scoreField = input;
							}}
						/>
					</div>
					<button type="button" onClick={(e) => this.addStudent(e)} className="btn btn-success mb-2">
						Add Student
					</button>
				</form>
				<hr/>
				{/* Summary section to be shown only if there is some data in students array */}
				{studentsList.length > 0 && (
					<div>
						<h6 className="font-weight-bold">Class performance</h6>
						<hr/>
						<div className="row">
							<div className="col-md-4">
								<h6>Min Grade</h6>
								<p>{this.min}</p>
							</div>
							<div className="col-md-4">
								<h6>Max Grade</h6>
								<p>{this.max}</p>
							</div>
							<div className="col-md-4">
								<h6>Average Grade</h6>
								<p>{this.avg}</p>
							</div>
						</div>
						<hr/>
					</div>
				)}
				{studentsList.length > 0 && (
					<div className="mt-4">
						<h6 className="font-weight-bold">Student List</h6>
						<table className="table">
							<thead>
								<tr>
									<th>Student Name</th>
									<th>Marks Obtained</th>
									<th>Actions</th>
								</tr>
							</thead>
						</table>
					</div>
				)}
				{/* Iteratively Calling StudentItem component to add each row for the students array */}
				{studentsList.map((student, index) => {
					studentData = {
						...student,
						key: index,
						onDeleteClick: this.onDeleteClick,
						updateClick: this.updateClick
					};
					return (
						<div className="container-fluid" key="index">
							<StudentItem studentData={studentData} />
						</div>
					);
				})}
			</div>
		);
	}
}
