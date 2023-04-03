// --------currency start---------
let ratePractice = {}; 
//получили наши блоки
let elpUSD = document.querySelector('[data-value="USD"]');
let elpEUR = document.querySelector('[data-value="EUR"]');

// await  - хотим дождаться ответа сервера
getCoursePp();
async function getCoursePp(){
    let res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    let data = await res.json() //получаем наш обьект
    let result = await data;
    // console.log(result);
    // console.log(result.Valute.USD.Value);


    ratePractice.USD = result.Valute.USD;
    ratePractice.EUR = result.Valute.EUR;
    console.log(ratePractice)


    elpUSD.textContent = ratePractice.USD.Value.toFixed(4);
    elpEUR.textContent = ratePractice.EUR.Value.toFixed(4);
 
//USD
    if(ratePractice.USD.Value > ratePractice.USD.Previous){
        elpUSD.classList.add('red');
    }
    else{
        elpUSD.classList.add('green');
    }


//EUR
    if(ratePractice.EUR.Value > ratePractice.EUR.Previous){
        elpEUR.classList.add('red');
    }
    else{
        elpEUR.classList.add('green');
    }

}


// -------currency finish----------


// clock start
window.addEventListener("DOMContentLoaded",() => {
	const clock = new BouncyBlockClock(".clock");
});

class BouncyBlockClock {
	constructor(qs) {
		this.el = document.querySelector(qs);
		this.time = { a: [], b: [] };
		this.rollClass = "clock__block--bounce";
		this.digitsTimeout = null;
		this.rollTimeout = null;
		this.mod = 0 * 60 * 1000;

		this.loop();
	}
	animateDigits() {
		const groups = this.el.querySelectorAll("[data-time-group]");

		Array.from(groups).forEach((group,i) => {
			const { a, b } = this.time;

			if (a[i] !== b[i]) group.classList.add(this.rollClass);
		});

		clearTimeout(this.rollTimeout);
		this.rollTimeout = setTimeout(this.removeAnimations.bind(this),900);
	}
	displayTime() {
		// screen reader time
		const timeDigits = [...this.time.b];
		const ap = timeDigits.pop();

		this.el.ariaLabel = `${timeDigits.join(":")} ${ap}`;

		// displayed time
		Object.keys(this.time).forEach(letter => {
			const letterEls = this.el.querySelectorAll(`[data-time="${letter}"]`);

			Array.from(letterEls).forEach((el,i) => {
				el.textContent = this.time[letter][i];
			});
		});
	}
	loop() {
		this.updateTime();
		this.displayTime();
		this.animateDigits();
		this.tick();
	}
	removeAnimations() {
		const groups = this.el.querySelectorAll("[data-time-group]");
	
		Array.from(groups).forEach(group => {
			group.classList.remove(this.rollClass);
		});
	}
	tick() {
		clearTimeout(this.digitsTimeout);
		this.digitsTimeout = setTimeout(this.loop.bind(this),1e3);	
	}
	updateTime() {
		const rawDate = new Date();
		const date = new Date(Math.ceil(rawDate.getTime() / 1e3) * 1e3 + this.mod);
		let h = date.getHours();
		const m = date.getMinutes();
		const s = date.getSeconds();
		const ap = h < 12 ? "AM" : "PM";

		if (h === 0) h = 12;
		if (h > 12) h -= 12;

		this.time.a = [...this.time.b];
		this.time.b = [
			(h < 10 ? `0${h}` : `${h}`),
			(m < 10 ? `0${m}` : `${m}`),
			(s < 10 ? `0${s}` : `${s}`),
			ap
		];

		if (!this.time.a.length) this.time.a = [...this.time.b];
	}
}
// clock finish 


$('.square').hover(
    function() {
      $('.square').css('width', '350px');
      $('.square').css('height', '50%');
      $(this).css('width', '600px');
      $(this).css('height', '400px');
      },
    function() {
      $('.square').css('width', '350px');
      $('.square').css('height', '50%');
    }
  )


  // slider star
// Références aux éléments importants
let sliderContainer = document.querySelector('.slider-container');
let slider = document.querySelector('.slider-items');
let items = slider.querySelectorAll('.slider-item');

// Variables globales
let initialDragOffset;
let currentDragOffset;

