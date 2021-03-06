/* Component to add Student Info and
   Call StudentItem iteratively on the basis of number of students added. */

import React, { Component } from 'react';
import './StudentList.css';
import StudentItem from './StudentItem';
import ErrorMessage from './ErrorMessage';
import {inputDataErrorMessageUtil, calculateSummaryDataUtil} from './Utilities'
import ClassSummary from './ClassSummary';
import TableHeader from './TableHeader';

export default class StudentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			studentsList: [],
			isInvalid: 0
		};
		this.name = '';
		this.score = '';
	}
    /*  Function calling util function to get min max and avg value */
	calculateSummaryData = (studentsList) => {
		let summaryData = calculateSummaryDataUtil(studentsList);
		this.min = summaryData.min;
		this.max = summaryData.max;
		this.avg = summaryData.avg;
	};

	/*  Function to delete corresponding student data, data passed by child component*/
	onDeleteClick = (index) => {
		let studentsList = [...this.state.studentsList];
		studentsList.splice(index, 1);
		this.setState({
			studentsList: studentsList
		});
		this.calculateSummaryData(studentsList);
	};
	/* Function to fetch the values: name and score, on onChange event */ 
	onChangeHandler = (e) => {
		let value = e.target.value.trim();
		if (e.target.id === 'sname') {
			this.name = value === '' ? '' : value;
		} else {
			this.score = value === '' ? '' :value;
		}
	};
	/* Function to Set the Corresponding Error Message*/
	inputDataErrorMessage = (name, score) =>{
		this.ErrorMessage = inputDataErrorMessageUtil(name,score);
	}

	/*  Function to Add corresponding student data in state */
	addStudent = (e) => {
		if (this.name === '' || this.score === '' || this.score < 0 || this.score > 100 || isNaN(this.score)) {
			this.inputDataErrorMessage(this.name,this.score);
			this.setState({
				isInvalid: 1
			});
			return;
		}else{
			let studentData = {
				studentName: this.name,
				score: Number(this.score)
			};
			let studentsList = [...this.state.studentsList];
			
			let duplicateStudents = studentsList.filter((student)=>{
				return student.studentName === this.name;
			})
			if(duplicateStudents.length === 0){
				studentsList.push(studentData);
				this.setState({
					studentsList: studentsList,
					isInvalid: 0
				});
				this.calculateSummaryData(studentsList);
				this.name = this.score = this.studentNameField.value = this.scoreField.value = '';
			}else{
				this.ErrorMessage = `Student with name '${this.name}' already exists`;
				this.setState({
					isInvalid: 1
				});
				return;
			}
				
		}
	};

	/*Function to handle update event triggered from child component(StudentLit)
	 and update the correspodnig student data in state */
	updateClick = (key, name, score) => {
			const studentsList = [...this.state.studentsList];
			studentsList[key] = {
				studentName: name,
				score: Number(score)
			};
			this.setState({
				studentsList: studentsList,
				isInvalid: 0
			});
			this.calculateSummaryData(studentsList);			
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
		const studentsList = [...this.state.studentsList];
		let studentData = '';
		const summaryProps = {
			min: this.min,
			max: this.max,
			avg: this.avg
		};
		return (
			<div className="container-fluid mt-2" id='main-container'>
			{/* Add Student Section */}
			{this.state.isInvalid === 1 && <ErrorMessage message={this.ErrorMessage}/>}
				<form className="form-inline p-3" id='addStudent'>
					<div className="form-group mb-2">
						<label htmlFor="sname" className="m-2">
							Student Name <sup className="mandatory">*</sup>
						</label>
						<input
							type="text"
							id="sname"
							className="form-control"
							placeholder="Enter Student Name"
							onChange={(e) => this.onChangeHandler(e)}
							onKeyPress={(e) => this.handleKeyPress(e)}
							ref={(input) => {
								this.studentNameField = input;
							}}
							maxLength = '255'
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
							maxLength = '5'
						/>
					</div>
					<button type="button" onClick={(e) => this.addStudent(e)} className="btn btn-success mb-2">
						Add Student
					</button>
				</form>
				<hr/>
				{/* Summary section to be shown only if there is some data in students array */}
				{studentsList.length > 0 && <ClassSummary data={summaryProps} />}
				
				{/* Table Header*/}
				{studentsList.length > 0 && <TableHeader />}

				{/* Iteratively Calling StudentItem component to add each row for the students array */}
				{studentsList.map((student, index) => {
					studentData = {
						...student,
						key: index,
						onDeleteClick: this.onDeleteClick,
						updateClick: this.updateClick,
						validateInputData: this.validateInputData,
						studentsList: studentsList
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
