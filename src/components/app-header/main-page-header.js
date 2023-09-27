import React, {useEffect} from 'react';
import '../cart-table/cart-table.scss'
import '../app-header/main-page-header.sass'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RegistAuthentificationHeader from "../common/RegistAuthentificationHeader";
import star from './Prismatic-Star-12.png'

const MainPageHeader = ({totalPrice}) => {

    function returnStyle(){
        document.querySelector('footer').classList.remove('grange-footer');
        document.querySelector('body').classList.remove('grange-background');
        document.querySelector('.container').classList.add("main-background");
    }

    useEffect(()=> {
            if (totalPrice <= 0) {
                document.querySelector('.cart__item-price').style.display = 'none';
            }
            else {
                document.querySelector('.cart__item-price').style.display = 'inline';
            }
        }
    )
    return (
<>
    <header>
        <div className="app-top-box">
        <RegistAuthentificationHeader/>
        </div>
        <div className="header__left">
            <Link onClick={()=>{
                returnStyle()
            }} to={'/registration/login'} className="auth">
                <span className="auth-text">Авторизация</span>
            </Link>
            <Link onClick={()=>{
                returnStyle()
            }} to={'/registration/signup'} className="registration" >Регистрация</Link>
        </div>
        <div className="header__right">
            <span className="telephone">+7(964)969-12-84(Viber)</span>
            <Link onClick={()=>{
                returnStyle()
            }} to ={'/shop/cart'} className="carT" href=""></Link>
            <div className="cart__item-price">Total: {totalPrice} р.</div>


        </div>
    </header>
    <Link onClick={()=>{
        returnStyle()
    }} to={'/'} className="logo">{/*<img  width={305} src={star}/>*/}</Link>
    <nav>
        <ul className="menu-left">
            <li><Link onClick={()=>{
                returnStyle()
            }} to={'/history'}>История</Link></li>
            <li><Link onClick={()=>{
                returnStyle()
            }} to={'/musicians'}>Музыканты</Link></li>
            <li><Link onClick={()=>{
                returnStyle()
            }} to = '/audio' >Аудио</Link></li>
            <li><Link onClick={()=>{
                returnStyle()
            }} to={'/video'}>Видео</Link></li>
        </ul>
        <ul className="menu-right">
            <li><Link onClick={()=>{
                returnStyle()
            }} to={'/concerts'}>Концерты</Link></li>
            <li><Link onClick={()=>{
                returnStyle()
            }} to={'/events'}>События</Link></li>
            <li><Link onClick={()=>{
                returnStyle()
            }} to='/shop' href="">Магазин</Link></li>
            <li><Link onClick={()=>{
                returnStyle()
            }} to={'/fun-club'}>Фан-клуб</Link></li>
        </ul>
    </nav>
</>
    )
};


const mapStateToProps = (state) => {
    return{
        totalPrice: state.mainReducer.totalPrice
    }
}

export default connect(mapStateToProps)(MainPageHeader);
