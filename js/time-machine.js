const SUBMIT = document.querySelector("#start");
const CODE_FORM = document.querySelector(".code-form-wrapper");
const ENTER_CODE_BTN = document.querySelector('#enter_code_btn');
const LOADER = document.querySelector('.loader-wrapper');
const EPOCH_WRAPPER = document.querySelector('.epoch-wrapper');
const MESSAGE_WRAPPER = document.querySelector('.message-wrapper');
const EPOCH_MESSAGE = document.querySelector('.epoch-message');
const BACK_TO_FORM_BTN = document.querySelector('#back_to_form');

(function() {    
	
	ENTER_CODE_BTN.onclick = () => {
		animateCSS('#enter_code_btn', 'fadeOutUp', () => {
			ENTER_CODE_BTN.classList.add('d-none');
			CODE_FORM.classList.remove('d-none');
			animateCSS('.code-form-wrapper', 'fadeInDown');
		});
	};


})();

function processCodes() {
	animateCSS('.code-form-wrapper', 'fadeOutUp', () => {
			hideElement('.code-form-wrapper');
			showElement('.loader-wrapper');
			animateCSS('.loader-wrapper', 'fadeIn');
		})

    const fields = document.querySelectorAll(".code-input");

    let codes = [];

    fields.forEach(el => {
        codes.push(el.value);
    });
    
    let epoch = verifyCodes(codes);

    if (epoch === false) {
    	randomWait(falseCodeProcedure);
    } else {
    	randomWait(correctCodeProcedure.bind(null, epoch));
    }
}

function falseCodeProcedure() {
	animateCSS('.loader-wrapper', 'fadeOut', () => {
		EPOCH_WRAPPER.classList.replace('d-none', 'd-flex');
		LOADER.classList.replace('d-flex', 'd-none');
		MESSAGE_WRAPPER.classList.add('error');
		animateCSS('.epoch-wrapper', 'fadeIn', () => {
			EPOCH_MESSAGE.innerHTML = "Došlo k neočekávané chybě! Zadané kódy nejsou správné!";
			BACK_TO_FORM_BTN.onclick = () => {
				animateCSS('.epoch-wrapper', 'fadeOut', () => {
					EPOCH_WRAPPER.classList.replace('d-flex', 'd-none');
					CODE_FORM.classList.replace('d-none', 'd-flex');
					animateCSS('.code-form-wrapper', 'fadeInDown');
				})
			}
		});
	})
}

function correctCodeProcedure(epoch) {
	console.log(epoch);
	animateCSS('.loader-wrapper', 'fadeOut', () => {
		EPOCH_WRAPPER.classList.replace('d-none', 'd-flex');
		LOADER.classList.replace('d-flex', 'd-none');
		animateCSS('.epoch-wrapper', 'fadeIn', () => {
			EPOCH_MESSAGE.innerHTML = "Přesun časem úspěšně dokončen. Nacházíte se v:<br><span class='epoch-name'>"+epoch+"</span>";
		})
	})
}

function randomWait(func) {
	setTimeout(func, Math.random() * 10000 + 4000);
}


function verifyCodes(codes) {
    let result = true;
    let epoch = "";
    
    DATA.some(entry => {
    	result = true;
        
        for (let i = 0; i < entry.codes.length; i++) {
            if (codes[i] !== entry.codes[i]) {
            	result = false;
            	break;
            }
        }
        
        if (result) {
        	epoch = entry.epoch;
        	return epoch;
        }
    })
    return result ? epoch : false;
}

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName, 'fast')

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}

function hideElement(elementSelector) {
	const node = document.querySelector(elementSelector);
	node.classList.remove('d-flex');
	node.classList.add('d-none');
}

function showElement(elementSelector) {
	const node = document.querySelector(elementSelector);
	node.classList.remove('d-none');
	node.classList.add('d-flex');
}
