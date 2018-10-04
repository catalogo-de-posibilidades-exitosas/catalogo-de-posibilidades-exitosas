var CHANGER = 1;
var char = 0;
var globalHash = '';

function setBlock (hash) {
	// $('#container').append("<a-box src='#texture" + globalBlock.index % 4 + "' position='-1 0 -1' material='color: " + makeCharacter(6, true) + ";' depth='.5' height='.5' width='.5'></a-box>");
	// $('#container').append("<a-box src='#texture" + globalBlock.index % 4 + "' position='-0.5 0 -1' material='color: " + makeCharacter(6, true) + ";' depth='.5' height='.5' width='.5'></a-box>");
	// $('#container').append("<a-box src='#texture" + globalBlock.index % 4 + "' position='0 0 -1' material='color: " + makeCharacter(6, true) + ";' depth='.5' height='.5' width='.5'></a-box>");
	// $('#container').append("<a-box src='#texture" + globalBlock.index % 4 + "' position='0.5 0 -1' material='color: " + makeCharacter(6, true) + ";' depth='.5' height='.5' width='.5'></a-box>");
	// $('#container').append("<a-box src='#texture" + globalBlock.index % 4 + "' position='1 0 -1' material='color: " + makeCharacter(6, true) + ";' depth='.5' height='.5' width='.5'></a-box>");
	// $('#container').append("<a-box src='#texture" + globalBlock.index % 4 + "' position='-0.5 0 -0.5' material='color: " + makeCharacter(6, true) + ";' depth='.5' height='.5' width='.5'></a-box>");
	// $('#container').append("<a-box src='#texture" + globalBlock.index % 4 + "' position='0 0 0' material='color: " + makeCharacter(6, true) + ";' depth='.5' height='.5' width='.5'></a-box>");
	// $('#container').append("<a-box src='#texture" + globalBlock.index % 4 + "' position='0.5 0 0.5' material='color: " + makeCharacter(6, true) + ";' depth='.5' height='.5' width='.5'></a-box>");
	// $('#container').append("<a-box src='#texture" + globalBlock.index % 4 + "' position='1 0 1' material='color: " + makeCharacter(6, true) + ";' depth='.5' height='.5' width='.5'></a-box>");
	let y = -1;
	while(y < 1.5) {
		for(let x = -1; x < 1.5; x += 0.5) {
			$('#container').append("<a-box src='media/texture" + globalBlock.index % 10 + ".jpg' position='" + x + " 0 " + y + "' material='color: " + makeCharacter(6, true) + ";' depth='" + makeCharacter(1) + "' height='" + makeCharacter(1) + "' width='" + makeCharacter(1) + "'></a-box>");
		}	
		y += 0.5;
	}
	// for(let i = 0; i < 6; i++) {
	// 	$('#container').append("<a-box src='#texture" + globalBlock.index % 4 + "' position='" + makeCharacter(1) + " " + makeCharacter(1) + " " + makeCharacter(1) + "' material='color: " + makeCharacter(6, true) + ";' depth='" + makeCharacter(1) + "' height='" + makeCharacter(1) + "' width='" + makeCharacter(1) + "'></a-box>");
	// }

	// 
	//             <a-box position='0 0 0' material='color: darksalmon;' depth="3" height=".2" width="2.5"></a-box>
	//             <a-box position='1 1 0' color="#45a3f4" depth="3" height=".2" width="2.5"></a-box>
	//             <a-box position='2 0 2' color="tomato" depth="3" height=".2" width="0.5"></a-box>
	//             <a-box position='1 1 0.5' color="#f04a3b" depth="5" height=".2" width="0.2"></a-box>
	//             <a-box position='0.5 1 3.5' color="#00E888" depth="5" height=".2"width="1.5"></a-box>
	//             <a-box position='3.5 0 1' color="#5B9AE4" depth="5" height=".2" width="1"></a-box>
	//             <a-box position='0.5 1 1.5' color="#BF36E6" depth="5" height=".2" width="0.5"></a-box>
	//             <a-sphere position='4 0 4' color="yellow" radius="2.5"></a-sphere>
}

function makeCharacter(numbersReq, hex = false) {

	if (char + numbersReq > globalBlock.hash.length ) {
		char = CHANGER;
		CHANGER++;
	} 

	if (!hex) {
		//console.log(parseInt((globalBlock.hash).substring(char, char + numbersReq ), 16) / 15)
		var newNum = parseInt((globalBlock.hash).substring(char, char + numbersReq ), 16) / 10;
	} else {
		var newNum = '#' + (globalBlock.hash).substring(char, char + numbersReq );
		console.log(newNum)
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

$(document).ready(function() {
	    if(window.location.search == '') {

	    	getLastHash();
	        
        
    	} else {

    		getAuthor((window.location.search).substring(1));
    		console.log((window.location.search).substring(1))

			// Limpia el '?intro' de la url
	        window.history.pushState('', '', window.location.pathname);    		
    	}
	
})
