import $ from "jquery";

// export function Spoilers() {
//    $('.spoiler__title').click(function (event) {
//       if ($('.spoiler').hasClass('one')) {
//          $('.spoiler__title').not($(this)).removeClass('active');
//          $('.spoiler__content').not($(this).next()).slideUp(300);
//       }
//       $(this).toggleClass('active').next().slideToggle(300);
//    })
// }

// export function Spoilers() {
//    $('.filter__item-header').click(function (event) {
//       if ($('.filter__body').hasClass('one')) {
//          $('.filter__item-body').not($(this)).removeClass('active');
//          $('.filter__item-body').not($(this).next()).slideUp(300);
//       }
//       $(this).toggleClass('active').next().slideToggle(300);
//    })
// }

export function Spoilers() {
   $('.filter__item-header').click(function (event) {
      $(this).toggleClass('active').next().slideToggle(300);
   })
   $('.filter__footer-add').click(function (event) {
      $(this).toggleClass('active').next().slideToggle(300);
   })
}

