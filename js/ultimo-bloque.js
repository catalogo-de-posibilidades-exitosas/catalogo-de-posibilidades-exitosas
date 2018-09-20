const MOD = 3.7;
var char = 0;
var globalHash = '';
function setBlock (hash) {
	
     $('#container').append("<a-box position='" + makeCharacter(1) + " " + makeCharacter(1) + " " + makeCharacter(1) + "' material='color: " + makeCharacter(6, true) + ";' depth='" + makeCharacter(1) + "' height='" + makeCharacter(1) + "' width='" + makeCharacter(1) + "'></a-box>");
     $('#container').append("<a-box position='" + makeCharacter(1) + " " + makeCharacter(1) + " " + makeCharacter(1) + "' material='color: " + makeCharacter(6, true) + ";' depth='" + makeCharacter(1) + "' height='" + makeCharacter(1) + "' width='" + makeCharacter(1) + "'></a-box>");
     $('#container').append("<a-box position='" + makeCharacter(1) + " " + makeCharacter(1) + " " + makeCharacter(1) + "' material='color: " + makeCharacter(6, true) + ";' depth='" + makeCharacter(1) + "' height='" + makeCharacter(1) + "' width='" + makeCharacter(1) + "'></a-box>");
     $('#container').append("<a-box position='" + makeCharacter(1) + " " + makeCharacter(1) + " " + makeCharacter(1) + "' material='color: " + makeCharacter(6, true) + ";' depth='" + makeCharacter(1) + "' height='" + makeCharacter(1) + "' width='" + makeCharacter(1) + "'></a-box>");
     $('#container').append("<a-box position='" + makeCharacter(1) + " " + makeCharacter(1) + " " + makeCharacter(1) + "' material='color: " + makeCharacter(6, true) + ";' depth='" + makeCharacter(1) + "' height='" + makeCharacter(1) + "' width='" + makeCharacter(1) + "'></a-box>");
     $('#container').append("<a-box position='" + makeCharacter(1) + " " + makeCharacter(1) + " " + makeCharacter(1) + "' material='color: " + makeCharacter(6, true) + ";' depth='" + makeCharacter(1) + "' height='" + makeCharacter(1) + "' width='" + makeCharacter(1) + "'></a-box>");
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
	if (!hex) {
		var newNum = parseInt(globalHash.substring(char, char + numbersReq ), 16) % MOD;
	} else {
		var newNum = '#' + globalHash.substring(char, char + numbersReq );
	}
	
	char += numbersReq;
	return newNum
}

function getLastHash() {

	const url = 'https://hbs-web.herokuapp.com/api/v1/last-block';

	fetch(url)
	.then(data => { return data.json() })
	.then( res => {
		console.log(res);
		globalHash  = res.hash;
		setBlock(res.hash)
	})
}

getLastHash();