import React from 'react';
import './events.sass'
import eventphoto1 from './Ракурс-IMac_Pro.png'

const Events = () => {

    return(

        <div className="events-content">
            <div className="event__1">
                <p className="events-header">2021/12/01 – Открыт официальный сайт группы! <br/><br/>
                    Концепция и разработка функционала: {'\u00A0'}{'\u00A0'}<a className="developers"
                    href="https://www.linkedin.com/in/samson-emelyanov-5142b91bb/" target="_blank">Самсон Емельянов</a>
                    <br/>
                        Разработка логотипа: {'\u00A0'}{'\u00A0'}<a className="developers" href="https://kwork.ru/user/sfdesign" target="_blank">KWORK
                        фрилансер Сардор</a> <br/>
                        Веб-дизайн: {'\u00A0'}{'\u00A0'}<a className="developers" href="https://kwork.ru/user/dmitrik_design" target="_blank">KWORK
                        фрилансер Дмитрий</a> <br/>
                </p>
                <img width="981" src={eventphoto1} alt="photo"/>
            </div>
        </div>

    )
}

export default Events;
