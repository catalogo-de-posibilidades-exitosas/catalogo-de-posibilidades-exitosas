const timeOptions = { 
	weekday: 'long',
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric'
};

class Block {

	constructor(index, timestamp, author, previousHash = '') {
		this.index = index;
		this.timestamp = timestamp;
		this.previousHash = previousHash;
		this.hash = '';
		this.author = author;
		this.hash = this.calculateHash();
	}

	calculateHash() {
		return CryptoJS.SHA256(this.index + this.timestamp + this.previousHash + this.author).toString();
	}

}

class Blockchain {

	constructor() {
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock() {
		return new Block(0, new Date().toLocaleDateString('es-AR', timeOptions), 'Bloque Genesis' )
	}
}

function getLastHash() {

	const url = 'https://hbs-web.herokuapp.com/api/v1/last-block';

	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		console.log(res)
		generateNewBlock(res);
	})
}

function generateNewBlock( previousBlock ) {

	const url = 'https://hbs-web.herokuapp.com/api/v1/tasks/push-block';
	const author = $('#input-generate').val();
	let newBlock = new Block(Number(previousBlock[0]) + 1, new Date().toLocaleDateString('es-AR', timeOptions), author , previousBlock[3]);

	newBlock = format(newBlock);

	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": url,
	  "method": "PUT",
	  "headers": {
	    "Content-Type": "application/x-www-form-urlencoded",
	    //"Cache-Control": "no-cache",
	    //"Postman-Token": "68ee2b65-cee7-41f0-ad03-ff77012ddad9"
	  },
	  "data": newBlock
	}

	$.ajax(settings).done(function (response) {
	  console.log(response);
	  //window.location.assign(data);
	  window.location.href = 'ultimo-bloque.html';
	});


}

function format (block) {
	let formated = {"info":[]}
	for (var key in block) {
		formated.info.push(block[key]);
		console.log(block[key]);
	}

	
	return formated;
}
const SHAPES = ['cone','sphere','icosahedron','dodecahedron','tetrahedron','octahedron','torus','triangle','circle','ring','torus-knot','cylinder','plane','box','box','box'];
const TEXTURES = 20;

function setCharacteristics(block) {

	let y = -1;
	while(y < 1.5) {
		for(let x = -1; x < 1.5; x += 0.5) {


			//console.log(characteristics);
			block.setChars(characteristics)
		}
		y += 0.5;
	}

	return block;
}

function getFullCatalog() {

	const url = 'https://hbs-web.herokuapp.com/api/v1/all';

	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		console.log(res);
		var options = '<option value="" disabled selected>Selecciona un autor</option>';
		res.forEach(function(element) {
			options += '<option value="' + element[0] + '">' + element[4] + '</option>'
		})
		$('#list-blocks select').html(options);
	})
	
}

function getIndex(e) {
	window.location.href = 'ultimo-bloque.html?' + e;
}




$(document).ready(function() {
	getFullCatalog();
	$('#generar-bloque').on('click', function () {
		//console.log(chain.chain[0]);
		if ($('#input-generate').val() != '') {
			$('.layer').css('display','block');
			getLastHash();
		}
	});	
});