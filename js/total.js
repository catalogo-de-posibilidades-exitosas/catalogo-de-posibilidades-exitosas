const TEXTURES = 19;
const INFO_ATTR = ["Bloque N°: ","Autor: ","Fecha: ","Código: "];
const ATTR_KEYS = ["index","author","timestamp","hash"];
const EASING = ['linear','ease','ease-in','ease-out','ease-in-out'];
const EASING_SUB = ['cubic','quad','quart','quint','sine','expo','circ','elastic','back','bounce'];
const FILL = ['backwards','none','both','forwards'];
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

function format (block) {
	let caracteristics = ['index','timestamp','previousHash','hash','author'];
	let formated = {};

	block.forEach( (element,i) => {
		formated[caracteristics[i]] = element;
	})

	return formated;
}


const adder = .8;
const max = 1.6;
var x = -(max);
var y = -(max);
var z = 0;
function getLastFour() {
	const url = 'https://hbs-web.herokuapp.com/api/v1/all';
	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		res.forEach((element,i) => {
            console.log(x,z,y)
			let block = format(element);
            createBlock(block,i);
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
		})
	})
}

$(document).ready(function() {
	getLastFour();
})