export function isWebp() {
   function testWebP(callback) {

      var webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   testWebP(function (support) {

      if (support == true) {
         document.querySelector('body').classList.add('webp');
      } else {
         document.querySelector('body').classList.add('no-webp');
      }
   });

}

export function rating() {

   const ratings = document.querySelectorAll('.rating')
   if (ratings.length > 0) {
      initRatings();
   }

   function initRatings() {
      let ratingActive, ratingValue;
      for (let index = 0; index < ratings.length; index++) {
         const rating = ratings[index];
         initRating(rating);
      }

      function initRating(rating) {
         initRatingVars(rating)

         setRatingActiveWidth();

         if (rating.classList.contains('rating__set')) {
            setRating(rating);
         }
      }

      function initRatingVars(rating) {
         ratingActive = rating.querySelector('.rating__active');
         ratingValue = rating.querySelector('.rating__value');
      }

      function setRatingActiveWidth(index = ratingValue.innerHTML) {
         const ratingActiveWidth = index / 0.05;
         ratingActive.style.width = `${ratingActiveWidth}%`;
      }

      function setRating(rating) {

         const ratingItems = rating.querySelectorAll('.rating__item');
         for (let index = 0; index < ratingItems.length; index++) {
            const ratingItem = ratingItems[index];

            ratingItem.addEventListener('mouseenter', function (e) {
               initRatingVars(rating)
               setRatingActiveWidth(ratingItem.value);
            });

            ratingItem.addEventListener('mouseleave', function (e) {
               setRatingActiveWidth();
            });

            ratingItem.addEventListener('click', function (e) {
               initRatingVars(rating)

               if (rating.dataset.ajax) {
                  setRatingValue(ratingItem.value, rating);

               } else {
                  ratingValue.innerHTML = index + 1;
                  setRatingActiveWidth();
               }
            });
         }
      }
   }
}

export function tabs() {
   document.querySelectorAll('.tabs__wrapper').forEach((e) => {
      let tabTabs = e.querySelectorAll('.tabs__nav .tabs__nav-btn');
      let tabItems = e.querySelectorAll('.tabs__content .tabs__item');
      for (let i = 0; i < tabTabs.length; i++) {
         tabTabs[i].onclick = () => {
            tabTabs.forEach((e) => { e.classList.remove('active') });
            tabItems.forEach((e) => { e.classList.remove('active') });
            tabTabs[i].classList.add('active');
            tabItems[i].classList.add('active');
         }
      }
   });
}

export function popup() {
   const popupLinks = document.querySelectorAll('.popup-link');
   const body = document.querySelector('.body');
   const lockPadding = document.querySelectorAll(".lock-padding");

   let unlock = true;

   const timeout = 800;

   if (popupLinks.length > 0) {
      for (let index = 0; index < popupLinks.length; index++) {
         const popupLink = popupLinks[index];
         popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);

            popupOpen(curentPopup)
            e.preventDefault();
         })
      }
   }
   const popupCloseIcon = document.querySelectorAll('.close-popup');
   if (popupCloseIcon.length > 0) {
      for (let index = 0; index < popupCloseIcon.length; index++) {
         const el = popupCloseIcon[index];
         el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
         })
      }
   }

   function popupOpen(curentPopup) {
      if (curentPopup && unlock) {
         const popupActive = document.querySelector('.popup.open');
         if (popupActive) {
            popupClose(popupActive, false);
         } else {
            bodyLock();
         }
         curentPopup.classList.add('open');
         curentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
               popupClose(e.target.closest('.popup'));
            }
         });
      }
   }

   function popupClose(popupActive, doUnlock = true) {
      if (unlock) {
         popupActive.classList.remove('open');
         if (doUnlock) {
            bodyUnLock();
         }
      }
   }

   function bodyLock() {
      const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
         }
      }
      document.querySelector('body').style.paddingRight = lockPaddingValue;
      document.querySelector('body').classList.add('lock');

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);
   }

   function bodyUnLock() {
      setTimeout(function () {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = "0px";
         }
         document.querySelector("body").style.paddingRight = "0px";
         document.querySelector("body").classList.remove("lock");
      }, 0);

      unlock = false;
      setTimeout(function () {
         unlock = true;
      }, timeout);

   }

   document.addEventListener('keydown', function (e) {
      if (e.which === 27) {
         const popupActive = document.querySelector('.popup.open');
         popupClose(popupActive);
      }
   })
}

