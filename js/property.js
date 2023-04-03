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

// slider hover start 
let activeIndex = 0;

const groups = document.getElementsByClassName("card-group");

const handleLoveClick = () => {
  const nextIndex = activeIndex + 1 <= groups.length - 1 ? activeIndex + 1 : 0;
  
  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`),
        nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);
        
  currentGroup.dataset.status = "after";
  
  nextGroup.dataset.status = "becoming-active-from-before";
  
  setTimeout(() => {
    nextGroup.dataset.status = "active";
    activeIndex = nextIndex;
  });
}

const handleHateClick = () => {
  const nextIndex = activeIndex - 1 >= 0 ? activeIndex - 1 : groups.length - 1;
  
  const currentGroup = document.querySelector(`[data-index="${activeIndex}"]`),
        nextGroup = document.querySelector(`[data-index="${nextIndex}"]`);
  
  currentGroup.dataset.status = "before";
  
  nextGroup.dataset.status = "becoming-active-from-after";
  
  setTimeout(() => {
    nextGroup.dataset.status = "active";
    activeIndex = nextIndex;
  });
}

// slider hover finish 

//-----modal window -cellphone -START------------------

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

// count start******************************************************************************

let nInput = document.querySelector('.count-in');
// let nRange = document.querySelector('.range');
let inputs = document.querySelectorAll('input');
let totalP = document.querySelector('.t-price');
let nameRadio = document.querySelectorAll('input[name="type"]');
let nameApt = document.querySelectorAll('input[name="apt"]');
let nameOption = document.querySelectorAll('input[name="option"]');
let bPrice = 1200;


function calc(){
    let tPrice = bPrice * + nInput.value;
    // console.log(tPrice);
    for(let radio of nameRadio){
        if(radio.chacked){
            tPrice = tPrice *parseFloat(radio.value);
        }
    }
    // totalP.innerText = tPrice;
    let myformat = new Intl.NumberFormat('cad');
    totalP.innerHTML = myformat.format(tPrice);
}
calc();


//перебрали инпуты, кот есть на странице
for(let item of inputs){
    item.addEventListener('input', function(){
    calc();
    })
}

// count finish************************************************************************* 