const timeOptions = { 
	weekday: 'long',
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric'
};
const TEXTURES = 19;
const INFO_ATTR = ["Bloque N°: ","Autor: ","Fecha: ","Código: "];
const ATTR_KEYS = ["index","author","timestamp","hash"];
const EASING = ['linear','ease','ease-in','ease-out','ease-in-out'];
const EASING_SUB = ['cubic','quad','quart','quint','sine','expo','circ','elastic','back','bounce'];
const FILL = ['backwards','none','both','forwards'];
const BLOCK_TYPES = [
	{
		type: 'a-cone',
		animations: [
			'rotation',
			'color',
			'position',
			'radius-bottom',
			'radius-top'
		]
	},
	{
		type: 'a-sphere',
		animations: [
			'rotation',
			'color',
			'position',
			'radius'
		]
	},
	{
		type: 'a-icosahedron',
		animations: [
			'rotation',
			'color',
			'position',
			'radius'
		]
	},
	{
		type: 'a-dodecahedron',
		animations: [
			'rotation',
			'color',
			'position',
			'radius'
		]
	},
	{
		type: 'a-tetrahedron',
		animations: [
			'rotation',
			'color',
			'position',
			'radius'
		]
	},
	{
		type: 'a-octahedron',
		animations: [
			'rotation',
			'color',
			'position',
			'radius'
		]
	},
	{
		type: 'a-torus',
		animations: [
			'rotation',
			'color',
			'position',
			'radius',
			'radius-tubular',
		]
	},
	{
		type: 'a-triangle',
		animations: [
			'rotation',
			'color',
			'position'
		]
	},
	{
		type: 'a-circle',
		animations: [
			'rotation',
			'color',
			'position',
			'radius'
		]
	},
	{
		type: 'a-ring',
		animations: [
			'rotation',
			'color',
			'position',
			'radius-inner',
			'radius-outer'
		]
	},
	{
		type: 'a-torus-knot',
		animations: [
			'rotation',
			'color',
			'position',
			'p',
			'q',
			'radius'
		]
	},
	{
		type: 'a-cylinder',
		animations: [
			'rotation',
			'color',
			'position',
			'height',
			'radius'
		]
	},
	{
		type: 'a-plane',
		animations: [
			'rotation',
			'color',
			'position',
			'height',
			'width'
		]
	},
	{
		type: 'a-box',
		animations: [
			'rotation',
			'color',
			'position',
			'height',
			'width',
			'depth'
		]
	},
];
const ANIMATION_VALUES = {
	'rotation': 'fullrot',
	'color': 'hex',
	'position': 'fullpos',
	'p': 'clean',
	'q': 'clean',
	'radius': 'cir',
	'depth': 'pos',
	'height':'pos',
	'width': 'pos',
	'radius-inner':'cir',
	'radius-outer':'cir',
	'radius-bottom':'cir',
	'radius-top':'cir'
}

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
	console.log(newBlock);
	createBlock(newBlock) 
	newBlock = format(newBlock);
	//instaBlock() 

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

function instaBlock() {
	
	setTimeout(function() {
		html2canvas(document.querySelector('#twitter')).then(function(canvas) {
			//document.body.appendChild(canvas);
			canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
			$('#test').attr('src',canvas.toDataURL());
			console.log(canvas.toDataURL())
		});	
	},1000)
	

}

function getFullCatalog() {

	const url = 'https://hbs-web.herokuapp.com/api/v1/all';

	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		console.log(res);
		var options = '<option value="" disabled selected>Seleccioná un autor</option>';
		res.forEach(function(element) {
			options += '<option value="' + element[0] + '">' + element[4] + '</option>'
		})
		$('#list-blocks select').html(options);
	})
	
}

function getIndex(e) {
	window.location.href = 'ultimo-bloque.html?' + e;
}

