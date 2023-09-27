import React, {Component, useEffect} from 'react';
import MenuListItem from '../menu-list-item';
import {connect, useDispatch, useSelector} from 'react-redux';
import WithRestoService from '../hoc';
import {menuLoaded, menuRequested, menuError, addedToCart} from '../../actions';
import Spinner from '../spinner';
import Error from '../error';

import './menu-list.scss';

const MenuList = ({RestoService}) => {

    const menuItems = useSelector(state=>state.mainReducer.menu);
    const loading = useSelector(state=>state.mainReducer.loading);
    const error = useSelector(state=>state.mainReducer.error);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(menuRequested());
        RestoService.getMenuItems()
            .then(res => {
                console.log(res);
                dispatch(menuLoaded(res));
            })
            .catch(() => dispatch(menuError()));
    },[])
        if (error){
            return <Error/>
        }
        if (loading) {
            return <Spinner/>
        }
        const items = menuItems.map(menuItem => {
                return ( <MenuListItem
                            key = {menuItem.id}
                            menuItem = {menuItem }
                            onAddToCart = {() => dispatch(addedToCart(menuItem.id))}/>
                )
            })

        return (
            <View items = {items}/>
            )

};

const View = ({items}) => {

    return (
        <ul className="menu__list">
            {items}
        </ul>
    )
}

export default WithRestoService()(MenuList);
