export function Result() {

   const cardsData = [
      {
         id: 1,
         title: 'Ноутбук ACER Aspire 5 A515-45-R5P2',
         params: {
            price: '27 999 ₴',
            newprice: '',
            more: 'Подивитися товар',
         }
      },
      {
         id: 2,
         title: 'Ноутбук Acer Nitro 5 AN515-45-R69H',
         params: {
            price: '32 999 ₴',
            newprice: '',
            more: 'Подивитися товар',
         }
      },
      {
         id: 3,
         title: 'Ноутбук LENOVO IdeaPad Gaming 3',
         params: {
            price: '27 999 ₴',
            newprice: '',
            more: 'Подивитися товар',
         }
      },
      {
         id: 4,
         title: 'Ноутбук LENOVO IdeaPad 3 15IAU7',
         params: {
            price: '24 999 ₴',
            newprice: '',
            more: 'Подивитися товар',
         }
      },
   ]

   const result = document.getElementById('result');

   function generateCards() {

      const cards = [];
      for (let i = 0; i < cardsData.length; i++) {
         cards.push(`

         <li class="catalog__product-list popular__sale-info">

         <div class="card popular__sale-item ">

            <div class="popular__sale-icon">
               <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                     d="M12.7714 1C6.41518 1 1 6.73601 1 14.1856C1 19.3248 2.99393 23.6515 5.63655 27.2357C8.27008 30.8075 11.6678 33.8056 14.7394 36.3149L20.0391 40.6444C20.6195 41.1185 21.3805 41.1185 21.9609 40.6444L27.2606 36.3149C30.3322 33.8056 33.7299 30.8075 36.3634 27.2357C39.0061 23.6515 41 19.3248 41 14.1856C41 6.73601 35.5848 1 29.2286 1C25.9521 1 23.0689 2.85418 21 5.25333C18.9311 2.85418 16.0479 1 12.7714 1Z"
                     fill="#A394D2" fill-opacity="0.15" stroke="#775EC5" stroke-linecap="round"
                     stroke-linejoin="round" />
               </svg>
            </div>
            <a href="product.html" class="link">
               <p class="popular__sale-dialog">${cardsData[i].params.more}</p>
               <img src="img/catalog-img/${i + 1}.png" alt="power-unit" class="popular__sale-img">
               <h3 class="popular__sale-title">
               ${cardsData[i].title}
               </h3>
               <p class="popular__sale-price">${cardsData[i].params.price}</p>
            </a>
            <div class="product__quantity"></div>
            <a href="#" class="popular__sale-store" data-sb-id-or-vendor-code="01413"
               data-sb-product-name="Ноутбук ACER Aspire 5 A515-45-R5P2" data-sb-product-price="27999"
               data-sb-product-quantity="1" data-sb-product-img="img/catalog-img/${i}.png">
               <img src="img/popular-sale/fa-solid_shopping-basket.svg" alt="store"
                  class="popular__sale-store--img">
            </a>
         </div>

      </li>
         `)
      }
      return cards;
   }

   const cardArr = generateCards();

   result.innerHTML = cardArr.join('');

}