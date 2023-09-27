import React from 'react';
import { connect } from 'react-redux';
import {deleteFromCart} from '../../actions';
import WithRestoService from '../hoc';

import './cart-table.scss';
import {Link} from "react-router-dom";

const CartTable = ({items, deleteFromCart, RestoService}) => {
    if( items.length === 0){
        return (<div className="cart__title"> Ваша корзина пуста... </div>)
    }
    return (
        <>
            <div className="cart__title">Ваш заказ:</div>
            <div className="cart__list">
            {
                items.map( item => {
                    const {price, name, imageURL, id, qtty} = item;
                    return (
                        <div key = {id} className="cart__item">
                            <img src={imageURL} className="cart__item-img" alt={name}></img>
                            <div className="cart__item-title">{name}</div>
                            <div className="cart__item-price">{price}р. x {qtty}</div>
                            <div onClick = {() => deleteFromCart(id)}className="cart__close">&times;</div>
                        </div>
                    );
                })
            }
            </div>
            <Link to={'/checkout'}  className = "order btn">Оформить заказ</Link>
           {/* <button onClick = {() => {RestoService.setOrder( generateOrder(items))} } className = "order btn">Оформить заказ</button>*/}
        </>
    );
};

const generateOrder = (items) => {
    const newOrder = items.map(item => {
        return {
            id: item.id,
            qtty: item.qtty
        }
    })
    return newOrder;
}

const mapStateToProps = (state) => {
    return{
        items: state.mainReducer.items
    }
};

const mapDispatchToProps = {
    deleteFromCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));
