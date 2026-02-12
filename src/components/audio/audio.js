import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './components/_player-control.scss'
import './components/_player.scss'
import './components/_sound-control.scss'
import './components/style.scss'
import './audio.sass'
import fun_club_photo1 from "../fun-club/6487710a69fd22ca0a9f4a05503ac229 2.png";
import {songsRequested, songsLoaded} from "../../actions";
import Error from "../error";
import Spinner from "../spinner";


const Audio = () => {

    const songs = useSelector(state=>state.songsReducer.songs);
    const loading = useSelector(state=>state.songsReducer.loading);
    const error = useSelector(state=>state.songsReducer.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(songsLoaded());
    },[])

    useEffect(() => {

            if (error){
                return <Error/>
            }
            if (loading) {
                return <Spinner/>
            }

            document.querySelector('.library-song').classList.add('selected')
            const audio = document.querySelector("audio");
            let librarySongs = Array.from(document.querySelectorAll(".library-song"));
            let playStatus = false;

            librarySongs.forEach((song) => {
                song.addEventListener("click", (e) => {
                    librarySongs.forEach((otherSong) => {
                        otherSong.classList.remove("selected");
                        document.querySelectorAll('.library-song').forEach(elem=>elem.style.borderBottom = 'none');
                        document.querySelectorAll(".song-number").forEach(elem=>elem.style.display = "inline");
                        document.querySelectorAll(".playing-bullet").forEach(elem=>elem.style.display = "none");
                        document.querySelectorAll(".song-current-time").forEach(elem=>elem.style.display = "none");
                        document.querySelectorAll(".song-duration").forEach(elem=>elem.style.display = "block");
                    });
                    e.target.classList.add("selected");
                    document.querySelector(".selected .library-song-info .song-number").style.display = "none";
                    document.querySelector(".selected .library-song-info .playing-bullet").style.display = "block";

                    let songId;
                    songId = song.id;
                    songs.filter((selectedSong) => {
                        if (selectedSong.id == song.id) {
                            playSong(selectedSong);
                        }
                    });

                });
            });

            function playSong(song) {
                audio.setAttribute("src", song.audio);
                playStatus = false;
                document.querySelectorAll('.selected').forEach(elem=> {
                    elem.borderBottom = 'none';
                });
                playPause();
            }

//*player control actions
//play||pause action
            const playPauseIcon = document.getElementById("play-pause");

            playPauseIcon.addEventListener("click", () => {
                playPause();
            });

            function playPause() {
                if (playStatus === false) {
                    playPauseIcon.className = "fas fa-pause";
                    document.querySelector('.selected').style.borderBottom = "1px solid #FF7000";
                    document.querySelector(".selected .library-song-info .song-number").style.display = "none";
                    document.querySelector(".selected .library-song-info .playing-bullet").style.display = "block";
                    document.querySelector(".selected .song-duration").style.display = "none";
                    document.querySelector(".selected .song-current-time").style.display = "block";
                    audio.play();
                    playStatus = true;
                } else {
                    playPauseIcon.className = "fas fa-play";
                    document.querySelectorAll('.library-song').forEach(elem=>elem.style.borderBottom = 'none');
                    document.querySelectorAll(".song-number").forEach(elem=>elem.style.display = "inline");
                    document.querySelectorAll(".playing-bullet").forEach(elem=>elem.style.display = "none");
                    document.querySelector(".selected .song-duration").style.display = "block";
                    document.querySelector(".selected .song-current-time").style.display = "none";
                    audio.pause();
                    playStatus = false;
                }
            }
//* sound volume control
            const volume = document.querySelector(".sound-control input");
            volume.addEventListener("change", () => {
                audio.volume = volume.value / 100;
            });


//*skipping back/forward
            const back = document.getElementById("backward");
            const forward = document.getElementById("forward");
            back.addEventListener("click", () => skipSong("backward"));
            forward.addEventListener("click", () => skipSong("forward"));

            audio.addEventListener("ended", () => skipSong("forward"));
            function skipSong(direction) {
                const selectedSong = document.querySelector(".selected");
                const selectedSongIndex = librarySongs.indexOf(selectedSong);
                selectedSong.classList.remove("selected");
                document.querySelectorAll('.library-song').forEach(elem=>elem.style.borderBottom = 'none');
                document.querySelectorAll(".song-number").forEach(elem=>elem.style.display = "inline");
                document.querySelectorAll(".playing-bullet").forEach(elem=>elem.style.display = "none");
                document.querySelectorAll(".song-current-time").forEach(elem=>elem.style.display = "none");
                document.querySelectorAll(".song-duration").forEach(elem=>elem.style.display = "block");
                if (direction === "backward") {
                    let previousSong = librarySongs[selectedSongIndex - 1];
                    if (librarySongs.indexOf(previousSong) === -1) {
                        previousSong = librarySongs[librarySongs.length - 1];
                    }
                    previousSong.classList.add("selected");
                    document.querySelector('.selected').style.borderBottom = "1px solid #FF7000";
                    document.querySelector(".selected .library-song-info .song-number").style.display = "none";
                    document.querySelector(".selected .library-song-info .playing-bullet").style.display = "block";
                    document.querySelector(".selected .library-song-info .song-number").style.display = "none";
                    document.querySelector(".selected .library-song-info .playing-bullet").style.display = "block";
                    songs.filter((song) => {
                        if (song.id == previousSong.id) {
                            playSong(song);
                        }
                    });
                } else if (direction === "forward") {
                    let nextSong = librarySongs[selectedSongIndex + 1];

                    if (librarySongs.indexOf(nextSong) === -1) {
                        nextSong = librarySongs[0];
                    }
                    nextSong.classList.add("selected");
                    document.querySelector('.selected').style.borderBottom = "1px solid #FF7000";
                    document.querySelector(".selected .library-song-info .song-number").style.display = "none";
                    document.querySelector(".selected .library-song-info .playing-bullet").style.display = "block";
                    songs.filter((song) => {
                        if (song.id == nextSong.id) {
                            playSong(song);
                        }
                    });
                }
            }
//*defining audio and song info
//format current/duration time
            function timeFormat(time) {
                return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
            }

            const durationInput = document.querySelector(".player input");

            audio.addEventListener("loadedmetadata", () => {
                try {

                const currentTime = document.querySelector(".selected .song-current-time");
                durationInput.value = audio.currentTime;
                durationInput.setAttribute("max", audio.duration);
                currentTime.innerText = `${timeFormat(audio.currentTime)}`;
                } catch (e) {

                }

            });
            audio.addEventListener("timeupdate", () => {
                try{
                durationInput.value = audio.currentTime;
                const currentTime = document.querySelector(".selected .song-current-time");
                currentTime.innerText = `${timeFormat(audio.currentTime)}`;
                document.querySelector(".player div div").style.left = `${
                    (audio.currentTime / audio.duration) * 100}%`;
                } catch (e) {

                }
            });

            durationInput.addEventListener("change", () => {
                try {
                audio.currentTime = durationInput.value;
                } catch (e) {

                }
            });



        }
    )
    useEffect(()=> {

            document.querySelector('.texts-invoke-btn').addEventListener('click',() => {
                document.querySelector('.fun-club-offer__slider').classList.toggle('texts-invoke');
            });

            slider({
                container: '.offer__slider',
                slide: '.offer__slide',
                nextArrow: '.offer__slider-next',
                prevArrow: '.offer__slider-prev',
                totalCounter: '#total',
                currentCounter: '#current',
                wrapper: '.offer__slider-wrapper',
                field: '.offer__slider-inner',

            })
            function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field}) {
                let offset = 0;
                let slideIndex = 1;

                const slides = document.querySelectorAll(slide),
                    slider = document.querySelector(container),
                    prev = document.querySelector(prevArrow),
                    next = document.querySelector(nextArrow),
                    total = document.querySelector(totalCounter),
                    current = document.querySelector(currentCounter),
                    slidesWrapper = document.querySelector(wrapper),
                    width = window.getComputedStyle(slidesWrapper).width,
                    slidesField = document.querySelector(field)

                if (slides.length < 10) {
                    total.textContent = `0${slides.length}`;
                    current.textContent =  `0${slideIndex}`;
                } else {
                    total.textContent = slides.length;
                    current.textContent =  slideIndex;
                }

                slidesField.style.width = 100 * slides.length + '%';
                slidesField.style.display = 'flex';
                slidesField.style.transition = '0.5s all';

                slidesWrapper.style.overflow = 'hidden';

                slides.forEach(slide => {
                    slide.style.width = width;
                });

               // slider.style.position = 'relative';


                next.addEventListener('click', () => {
                    if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
                        offset = 0;
                    } else {
                        offset += deleteNotDigits(width);
                    }

                    slidesField.style.transform = `translateX(-${offset}px)`;

                    if (slideIndex == slides.length) {
                        slideIndex = 1;
                    } else {
                        slideIndex++;
                    }

                    if (slides.length < 10) {
                        current.textContent =  `0${slideIndex}`;
                    } else {
                        current.textContent =  slideIndex;
                    }

                });

                prev.addEventListener('click', () => {
                    if (offset == 0) {
                        offset = deleteNotDigits(width) * (slides.length - 1);
                    } else {
                        offset -= deleteNotDigits(width);
                    }

                    slidesField.style.transform = `translateX(-${offset}px)`;

                    if (slideIndex == 1) {
                        slideIndex = slides.length;
                    } else {
                        slideIndex--;
                    }

                    if (slides.length < 10) {
                        current.textContent =  `0${slideIndex}`;
                    } else {
                        current.textContent =  slideIndex;
                    }


                });

                function deleteNotDigits(str) {
                    return +str.replace(/\D/g, '');
                }
            }
        },[]
    )

    const songsItems = songs.map(songItem => {
        const {id,name,duration} = songItem;

    return(
            <div className="library-song" id={id} key={id}>
                <div className="library-song-info">
                    <div className="playing-bullet"></div>
                    <span className="song-number">{id+1}  &nbsp;</span><span className="song-name">{name}</span>
                </div>
                <div className="song-duration">{duration}</div>
                <div className="song-current-time"></div>
            </div>
        )
    })

    return(
            <div className="audio-content">
                <div className="offer__slider fun-club-offer__slider">
                    <span className="fun-club-headers">Альбомы</span>
                    <img className="fun-club-img" src={fun_club_photo1} alt="album"/>
                    <span className="album">Демо-альбом</span>
                    <div className="offer__slider-wrapper">
                        <div className="offer__slider-inner">
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">ГЕТТО</h1><br/>
                                <p className="texts-paragraf">Музыка: Емельянов С. <br/>
                                    Слова: Тестов Д. <br/><br/>

                                    Шаг, за шагом шаг, клич брошен!<br/>
                                    Блеск кривых зеркал, нам тошен. <br/>
                                    Заклинаю: «Мечты, и свои идеалы <br/>
                                    Никогда вы не прячьте в бетонные скалы» <br/>
                                    «Что нас гонит прочь!?», знать хочешь. <br/>
                                    Страх, а может боль!? ...всё сможешь! <br/>
                                    Пропивая мечты, предавал идеалы, <br/>
                                    Разбитый системой ты рухнешь, на шпалы... <br/><br/>

                                    Больно видеть банкротство души,<br/>
                                    Сталью сердце пронзает холод!<br/>
                                    Раскрывать объятья не спеши,<br/>
                                    Для распятья ты слишком молод... <br/><br/>

                                    Год, за годом год, боль стоном,<br/>
                                    Марш былых побед, стал фоном. <br/>
                                    Разрывают сознанье убогие нравы: <br/>
                                    На слезах стариков создают капиталы. <br/>
                                    Так, за разом раз, жгут совесть. <br/>
                                    Врут, рубаху рвут... С кем спорить!? <br/>
                                    Превращая мечты в инструмент для расправы, <br/>
                                    На крови не построить ни счастья, ни славы! <br/><br/>

                                    Больно видеть банкротство души <br/>
                                    Сталью сердце пронзает холод <br/>
                                    Раскрывать объятья не спеши <br/>
                                    Для распятья ты слишком молод... <br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">ЗАБВЕНИЕ</h1> <br/>
                                <p className="texts-paragraf">Музыка: Емельянов С. <br/>
                                    Слова: Поляков В. <br/><br/>

                                    Еще один день, а после ночь... <br/>
                                    Ночь и звезды после солнца, <br/>
                                    Но приторно грустные будни о чем-то<br/>
                                    Мне повествуют грустно и скользко.<br/>
                                    И я чувствуя их, вру себе<br/>
                                    О том, что все правильно и достойно.<br/>
                                    Стерильность бывает лишь в пустоте,<br/>
                                    И я отторгаюсь от этой плоскости!<br/><br/>

                                    Следуй за мной, глаза закрой.<br/>
                                    Я твой сладкий сон до первого солнца.<br/>
                                    Следуй за мной во тьме ночной.<br/>
                                    Забудь обо всем, утра не бойся.<br/>
                                    x2
                                    <br/><br/>

                                    Мой голос дик, и страшен вид,<br/>
                                    Но я к тебе давно привык,<br/>
                                    Окрашиваем день за днем<br/>
                                    Тоску вином, а ночь огнем.<br/>
                                    Запреты все давно забыв,<br/>
                                    Реальность - популярный миф<br/>
                                    Я вновь тобою поглощен<br/>
                                    И снова в сон, наш странный сон...<br/><br/>

                                    Следуй за мной, глаза закрой.<br/>
                                    Я твой сладкий сон до первого солнца.<br/>
                                    Следуй за мной во тьме ночной.<br/>
                                    Забудь обо всем, утра не бойся.<br/>
                                    x2<br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">СУДЬБА</h1> <br/>
                                <p className="texts-paragraf">Музыка: Емельянов С. <br/>
                                    Слова: Тестов Д. <br/><br/>

                                    Ветер-бродяга уносит тебя<br/>
                                    Прочь от родимого дома.<br/>
                                    Вдаль, на край света, мечтою маня.<br/>
                                    Той, что до боли знакома.<br/><br/>

                                    Время лечит раны плетью надежды.<br/>
                                    Взмах за взмахом, снова в клочья одежды.<br/>
                                    Шрамы помнят каждый взлет и паденье.<br/>
                                    Снова росчерк на теле свой оставит судьба!<br/><br/>

                                    Вьюга сомнений укроет следы<br/>
                                    Тех, кто здесь шел пред тобою.<br/>
                                    Проще не станет, ты их не ищи.<br/>
                                    Следуй своею тропою!<br/><br/>

                                    Время лечит раны плетью надежды.<br/>
                                    Взмах за взмахом, снова в клочья одежды.<br/>
                                    Шрамы помнят каждый взлет и паденье.<br/>
                                    Снова росчерк на теле свой оставит судьба!<br/><br/>

                                    «Всё, что захочешь, у неба проси.<br/>
                                    Веруй, не зная сомнений»:<br/>
                                    Скажет, кто хочет покой обрести.<br/>
                                    А мы пахнем дымом сражений!<br/><br/>

                                    Время лечит раны плетью надежды.<br/>
                                    Взмах за взмахом, снова в клочья одежды.<br/>
                                    Шрамы помнят каждый взлет и паденье.<br/>
                                    Снова росчерк на теле свой оставит судьба!<br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">ВЕДЬМА-НОЧЬ</h1><br/>
                                <p className="texts-paragraf">Музыка: Емельянов С. <br/>
                                    Слова: Тестов Д. <br/><br/>

                                    Ведьма-ночь разбудит пламя древнего огня,<br/>
                                    В моей душе как крик.<br/>
                                    Танец света, ритм и рок поманят вновь меня,<br/>
                                    ...гори!!!<br/><br/>

                                    Отражаясь в сердце стуком,<br/>
                                    Такт за тактом бьет в груди.<br/>
                                    Звон металла гонит скуку<br/>
                                    Гори, словно факел! Гори!<br/><br/>

                                    Провожая солнце до утра, запомни<br/>
                                    Тот сюжет, что пишут облака кровью на воде.<br/>
                                    Лунный свет укажет новый путь к рассвету<br/>
                                    Так отдай же пепел и боль ветру!<br/><br/>

                                    Путник-день подарит солнца яркие лучи,<br/>
                                    И снова вдаль бежит<br/>
                                    Ищем к счастью ключ и песня лучшая внутри<br/>
                                    ...звучит!!!<br/><br/>

                                    Отражаясь в сердце стуком,<br/>
                                    Такт за тактом бьет в груди.<br/>
                                    Звон металла гонит скуку<br/>
                                    Гори, словно факел! Гори!<br/><br/>

                                    Провожая солнце до утра, запомни<br/>
                                    Тот сюжет, что пишут облака кровью на воде<br/>
                                    Лунный свет укажет новый путь к рассвету<br/>
                                    Так отдай же пепел и боль ветру!<br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">ВПЕРЕД</h1> <br/>
                                <p className="texts-paragraf">Музыка: Якименко С., Емельянов С. <br/>
                                    Слова: Тестов Д. <br/><br/>

                                    Кто сказал, что кровь струится по венам!?<br/>
                                    Он не видел битвы алых знамен.<br/>
                                    Тот, кто сдался, вмиг упав на колено-<br/>
                                    Вряд ли будет в списке храбрых имен!<br/>
                                    Есть и те, кто в бой идет без сомнений,<br/>
                                    Зная, что за ними правда и бог.<br/>
                                    Слава их живет в умах поколений,<br/>
                                    Чтобы ты извлек достойный урок<br/><br/>

                                    Время, увы, быстротечно.<br/>
                                    Никто от него не уйдёт.<br/>
                                    Но только запомнятся вечно,<br/>
                                    Лишь те, кто шагает вперед!<br/><br/>

                                    Кто мечтал, смеясь, пройти по вселенной,<br/>
                                    Кто-то правил в мире сказочных грёз.<br/>
                                    Но реальность, показалась им бренной<br/>
                                    В ней нет места для страданий и слёз.<br/>
                                    Много лет ковалось, чьё-то богатство<br/>
                                    Злом, коварством, хлестким стуком плетей<br/>
                                    Только счастье людям дарит не барство<br/>
                                    Счастье в лицах и улыбках детей<br/><br/>

                                    Время, увы, быстротечно.<br/>
                                    Никто от него не уйдёт.<br/>
                                    Но только запомнятся вечно,<br/>
                                    Лишь те кто шагает вперед!<br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">ИГРА</h1> <br/>
                                <p className="texts-paragraf">Музыка: Емельянов С. <br/>
                                    Слова: Тестов Д. <br/><br/>

                                    Залп грозы над головой,<br/>
                                    Звон струны, время рекой.<br/>
                                    Новый такт, есть в каждой доле частица души, игры и воли.<br/>
                                    Новых строк смех и печаль,<br/>
                                    Страх и боль, светлая даль.<br/>
                                    Ты искал счастья,но стал, вдруг, фанатом игры.<br/><br/>

                                    Наша жизнь — это игра,<br/>
                                    Каждый ход — это игра,<br/>
                                    С каждой ролью, с каждой нотой<br/>
                                    Ты увидишь вновь себя...<br/><br/>

                                    Полный зал, главная роль.<br/>
                                    Утром шут, ночью король.<br/>
                                    Новый акт, есть в каждой роли частица души, игры и воли.<br/>
                                    Новый кон, хитрый расклад<br/>
                                    Быстрый ход был наугад.<br/>
                                    Новый шанс подарит фортуна фанатам игры.<br/><br/>

                                    Наша жизнь — это игра,<br/>
                                    Каждый ход — это игра,<br/>
                                    С каждой ролью, с каждой нотой<br/>
                                    Ты увидишь вновь себя...<br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">РАКУРС ЦЕЛИ</h1> <br/>
                                <p className="texts-paragraf">Музыка: Емельянов С. <br/>
                                    Слова: Тестов Д. <br/><br/>

                                    Никто не помнит сколько лет<br/>
                                    В войну играют тьма и свет<br/>
                                    ... каждый день новый бой.<br/>
                                    Бой, где за блеск и звон монет,<br/>
                                    За власть и честь своих побед<br/>
                                    ... платят жизнью чужой.<br/>
                                    Ты выбрал встать под знамя тьмы,<br/>
                                    И плоти пир на плен души<br/>
                                    ... променял, став слугой.<br/>
                                    Слугой, чьё сердце в кандалах,<br/>
                                    Чей вздох в хозяина руках<br/>
                                    ... ты раб тьмы - значит враг!<br/><br/>

                                    Сквозь каждую жизнь идёт война<br/>
                                    Между светом и тенью<br/>
                                    Но только чья же в том вина<br/>
                                    Что ты в ней стал мишенью<br/>
                                    Но я поставить точку не сумел<br/>
                                    В этом не лёгком деле<br/>
                                    И снова вижу в свой прицел<br/>
                                    Я новый ракурс цели<br/><br/>

                                    Бездушных глаз немой конвой<br/>
                                    На смерть юнцов отправит строй<br/>
                                    ... льётся кровь сотни лет.<br/>
                                    Кровь и азарт - наркотик твой,<br/>
                                    Ни плачь детей, ни стон и боль<br/>
                                    ... не заглушат твой смех.<br/>
                                    Ты знай, я тоже не святой,<br/>
                                    И я готов ввязаться в бой<br/>
                                    ... я приду за тобой<br/>
                                    Я словно старый хитрый зверь.<br/>
                                    Я взял твой след, ты мне поверь!<br/>
                                    ... ты попал под прицел<br/><br/>

                                    Сквозь каждую жизнь идёт война<br/>
                                    Между светом и тенью<br/>
                                    Но только чья же в том вина<br/>
                                    Что ты в ней стал мишенью<br/>
                                    Но я поставить точку не сумел<br/>
                                    В этом не лёгком деле<br/>
                                    И снова вижу в свой прицел<br/>
                                    Я новый ракурс цели<br/><br/>

                                    Кровь пролита<br/>
                                    Боль забыта<br/>
                                    Флаг твоих побед лежит в ногах<br/>
                                    Дверь закрыта<br/>
                                    Карта бита<br/>
                                    Горсть сырой земли в твоих руках<br/><br/>

                                    Дальше будет вечный путь<br/>
                                    Там, где тени помнят тебя<br/>
                                    Им не нужна твоя плоть,<br/>
                                    Но для души им не жаль огня<br/>
                                    Я сделал так не со зла<br/>
                                    Другого выхода нет<br/>
                                    "Ты выбрал сам этот путь"-<br/>
                                    Вот мой ответ!<br/><br/>

                                    Сквозь каждую жизнь идёт война<br/>
                                    Между светом и тенью<br/>
                                    Но только чья же в том вина<br/>
                                    Что ты в ней стал мишенью<br/>
                                    Но я поставить точку не сумел<br/>
                                    В этом не лёгком деле<br/>
                                    И снова вижу в свой прицел<br/>
                                    Я новый ракурс цели<br/><br/>

                                    И не закончится война<br/>
                                    ...<br/>
                                    Ведь это вечная игра<br/>
                                    ...<br/>
                                </p>
                            </div>
                            <div className="offer__slide fun-club-offer__slide">
                                <h1 className="texts-header">ЖИВИ, ПОКА ЖИВОЙ...</h1> <br/>
                                <p className="texts-paragraf">Музыка: Дерябин И., Емельянов С. <br/>
                                    Слова: Тестов Д. <br/><br/>

                                    Перерублен канат, флаг на мачте распят.<br/>
                                    Порох в бочках и ром. Глаза горят.<br/>
                                    С ранних лет я мечтал быть свободным как бриз.<br/>
                                    Но в оковах рождён - судьбы каприз.<br/>
                                    Много лет я играл по законам других<br/>
                                    Каждый шаг мой и вздох был слаб и тих.<br/>
                                    Так и жил бы как раб по указке чужой,<br/>
                                    Но послал всё к чертям и стал грозой!<br/><br/>

                                    Пусть окатит волна, брызги бьют по щекам,<br/>
                                    Ты свой парус открой надежд ветрам.<br/>
                                    Может там в облаках мы увидим покой,<br/>
                                    А сегодня живи, пока живой!<br/><br/>

                                    На дорогах всех стран я оставил свой след<br/>
                                    В кабаках и портах был сон и бред.<br/>
                                    Видел множество дам, знал их ласку и яд.<br/>
                                    Был украшен их взором мой наряд.<br/>
                                    Уходил не стыдясь, выпив чашу до дна,<br/>
                                    Только в мыслях родной была одна!<br/>
                                    Та, что верит и ждёт, что в молитвах со мной<br/>
                                    Слишком долго искал я путь домой!<br/><br/>

                                    Пусть окатит волна, брызги бьют по щекам,<br/>
                                    Ты свой парус открой надежд ветрам.<br/>
                                    Может там в облаках мы увидим покой,<br/>
                                    А сегодня живи, пока живой!<br/>
                                </p>
                            </div>
                        </div>
                        <div className="texts-invoke-btn"><i>Тексты</i></div>
                    </div>
                    <div className="offer__slider-counter fun-club-offer__slider-counter">
                        <div className="offer__slider-prev"></div>
                        <div className="counter">
                            <span className="fun-club-offer__slider-counter" id="current">03</span>
                            <span id="total">04</span>
                        </div>
                        <div className="offer__slider-next"></div>
                    </div>
                </div>
                <div className="library">
                    <h3 className="album-name">Демо - Альбом</h3>
                    {songsItems}
                </div>
                <div className="audio-control">
                    <div className="player">
                        <div>
                            <input type="range"/>
                            <div></div>
                        </div>
                    </div>
                    <div className="player-control">
                        <i className="fas fa-backward" id="backward"></i>
                        <i className="fas fa-play" id="play-pause"></i>
                        <i className="fas fa-forward" id="forward"></i>
                    </div>
                    <div className="sound-control">
                        <i className="fas fa-volume-down"></i>
                        <input type="range" max="100" step="1"/>
                        <i className="fas fa-volume-up"></i>
                    </div>
                    <audio
                        src="https://firebasestorage.googleapis.com/v0/b/target-angle-rock-band.appspot.com/o/target-angle-songs%2F%D0%93%D0%B5%D1%82%D1%82%D0%BE(KUSTOM%20Groove%201200).mp3?alt=media&token=c47deb62-09c3-47bd-867b-d4b703519b8c"></audio>
                </div>
            </div>
    )


}

export default Audio;
