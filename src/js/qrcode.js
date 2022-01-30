class Qrcode {
	
	constructor() {
		this.name = 'qrcode';
		this.qrcode = this.fetchQrCode('jeromeeee');
		this.img = document.querySelector('.card__image');
		this.body = document.querySelector('body');
		console.log(body);
		console.log(this.img);
		this.init();
	}
	
	init() {
		if (!document.querySelector(`.js-${this.name}`)) return
		// this.addEventlistener();
		// this.fetchQrCode();
	}

	addEventlistener() {
		this.items.map((item) => {
			item.addEventListener('click', (event) => {
				this.toggleState(event.target);
			})
		})
	}

	fetchQrCode = async (data) => {
		const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data}`);
		this.qrcode = response;
		console.log(this.qrcode);
		

	}

	toggleState (target) {
		target.closest('.accordion__item').classList.toggle('accordion__item--closed');
	}

}

new Qrcode(document.body);