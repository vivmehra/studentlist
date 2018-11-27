/* Child Component to show each row for each studenet data and 
pass control to parent component for edit, delete and update functionalities*/
import React, { Component } from 'react';
import './StudentList.css';
import {inputDataErrorMessageUtil} from './Utilities'
import TableRowView from './TableRowView';
import TableRowEdit from './TableRowEdit';

export default class StudentItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditClicked: false,
			isInvalid: 0
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
		if (this.name === '' || this.score === '' || this.score < 0 || this.score > 100 || isNaN(this.score)) {
			this.inputDataErrorMessage(this.name,this.score);
			this.setState({
				isInvalid: 1
			});
			return;
		}

		this.props.studentData.updateClick(this.props.studentData.key, this.name, this.score);
		this.setState({
			isEditClicked: false,
			isInvalid: 0
		});
	};

	onChangeHandler = (e) => {
		let value = e.target.value.trim();
		if (e.target.id === 'sname') {
			this.name = value === '' ? '' : value;
		} else {
			this.score = value === '' ? '' : value;
		}
	};
	inputDataErrorMessage = (name, score) =>{
		this.ErrorMessage = inputDataErrorMessageUtil(name,score);
	
}
	render() {
		const studentData = this.props.studentData;
		let divElement = '';
		const rowViewProps = {
			studentData: studentData,
			onDeleteClick  : this.onDeleteClick,
			onEditClick: this.onEditClick

		}
		const rowEditProps = {
			studentData: studentData,
			onChangeHandler: this.onChangeHandler,
			updateClick : this.updateClick,
			message: this.ErrorMessage,
			isInvalid: this.state.isInvalid
		}
		if (!this.state.isEditClicked) {
			divElement = ( <TableRowView data={rowViewProps} /> );
		}
		if (this.state.isEditClicked) {
			divElement = ( <TableRowEdit data = {rowEditProps} />
			);
		}
		return <div>{divElement}</div>;
	}
}
