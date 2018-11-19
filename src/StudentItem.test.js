import React from "react";
import StudentItem from "./StudentItem";
import { shallow } from "enzyme";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
	adapter: new Adapter()
});
const studentData = {studentName:'Hello', score: 1};
const onDeleteClick = jest.fn();
const updateClick = jest.fn();

describe("StudentItem", () => {
    let enzymeWrapper;            

	beforeEach(() => {
			enzymeWrapper = shallow(<StudentItem studentData={studentData} onDeleteClick={onDeleteClick} updateClick={updateClick}/>);
	});
  it('renders the StudentItem Component', () => {
    expect(enzymeWrapper.find('StudentItem')).toBeDefined();
  });

  it("onEditClick function to be called", () => {
    expect(enzymeWrapper.instance().onEditClick()).toBeUndefined();
    enzymeWrapper.setState({ isEditClicked: true });
  });
});