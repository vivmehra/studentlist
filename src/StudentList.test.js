import React from 'react';
import StudentList from './StudentList';
import {
	shallow
} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
	adapter: new Adapter()
});

describe('<StudentList />', function () {
	let enzymeWrapper;            

	beforeEach(() => {
			enzymeWrapper = shallow(<StudentList />);
	});

		it('Should render Add Student Parent component', () => {
			expect(enzymeWrapper.find('#main-container').length).toBe(1);
		});
		it('Should render Add Student form ', () => {
			expect(enzymeWrapper.find('#addStudent').length).toBe(1);
		});

		it("calculateSummaryData function to be called", () => {
			expect(enzymeWrapper.instance().calculateSummaryData()).toBeUndefined();
		  });

		it("onDeleteClick function to be called", () => {
			const index = 1;
			expect(enzymeWrapper.instance().onDeleteClick(index)).toBeUndefined();
			const studentList = [{studentName: "abc", score: "12"}];
			enzymeWrapper.setState({ studentsList: studentList });
			expect(enzymeWrapper.find('.container-fluid').length).toBe(2);
			expect(enzymeWrapper.find('.mt-4').length).toBe(1);
			enzymeWrapper.instance().calculateSummaryData();
		  });
		  it("onChangeHandler function to be called", () => {
			const e = {charCode: 5};
			expect(enzymeWrapper.instance().handleKeyPress(e)).toBeUndefined();
			enzymeWrapper.instance().calculateSummaryData(e);
		  });
		  it("Simulate the click on button", () => {
			const event = { preventDefault: () => {} };
			enzymeWrapper.find('.btn').simulate('click');
			enzymeWrapper.instance().addStudent(event);
		  });
						
});