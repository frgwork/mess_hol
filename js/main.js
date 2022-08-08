"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			const daArray = daMove.split(',');
			if (daArray.length == 3) {
				daElement.setAttribute('data-da-index', number);
				originalPositions[number] = {
					"parent": daElement.parentNode,
					"index": indexInParent(daElement)
				};
				daElementsArray[number] = {
					"element": daElement,
					"destination": document.querySelector('.' + daArray[0].trim()),
					"place": daArray[1].trim(),
					"breakpoint": daArray[2].trim()
				}
				number++;
			}
		}
		dynamicAdaptSort(daElementsArray);

		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = "max"; 

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}

	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace == 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace == 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	dynamicAdapt();

	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}

	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}

	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}

   function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 } 
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}

	function customAdapt() {
		const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

// **********

const accordion = document.querySelector('.faq__accordion');
accordion.addEventListener('click', toggleItem2);

function toggleItem2(e) {
   const target = e.target;
   const tabsItem = target.closest('.accordion-faq__title');
   if (!tabsItem) return;

   if (target.classList.contains('select')) {
      hideAll();
   } else {
      hideAll();
      target.classList.add('select');
      showText(target.nextElementSibling);
   }
}

function hideAll() {
   const tabsTitle = accordion.querySelectorAll('.accordion-faq__title');
   const tabsText = accordion.querySelectorAll('.accordion-faq__list');

   tabsTitle.forEach(el => {
      el.classList.remove('select');
   })
   tabsText.forEach(el => {
      el.removeAttribute('style');
   })
}

function showText(textEl) {
   textEl.style.height = `${textEl.scrollHeight}px`;
}

// **********

function scrollUp() {
   const scrollUp = document.getElementById('scroll-up');
   if (this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

// **********
const sr = ScrollReveal({
   distance: '60px',
   duration: 1800,
   //reset: true,
})

sr.reveal(`
.header__inner,
.inner-positive__col,
.information__overlay,
.broom__inner,
.price-broom__col
`, {
   origin: 'top',
   interval: 100,
})