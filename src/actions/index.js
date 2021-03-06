import fetchResource from '../utils/fetchResource';
import {
  SET_INVOICES,
  CHANGE_TAB,
  INVOICE_UPDATE,
  START_REQUEST,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  SELECT_TIMELOG,
  CREATE_TIMELOG,
} from './types';

export const changeTab = newTab => ({
  type: CHANGE_TAB,
  payload: newTab,
});

export const setInvoices = newName => ({
  type: SET_INVOICES,
  payload: newName,
});

export const fetchInvoices = () => async (dispatch) => {
  dispatch({ type: START_REQUEST });
  const invoices = await fetchResource.fetchInvoices();
  dispatch({ type: REQUEST_SUCCESS });
  dispatch(setInvoices(invoices));
};

export const cancelInvoice = id => async (dispatch) => {
  dispatch({ type: START_REQUEST });
  await fetchResource.cancelInvoice(id);
  const invoices = await fetchResource.fetchInvoices();
  dispatch(setInvoices(invoices));
  dispatch({ type: REQUEST_SUCCESS });
};

export const fetchInvoicePayments = id => async (dispatch) => {
  dispatch({ type: START_REQUEST });
  await fetchResource.fetchInvoicePayments(id);
  dispatch({ type: REQUEST_SUCCESS });
};

export const submitInvoice = invoiceData => async (dispatch) => {
  dispatch({ type: START_REQUEST });
  try {
    await fetchResource.submitInvoice(invoiceData);
    dispatch({ type: REQUEST_SUCCESS });
    window.location.reload();
  } catch (err) {
    console.log('err', err);
    dispatch({ type: REQUEST_ERROR });
  }
};

export const submitPayment = (invoiceId, amount) => async (dispatch) => {
  dispatch({ type: START_REQUEST });
  try {
    await fetchResource.submitPayment(invoiceId, amount);
    dispatch({ type: REQUEST_SUCCESS });
  } catch (err) {
    console.log('err', err);
    dispatch({ type: REQUEST_ERROR });
  }
};

export const updateInvoice = ({ field, value }) => ({
  type: INVOICE_UPDATE,
  payload: { field, value },
});

export const selectTimeLog = selected => ({
  type: SELECT_TIMELOG,
  payload: selected,
});

export const createTimelog = (timelog) => {
  console.log('action', timelog);
  return {
    type: CREATE_TIMELOG,
    payload: timelog,
  };
};
