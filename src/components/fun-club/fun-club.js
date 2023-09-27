import React, {Component, useState, useEffect, useRef} from 'react';
import InputEmoji from "react-input-emoji";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { DateTime } from 'luxon';
import guestPhoto from './target-angle-stuff_cabinet.png';
import './fun-club.sass';
import fun_club_photo1 from './6487710a69fd22ca0a9f4a05503ac229 2.png';
import fun_club_photo2 from './Vector.svg'
import {API_BASE_URL} from "../constants";

const FunClub = ({currentUser, authenticated, data, message, setData, setText}) => {

    const socket = new SockJS(API_BASE_URL+'/ws');
    const stompClient = Stomp.over(socket);

    const dt = DateTime.local();
    function sendMessage(msg) {
        if(message && stompClient) {
            const chatMessage = {
                sender: currentUser ? (currentUser.name) : 'Гость',
                senderImg: currentUser ? (currentUser.imageUrl) : guestPhoto,
                content: msg,
                date: dt,
                type: 'CHAT'
            };

            stompClient.send(API_BASE_URL+"/app/chat.sendMessage", {}, JSON.stringify(chatMessage));

        }
    }
   function onSubmit(e) {
       e.preventDefault();
       sendMessage(message);
       setText('');
    }

    const PostList = () => {

        useEffect(() => {
            const massageArea =  document.querySelector('.chat-window');
            massageArea.scrollTop = massageArea.scrollHeight;
        }
     )

        const elements = data.map((item) => {
            const {id, ...itemProps} = item;
            return (
                <li key={id} className='list-group-item'>
                    <PostListItem
                        currentUser={currentUser}
                        {...itemProps}
                    />
                </li>
            )
        });

        return (
            <ul className="app-list list-group">
                {elements}
            </ul>
        )
    }

    const PostListItem = ({content,sender,senderImg, date}) => {
            if(content) {
                return (
                    <div className="chat-list-item">
                        <div className="chat-avatar">
                            {
                                senderImg ? (
                                    <>
                                        <img width={96} height={96}
                                             src={senderImg}
                                             alt={sender}/>
                                        <div className="sender-name">{sender}</div>
                                    </>
                                ) : (
                                    <div className="chat-avatar-text">
                                        <span>{sender || "Гость"}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div
                            className="app-list-item-label">
                            {content}
                        </div>
                        <div className="app-list-item-label date">{date.substring(0,10)}//{date.substring(11,16)}</div>
                    </div>
                )
            }
            else return (
                <></>
            )
    }

    return(
        <div className="fun-club-content">
            <div className="chat">
                <span className="fun-club-headers chat-header">Чат</span>
                <div className="chat-window">
                    <PostList/>
                </div>
                <form action="" onSubmit={onSubmit}>
                    <div> {
                        authenticated ? (
                            <span></span>
                        ) : (
                            <span className="guest-warning">Внимание, Ваше сообщение будет отправлено от имени гостя</span>
                        )
                    }
                    </div>
                    <InputEmoji
                        borderRadius={2}
                        value={message}
                        onChange={setText}
                        cleanOnEnter
                        onEnter={sendMessage}
                        placeholder="Введите Ваше сообщение"
                    />
                    <div className="fun-club-button-container">
                        <button type="submit" className="button fun-club-button">ОТПРАВИТЬ</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FunClub;
