import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectProduct,
} from './productSlice';
import {
  selectOrder,
  setOrder,
} from '../order/orderSlice';
import styles from './Counter.module.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";


function TicketChild(this: any, props: any) {
  const orders = useAppSelector(selectOrder);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [tickets, setTickets] = useState(orders);

  const dispatch = useAppDispatch();

  const searchBarProps = {
    parent_key: props.parent_key,
  }
  

  const handleClose = () => setShow(false);
  const handleShow = (param: any) => (event: any) => {
    setTickets(param);
    setShow(true)
  };

  const handleCheckout = (param: any) => (e: any) => {
    setShow(false);
    dispatch(setOrder(tickets));
    navigate("/order");
  }

  const handleChange = (e: any) => {
    const key = e.currentTarget.attributes['child_key'].value
    
    let o:any = [...tickets]
    let item = Object.assign({}, o[key], {quantity: Number(e.target.value)});
    o[key] = item;
    setTickets(o);
  };

  return (
    <>
      <li className="list-group-item">
        <div className="media align-items-lg-center flex-column flex-lg-row p-3">
          <div className="media-body order-2 order-lg-1">
            <h5 className="mt-0 font-weight-bold mb-2">{props.obj.title}</h5>
            <p className="font-italic text-muted mb-0 small">{props.obj.desc}</p>
              <img src={props.obj.image} alt="Generic placeholder image" width="200" className="ml-lg-5 order-1 order-lg-2" />
            <div className="d-flex align-items-center justify-content-between mt-1">
            <Button variant="primary" onClick={handleShow(props.obj.tickets)}>Buy ticket</Button>
            </div>
          </div>
        </div>
      </li>
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.obj.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table hover>
        <tbody>
          {tickets.map((obj:any, i:any) => {
            const childProps = {
              child_key: i,
              event_id: props.obj.id,
              id: obj.id
            }
            return (
              <tr key={i}>
                <td>
                  <div>{obj.title}</div>
                  <div>MYR {obj.price}</div>
                </td>
                <td>
                <select value={obj.quantity} {...searchBarProps} {...childProps} onChange={handleChange}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
                </td>
              </tr>
              )
            }
            )}
          </tbody>
        </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" {...searchBarProps} onClick={handleCheckout(props.obj)}>
            Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export function Product() {
  const product = useAppSelector(selectProduct);
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e: any) => {
  }

  return (
    <div>
      <div className="container py-5">
          <div className="row text-center text-white mb-5">
            <div className="col-lg-7 mx-auto">
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <ul className="list-group shadow">

              {product.map((obj, i) => {
            return (
              <TicketChild key={i} parent_key={i} obj={obj} handleShow={handleShow}  />
            )
            }
          )}
              </ul>
            </div>
          </div>
        </div>
    </div>
  );
}
