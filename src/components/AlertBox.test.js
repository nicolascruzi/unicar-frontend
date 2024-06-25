import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import AlertBox from './AlertBox';
import { handleCloseAlert } from '../utils/handleCloseAlert';

// Mock the handleCloseAlert function
// jest.mock('../utils/handleCloseAlert', () => ({
//   handleCloseAlert: jest.fn(),
// }));

describe('AlertBox Component', () => {
  it('renders with correct props', () => {
    const { getByText } = render(
      <AlertBox
        severity="error"
        messageAlert="Test Error Message"
        setOpenAlert={jest.fn()}
        openAlert={true}
        hideDuration={3000}
      />
    );
    expect(getByText('Test Error Message')).toBeInTheDocument();
  });

  // test handle close alert
  it('handle Close Alert"', () => {
    const setOpenAlertMock = jest.fn();

    handleCloseAlert({}, 'clickaway', setOpenAlertMock);

    expect(setOpenAlertMock).not.toHaveBeenCalled();
  });

  it('calls setOpenAlert with false when reason is not "clickaway"', () => {
    const setOpenAlertMock = jest.fn();

    handleCloseAlert({}, '', setOpenAlertMock);

    expect(setOpenAlertMock).toHaveBeenCalled();
  });


});