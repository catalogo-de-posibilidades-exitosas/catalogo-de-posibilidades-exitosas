var CHANGER = 1;
var char = 0;
var globalHash = '';

function setBlock (hash) {
console.log(globalBlock.hash.charAt(0))
	let y = -1;
	circleZ = 0;
	while(y < 1.5) {
		for(let x = -1; x < 1.5; x += 0.5) { 
			
			if(globalBlock.hash.charAt(0)  == '1') {
				$('#container').append("<a-cone src='media/texture" + globalBlock.index % 10 + ".jpg' position='" + x + " 0 " + y + "' material='color: " + makeCharacter(6, 'hex') + ";' rotation='-90 0 0' radius-bottom='" + makeCharacter(1, 'cir') + "' radius-top='" + makeCharacter(1, 'cir') + "'></a-cone>");
			} else if (globalBlock.hash.charAt(0)  == '2') {
				$('#container').append("<a-sphere src='media/texture" + globalBlock.index % 10 + ".jpg' position='" + x + " 0 " + y + "' material='color: " + makeCharacter(6, 'hex') + ";' rotation='-90 0 0' radius='" + makeCharacter(1, 'cir') + "'></a-sphere>");
			} else if (globalBlock.hash.charAt(0)  == '5') {
				$('#container').append("<a-dodecahedron src='media/texture" + globalBlock.index % 10 + ".jpg' position='" + x + " 0 " + y + "' material='color: " + makeCharacter(6, 'hex') + ";' rotation='-90 0 0' radius='" + makeCharacter(1, 'cir') + "'></a-dodecahedron>");
			} else if (globalBlock.hash.charAt(0)  == 'e') {
				$('#container').append("<a-ring src='media/texture" + globalBlock.index % 10 + ".jpg' position='" + x + " 0 " + y + "' material='color: " + makeCharacter(6, 'hex') + ";' rotation='-90 0 0' radius-inner='" + makeCharacter(1, 'cir') + "' radius-outer='" + makeCharacter(1, 'cir') + "'></a-ring>");
			} else if (globalBlock.hash.charAt(0)  == '9') {
				$('#container').append("<a-torus-knot src='media/texture" + globalBlock.index % 10 + ".jpg' position='" + x + " 0 " + y + "' arc='" + makeCharacter(3, 'clean') % 360  + "' material='color: " + makeCharacter(6, 'hex') + ";' p='" + makeCharacter(1, 'clean') + "' q='" + makeCharacter(1, 'clean') + "' radius='" + makeCharacter(1, 'cir') + "' radius-tubular='0.1'></a-torus-knot>");
			} else if (globalBlock.hash.charAt(0)  == '8') {
				$('#container').append("<a-torus src='media/texture" + globalBlock.index % 10 + ".jpg' position='" + x + " 0 " + y + "' arc='" + makeCharacter(3, 'clean') % 360 + "' material='color: " + makeCharacter(6, 'hex') + ";'  radius='" + makeCharacter(1, 'cir') + "' radius-tubular='0.1'></a-torus>");
			} else if (globalBlock.hash.charAt(0)  == '0') {
				$('#container').append("<a-cylinder rotation='" + makeCharacter(3, 'clean') % 360 + " 0 0' src='media/texture" + globalBlock.index % 10 + ".jpg' position='" + x + " 0 " + y + "' material='color: " + makeCharacter(6, 'hex') + ";' height='" + makeCharacter(1) + "' radius='" + makeCharacter(1, 'cir') + "'></a-cylinder>");
			}   else {
				$('#container').append("<a-box src='media/texture" + globalBlock.index % 10 + ".jpg' position='" + x + " 0 " + y + "' material='color: " + makeCharacter(6, 'hex') + ";' depth='" + makeCharacter(1) + "' height='" + makeCharacter(1) + "' width='" + makeCharacter(1) + "'></a-box>");
			}
			
		}	
		y += 0.5;
	}
}

function makeCharacter(numbersReq, type = 'pos') {

	if (char + numbersReq > globalBlock.hash.length ) {
		char = CHANGER;
		CHANGER++;
	} 
	
	if (type == 'pos') {
		//console.log(parseInt((globalBlock.hash).substring(char, char + numbersReq ), 16) / 15)
		var newNum = parseInt((globalBlock.hash).substring(char, char + numbersReq ), 16) / 10;
		
	} else if (type == 'hex') {
		var newNum = '#' + (globalBlock.hash).substring(char, char + numbersReq );
		
	} else if (type == 'clean') {
		var newNum = parseInt((globalBlock.hash).substring(char, char + numbersReq ), 16);
		console.log('newNum: ' + newNum, 'CHANGER: ' + CHANGER,'char: ' + char,);
	} else if (type == 'cir') {
		var newNum = (parseInt((globalBlock.hash).substring(char, char + numbersReq ), 16) / 15).toFixed(1);
		
	}
	
	char += numbersReq;

	
	return newNum
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
		globalBlock  = res;
		setBlock(res.hash);
		setInfo(res);
	})
}

function getLastHash() {

	const url = 'https://hbs-web.herokuapp.com/api/v1/last-block';

	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		//console.log(res);
		globalBlock  = res;
		setBlock(res.hash);
		setInfo(res);
	})
}

function verifyMarker() {
    //var amarker = this.$refs.amarker; // vuejs
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

	    	getLastHash();
	        
        
    	} else {

    		getAuthor((window.location.search).substring(1));
    		console.log((window.location.search).substring(1))

			// Limpia el '?1' de la url
	        window.history.pushState('', '', window.location.pathname);    		
		}
		
		//setInterval(function(){verifyMarker()}, 1000);
	
})


/* 
<a-circle>

<a-curvedimage>
<a-cylinder>

<a-icosahedron>
<a-image>
<a-octahedron>
<a-plane>


<a-tetrahedron>


<a-triangle> 
*/