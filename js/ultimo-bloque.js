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

function createBlock(block, markerN) {
	
	let iterators = {
		changer: 1,
		char: 0
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
			
			$('#mrk' + markerN).append(
				"<" + BLOCK_TYPES[blockType].type + " \
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
					attribute='" + animation + "' \
					easing='" + easing + "' \
					direction='alternate' \
					dur='" + animationDur + "' \
					fill='"+ fill + "' \
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
		var newNum = parseInt((hash).substring(iterators.char, iterators.char + numbersReq ), 16) / 10;
		iterators.char += numbersReq;
		if (iterators.char + numbersReq > hash.length ) {
			iterators.char = iterators.changer;
			iterators.changer++;
		}
		newNum += ' 0 ' + parseInt((hash).substring(iterators.char, iterators.char + numbersReq ), 16) / 10;
	} else if (type == 'fullrot') {
		var newNum = parseInt((hash).substring(iterators.char, iterators.char + 3 ), 16) % 360 + ' 45 90';
	}

	iterators.char += numbersReq;
	
	return newNum
}

function setBlock (hash) {
	//animationPosition('up');
	setTimeout(function () {
		console.log('vsd');
		// var sceneEl = document.querySelector('a-scene');
		// var entity = sceneEl.querySelector('a-entity');
		//var context = (document.querySelector('a-scene')).toDataURL();

		//console.log(context); 
		// html2canvas(document.querySelector('#twitter')).then(function(canvas) {
		// 	//document.body.appendChild(canvas);
		// 	canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
		// 	$('#test').attr('src',canvas.toDataURL());
		// 	console.log(canvas)
		// });		
	}, 1000);
}

function setInfo(block, markerN) {

	$('#mrk' + markerN).append("<a-plane color='#6b6b6b' width='3.2' height='1.4' rotation='-90 0 0' position='0 0 2.7'></a-plane>");

	let yPos = 2.1;
	INFO_ATTR.forEach((element,i) => {
		$('#mrk' + markerN).append('<a-text width="3" baseline="top" anchor="center" font="font/roboto.fnt" fontImage="font/roboto.png" position="0 0.1 ' + yPos + '" rotation="-90 0 0" value="' + element + block[ATTR_KEYS[i]] +'"></a-text>');
		yPos += .2;
	})
	
}

function getAuthor(e) {

	const url = 'https://hbs-web.herokuapp.com/api/v1/tasks/' + e;

	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		//console.log(res);
		res.forEach((element,i) => {
			let block = format(element);
			setInfo(block,i);
			createBlock(block,i);
		})
	})
}

function format (block) {
	let caracteristics = ['index','timestamp','previousHash','hash','author'];
	let formated = {};

	block.forEach( (element,i) => {
		formated[caracteristics[i]] = element;
	})

	return formated;
}

function getLastFour() {

	const url = 'https://hbs-web.herokuapp.com/api/v1/last-four';

	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		console.log(res);

		res.forEach((element,i) => {
			let block = format(element);
			setInfo(block,i);
			createBlock(block,i);
		})
	})
}

function verifyMarker() {
    var amarker = document.querySelector("#mrk1")
    if(amarker.object3D.visible == true) {
        console.log('marker is visible');
    }
    else {
        console.log('marker is lost');
    }
}

$(document).ready(function() {
	    if(window.location.search == '') {

	    	//getLastHash();
	        getLastFour();
        
    	} else {

    		getAuthor((window.location.search).substring(1));
    		console.log((window.location.search).substring(1))

			// Limpia el '?1' de la url
	        window.history.pushState('', '', window.location.pathname);    		
		}

		//setInterval(function(){verifyMarker()}, 1000);
	
})