function createBlock(block) {
	
	let iterators = {
		changer: 1,
		char: 0,
		sign: -1,
	}

	let blockType = makeCharacter(block.hash, iterators,3, 'clean') % 14;
	let animation = BLOCK_TYPES[blockType].animations[makeCharacter(block.hash, iterators,1, 'clean') % BLOCK_TYPES[blockType].animations.length];
	let animationDur = makeCharacter(block.hash, iterators,4, 'clean') % 10000;
	if (animationDur < 1000) {
		animationDur = 1000;
	}
	let easing = EASING[makeCharacter(block.hash, iterators,2, 'clean') % EASING.length];
	let fill = FILL[makeCharacter(block.hash, iterators,2, 'clean') % FILL.length]
	easing += easing != 'linear' ? '-' + EASING_SUB[makeCharacter(block.hash, iterators,2, 'clean') % EASING_SUB.length] : '';
	console.log('ANIMATION>>>>>',animation,'Easing>>>>>>',easing,'DUR>>>>>',animationDur, 'FILL>>>>>>>>', fill);

	let y = -0.5;
	while(y < 1) {
		for(let x = -0.5; x < 1; x += 0.5) {
			
			$('#twitter').append(
				"<" + BLOCK_TYPES[blockType].type + " \
				class='go' \
				radius-tubular='0.1' \
				rotation='" + makeCharacter(block.hash, iterators,3, 'clean') % 360 + " 0 0' \
				src='#texture" + block.index % TEXTURES + "' \
				color='" + makeCharacter(block.hash, iterators, 6, 'hex') + "' \
				position='" + x + " 0 " + y + "' \
				radius-bottom='" + makeCharacter(block.hash, iterators,1, 'cir') + "' \
				radius-top='" + makeCharacter(block.hash, iterators,1, 'cir') + "' \
				radius='" + makeCharacter(block.hash, iterators,1, 'cir') + "' \
				arc='" + makeCharacter(block.hash, iterators,3, 'clean') % 360 + "' \
				vertex-c='1 1 1' \
				radius-inner='" + makeCharacter(block.hash, iterators,1, 'cir') + "' \
				radius-outer='" + makeCharacter(block.hash, iterators,1, 'cir') + "' \
				p='" + makeCharacter(block.hash, iterators,1, 'clean') + "' \
				q='" + makeCharacter(block.hash, iterators,1, 'clean') + "'  \
				height='" + makeCharacter(block.hash, iterators,1) + "' \
				width='" + makeCharacter(block.hash, iterators,1) + "' \
				depth='" + makeCharacter(block.hash, iterators,1) + "' \
				> \
				<a-animation \
					class='go' \
					attribute='" + animation + "' \
					easing='" + easing + "' \
					direction='alternate' \
					dur='" + animationDur + "' \
					fill='"+ fill + "' \
					pauseEvents='pause' \
					to='" + makeCharacter(block.hash, iterators,1, ANIMATION_VALUES[animation])+ "' \
					repeat='indefinite'> \
				</a-animation> \
				</" + BLOCK_TYPES[blockType].type + ">")
		}
		y += 0.5;
	}
}

function makeCharacter(hash,iterators,numbersReq, type = 'pos') {

	if (iterators.char + 6 > hash.length ) {
		iterators.char = iterators.changer;
		iterators.changer++;
	} 
	if (type == 'pos') {
		var newNum = parseInt((hash).substring(iterators.char, iterators.char + numbersReq ), 16) / 10;
	} else if (type == 'hex') {
		var newNum = '#' + (hash).substring(iterators.char, iterators.char + 6 );
	} else if (type == 'fullhex') {
		var newNum = '#' + (hash).substring(iterators.char, iterators.char + 6 );
	} else if (type == 'clean') {
		var newNum = parseInt((hash).substring(iterators.char, iterators.char + numbersReq ), 16);
	} else if (type == 'cir') {
		var newNum = (parseInt((hash).substring(iterators.char, iterators.char + numbersReq ), 16) / 15).toFixed(1);
		if (newNum == 0.0) {
			newNum = 0.5;
		}
	} else if (type == 'fullpos') {
		
		var newNum = iterators.sign * (parseInt((hash).substring(iterators.char, iterators.char + numbersReq ), 16) / 10);
		iterators.char += numbersReq;
		if (iterators.char + numbersReq > hash.length ) {
			iterators.char = iterators.changer;
			iterators.changer++;
		}
		iterators.sign *= -1;
		newNum += ' 0 ' + iterators.sign * (parseInt((hash).substring(iterators.char, iterators.char + numbersReq ), 16) / 10);
		
		
		console.log(iterators.sign,newNum)
	} else if (type == 'fullrot') {
		var newNum = parseInt((hash).substring(iterators.char, iterators.char + 3 ), 16) % 360 + ' 45 90';
	}

	iterators.char += numbersReq;
	
	return newNum
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