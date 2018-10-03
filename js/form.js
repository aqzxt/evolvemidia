// Initialize Firebase
var config = {
	apiKey: "AIzaSyCbPn7WVhHjPVDLzH7Wd-EDesXINZe7_tg",
	authDomain: "evolvemidia-4ad05.firebaseapp.com",
	// databaseURL: "https://evolvemidia-4ad05.firebaseio.com",
	projectId: "evolvemidia-4ad05",
	// storageBucket: "evolvemidia-4ad05.appspot.com",
	// messagingSenderId: "796346727409"
};
firebase.initializeApp(config);

const firebase = require('firebase');
require('firebase/firestore');

var db = firebase.firestore();
db.settings({
	timestampsInSnapshots: true
})


// Salvar dados do usuário
function salvarForm() {
	var email = document.getElementById('email').value;;
	if (email.search('@') === -1) {

		document.querySelector(".alerta").style.display = "block";
		return false
	}

	var nome = document.getElementById('nome').value;
	var empresa = document.getElementById('empresa').value;;
	
	var d = new Date();
	var dia = ("0" + (d.getDate() +1)).slice(-2);
	var mes = ("0" + (d.getMonth() +1)).slice(-2);
	var data = d.getFullYear() +'-'+ mes +'-'+ dia;

	var atual = new Date();
	var diferenca = -(atual.getTimezoneOffset()/60);
	var hora = new Date( new Date().getTime() + diferenca * 3600 * 1000).toUTCString().replace( / GMT$/, "" );
	hora = hora.slice(-8);

	var data_hora = data + ' ' + hora;

	return false
};

// Salvar endereco ip
$.getJSON('http://gd.geobytes.com/GetCityDetails?callback=?', function(data) {
	var resposta = JSON.stringify(data, null, 2);
	var ip = resposta['geobytesipaddress'];
	return false
});


function enviarForm(email, nome, ip, empresa, data_hora) {
	var objeto = {
		email: email,
		nome: nome,
		ip: ip,
		empresa: empresa,
		data_hora: data_hora
	}
	db.collection('captura-leads').set(objeto)
	return false
}

// Esperar o carregamento completo da página antes de qualquer coisa
document.addEventListener('DOMContentLoaded', function() {

	// Executar envio ao bando de dados quando o usuário pressionar o botão
	document.querySelector("#captura").onclick = 
	enviarForm(email, nome, ip, empresa, data_hora);

});

// <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
// <script src="https://www.gstatic.com/firebasejs/5.5.2/firebase.js"></script>
