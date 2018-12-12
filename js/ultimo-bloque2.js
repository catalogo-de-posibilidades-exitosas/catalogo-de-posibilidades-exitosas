const TEXTURES = 19;
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

function createBlock(block, markerN) {
	let iterators = {
		changer: 1,
		char: 0,
		sign: -1,
	}
	$('#mrk' + markerN).html('');
	let blockType = makeCharacter(block.hash, iterators,3, 'clean') % 14;
	let animation = BLOCK_TYPES[blockType].animations[makeCharacter(block.hash, iterators,1, 'clean') % BLOCK_TYPES[blockType].animations.length];
	let animationDur = makeCharacter(block.hash, iterators,4, 'clean') % 10000;
	if (animationDur < 1000) {
		animationDur = 1000;
	}
	let easing = EASING[makeCharacter(block.hash, iterators,2, 'clean') % EASING.length];
	let fill = FILL[makeCharacter(block.hash, iterators,2, 'clean') % FILL.length]
	easing += easing != 'linear' ? '-' + EASING_SUB[makeCharacter(block.hash, iterators,2, 'clean') % EASING_SUB.length] : '';
	//console.log('ANIMATION>>>>>',animation,'Easing>>>>>>',easing,'DUR>>>>>',animationDur, 'FILL>>>>>>>>', fill);

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

function createTotalBlock(block, markerN) {
	
	let iterators = {
		changer: 1,
		char: 0,
		sign: -1,
	}
	let blockType = makeCharacter(block.hash, iterators,3, 'clean') % 14;
	let animation = BLOCK_TYPES[blockType].animations[makeCharacter(block.hash, iterators,1, 'clean') % BLOCK_TYPES[blockType].animations.length];
	let animationDur = makeCharacter(block.hash, iterators,4, 'clean') % 10000;
	let easing = EASING[makeCharacter(block.hash, iterators,2, 'clean') % EASING.length];
	let fill = FILL[makeCharacter(block.hash, iterators,2, 'clean') % FILL.length]
	easing += easing != 'linear' ? '-' + EASING_SUB[makeCharacter(block.hash, iterators,2, 'clean') % EASING_SUB.length] : '';

    $('#mrk').append(
        "<" + BLOCK_TYPES[blockType].type + " \
        class='go' \
        radius-tubular='0.1' \
        rotation='" + makeCharacter(block.hash, iterators,3, 'clean') % 360 + " 0 0' \
        src='#texture" + block.index % TEXTURES + "' \
        color='" + makeCharacter(block.hash, iterators, 6, 'hex') + "' \
        position='" + x + " " + z + " " + y + "' \
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
        </" + BLOCK_TYPES[blockType].type + ">")

}

const SOUND_VAR = ['oscillator', 'filter' , 'lfo','erratic'];
const FILTER_TYPES = ['highpass', 'lowpass', 'bandpass','highshelf','lowshelf', 'peaking', 'notch', 'allpass'];
const FREC_POS = [20,70,120,170,220,270,320];
const ERRATIC_POS = [20,70,120,170,220,270,320,370,420,470,520,570,620,670,720,770,820];
var soundChange = false;

function setAudio(hash, marker) {
    console.log(marker)
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
	let soundInterval;
	switch(sounder) {
		case 'lfo':
			let updownn = true;
			soundInterval = setInterval(function () {
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
			soundInterval = setInterval(function () {
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
			soundInterval = setInterval(function () {
					d.frequency.value = ERRATIC_POS[Math.floor(Math.random() * ERRATIC_POS.length)]
					
				},intervalSpeed)
				
				break;
			case 'filter':
				let updownn2 = true;
				soundInterval = setInterval(function () {
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

	let interval = setInterval(function() {
		if(amarker.object3D.visible) {
			k.gain.value = 1
			if(soundChange) {
				clearInterval(interval);
				k.gain.value = 0
				d.stop(0)
			}
		} else {
			k.gain.value = 0
			if(soundChange) {
				clearInterval(interval);
				k.gain.value = 0;
				d.stop(0);
			}
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
    console.log(markerN)
	$('#info' + markerN).html('')
	let sustantivo = sustantivos[parseInt(block.hash.substring(0, 3),16) % sustantivos.length];
	let adjetivo = adjetivos[parseInt(block.hash.substring(4, 7),16) % adjetivos.length];
	
	if (!sustantivo.masculino &&  adjetivo.substring(adjetivo.length -1) === 'o') {
		adjetivo =  adjetivo.substring(0, adjetivo.length -1) + 'a'
	}
	
	$('#info' + markerN).append('<div><b>Título: </b>'  + ' ' + sustantivo.palabra + ' ' + adjetivo + '</div>')
	INFO_ATTR.forEach((element,i) => {
		$('#info' + markerN).append('<div><b>' + element + ' </b>'  + ' '  + block[ATTR_KEYS[i]] + '</div>')
	})

	let amarker = document.querySelector("#mrk" + markerN);
	setInterval(function() {
		if(amarker.object3D.visible) {
			$('#info' + markerN).show();
		} else {
			$('#info' + markerN).hide();
		}
	},1000)
}

function getAuthor(e) {
    const url = 'https://hbs-web.herokuapp.com/api/v1/all';
	//const url = 'https://hbs-web.herokuapp.com/api/v1/tasks/' + e;

	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
        
        $('#info').append('<div><b>Cantidad de participantes: </b>'  + res.length + '</div>')
		res.forEach((element,i) => {
			//console.log(x,z,y)

			let block = format(element);
            if(i == res.length - 1) {
                $('#info').append('<div><b>Último bloque creado por: </b>'  + block.author + '</div>');
            }
            
            if(i == e || i == e - 1 || i ==  e - 2) {
          
                let whichMrk = i == e ? 2 : i == e - 1 ? 1 : 0;
               
                setInfo(block,whichMrk);
                createBlock(block,whichMrk);
                $('body').one('click', function () {
                    
                    setAudio(block.hash, whichMrk)
                })
                createTotalBlock(block,i);
                x += adder
                x = Number(x.toFixed(1));
                
                if(x > max) {
                    x = -(max);
                    y += adder
                    y = Number(y.toFixed(1));
                    if(y > max) {
                        y = -(max);
                        z += adder
                        z = Number(z.toFixed(1));
                    }
                }
			} else {
                createTotalBlock(block,i);
                x += adder
                x = Number(x.toFixed(1));
                
                if(x > max) {
                    x = -(max);
                    y += adder
                    y = Number(y.toFixed(1));
                    if(y > max) {
                        y = -(max);
                        z += adder
                        z = Number(z.toFixed(1));
                    }
                }
            }


		})
		let amarker = document.querySelector("#mrk");
		setInterval(function() {
			if(amarker.object3D.visible) {
				$('#info').show();
			} else {
				$('#info').hide();
			}
        },1000)
        
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


function refreshFour() {

	const url = 'https://hbs-web.herokuapp.com/api/v1/last-four';

	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		let tester = format(res[res.length - 1]);
		if(tester.index > lastCreated) {
			soundChange = true;
			res.forEach((element,i) => {

				let block = format(element);
				setInfo(block,i);
				createBlock(block,i);
				$('body').one('click', function () {
					soundChange = false;
					setAudio(block.hash, i);
					$( ".sound" ).fadeIn( 3000, function() {
						$( ".sound" ).fadeOut( 3000 );
					});
				})
			})
			lastCreated = tester.index;
		}
	})

}

const adder = .8;
const max = 1.6;
var x = -(max);
var y = -(max);
var z = 0;
function getAll() {
	const url = 'https://hbs-web.herokuapp.com/api/v1/all';
	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		$('#info').append('<div><b>Cantidad de participantes: </b>'  + res.length + '</div>')
		res.forEach((element,i) => {

			let block = format(element);

            
            if(i >= res.length - 3) {

                if(i == res.length - 1) {
                    $('#info').append('<div><b>Último bloque creado por: </b>'  + block.author + '</div>');
                    lastCreated = block.index;
                    setInterval(function() {
                        console.log('newREC');
                        refreshFour();
                    },30000)
                }
           
                setInfo(block,Math.abs(res.length - (Number(block.index) + 3)));
                createBlock(block,Math.abs(res.length - (Number(block.index) + 3)));
                $('body').one('click', function () {
                    setAudio(block.hash, Math.abs(res.length - (Number(block.index) + 3)))
                })

                createTotalBlock(block,i);
                x += adder
                x = Number(x.toFixed(1));
                
                if(x > max) {
                    x = -(max);
                    y += adder
                    y = Number(y.toFixed(1));
                    if(y > max) {
                        y = -(max);
                        z += adder
                        z = Number(z.toFixed(1));
                    }
                }
			} else {
                createTotalBlock(block,i);
                x += adder
                x = Number(x.toFixed(1));
                
                if(x > max) {
                    x = -(max);
                    y += adder
                    y = Number(y.toFixed(1));
                    if(y > max) {
                        y = -(max);
                        z += adder
                        z = Number(z.toFixed(1));
                    }
                }
            }


		})
		$( ".sound" ).fadeIn( 3000, function() {
			$( ".sound" ).fadeOut( 3000 );
		});
		let amarker = document.querySelector("#mrk");
		setInterval(function() {
			if(amarker.object3D.visible) {
				$('#info').show();
			} else {
				$('#info').hide();
			}
		},1000)
	})
}

$(document).ready(function() {
	    if(window.location.search == '') {

	    	//getLastHash();
	        getAll();
        
    	} else {
            console.log((window.location.search).substring(1))
    		getAuthor((window.location.search).substring(1));

			// Limpia el '?1' de la url
	        window.history.pushState('', '', window.location.pathname);    		
		}

})