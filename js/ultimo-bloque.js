var animation = '';
const TEXTURES = 20;
const INFO_ATTR = ["Bloque N°: ","Autor: ","Fecha: ","Código: "];
const ATTR_KEYS = ["index","author","timestamp","hash"];

function createBlock(block, markerN) {
	let blockType = '';
	let iterators = {
		changer: 1,
		char: 0
	}

	switch (block.hash.charAt(0)) {
		case '0':
		  blockType = 'a-cone';
		  break;
		case '1':
		  blockType = 'a-sphere';
		  break;
		case '2':
		  blockType = 'a-icosahedron';
		  break;
		case '3':
		  blockType = 'a-dodecahedron';
		  break;
		case '4':
		  blockType = 'a-tetrahedron';
		  break;
		case '5':
		  blockType = 'a-octahedron';
		  break;	
		case '6':
		  blockType = 'a-torus';
		  break;
		case '7':
		  blockType = 'a-triangle';
		  break;
		case '8':
		  blockType = 'a-circle';
		  break;
		case '9':
		  blockType = 'a-ring';
		  break;
		case 'a':
		  blockType = 'a-torus-knot';
		  break;
		case 'b':
		  blockType = 'a-cylinder';
		  break;
		case 'c':
		  blockType = 'a-plane';
		  break;		  
		default:
			blockType = 'a-box';
	}

	let y = -1;
	while(y < 1.5) {
		for(let x = -1; x < 1.5; x += 0.5) {
			$('#mrk' + markerN).append(
				"<" + blockType + " \
				radius-tubular='0.1' \
				rotation='" + makeCharacter(block.hash, iterators,3, 'clean') % 360 + " 0 0' \
				src='#texture" + block.index % TEXTURES + "' \
				color='" + makeCharacter(block.hash, iterators, 6, 'hex') + "' \
				position='" + x + " 0 " + y + "' \
				radius-bottom='" + makeCharacter(block.hash, iterators,1, 'cir') + "' \
				radius-top='" + makeCharacter(block.hash, iterators,1, 'cir') + "' \
				radius='" + makeCharacter(block.hash, iterators,1, 'cir') + "' \
				arc='" + makeCharacter(block.hash, iterators,3, 'clean') % 360 + "' \
				vertex-c='" + makeCharacter(block.hash, iterators,1, 'cir') + " " + makeCharacter(block.hash, iterators,1, 'cir')  + " " +  makeCharacter(block.hash, iterators,1, 'cir') + "' \
				radius-inner='" + makeCharacter(block.hash, iterators,1, 'cir') + "' \
				radius-outer='" + makeCharacter(block.hash, iterators,1, 'cir') + "' \
				p='" + makeCharacter(block.hash, iterators,1, 'clean') + "' \
				q='" + makeCharacter(block.hash, iterators,1, 'clean') + "'  \
				height='" + makeCharacter(block.hash, iterators,1) + "' \
				width='" + makeCharacter(block.hash, iterators,1) + "' \
				depth='" + makeCharacter(block.hash, iterators,1) + "' \
				></" + blockType + ">")
		}
		y += 0.5;
	}
}

function makeCharacter(hash,iterators,numbersReq, type = 'pos') {

	if (iterators.char + numbersReq > hash.length ) {
		iterators.char = iterators.changer;
		iterators.changer++;
	} 
	if (type == 'pos') {
		var newNum = parseInt((hash).substring(iterators.char, iterators.char + numbersReq ), 16) / 10;
		
	} else if (type == 'hex') {
		var newNum = '#' + (hash).substring(iterators.char, iterators.char + numbersReq );
		
	} else if (type == 'clean') {
		var newNum = parseInt((hash).substring(iterators.char, iterators.char + numbersReq ), 16);
	} else if (type == 'cir') {
		var newNum = (parseInt((hash).substring(iterators.char, iterators.char + numbersReq ), 16) / 15).toFixed(1);
		if (newNum == 0.0) {
			newNum = 0.5;
		}
		
	}
	
	iterators.char += numbersReq;
	
	return newNum
}

function setBlock (hash) {

	console.log(ids)
	if (animation == 'rotation') {
		setInterval(function(){animationRotation()},10);
	} else if (animation == 'radius') {
		setInterval(function(){animationRadius()},100);
	} else if (animation == 'color') {
		setInterval(function(){animationColor()},10);
	}
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

// ROTACION
let rotation = -90;
function shiftRotation() {
	rotation = (rotation += 1 ) % 360;
}

function animationRotation() {
	shiftRotation();
	$('#container *').attr('rotation', rotation + ' 0 0' );

}

// POSITION
function animationPosition(direction) {
	let newdir = direction;
	ids.forEach(element => {
		console.log($('#' + element).attr('position'));
		let y = $('#' + element).attr('position').split(' ')[2];
		let temp = $('#' + element).attr('position').split(' ');
		temp.pop();

		if(newdir == 'up') {
			y = Number(y) + 0.1;
			if (y > 1.5) {
				newdir = 'down'
			}
		} else {
			y = Number(y) - 0.1;
			if (y < -1.5) {
				newdir = 'up'
			}
		}

		temp.push(y.toString());
		
		var finalPosition = temp.join(' ');
		
		//console.log(finalPosition)
		
		$('#' + element).attr('position', finalPosition);
		//console.log($('#' + element).attr('position'));
		

	});
}

// COLOR
function shiftHue(color) {
	var hexStr = (parseInt(color, 16) + parseInt('000001', 16)).toString(16);
	while (hexStr.length < 6) { hexStr = '0' + hexStr;   } 
	if (hexStr == 'ffffff')
		hexStr = '000000';

	return hexStr
}

function animationColor() {
	
	ids.forEach(element => {
		$('#' + element).attr('color', '#' + shiftHue($('#' + element).attr('color').substr(1)));
	});
}

// RADIUS
function shiftRadius(radius) {	
	radius = (radius += 0.1 ) % 1;
	if (radius == 0 )
		radius = 0.1;
		
	return radius.toFixed(1);
}

function animationRadius() {
	// console.log($('#' + id).attr('radius'))
	ids.forEach(element => {
		$('#' + element).attr('radius', shiftRadius(Number($('#' + element).attr('radius'))));
	});
	
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
    var amarker = document.querySelector("#container")
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
	        //window.history.pushState('', '', window.location.pathname);    		
		}

		//setInterval(function(){verifyMarker()}, 1000);
	
})