// Écouteur délégué des événements de clic
document.querySelector('.slider-arrows').addEventListener('click', (event) => {
  let clickEventPath = event.composedPath().slice(0, -2);
  
  console.log("Coucou");
  
  for (let element of clickEventPath) {
    if ('previous' in element.dataset) {
      previousSlideClickHandler(element, sliderContainer);
      break;
    } else if ('next' in element.dataset) {
      nextSlideClickHandler(element, sliderContainer);
      break;
    }
  }
});

// Gestionnaire du bouton précédent
function previousSlideClickHandler(element, section) {
  scrollToSlide('previous');
}

// Gestionnaire du bouton suivant
function nextSlideClickHandler(element, section) {
  scrollToSlide('next');
}

// Écouteur d'événements liés au drag du slider
sliderContainer.addEventListener('mousedown', (event) => desktopScrollMouseDownHandler(event));

document.addEventListener('mousemove', (event) => desktopScrollMouseMoveHandler(event));

document.addEventListener('mouseup', (event) => desktopScrollMouseUpHandler(event));

// Gestionnaire de l'initiation d'un drag slider
function desktopScrollMouseDownHandler(event) {
  if (event.target.classList.contains('slider-arrow')) return false;
  
  event.preventDefault();
  
  document.querySelector('body').setAttribute('data-sliding', '');
  
  initialDragOffset = event.clientX - sliderContainer.offsetLeft;
}

// Gestionnaire du drag slider
function desktopScrollMouseMoveHandler(event) {
 if (!document.querySelector('body').hasAttribute('data-sliding')) return false;
  
  currentDragOffset = event.clientX;
  
  let sliderScrollOffset = slider.scrollLeft;
  let nextSliderOffset = sliderScrollOffset - (currentDragOffset - initialDragOffset);
  
  slider.scroll({ left: nextSliderOffset, behavior: 'auto' });
  
  initialDragOffset = currentDragOffset;
}

// Gestionnaire de la fin d'un drag slider
async function desktopScrollMouseUpHandler(event) {
  if (!document.querySelector('body').hasAttribute('data-sliding')) return false;
  
  document.querySelector('body').removeAttribute('data-sliding');
  
  slider.style.scrollSnapType = "none";
  
  scrollToSlide();
  
  setTimeout(() => slider.style.scrollSnapType = null, 800)
}

// Gestionnaire du scroll
function scrollToSlide(command) {
  let numberOfItems = items.length;
  let itemWidth = items[0].offsetWidth;
  let sliderGap = parseInt(window.getComputedStyle(slider).rowGap);
  let numberOfItemsOnScreen = parseFloat((window.innerWidth / (itemWidth + sliderGap)).toFixed(2));
  let sliderScrollOffset = slider.scrollLeft;
  let activeItemIndex = Math.ceil(sliderScrollOffset / (itemWidth + sliderGap));
  let nextItemIndex;
  
  switch(command) {
    case 'previous':
      nextItemIndex = activeItemIndex - 1;      
      if (nextItemIndex < 0) {
        nextItemIndex = numberOfItems - Math.floor(numberOfItemsOnScreen);
      }
      break;
    case 'next':
      nextItemIndex = activeItemIndex + 1;
      if (nextItemIndex > numberOfItems - Math.floor(numberOfItemsOnScreen)) {
        nextItemIndex = 0;
      }
      break;
    default:
      nextItemIndex = Math.floor(sliderScrollOffset / (itemWidth + sliderGap));
  }
    
  let nextSliderOffset = nextItemIndex * (itemWidth + sliderGap);
  
  slider.scroll({ left: nextSliderOffset, behavior: 'smooth' });
}

  // slider finish

  //modal window -cellphone -START

var footerpopup = document.querySelector(".popup__overlay");
var footerbtn = document.querySelector("#uptocall-mini");
var footerclose = document.querySelector(".footerclose");

footerbtn.addEventListener("click", function(event) {
  event.preventDefault();
  footerpopup.classList.remove("hidden");
});

footerpopup.addEventListener("click", function(event) {
  e = event || window.event
  if (e.target == this) {
    footerpopup.classList.add("hidden");
  }
});

footerclose.addEventListener("click", function(event) {
  event.preventDefault();
  footerpopup.classList.add("hidden");
});

//modal window -cellphone - Finish