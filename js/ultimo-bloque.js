const TEXTURES = 19;
const SOUNDS = 24;
const INFO_ATTR = ["Bloque N°: ","Autor: ","Fecha: ","Código: "];
const ATTR_KEYS = ["index","author","timestamp","hash"];
const EASING = ['linear','ease','ease-in','ease-out','ease-in-out'];
const EASING_SUB = ['cubic','quad','quart','quint','sine','expo','circ','elastic','back','bounce'];
const FILL = ['backwards','none','both','forwards'];
const OSCILLATOR_TYPES = ['sine','triangle','square', 'sawtooth'];
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
	],
	[
	  16.35,
	  24.5,
	  36.71,
	  55,
	  82.41,
	  123.47,
	  185,
	  277.18,
	  415.3,
	  622.25,
	  932.33,
	  1479.98,
	  2217.46,
	  3322.44
	],
	[
	  17.32,
	  25.96,
	  38.89,
	  58.27,
	  87.31,
	  130.81,
	  196,
	  293.66,
	  440,
	  659.26,
	  987.77,
	  1479.98,
	  2217.46,
	  3322.44
	],
	[
	  17.32,
	  25.96,
	  38.89,
	  58.27,
	  92.5,
	  138.59,
	  207.65,
	  311.13,
	  466.16,
	  698.46,
	  1046.5,
	  1567.98,
	  2349.32,
	  3520
	],
	[
	  18.35,
	  27.5,
	  41.2,
	  61.74,
	  92.5,
	  138.59,
	  207.65,
	  311.13,
	  466.16,
	  739.99,
	  1108.73,
	  1661.22,
	  2489.02,
	  3729.31
	],
	[
	  19.45,
	  29.14,
	  43.65,
	  65.41,
	  98,
	  146.83,
	  220,
	  329.63,
	  493.88,
	  739.99,
	  1108.73,
	  1661.22,
	  2489.02,
	  3729.31
	],
	[
	  19.45,
	  29.14,
	  46.25,
	  69.3,
	  103.83,
	  155.56,
	  233.08,
	  349.23,
	  523.25,
	  783.99,
	  1174.66,
	  1760,
	  2637.02,
	  3951.07
	],
	[
	  20.6,
	  30.87,
	  46.25,
	  69.3,
	  103.83,
	  155.56,
	  233.08,
	  369.99,
	  554.37,
	  830.61,
	  1244.51,
	  1864.66,
	  2793.83,
	  4186.01
	],
	[
	  21.83,
	  32.7,
	  49,
	  73.42,
	  110,
	  164.81,
	  246.94,
	  369.99,
	  554.37,
	  830.61,
	  1244.51,
	  1864.66,
	  2959.96
	],
	[
	  23.12,
	  34.65,
	  51.91,
	  77.78,
	  116.54,
	  174.61,
	  261.63,
	  392,
	  587.33,
	  880,
	  1318.51,
	  1975.53,
	  2959.96
	],
	[
	  23.12,
	  34.65,
	  51.91,
	  77.78,
	  116.54,
	  185,
	  277.18,
	  415.3,
	  622.25,
	  932.33,
	  1396.91,
	  2093,
	  3135.96
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

// function setAudio(hash, marker) {
// 	try {
// 		var context = new AudioContext() 
// 	}
// 	catch(err) {
// 		var context = new webkitAudioContext()
// 	}

// 	let array = hash.match(/.{1,3}/g);
// 	let i = 0;

// 	let amarker = document.querySelector("#mrk" + marker);
// 	//let oscillatorType = OSCILLATOR_TYPES[parseInt(hash.charAt(0),16) % 4];
// 	let posibleNotes = NOTES[parseInt(hash.slice(0,3),16) % NOTES.length];
// 	console.log(parseInt(hash.slice(0,3),16) % NOTES.length)
// 	let interval;
// 	let mrkrVisible;
// 	let dur = parseInt(hash.slice(0,3),16) % 1000;
// 	setInterval(function() {
// 		if(amarker.object3D.visible) {
			
// 			if(!mrkrVisible) {
// 				interval = setInterval(function() {
// 					if(i < array.length) {
			
// 						let o = context.createOscillator()
// 						let g = context.createGain()
// 						o.connect(g)
// 						g.connect(context.destination)
// 						o.start(0)
			
// 						o.frequency.value = posibleNotes[parseInt(array[i],16) % posibleNotes.length];
// 						o.type = OSCILLATOR_TYPES[parseInt(array[i].charAt(0),16) % 3];

// 						o.stop(context.currentTime + 0.1)
						
// 						// g.gain.exponentialRampToValueAtTime(
// 						// 	0.00001, context.currentTime + parseInt(array[i].charAt(0),16)
// 						// )
			
// 						i++
// 					} else {
// 						i = 0;
// 					}
// 				}, dur);
// 				mrkrVisible = true;
// 			}
// 		} else {
// 			clearInterval(interval);
// 			mrkrVisible = false;
// 		}
// 	},1000)
// }

const SOUND_VAR = ['oscillator', 'filter' , 'lfo','erratic'];
const FILTER_TYPES = ['highpass', 'lowpass', 'bandpass','highshelf','lowshelf', 'peaking', 'notch', 'allpass'];
const FREC_POS = [20,70,120,170,220,270,320];
const ERRATIC_POS = [20,70,120,170,220,270,320,370,420,470,520,570,620,670,720,770,820];

function setAudio(hash, marker) {
	let c,d,e,g,h,i,k;
	let sounder = SOUND_VAR[parseInt(hash.slice(0,3), 16) % SOUND_VAR.length];
	console.log(sounder)
	let oscFrec = parseInt(hash.slice(0,3), 16) % 1000;
	let oscType = OSCILLATOR_TYPES[parseInt(hash.slice(0,3), 16) % OSCILLATOR_TYPES.length]
	let filterFrec = parseInt(hash.slice(3,6), 16) % 700;
	let filterType = FILTER_TYPES[parseInt(hash.slice(3,6), 16) % FILTER_TYPES.length];
	let lfoFrec = parseInt(hash.charAt(0), 16) / 6;
	let lfoType = OSCILLATOR_TYPES[parseInt(hash.slice(6,9), 16) % OSCILLATOR_TYPES.length]
	let minFrec = FREC_POS[parseInt(hash.slice(6,9), 16) % FREC_POS.length];
	let maxFrec = minFrec + 400;
	let raiser = parseInt(hash.slice(10,11), 16);
	let intervalSpeed = parseInt(hash.slice(12,14), 16);
	
	try {
		var context = new AudioContext() 
	}
	catch(err) {
		var context = new webkitAudioContext()
	}
	
	c = {};
	
	d = context.createOscillator();
	d.frequency.value = oscFrec;
	d.type = oscType;
	
	c.oscillator = d;
	
	e = context.createBiquadFilter();
	e.type =  filterType;
	e.frequency.value = filterFrec;
	
	c.filter = e;
	
	g = context.createGain();
	g.gain.value = .01;
	
	c.gain = g;
	
	h = context.createGain();
	h.gain.value = 0.1;
	
	i = context.createOscillator();
	i.frequency.value = lfoFrec;
	i.type = lfoType;
	
	c.lfo = i;
	i.start(0)
	
	k = context.createGain();
	k.gain.value = 0
	d.connect(e)
	e.connect(g)
	i.connect(h)
	h.connect(g.gain)
	g.connect(k)
	k.connect(context.destination)
	
	c.volume=k.gain.value
	d.start()	

	let amarker = document.querySelector("#mrk" + marker);

	switch(sounder) {
		case 'lfo':
			let updownn = true;
			setInterval(function () {
				if(i.frequency.value > lfoFrec + 4) {
					updownn = false;
				} else if(i.frequency.value < lfoFrec) {
					updownn = true;
				}
				if(updownn) {
					i.frequency.value = i.frequency.value + raiser;
				} else {
					i.frequency.value = i.frequency.value - raiser;
				}
				
			},intervalSpeed)
			break;
		case 'oscillator':
		let up = true;
			setInterval(function () {
				if(d.frequency.value > maxFrec) {
					up = false;
				} else if(d.frequency.value < minFrec) {
					up = true;
				}
				if(up) {
					d.frequency.value = d.frequency.value + raiser;
				} else {
					d.frequency.value = d.frequency.value - raiser;
				}
			},intervalSpeed)
			break;
			case 'erratic':
				setInterval(function () {
					d.frequency.value = ERRATIC_POS[Math.floor(Math.random() * ERRATIC_POS.length)]
					console.log(d.frequency.value)
				},intervalSpeed)
				
				break;
			case 'filter':
			let updownn2 = true;
				setInterval(function () {
					if(e.frequency.value > maxFrec) {
						updownn2 = false;
					} else if(e.frequency.value < minFrec) {
						updownn2 = true;
					}
					if(updownn2) {
						e.frequency.value = d.frequency.value + raiser;
					} else {
						e.frequency.value = d.frequency.value - raiser;
					}
				},intervalSpeed)
				break;
		default:
			console.log('hola')
	}



	console.log(c)
	setInterval(function() {
		if(amarker.object3D.visible) {
			k.gain.value = 1
		} else {
			k.gain.value = 0
		}
	},1000)


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
			$('body').one('click', function () {
				setAudio(block.hash, i)
			})
		})
		$( ".sound" ).fadeIn( 3000, function() {
			$( ".sound" ).fadeOut( 3000 );
		});
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
			$('body').one('click', function () {
				setAudio(block.hash, i)
			})
			
		})
		$( ".sound" ).fadeIn( 3000, function() {
			$( ".sound" ).fadeOut( 3000 );
		});
	})
}



$(document).ready(function() {
	    if(window.location.search == '') {

	    	//getLastHash();
	        getLastFour();
        
    	} else {

    		getAuthor((window.location.search).substring(1));

			// Limpia el '?1' de la url
	       // window.history.pushState('', '', window.location.pathname);    		
		}

})