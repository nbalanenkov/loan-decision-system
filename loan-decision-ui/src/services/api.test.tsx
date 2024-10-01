import axios from 'axios';
import { submitLoanRequest } from './api';
import { LoanDecision, LoanRequest, LoanResponse } from '../types/types';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service - submitLoanRequest', () => {
  const requestData: LoanRequest = {
    personalCode: '12345678901',
    loanAmount: 5000,
    loanPeriod: 24,
  };

  it('should successfully submit the loan request and return the response', async () => {
    const mockResponse: LoanResponse = {
      decision: LoanDecision.Approved,
      approvedLoanAmount: 5000,
      approvedLoanPeriod: 24,
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

    const result = await submitLoanRequest(requestData);

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      '/loan-decision',
      requestData,
    );
  });

  it('should throw an error if the request fails', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    await expect(submitLoanRequest(requestData)).rejects.toThrow(
      'Network Error',
    );
  });
});