export function select() {

   let selectHeader = document.querySelectorAll('.select__header');
   let selectItem = document.querySelectorAll('.select__item');

   selectHeader.forEach(item => {
      item.addEventListener('click', selectToggle)
   });

   selectItem.forEach(item => {
      item.addEventListener('click', selectChoose)
   });

   function selectToggle() {
      this.parentElement.classList.toggle('is-active');
   }

   function selectChoose() {
      let text = this.innerText,
         select = this.closest('.select'),
         currentText = select.querySelector('.select__current');
      currentText.innerText = text;
      select.classList.remove('is-active');

   }
}

export function showMore() {

   const hideBtn = document.querySelectorAll('.close')
   let items = 2;
   const showMore = document.querySelectorAll('.filter__detail-btn');


   showMore.forEach(button => {
      button.addEventListener('click', () => {
         items += 2;
         let card = event.target.closest('.filter__item');
         const array = Array.from(card.querySelector('.filter__list').children);
         const visItems = array.slice(2, items);
         visItems.forEach(el => el.classList.add('is-visible'));
         let currentBtn = event.target.closest('.filter__detail-btn');
         let currentClose = card.querySelector('.close');
         currentBtn.style.display = 'none';
         currentClose.style.display = 'block';
      });
   });

   hideBtn.forEach(button => {
      button.addEventListener('click', () => {
         let card = event.target.closest('.filter__item');
         const array = Array.from(card.querySelector('.filter__list').children);
         const visItems = array.slice(2, items);
         visItems.forEach(el => el.classList.remove('is-visible'));
         let currentBtn = card.querySelector('.filter__detail-btn');
         let currentClose = card.querySelector('.close');
         currentClose.style.display = 'none';
         if (currentBtn.style.display === 'none') {
            currentBtn.style.display = 'block';
         }
      })
   })
}

export function promotion() {

   let buttons = document.getElementsByClassName("filter__link-btn");
   for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
         if (this.style.backgroundColor != "blue") {
            this.style.backgroundColor = "blue";
         } else {
            this.style.backgroundColor = "";
         }
      });
   }
}


export function imageSelect() {

   const list = document.querySelector('.product__list');

   document.addEventListener('click', (event) => {
      const clickedElement = event.target;


      if (clickedElement.closest('.product__item-info')) {

         if (clickedElement.classList.contains('img__swiperdown')) {
            const listItem = clickedElement.closest('.product__item-info');


            const selectedItems = list.querySelectorAll('.active');
            selectedItems.forEach(item => item.classList.remove('active'));

            // Добавляем класс "selected" для выбранного элемента списка
            listItem.classList.add('active');
         }
      } else if (list) {
         // Если клик был вне списка, удаляем класс "selected" у всех элементов списка
         const selectedItems = list.querySelectorAll('.active');
         selectedItems.forEach(item => item.classList.remove('active'));
      }
   });
}

export function svgSelect() {

   const svgs = document.getElementsByTagName('svg');

   for (let i = 0; i < svgs.length; i++) {
      const svg = svgs[i];
      const path = svg.querySelector('path');
      svg.addEventListener('click', function () {
         if (path.classList.contains('active')) {
            path.classList.remove('active');
         } else {
            path.classList.add('active');
         }
      });
   }
}

export function burgerMenu() {
   const menu = document.querySelector('.nav__burger-menu');
   const menuBtn = document.querySelector('.nav__burger');
   const body = document.body;

   if (menu && menuBtn) {

      menuBtn.addEventListener('click', () => {
         menu.classList.toggle('active');
         menuBtn.classList.toggle('active');
         body.classList.toggle('lock');
      })

      menu.addEventListener('click', e => {
         if (e.target.classList.contains('nav__burger-menu')) {
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            body.classList.remove('lock');
         }
      })
   }
}

