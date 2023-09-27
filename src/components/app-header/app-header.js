import React from 'react';
import {Route, Switch} from 'react-router-dom';
import MainPageHeader from "./main-page-header";
import '../app-header/main-page-header.sass'
import AudioHeader from "./audio-header";
import HistoryHeader from "./history-header";
import MusiciansHeader from "./musicians-header";
import VideoHeader from "./video-header";
import ShopHeader from "./shop-header";
import ConcertsHeader from "./concerts-header";
import EventsHeader from "./events-header";
import FunClubHeader from "./fun-club-header";
import RegistAuthentificationHeader from "../common/RegistAuthentificationHeader";

const AppHeader = ({authenticated,handleLogout})=>{

    return (
        <>
            <div className="app-top-box">
                <RegistAuthentificationHeader authenticated={authenticated} onLogout={handleLogout} />
            </div>
                <Switch>
                    <Route path = '/' exact component={MainPageHeader}/>
                    <Route path = '/history' exact component={MainPageHeader}/>
                    <Route path = '/full-history' exact component={MainPageHeader}/>
                    <Route path = '/musicians' exact component={MainPageHeader}/>
                    <Route path = '/video' exact component={MainPageHeader}/>
                    <Route path = '/concerts' exact component={MainPageHeader}/>
                    <Route path = '/events' exact component={MainPageHeader}/>
                    <Route path = '/shop' exact component={MainPageHeader}/>
                    <Route path = '/fun-club' exact component={MainPageHeader}/>
                    <Route path = '/shop/cart' exact component={MainPageHeader}/>
                    <Route path = '/registration' component={MainPageHeader}/>
                    <Route path = '/audio' exact component={MainPageHeader}/>
                    <Route path = '/checkout' component={MainPageHeader}/>
                    <Route path = '/shop/:id' exact component={MainPageHeader}/>
                    <Route path = '/history-footer' exact component={HistoryHeader}/>
                    <Route path = '/musicians-footer' exact component={MusiciansHeader}/>
                    <Route path = '/audio-footer' exact component={AudioHeader}/>
                    <Route path = '/video-footer' exact component={VideoHeader}/>
                    <Route path = '/concerts-footer' exact component={ConcertsHeader}/>
                    <Route path = '/events-footer' exact component={EventsHeader}/>
                    <Route path = '/shop-footer' exact component={ShopHeader}/>
                    <Route path = '/fun-club-footer' exact component={FunClubHeader}/>
                </Switch>
        </>
    )
}

export default AppHeader;
