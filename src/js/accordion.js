class Accordion {
	
	constructor() {
		this.name = 'accordion';
		this.items = [...document.querySelectorAll('.accordion__item')];
		this.init();
	}
	
	init() {
		if (!document.querySelector(`.js-${this.name}`)) return
		this.addEventlistener();
	}

	addEventlistener() {
		this.items.map((item) => {
			item.addEventListener('click', (event) => {
				this.toggleState(event.target);
			})
		})
	}

	toggleState (target) {
		target.closest('.accordion__item').classList.toggle('accordion__item--closed');
	}

}

new Accordion(document.body);