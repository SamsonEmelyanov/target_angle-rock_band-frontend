import React from 'react';
import './concerts.sass'


const Concerts = () => {

    return(

            <div className="concerts-content">
                <div className="concert">
                    <span className="concert-date">N/A</span>
                    <span className="concert-city">ТОЛЬЯТТИ</span>
                    <nobr className="concert-club">Клуб “UNDEFINED”</nobr>
                    <span className="concert-time">22:00</span>
                    <a className="concerts-button" href="https://ticketscloud.com/" target="_blank">
                        <span className="concerts-button-text">КУПИТЬ</span>
                    </a>
                </div>
                <div className="concert">
                    <span className="concert-date">N/A</span>
                    <span className="concert-city">МОСКВА</span>
                    <nobr className="concert-club">Клуб “UNDEFINED”</nobr>
                    <span className="concert-time">22:00</span>
                    <a className="concerts-button" href="https://ticketscloud.com/" target="_blank">
                        <span className="concerts-button-text">КУПИТЬ</span>
                    </a>
                </div>
                <div className="concert">
                    <span className="concert-date">N/A</span>
                    <span className="concert-city">САНКТ-ПЕТЕРБУРГ</span>
                    <nobr className="concert-club">Клуб “UNDEFINED”</nobr>
                    <span className="concert-time">22:00</span>
                    <a className="concerts-button" href="https://ticketscloud.com/" target="_blank">
                        <span className="concerts-button-text">КУПИТЬ</span>
                    </a>
                </div>
                <div className="concert">
                    <span className="concert-date">N/A</span>
                    <span className="concert-city">КАЗАНЬ</span>
                    <nobr className="concert-club">Клуб “UNDEFINED”</nobr>
                    <span className="concert-time">22:00</span>
                    <a className="concerts-button" href="https://ticketscloud.com/" target="_blank">
                        <span className="concerts-button-text">КУПИТЬ</span>
                    </a>
                </div>
            </div>

    )

}

export default Concerts;
