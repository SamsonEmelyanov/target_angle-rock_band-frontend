import React, {useEffect} from 'react';
import './musicians.sass'
import mainphoto1 from './20160101_015503.png'
import mainphoto2 from './post-86581550426139388057_full_thumb.png'
import mainphoto3 from './21-213224_unknown-person-icon-png-download.jpg'
import mainphoto4 from './21-213224_unknown-person-icon-png-download.jpg'

import smallphoto1 from './20160101_015503__small.png'
import smallphoto2 from './post-86581550426139388057_full_thumb__small.png'
import smallphoto3 from './21-213224_unknown-person-icon-png-download__small.jpg'
import smallphoto4 from './21-213224_unknown-person-icon-png-download__small.jpg'

const Musicians = () => {
    useEffect(()=> {
        slider({
            container: '.offer__slider',
            slide: '.offer__slide',
            nextArrow: '.offer__slider-next',
            prevArrow: '.offer__slider-prev',
            totalCounter: '#total',
            currentCounter: '#current',
            wrapper: '.offer__slider-wrapper',
            field: '.offer__slider-inner',
            slideDescription: '.slide-description-text',
            slidesIcons: '.slides-small-image'
        })
        function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter,wrapper, field, slideDescription, slidesIcons}) {
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
                slidesField = document.querySelector(field),
                slideDescriptionText = Array.from(document.querySelectorAll(slideDescription)),
                slidesSmallImages = Array.from(document.querySelectorAll(slidesIcons));

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

            slider.style.position = 'relative';


            next.addEventListener('click', () => {
                const selectedDescription = document.querySelector('.selected-description');
                const selectedDescriptionIndex = slideDescriptionText.indexOf(selectedDescription);

                selectedDescription.classList.remove('selected-description');

                let nextSlideDescription = slideDescriptionText[selectedDescriptionIndex + 1];

                if (slideDescriptionText.indexOf(nextSlideDescription) === -1) {
                    nextSlideDescription = slideDescriptionText[0];
                }
                nextSlideDescription.classList.add("selected-description");

                const selectedSmallImage = document.querySelector('.selected-img');
                const selectedSmallImageIndex = slidesSmallImages.indexOf(selectedSmallImage);

                selectedSmallImage.classList.remove('selected-img');

                let nextSmallImage = slidesSmallImages[selectedSmallImageIndex + 1];

                if (slidesSmallImages.indexOf(nextSmallImage) === -1) {
                    nextSmallImage = slidesSmallImages[0];
                }
                nextSmallImage.classList.add("selected-img");

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
                const selectedDescription = document.querySelector('.selected-description');
                const selectedDescriptionIndex = slideDescriptionText.indexOf(selectedDescription);

                selectedDescription.classList.remove('selected-description');

                let previousSlideDescription = slideDescriptionText[selectedDescriptionIndex - 1];

                if (slideDescriptionText.indexOf(previousSlideDescription) === -1) {
                    previousSlideDescription = slideDescriptionText[slideDescriptionText.length - 1];
                }
                previousSlideDescription.classList.add("selected-description");

                const selectedSmallImage = document.querySelector('.selected-img');
                const selectedSmallImageIndex = slidesSmallImages.indexOf(selectedSmallImage);

                selectedSmallImage.classList.remove('selected-img');

                let previousSmallImage = slidesSmallImages[selectedSmallImageIndex - 1];

                if (slidesSmallImages.indexOf(previousSmallImage) === -1) {
                    previousSmallImage = slidesSmallImages[slidesSmallImages.length - 1];
                }
                previousSmallImage.classList.add("selected-img");

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

        }
    )

    return(
        <div class="musicians-content">
            <div class="slide-description">
                <div class="slide-description-text selected-description">
                    <h1 class="slide-header">САМСОН ЕМЕЛЬЯНОВ <br/><br/></h1>
                    <h3 class="slide-title">Гитарист и композитор, бессменный <br/> участник группы </h3>
                    <p class="slide-paragraf">
                        <br/>
                            Автор ее названия, а также большинства композиций. <br/>
                            Родился 29 августа 1985г. <br/>
                            В музыке с 2002г. Играл в различных музыкальных <br/> коллективах г. Тольятти в качестве гитариста, <br/>
                            бас гитариста. <br/>
                            В 2014 году основал «Ракурс цели». <br/><br/><br/>
                    </p>
                </div>
                <div class="slide-description-text">
                    <h1 class="slide-header">N/A <br/><br/></h1>
                    <h3 class="slide-title">Вокал </h3>
                    <p class="slide-paragraf">
                        <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/><br/><br/>
                    </p>
                </div>
                <div class="slide-description-text">
                    <h1 class="slide-header">N/A <br/><br/></h1>
                    <h3 class="slide-title">Бас </h3>
                    <p class="slide-paragraf">
                        <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/><br/><br/>
                    </p>
                </div>
                <div class="slide-description-text">
                    <h1 class="slide-header">N/A <br/><br/></h1>
                    <h3 class="slide-title">Ударные </h3>
                    <p class="slide-paragraf">
                        <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/>
                            -------------------------------- <br/><br/><br/>
                    </p>
                </div>
                <div class="offer__slider-counter">
                    <div class="offer__slider-prev"></div>
                    <div class="counter">
                        <span id="current">03</span>
                        <span id="total">04</span>
                    </div>
                    <div class="offer__slider-next"></div>
                </div>
            </div>
            <div class="offer__slider">
                <div class="offer__slider-wrapper">
                    <div class="offer__slider-inner">
                        <div class="offer__slide">
                            <img src={mainphoto1} alt="guitar"/>
                        </div>
                        <div class="offer__slide">
                            <img src={mainphoto2} alt="vocal"/>
                        </div>
                        <div class="offer__slide">
                            <img src={mainphoto3} alt="bass"/>
                        </div>
                        <div class="offer__slide">
                            <img src={mainphoto4} alt="drum"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="slides-small-images">
                <div class="slides-small-image selected-img">
                    <img src={smallphoto1} alt="guitar"/>
                </div>
                <div class="slides-small-image">
                    <img src={smallphoto2} alt="vocal"/>
                </div>
                <div class="slides-small-image">
                    <img class="small-img" src={smallphoto3} alt="bass"/>
                </div>
                <div class="slides-small-image">
                    <img class="small-img" src={smallphoto4} alt="drum"/>
                </div>
            </div>
        </div>
    )
}

export default Musicians;




