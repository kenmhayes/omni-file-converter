import { fireEvent, render } from "@testing-library/react";
import FileTypeSelect from "./FileTypeSelect";
import { act, create } from "react-test-renderer";

const originalSelectText = "Original file type";
const convertedSelectText = "Converted file type";

it('renders a file type select control group', async () => {
    let component: any;
    await act(async () => {
        component = create(
            <FileTypeSelect onOriginalTypeChange={jest.fn()} onConvertTypeChange={jest.fn()} />
        );
    });
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('allows for selection of file types', () => {
    const {queryByDisplayValue, getByDisplayValue } = render(
      <FileTypeSelect onOriginalTypeChange={jest.fn()} onConvertTypeChange={jest.fn()} />
    );

    expect(queryByDisplayValue(originalSelectText)).toBeTruthy();
    expect(queryByDisplayValue(convertedSelectText)).toBeTruthy();

    // Cannot select a converted file type without an original designated
    fireEvent.change(getByDisplayValue(convertedSelectText), { target: { value: 'png' }});
    expect(queryByDisplayValue('png')).toBeFalsy();

    // Select jpg in the first select
    fireEvent.change(getByDisplayValue(originalSelectText), { target: { value: 'jpg'}});

    expect(queryByDisplayValue('jpeg/jpg')).toBeTruthy();

    // Select png in the second select
    fireEvent.change(getByDisplayValue(convertedSelectText), { target: { value: 'png' }});

    expect(queryByDisplayValue('png')).toBeTruthy();

    // Select png in the first select, expect empty in second select
    fireEvent.change(getByDisplayValue('jpeg/jpg'), { target: { value: 'png'}});

    expect(queryByDisplayValue(convertedSelectText)).toBeTruthy();

    // Can now select jpg in the second select, as it is a valid conversion for jpg

    fireEvent.change(getByDisplayValue(convertedSelectText), { target: { value: 'jpg'}});

    expect(queryByDisplayValue('jpeg/jpg')).toBeTruthy();
});