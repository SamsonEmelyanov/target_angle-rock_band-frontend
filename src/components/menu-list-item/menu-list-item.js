import React from 'react';
import { Link } from 'react-router-dom';
import './menu-list-item.scss';

// const getCategoryImg = (category) =>{
//     switch(category){
//         case
//     }
// }

const MenuListItem = ( {menuItem, onAddToCart}) => {
    const {name, price, imageURL} = menuItem;

    return (
        <>
            <li className="menu__item">
                <Link style={{textDecoration:'none'}} to = {`/shop/${menuItem.id}`}>
                    <img className="menu__img" src={imageURL} alt={name}></img>
                    <div className="menu__title">{name}</div>
                </Link>
                    <div className="menu__price-wrapper">
                    <div className="menu__price"><span>{price}р.</span></div>
                    <button onClick = {(e) => {
                            e.preventDefault();
                            onAddToCart();
                        } }
                        className="menu__btn">КУПИТЬ</button>
                    </div>
            </li>
        </>
    )
}


export default MenuListItem;
