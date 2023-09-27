import React from 'react';
import { Link } from 'react-router-dom';

import './footer.sass';

const Footer = () => {
    function returnStyle(){
        document.querySelector('footer').classList.remove('grange-footer');
        document.querySelector('body').classList.remove('grange-background');
        document.querySelector('.container').classList.add("main-background");
    }
    function changeStyle() {
        document.querySelector('.container').classList.remove("main-background");
        document.querySelector('body').classList.add('grange-background');
        document.querySelector('footer').classList.add('grange-footer')
    }
    return (
    <footer>
        <div className="footer">
            <div className="footer-menu">
                <ul className="menu-left menu-left__footer">
                    <li><Link onClick={()=>{
                     changeStyle()
                    }} to = {'/history-footer'}>История</Link></li>
                    <li><Link onClick={()=>{
                        changeStyle()
                    }} to = {'/musicians-footer'}>Музыканты</Link></li>
                    <li><Link onClick={()=>{
                        changeStyle()
                    }} to = {"/audio-footer"}>Аудио</Link></li>
                    <li><Link onClick={()=>{
                        changeStyle()
                    }} to={'/video-footer'}>Видео</Link></li>
                </ul>
                <Link onClick={()=>{
                    returnStyle()
                }} to={'/'} className="logo__footer" ></Link>
                <ul className="menu-right menu-right__footer">
                    <li><Link onClick={()=>{
                        changeStyle()
                    }} to={'/concerts-footer'}>Концерты</Link></li>
                    <li><Link onClick={()=>{
                        changeStyle()
                    }} to={'/events-footer'}>События</Link></li>
                    <li><Link onClick={()=>{
                        changeStyle()
                    }} to={'/shop-footer'}>Магазин</Link></li>
                    <li><Link onClick={()=>{
                        changeStyle()
                    }} to={'/fun-club-footer'}>Фан-клуб</Link></li>
                </ul>
            </div>
            <ul className="footer-text">
                <li>Все права защищены ©2021</li>
                <li className="footer-tel">+7 (964)969-12-84(Viber)</li>
                <li>Связь с администрацией : samson.emelyanov@gmail.com</li>
            </ul>
        </div>
    </footer>
    )
}

export default Footer;
