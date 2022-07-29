import React, { useState, forwardRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectOrder,
  selectAddress,
  selectPayment,
  setAddress,
} from './orderSlice';
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// @ts-ignore
import ReactFormInputValidation from "react-form-input-validation";


export function Order() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrder);
  const address = useAppSelector(selectAddress);
  const payment = useAppSelector(selectPayment);

  const [addressState, setAddressState] = useState(address);
  const [paymentState, setPaymentState] = useState(payment);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (param: any) => (event: any) => {
    setShow(true)
  };

  const handleOrder = (event: any) => {
    setShow(true)
  };

  const handleAddressChange = (evt: any) => {
    const value = evt.target.value;
    setAddressState({
      ...addressState,
      [evt.target.name]: value
    });
    dispatch(setAddress(addressState))
  }

  const handlePaymentChange = (evt: any) => {
    const value = evt.target.value;
    setPaymentState({
      ...paymentState,
      [evt.target.name]: value
    });
  }

  const handleDatePaymentChange = (date: any) => {
    setPaymentState({
      ...paymentState,
      ['expiration']: date
    });
  }

  const totalPrice = () => {
    let total = 0
    Object.entries(orders).forEach(([key, t]) => {
        total += (Number(t.quantity) * Number(t.price))
    })
    return total
  }

  if (!orders.length) {
    return (
      <div>
      <div className="container">
        <div className="py-5 text-center">
          No event selected. <hr/>
        <Link to="/">Back</Link> 
        </div>
      </div>
      </div>
    )
  }


  return (
    <div>
      <form>
      <div className="container">
        <div className="py-5 text-center">
          
        </div>
        <div className="row">
            <Link to="/">Back</Link> 
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              {orders.map((t:any, i:any) => {
                
                return (
                  <li key={i} className="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                      <h6 className="my-0">{t.title}</h6>
                      <small className="text-muted">{t.desc}</small>
                    </div>
                    <span className="text-muted">{t.quantity} x RM {t.price}</span>
                  </li>
                  )
                }
                )}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (MYR)</span>
                <strong>RM {totalPrice()}</strong>
              </li>
              <hr className="mb-4" />
              <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={handleOrder}>Place order</button>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input type="text" className="form-control" id="firstName" name="firstname" value={addressState.firstname} onChange={handleAddressChange} />
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input type="text" className="form-control" id="lastName"  name="lastname" value={addressState.lastname} onChange={handleAddressChange} />
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                <input type="email" className="form-control" id="email" placeholder="you@example.com" name="email" value={addressState.email} onChange={handleAddressChange} />
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" placeholder="Address" name="address" value={addressState.address} onChange={handleAddressChange} />
                <div className="invalid-feedback">
                  Please enter your shipping address.
                </div>
              </div>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <select className="custom-select d-block w-100" id="country" name="country" value={addressState.country} onChange={handleAddressChange} >
                    <option >Choose...</option>
                    <option>Malaysia</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <select className="custom-select d-block w-100" id="state" name="state" value={addressState.state} onChange={handleAddressChange} >
                    <option >Choose...</option>
                    <option>Kuala Lumpur</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input type="text" className="form-control" id="zip" required />
                  <div className="invalid-feedback">
                    Zip code required.
                  </div>
                </div>
              </div>
              <hr className="mb-4" />
              <h4 className="mb-3">Payment</h4>
              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" required />
                  <label className="custom-control-label" htmlFor="credit">Credit card</label>
                </div>
                <div className="custom-control custom-radio">
                  <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                  <label className="custom-control-label" htmlFor="debit">Debit card</label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input type="text" className="form-control" id="cc-name"  name="name" value={paymentState.name} onChange={handlePaymentChange}/>
                  <small className="text-muted">Full name as displayed on card</small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input type="text" className="form-control" id="cc-number" name="credit_card_number" value={paymentState.credit_card_number} onChange={handlePaymentChange} />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <DatePicker name="expiration" selected={paymentState.expiration} onChange={handleDatePaymentChange} />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">CVV</label>
                  <input type="text" className="form-control" id="cc-cvv" name="cvv" value={paymentState.cvv} onChange={handlePaymentChange} />
                  <div className="invalid-feedback">
                    Security code required
                  </div>
                </div>
              </div>
              <hr className="mb-4" />
          </div>
        </div>
      </div>
      </form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Completed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div><pre>{JSON.stringify(orders, null, 2) }</pre></div>
          <div><pre>{JSON.stringify(addressState, null, 2) }</pre></div>
          <div><pre>{JSON.stringify(paymentState, null, 2) }</pre></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
