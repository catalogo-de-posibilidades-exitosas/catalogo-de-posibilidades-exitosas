const timeOptions = { 
	weekday: 'long',
	year: 'numeric',
	month: 'long',
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

	const url = 'https://hbs-web.herokuapp.com/api/v1/tasks/add-block';
	const author = $('#input-generate').val();
	const newBlock = new Block(Number(previousBlock.index) + 1, new Date().toLocaleDateString('es-AR', timeOptions), author , previousBlock.hash);
	//console.log(newBlock);

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

let chain = new Blockchain;
var authors = [];

function getFullCatalog() {

	const url = 'https://hbs-web.herokuapp.com/api/v1/tasks';

	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		console.log(res);
		var options = '<option value="" disabled selected>Selecciona un autor</option>';
		res.forEach(function(element) {
			options += '<option value="' + element.index + '">' + element.author + '</option>'
			authors.push(element.author);
		})
		$('#list-blocks select').html(options);
		generateSelect();
	})
	
}

function generateSelect() {
	console.log(authors);
	
}

function getIndex(e) {
	console.log(e);

	window.location.href = 'ultimo-bloque.html?' + e;
}

$(document).ready(function() {
	getFullCatalog();
	$('#generar-bloque').one('click', function () {
		//console.log(chain.chain[0]);
		if ($('#input-generate').val() != '') {
			$('.layer').css('display','block');
			getLastHash();
		}
	});	
});