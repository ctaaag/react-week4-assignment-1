import { render, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import InputContainer from './InputContainer';

jest.mock('react-redux');

test('InputContainer', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    taskTitle: 'new Title',
  }));

  const { getByText, getByDisplayValue } = render((
    <InputContainer />
  ));

  expect(getByText(/추가/)).not.toBeNull();
  expect(getByDisplayValue(/new Title/)).not.toBeNull();

  fireEvent.click(getByText('추가'));
  expect(dispatch).toBeCalledWith({
    type: 'addTask',
  });
});
