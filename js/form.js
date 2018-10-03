// Initialize Firebase
var config = {
	apiKey: "AIzaSyCbPn7WVhHjPVDLzH7Wd-EDesXINZe7_tg",
	authDomain: "evolvemidia-4ad05.firebaseapp.com",
	databaseURL: "https://evolvemidia-4ad05.firebaseio.com",
	projectId: "evolvemidia-4ad05",
	storageBucket: "evolvemidia-4ad05.appspot.com",
	messagingSenderId: "796346727409"
};
firebase.initializeApp(config);
var db = firebase.firestore();

db.settings({
	timestampsInSnapshots: true
});

var ref = db.collection('leads').doc();

// Esperar o carregamento completo da página antes de qualquer coisa
document.addEventListener('DOMContentLoaded', function() {

	// Executar envio ao bando de dados quando o usuário pressionar o botão
	document.querySelector("#captura").onclick = function() {

		var email = document.getElementById('email').value;
		var nome = document.getElementById('nome').value;
		var tipo = document.getElementById('tipo').value;
		
		var d = new Date();
		var dia = ("0" + (d.getDate() +1)).slice(-2);
		var mes = ("0" + (d.getMonth() +1)).slice(-2);
		var data = d.getFullYear() +'-'+ mes +'-'+ dia;
	
		var atual = new Date();
		var diferenca = -(atual.getTimezoneOffset()/60);
		var hora = new Date( new Date().getTime() + diferenca * 3600 * 1000).toUTCString().replace( / GMT$/, "" );
		hora = hora.slice(-8);
	
		var data_hora = data + ' ' + hora;
		var ip = "";
	
		// Salvar endereco ip
		$.getJSON('https://jsonip.com/?callback=?', function(data) {
			ip = data.ip;

			// Enviar para o banco de dados
			var envio = ref.set({
				email: email,
				nome: nome,
				ip: ip,
				tipo: tipo,
				data_hora: data_hora
			});
		
			if (nome === '' || email === '') {
				document.querySelector(".alerta2").style.display = "block"
				return false;
			}
			// Mostrar mensagem ao usuário que os dados foram enviados
			document.querySelector(".alerta1").style.display = "block"
			return false;
		});
	}
});