@@include('components/webp.js')

Fancybox.bind("[data-fancybox]", {
  Image: {
    Panzoom: {
      zoomFriction: 0.7,
      maxScale: function () {
        return 3;
      },
    },
  },
});

document.addEventListener('DOMContentLoaded',initQuiz)
$('.tel').inputmask("+7 (999) 999-99-99");
function initQuiz(){
   const quiz = document.querySelector('.quiz')
   let tel = document.querySelector('.quiz__telephone');
   const quastions = quiz.querySelectorAll('.quiz__template')
   const discount = quiz.querySelector('.quiz__discaunt');
   const wrapper = quiz.querySelector('.quiz__wrapper')
   const prevBtn = quiz.querySelector('.quiz__btn-prev');
   const result = quiz.querySelector('.quiz__result');
   const answers = [];
   const form = quiz.querySelector('.quiz__form');
   const nextBtn = quiz.querySelector('.quiz__btn-next')
   let current = 0;
   document.addEventListener('keyup',(e)=>{
      if(e.code == 'Enter'){
         nextQuastion()
      }
   })
   prevBtn.addEventListener('click',()=>{
      if(current > 0){
         current--;
         quastions[current].classList.add('quiz__template-active')
         quastions[current+1].classList.remove('quiz__template-active')
         discount.textContent = (current+1) * 1000
      }
      
   })
   nextBtn.addEventListener('click',()=>{
      nextQuastion()
   })
   form.addEventListener('submit',(e)=>{
      answers.push(tel.value);
      fetch('quiz.php',{
         method: 'POST',
         headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
   },
        body: "username=techbos&password=Pa%24%24w0rd"
    }).then(res=>{
         window.location = '/thank.html'
      })
      e.preventDefault();
   })
   function nextQuastion(){
      let select = false
      quastions[current].querySelectorAll('.quiz__field').forEach((item)=>{
         if(item.checked){
            select = item;
         }
      })
      if(current < 4 && select){
         current++;
         answers.push(select.value);
         quastions[current-1].classList.remove('quiz__template-active')
         quastions[current].classList.add('quiz__template-active')
         discount.textContent = (current+1) * 1000
      }
      else if ( current >= 4 && select){
         answers.push(select.value);
         wrapper.remove()
         result.classList.add('quiz__result-active')
      }
      
   }
   
}
!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);


document.addEventListener('DOMContentLoaded', function() {

   /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
   var modalButtons = document.querySelectorAll('.js-open-modal'),
       overlay      = document.querySelector('.js-overlay-modal'),
       closeButtons = document.querySelectorAll('.js-modal-close');


   /* Перебираем массив кнопок */
   modalButtons.forEach(function(item){

      /* Назначаем каждой кнопке обработчик клика */
      item.addEventListener('click', function(e) {

         /* Предотвращаем стандартное действие элемента. Так как кнопку разные
            люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
            Нужно подстраховаться. */
         e.preventDefault();

         /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
            и будем искать модальное окно с таким же атрибутом. */
         var modalId = this.getAttribute('data-modal'),
             modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');


         /* После того как нашли нужное модальное окно, добавим классы
            подложке и окну чтобы показать их. */
         modalElem.classList.add('active');
         overlay.classList.add('active');
      }); // end click

   }); // end foreach


   closeButtons.forEach(function(item){

      item.addEventListener('click', function(e) {
         var parentModal = this.closest('.modal');

         parentModal.classList.remove('active');
         overlay.classList.remove('active');
      });

   }); // end foreach


    document.body.addEventListener('keyup', function (e) {
        var key = e.keyCode;

        if (key == 27) {

            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        };
    }, false);


    overlay.addEventListener('click', function() {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });




}); // end ready
window.onscroll = function() {check()};

// Get the header
let header = document.querySelector(".header");
// Get the offset position of the navbar
let sticky = header.offsetTop;
let wrap = document.querySelector('.wrapper__content');
let padd = false;
// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function check() {
  if (window.pageYOffset >= sticky) {
   if(!padd){
      let padding = parseInt($(".wrapper__content").css("padding-top"));
      wrap.style.paddingTop = padding + header.offsetHeight + "px";
   }
   header.classList.add("header__sticky");
   padd = true;
  } else {
   header.classList.remove("header__sticky");
   if(padd){
      let padding = parseInt($(".wrapper__content").css("padding-top"));
      wrap.style.paddingTop = padding - header.offsetHeight + "px";
   }
   padd = false;
  }
}
