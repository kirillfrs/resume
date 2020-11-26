"use strict";

(function () {
    var slider = document.querySelector('.slider');
    var firstStory = document.querySelector('.about-me__story--first');
    var secondStory = document.querySelector('.about-me__story--second');

    slider.addEventListener('change', function (evt) {
        evt.preventDefault();
        var active = secondStory.classList.contains('hidden');
        if (active) {
            secondStory.classList.remove('hidden');
            firstStory.classList.add('hidden');
        } else {
            firstStory.classList.remove('hidden');
            secondStory.classList.add('hidden');
        }
    })

})();




;
"use strict";
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('#form');

        form.addEventListener('submit', onFormSend);

        async function onFormSend(evt) {
            evt.preventDefault();
            let error = formValidate(form);
            let formData = new FormData(form);
            formData.append('image', formImage.files[0]);
            if (error === 0) {
                form.classList.add('_sending');
                let response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    let result = await response.json();
                    alert(result.message);
                    formPreview.innerHTML = "";
                    form.reset();
                    form.classList.remove('_sending');

                } else {
                    alert('Ошибка');
                    form.classList.remove('_sending');

                }
            } else {
                alert('Заполните обязательные поля');
            }
        };

        function formValidate(form) {
            let error = 0;
            let formReq = document.querySelectorAll('._req');
            for (let i = 0; i < formReq.length; i++) {
                const input = formReq[i];
                formRemoveError(input);
                if (input.classList.contains('_email')) {
                    if (emailTest(input)) {
                        formAddError(input);
                        error++;
                    }
                } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                    formAddError(input);
                    error++;
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            }
            return error;
        }

        function formAddError(input) {
            input.parentElement.classList.add('_error');
            input.classList.add('_error');
        };
        function formRemoveError(input) {
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
        };
        // Функция теста почты
        function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
        }

        // input файл
        const formImage = document.querySelector('#formImage');
        // получаем див куда картинка
        const formPreview = document.querySelector('#formPreview')

        formImage.addEventListener('change', function () {
            uploadFile(formImage.files[0]);
        });
        let uploadFile = function (file) {
            // проверяем тип файла
            if (!['image/jpeg', "image/png", 'image/gif'].includes(file.type)) {
                alert('Разрешены только изображения.')
                formImage.value = '';
                return;
            }
            // проверяем размер файла
            if (file.size > 2 * 1024 * 1024) {
                alert('файл не должен превышать 2 МБ');
                return;
            }

            var reader = new FileReader();
            reader.onload = function (evt) {
                formPreview.innerHTML = `<img src ="${evt.target.result}" alt=Photo> `;
            };
            reader.onerror = function (evt) {
                alert('Ошибка');
            };
            reader.readAsDataURL(file);
        }

    });
})();

;
; "use strict";

(function () {

    var contactLink = document.querySelectorAll('.site-list__link--contacts');
    var modalWindow = document.querySelector('.modal-contacts');
    var btnClose = document.querySelector('.form__close-btn');
    var popup = document.querySelector(".modal-contacts");


    var onMouseClick = function (evt) {
        evt.preventDefault();
        modalWindow.classList.add('modal-show');
    }

    var onBtnClose = function (evt) {
        evt.preventDefault();
        popup.classList.remove("modal-show");
        popup.classList.remove("modal-error");
    };

    contactLink.forEach(function (it) {
        it.addEventListener('click', onMouseClick);
    });



    window.addEventListener("keydown", function (evt) {
        if (evt.keyCode === 27) {
            evt.preventDefault();
            if (popup.classList.contains("modal-show")) {
                popup.classList.remove("modal-show");
                popup.classList.remove("modal-error");
            }
        }
    });

    btnClose.addEventListener("click", onBtnClose);

})();;
"use strict";
(function () {
    var menu = document.querySelector('.menu');
    var menuTop = document.querySelector('.menu-top');
    var menuMiddle = document.querySelector('.menu-middle');
    var menuBottom = document.querySelector('.menu-bottom');
    var menuList = document.querySelector('.main-nav__list');

    var onMenuClick = function (evt) {
        evt.preventDefault();
        menuTop.classList.toggle('menu-top-click');
        menuMiddle.classList.toggle('menu-middle-click');
        menuBottom.classList.toggle('menu-bottom-click');
        menuList.classList.toggle('main-nav__list--opened')
    };
    menu.addEventListener('click', onMenuClick);

})();;
'use strict';

(function () {
    const btnBack = document.querySelector('.slider__toggle.back-arrow');
    const btnNext = document.querySelector('.slider__toggle.next-arrow');
    const slider = document.querySelector('.table-price__list');


    function moveSlide(move) {
        slider.style.transform = `translateX(${move}px)`;
    }

    function addActiveClass(evt, btn) {
        const target = evt.target;
        if (target && target.classList.contains('slider__toggle-active')) {
            btn.classList.remove('slider__toggle-active');
        } else {
            target.classList.add('slider__toggle-active');
            btn.classList.remove('slider__toggle-active');
        }
    }

    btnBack.addEventListener('click', (evt) => {
        evt.preventDefault();
        addActiveClass(evt, btnNext);
        moveSlide(0);
    });

    btnNext.addEventListener('click', (evt) => {
        evt.preventDefault();
        addActiveClass(evt, btnBack);
        moveSlide(-190);
    });


})();;