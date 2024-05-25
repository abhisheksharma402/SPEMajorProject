import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/login/component/Login';

// Mock the axios module
jest.mock('axios');

// Mock the useNavigate hook from react-router-dom
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
     ...(jest.requireActual('react-router-dom')),
     useNavigate: () => mockedUsedNavigate
}));

describe('Login Component', () => {
     beforeEach(() => {
          jest.clearAllMocks();
     });

     it('renders the Login component with initial elements', () => {
          render(
               <BrowserRouter>
                    <Login />
               </BrowserRouter>
          );

          // Check if the buttons for roles are rendered
          expect(screen.getByText('Customer')).toBeInTheDocument();
          expect(screen.getByText('Agency')).toBeInTheDocument();
          expect(screen.getByText('Agent')).toBeInTheDocument();

          // Check if the input fields are rendered
          // expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
          // expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();

          // Check if the Sign in button is rendered
          expect(screen.getByText('Sign in')).toBeInTheDocument();
     });

     test('changes role button color on click', () => {
          render(
               <BrowserRouter>
                    <Login />
               </BrowserRouter>
          );

          const customerButton = screen.getByText('Customer');
          const agencyButton = screen.getByText('Agency');
          const agentButton = screen.getByText('Agent');

          // Click on the 'Agency' button
          fireEvent.click(agencyButton);

          // Check if the 'Agency' button has the active background color
          expect(agencyButton).toHaveStyle('background-color: #4FA786');

          // Check if the other buttons have the default background color
          expect(customerButton).toHaveStyle('background-color: #efefef');
          expect(agentButton).toHaveStyle('background-color: #efefef');
     });


     test('shows error message on login failure', async () => {
          axios.post.mockRejectedValueOnce(new Error('Login failed'));

          render(
               <BrowserRouter>
                    <Login />
               </BrowserRouter>
          );

          // Select role
          fireEvent.click(screen.getByText('Agency'));

          // Enter email and password
          fireEvent.change(screen.getByTestId('signin-username'), { target: { name: 'email', value: 'sd@xyz.com' } });
          fireEvent.change(screen.getByTestId('signin-password'), { target: { name: 'password', value: '1234' } });

          // Submit form
          fireEvent.click(screen.getByTestId('signin-btn'));

          await waitFor(() => {
               expect(axios.post).toHaveBeenCalledWith(
                    'http://localhost:9094/agency/login',
                    { email: 'sd@xyz.com', password: '1234' },
                    expect.any(Object)
               );
          });

          // Check if the error message is displayed
          await waitFor(() => {
               expect(screen.getByText('Error while Signing Up')).toBeInTheDocument();
          });
     });

});
