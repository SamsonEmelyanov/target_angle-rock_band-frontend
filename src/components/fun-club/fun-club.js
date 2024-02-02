import React, {Component, useState, useEffect, useRef} from 'react';
import InputEmoji from "react-input-emoji";
import EmojiPicker, {
    EmojiStyle,
    SkinTones,
    Theme,
    Categories,
    EmojiClickData,
    Emoji,
    SuggestionMode,
    SkinTonePickerLocation
} from "emoji-picker-react";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { DateTime } from 'luxon';
import guestPhoto from './target-angle-stuff_cabinet.png';
import './fun-club.sass';
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
                                        <img width={48} height={48}
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

    const [selectedEmoji, setSelectedEmoji] = useState("1f60a");

    function onClick(emojiData, event) {
        setText(
            (text) =>
                text + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
        );
        setSelectedEmoji(emojiData.unified);
    }

    return(
        <div className="fun-club-content">
            <div className="chat">
                <span className="fun-club-headers chat-header">Чат</span>
                <div className="chat-window">
                    <PostList/>
                </div>
                <form action="" onSubmit={onSubmit}>
                    <div className="emoji">
                    <div className="chat-form-content">
                        {
                            authenticated ? (
                                <span></span>
                            ) : (
                                <span
                                    className="guest-warning">Внимание, Ваше сообщение будет отправлено от имени гостя</span>
                            )
                        }
                        <div>
                            <input
                                className="emoji-text-input"
                                type="text"
                                value={message}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Введите Ваше сообщение..."
                            />
                        </div>
                        <div className="fun-club-button-container">
                            <button type="submit" className="button fun-club-button">ОТПРАВИТЬ</button>
                        </div>
                    </div>
                    <div className="emoji-picker">
                        <EmojiPicker
                            onEmojiClick={onClick}
                            autoFocusSearch={false}
                            emojiStyle={EmojiStyle.GOOGLE}
                            theme={Theme.AUTO}
                            searchDisabled
                            skinTonePickerLocation={SkinTonePickerLocation.PREVIEW}
                            height={350}
                            width="50%"
                            emojiVersion="0.6"
                            lazyLoadEmojis={true}
                            previewConfig={{
                                defaultCaption: "Pick one!",
                                defaultEmoji: "1f92a" // 🤪
                            }}
                            suggestedEmojisMode={SuggestionMode.RECENT}
                            skinTonesDisabled
                            searchPlaceHolder="Filter"
                            defaultSkinTone={SkinTones.MEDIUM}
                            emojiStyle={EmojiStyle.GOOGLE}
                            categories={[
                                {
                                    name: "Smiles & Emotions",
                                    category: Categories.SMILEYS_PEOPLE
                                },
                                {
                                    name: "Fun and Games",
                                    category: Categories.ACTIVITIES
                                },
                                {
                                    name: "Flags",
                                    category: Categories.FLAGS
                                },
                                {
                                    name: "Yum Yum",
                                    category: Categories.FOOD_DRINK
                                }
                            ]}
                            customEmojis={[
                                {
                                    names: ["Alice", "alice in wonderland"],
                                    imgUrl:
                                        "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/alice.png",
                                    id: "alice"
                                },
                                {
                                    names: ["Dog"],
                                    imgUrl:
                                        "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/dog.png",
                                    id: "dog"
                                },
                                {
                                    names: ["Hat"],
                                    imgUrl:
                                        "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/hat.png",
                                    id: "hat"
                                },
                                {
                                    names: ["Kid"],
                                    imgUrl:
                                        "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/kid.png",
                                    id: "kid"
                                },
                                {
                                    names: ["Mic"],
                                    imgUrl:
                                        "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/mic.png",
                                    id: "mic"
                                },
                                {
                                    names: ["Moab", "desert"],
                                    imgUrl:
                                        "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/moab.png",
                                    id: "moab"
                                },
                                {
                                    names: ["Potter", "harry", "harry potter"],
                                    imgUrl:
                                        "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/potter.png",
                                    id: "potter"
                                },
                                {
                                    names: ["Shroom", "mushroom"],
                                    imgUrl:
                                        "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/shroom.png",
                                    id: "shroom"
                                },
                                {
                                    names: ["Smily"],
                                    imgUrl:
                                        "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/smily.png",
                                    id: "smily"
                                },
                                {
                                    names: ["Tabby", "cat"],
                                    imgUrl:
                                        "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/tabby.png",
                                    id: "tabby"
                                },
                                {
                                    names: ["Vest"],
                                    imgUrl:
                                        "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/vest.png",
                                    id: "vest"
                                }
                            ]}
                        />
                    </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FunClub;
