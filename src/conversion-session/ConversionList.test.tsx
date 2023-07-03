import React from 'react';
import { act, create } from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import ConversionList from './ConversionList';
import { ConversionOutput } from '../aws/APIHelper';
import * as S3Helper from '../aws/S3Helper';

const s3Spy = jest.spyOn(S3Helper, 'getS3ObjectUrl').mockResolvedValue("test");

describe('ConversionList', () => {
    const conversions: ConversionOutput[] = [
        {
            fileName: 'test1.jpg',
            id: '1234',
            conversionStatus: 'COMPLETED',
            originalFileFormat: 'jpg',
            convertedFileFormat: 'png'
        }
    ];


    it('renders a conversion list', () => {
        const component = create(
          <ConversionList conversions={conversions}/>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('gets a download url when the button is clicked', async () => {    
        const component = <ConversionList conversions={conversions}/>;
        const { queryByRole, getByRole, findByText } = render(component);
    
        const downloadButtonRole = "button";
        expect(queryByRole(downloadButtonRole)).toBeTruthy();
    
        fireEvent.click(getByRole(downloadButtonRole));

        expect(s3Spy).toHaveBeenCalledWith("1234.png");
        expect(await findByText("Download")).toBeInTheDocument();
    });
});

