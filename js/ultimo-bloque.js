
var globalHash = '';
var ids = [];
var animation = '';
var blocks = [];
const TEXTURES = 20;
var globalBlock = '';
function setBlocks () {

	blocks.forEach( (element, i) => {
		let y = -1;
		while(y < 1.5) {
			for(let x = -1; x < 1.5; x += 0.5) { 

			}
		}
	});
}

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
	//console.log(globalBlock)

	let y = -1;
	
	while(y < 1.5) {
		for(let x = -1; x < 1.5; x += 0.5) { 

			if (hash.hash.charAt(0)  == '0') {
				$('#container').append("<a-cone src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' color='" + makeCharacter(6, 'hex') + "' rotation='-90 0 0' radius-bottom='" + makeCharacter(1, 'cir') + "' radius-top='" + makeCharacter(1, 'cir') + "'></a-cone>");
			} else if (hash.hash.charAt(0)  == '1') {
				$('#container').append("<a-sphere src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' color='" + makeCharacter(6, 'hex') + "' rotation='-90 0 0' radius='" + makeCharacter(1, 'cir') + "'></a-sphere>");
			} else if (hash.hash.charAt(0)  == '4') {
				ids.push(makeCharacter(4, 'clean')) 
				$('#container').append("<a-icosahedron id='" + ids[ids.length - 1] + "' src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' color='" + makeCharacter(6, 'hex') + "' rotation='-90 0 0' radius='" + makeCharacter(1, 'cir') + "'></a-icosahedron>");
				animation = 'color';
			} else if (hash.hash.charAt(0)  == '3') {
				$('#container').append("<a-dodecahedron src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' color='" + makeCharacter(6, 'hex') + "' rotation='-90 0 0' radius='" + makeCharacter(1, 'cir') + "'></a-dodecahedron>");
			} else if (hash.hash.charAt(0)  == '4') {
				$('#container').append("<a-tetrahedron src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' color='" + makeCharacter(6, 'hex') + "' rotation='-90 0 0' radius='" + makeCharacter(1, 'cir') + "'></a-tetrahedron>");
			} else if (hash.hash.charAt(0)  == '5') {
				ids.push(makeCharacter(4, 'clean')) 
				$('#container, #container2').append("<a-octahedron id='" + ids[ids.length - 1] + "' rotation='" + makeCharacter(3, 'clean') % 360 + " 0 0' src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' color='" + makeCharacter(6, 'hex') + "' rotation='-90 0 0' radius='" + makeCharacter(1, 'cir') + "'></a-octahedron>");
				animation = 'radius';
			} else if (hash.hash.charAt(0)  == '6') {
				ids.push(makeCharacter(4, 'clean')) 
				$('#container').append("<a-torus id='" + ids[ids.length - 1] + "' src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' arc='" + makeCharacter(3, 'clean') % 360 + "' color='" + makeCharacter(6, 'hex') + "'  radius='" + makeCharacter(1, 'cir') + "' radius-tubular='0.1'></a-torus>");
				animation = 'color';
			} else if (hash.hash.charAt(0)  == '9') {
				$('#container').append("<a-triangle src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "'  color='" + makeCharacter(6, 'hex') + "' rotation='" + makeCharacter(3, 'clean') % 360 + " 0 0' vertex-c='" + makeCharacter(1, 'cir') + " " + makeCharacter(1, 'cir')  + " " +  makeCharacter(1, 'cir') + "'></a-triangle>");
			} else if (hash.hash.charAt(0)  == '8') {
				ids.push(makeCharacter(5, 'clean')) 
				$('#container').append("<a-circle id='" + ids[ids.length - 1] + "' src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "'  color='" + makeCharacter(6, 'hex') + "' rotation='" + makeCharacter(3, 'clean') % 360 + " 0 0' radius='" + makeCharacter(1, 'cir') + "'></a-circle>");
				animation = 'radius';
			} else if (hash.hash.charAt(0)  == '9') {
				$('#container').append("<a-ring src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' color='" + makeCharacter(6, 'hex') + "' rotation='-90 0 0' radius-inner='" + makeCharacter(1, 'cir') + "' radius-outer='" + makeCharacter(1, 'cir') + "'></a-ring>");
			} else if (hash.hash.charAt(0)  == 'a') {
				$('#container').append("<a-torus-knot src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' arc='" + makeCharacter(3, 'clean') % 360  + "' color='"+ makeCharacter(6, 'hex') + "' p='" + makeCharacter(1, 'clean') + "' q='" + makeCharacter(1, 'clean') + "' radius='" + makeCharacter(1, 'cir') + "' radius-tubular='0.1'></a-torus-knot>");
			} else if (hash.hash.charAt(0)  == 'b') {
				$('#container').append("<a-cylinder rotation='" + makeCharacter(3, 'clean') % 360 + " 0 0' src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' color='" + makeCharacter(6, 'hex') + "' height='" + makeCharacter(1) + "' radius='" + makeCharacter(1, 'cir') + "'></a-cylinder>");
				$('#container2').append("<a-cylinder rotation='" + makeCharacter(3, 'clean') % 360 + " 0 0' src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' color='" + makeCharacter(6, 'hex') + "' height='" + makeCharacter(1) + "' radius='" + makeCharacter(1, 'cir') + "'></a-cylinder>");
			} else if (hash.hash.charAt(0)  == 'c') {
				$('#container').append("<a-plane rotation='" + makeCharacter(3, 'clean') % 360 + " 0 0' src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' color='" + makeCharacter(6, 'hex') + "'  height='" + makeCharacter(1) + "' width='" + makeCharacter(1) + "'></a-plane>");
				//animation = 'rotation';
			}    else {
				$('#container').append("<a-box src='media/texture" + hash.index % TEXTURES + ".jpg' position='" + x + " 0 " + y + "' color='"+ makeCharacter(6, 'hex') + "' depth='" + makeCharacter(1) + "' height='" + makeCharacter(1) + "' width='" + makeCharacter(1) + "'></a-box>");

				animation = 'rotation';
			}
			
		}	
		y += 0.5;
	}

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




function setInfo(block) {
	console.log(block);

	$('#block-num').html('<b>Bloque N°: </b>' + block.index);
	$('#author').html('<b>Autor: </b>' + block.author);
	$('#date').html('<b>Fecha: </b>' + block.timestamp);
	$('#hash').html('<b>Hash: </b>' + block.hash);
}

function getAuthor(e) {

	const url = 'https://hbs-web.herokuapp.com/api/v1/tasks/' + e;

	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		//console.log(res);
		res.forEach((element,i) => {
			let block = format(element);
			console.log(block)
			createBlock(block,i);
		})
	})
}

function getLastHash() {

	const url = 'https://hbs-web.herokuapp.com/api/v1/last-block';

	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		//console.log(res);
		globalBlock  = format(res);
		
		console.log(globalBlock);
		setBlock(globalBlock);
		setInfo(globalBlock);
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
			console.log(block)
			createBlock(block,i);
		})
		// globalBlock  = res;
		// setBlock(res.hash);
		// setInfo(res);
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
