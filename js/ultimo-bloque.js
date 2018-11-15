const TEXTURES = 19;
const SOUNDS = 24;
const INFO_ATTR = ["Bloque N°: ","Autor: ","Fecha: ","Código: "];
const ATTR_KEYS = ["index","author","timestamp","hash"];
const EASING = ['linear','ease','ease-in','ease-out','ease-in-out'];
const EASING_SUB = ['cubic','quad','quart','quint','sine','expo','circ','elastic','back','bounce'];
const FILL = ['backwards','none','both','forwards'];
const OSCILLATOR_TYPES = ['sine','triangle'];
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
};
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
const NOTES = [
	[
	  16.35,
	  17.32,
	  17.32,
	  18.35,
	  19.45,
	  19.45,
	  20.6,
	  21.83,
	  23.12,
	  23.12
	],
	[
	  24.5,
	  25.96,
	  25.96,
	  27.5,
	  29.14,
	  29.14,
	  30.87,
	  32.7,
	  34.65,
	  34.65
	],
	[
	  36.71,
	  38.89,
	  38.89,
	  41.2,
	  43.65,
	  46.25,
	  46.25,
	  49,
	  51.91,
	  51.91
	],
	[
	  55,
	  58.27,
	  58.27,
	  61.74,
	  65.41,
	  69.3,
	  69.3,
	  73.42,
	  77.78,
	  77.78
	],
	[
	  82.41,
	  87.31,
	  92.5,
	  92.5,
	  98,
	  103.83,
	  103.83,
	  110,
	  116.54,
	  116.54
	],
	[
	  123.47,
	  130.81,
	  138.59,
	  138.59,
	  146.83,
	  155.56,
	  155.56,
	  164.81,
	  174.61,
	  185
	],
	[
	  185,
	  196,
	  207.65,
	  207.65,
	  220,
	  233.08,
	  233.08,
	  246.94,
	  261.63,
	  277.18
	],
	[
	  277.18,
	  293.66,
	  311.13,
	  311.13,
	  329.63,
	  349.23,
	  369.99,
	  369.99,
	  392,
	  415.3
	],
	[
	  415.3,
	  440,
	  466.16,
	  466.16,
	  493.88,
	  523.25,
	  554.37,
	  554.37,
	  587.33,
	  622.25
	],
	[
	  622.25,
	  659.26,
	  698.46,
	  739.99,
	  739.99,
	  783.99,
	  830.61,
	  830.61,
	  880,
	  932.33
	],
	[
	  932.33,
	  987.77,
	  1046.5,
	  1108.73,
	  1108.73,
	  1174.66,
	  1244.51,
	  1244.51,
	  1318.51,
	  1396.91
	],
	[
	  1479.98,
	  1479.98,
	  1567.98,
	  1661.22,
	  1661.22,
	  1760,
	  1864.66,
	  1864.66,
	  1975.53,
	  2093
	],
	[
	  2217.46,
	  2217.46,
	  2349.32,
	  2489.02,
	  2489.02,
	  2637.02,
	  2793.83,
	  2959.96,
	  2959.96,
	  3135.96
	],
	[
	  3322.44,
	  3322.44,
	  3520,
	  3729.31,
	  3729.31,
	  3951.07,
	  4186.01
	]
  ]


function createBlock(block, markerN) {
	
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
			
			$('#mrk' + markerN).append(
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

function setAudio(hash, marker) {
	let context = new AudioContext()

	let array = hash.match(/.{1,3}/g);
	let i = 0;

	let amarker = document.querySelector("#mrk" + marker);
	let oscillatorType = OSCILLATOR_TYPES[parseInt(hash.charAt(0),16) % 4];
	let posibleNotes = NOTES[parseInt(hash.charAt(0),16) % NOTES.length];

	let interval;
	let mrkrVisible;
	setInterval(function() {
		if(amarker.object3D.visible) {
			
			if(!mrkrVisible) {
				interval = setInterval(function() {
					if(i < array.length) {
			
						let o = context.createOscillator()
						let g = context.createGain()
						o.connect(g)
						g.connect(context.destination)
						o.start(0)
			
						o.frequency.value = posibleNotes[parseInt(array[i],16) % posibleNotes.length];
						o.type = OSCILLATOR_TYPES[parseInt(array[i].charAt(0),16) % 2];

					
						g.gain.exponentialRampToValueAtTime(
							0.00001, context.currentTime + parseInt(array[i].charAt(0),16)
						)
			
						i++
					} else {
						i = 0;
					}
				}, 500);
				mrkrVisible = true;
			}
		} else {
			clearInterval(interval);
			mrkrVisible = false;
		}
	},1000)
}

function setAudio(hash,mrkr) {
	let sound = parseInt(hash.slice(0,3), 16) % SOUNDS
	console.log('SONIDO: ' + sound);
	$('#vid' + mrkr).crossOrigin = 'anonymous';
	$('#vid' + mrkr).attr('src','media/sounds/' + sound + '.wav');
	setInterval(function(){verifyMarker(mrkr)}, 1000);
}

function verifyMarker(mrkr) {
	var amarker = document.querySelector("#mrk" + mrkr)
	//return amarker.object3D.visible
    if(amarker.object3D.visible == true) {
		console.log('marker is visible');
		//$('#vid').attr('src','../media/sounds/0.wav');
		$('#vid' + mrkr).get(0).play();
    }
    else {
		$('#vid' + mrkr).get(0).pause();
        console.log('marker is lost');
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
		
		
	
	} else if (type == 'fullrot') {
		var newNum = parseInt((hash).substring(iterators.char, iterators.char + 3 ), 16) % 360 + ' 45 90';
	}

	iterators.char += numbersReq;
	
	return newNum
}



function setInfo(block, markerN) {
	
	$('#mrk' + markerN).append("<a-plane color='#6b6b6b' width='3.2' height='1.4' rotation='-90 0 0' position='0 0 2'></a-plane>");

	let yPos = 1.4;
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
			console.log(i)
			setAudio(block.hash, i)
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


		res.forEach((element,i) => {
			let block = format(element);
			setInfo(block,i);
			createBlock(block,i);
			setAudio(block.hash, i)
		})
	})
}



$(document).ready(function() {
	    if(window.location.search == '') {

	    	//getLastHash();
	        getLastFour();
        
    	} else {

    		getAuthor((window.location.search).substring(1));

			// Limpia el '?1' de la url
	        window.history.pushState('', '', window.location.pathname);    		
		}

		//setInterval(function(){verifyMarker()}, 1000);
		
})