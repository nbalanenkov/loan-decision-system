import axios from 'axios';
import { LoanRequest, LoanResponse } from '../types/types';

const API_BASE_URL = '/loan-decision';

export const submitLoanRequest = async (
  requestData: LoanRequest,
): Promise<LoanResponse> => {
  const response = await axios.post<LoanResponse>(API_BASE_URL, requestData);
  return response.data;
};