export function filterMenu() {

   const menu = document.querySelector('.mobile');
   const menuBtn = document.querySelector('.catalog__selection-btn');
   const body = document.body;
   if (menu && menuBtn) {

      menuBtn.addEventListener('click', () => {
         menu.classList.toggle('active');
         menuBtn.classList.toggle('active');
         body.classList.toggle('lock');
      })


      menu.addEventListener('click', e => {
         if (e.target.classList.contains('filter')) {
            menu.classList.remove('active');
            body.classList.remove('lock');
         }
      })

      menu.addEventListener('click', e => {
         if (e.target.classList.contains('filter__vector')) {
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            body.classList.remove('lock');
         }
      })
   }
}

export function showComment() {
   const commentBtns = document.querySelectorAll('.main__reviews-item--button');
   const commentForms = document.querySelectorAll('.main__reviews-form');

   commentBtns.forEach((commentBtn, index) => {
      commentBtn.addEventListener('click', () => {
         commentForms[index].classList.toggle('active');
         commentBtn.classList.toggle('active');
      });
   });
}

export function clickMode() {
   // Получаем все кнопки с классом "btn" из DOM
   const buttons = document.querySelectorAll(".catalog__setting-view--btn");
   const change = document.querySelectorAll('.catalog__product-list');


   buttons.forEach((button) => {
      button.addEventListener("click", () => {
         button.classList.add("active");

         if (button === buttons[1]) {
            change.forEach((changes) => {
               changes.classList.add("active");
            })

         } else {

            change.forEach((changes) => {
               changes.classList.remove("active");
            })
         }

         buttons.forEach((otherButton) => {
            if (otherButton !== button) {
               otherButton.classList.remove("active");
            }
         });
      });
   });
}

export function hideAttribute() {
   const div = document.querySelector('.product__item');

   if (div) {
      const divChildren = div.children;
      if (divChildren.length > 8) {
         for (let i = 8; i < divChildren.length; i++) {
            divChildren[i].style.display = 'none';
         }
      }

   }


}

export function Time() {
   setTimeout(function () {
      const inputs = document.querySelectorAll("input.smart-basket__user-input[type='text']");
      const lastInputIndex = inputs.length - 1;

      inputs.forEach((input, index) => {
         if (index === lastInputIndex) {
            input.addEventListener("input", () => {
               let regex = /[^a-zа-яё0-9]/gi;
               input.value = input.value.replace(regex, "");
            });
         } else {
            input.addEventListener("input", () => {
               let regex = /[^a-zа-яё]/gi;
               input.value = input.value.replace(regex, "");
            });
         }
      });

      let emailInputs = document.querySelectorAll("input.smart-basket__user-input[type='email']");
      emailInputs.forEach(function (input) {
         input.addEventListener("input", function () {
            let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(this.value)) {
               this.classList.add("invalid-email");
            } else {
               this.classList.remove("invalid-email");
            }
         });
      });

      let inputsNumber = document.querySelectorAll("input.month-input-field[type='number']");
      inputsNumber.forEach(function (input) {
         input.addEventListener("input", function () {
            let regex = /^\d{0,2}$/;
            if (!regex.test(this.value)) {
               this.value = this.value.slice(0, 2);
            }
         });
      });

      const inputField = document.querySelector("input.smart-basket__user-input[type='number']");
      inputField.addEventListener("input", function () {
         let value = this.value;
         // Оставляем только цифры
         value = value.replace(/\D/g, "");
         this.value = value.slice(0, 16);
         this.maxLength = 16;
      });

      const inputCVV = document.querySelector("input.cvv-input-field[type='number']");
      inputCVV.addEventListener("input", function () {
         let value = this.value;
         // Оставляем только цифры
         value = value.replace(/\D/g, "");
         this.value = value.slice(0, 3);
         this.maxLength = 3;
      });

   }, 2000);
}

export function selectRegion() {
   setTimeout(function () {
      let countrySelect = document.getElementById("country");
      let regionSelect = document.getElementById("region");

      let regionsByCountry = {
         UA: {
            KV: "Київ",
            LV: "Львів"
         },
         US: {
            CA: "Каліфорнія",
            TX: "Техас"
         }
      };

      function updateRegions() {
         let country = countrySelect.value;
         regionSelect.innerHTML = "";
         let regions = regionsByCountry[country];
         for (let code in regions) {
            let option = document.createElement("option");
            option.value = code;
            option.text = regions[code];
            regionSelect.appendChild(option);
         }
      }

      updateRegions();
      countrySelect.addEventListener("change", updateRegions);
   }, 1000)

};