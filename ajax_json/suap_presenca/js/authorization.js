server = "https://suap.ifrn.edu.br";
token = "";
$(document).ready(function(){
	url = server+'/api/v2/autenticacao/token/';
	dados_usuario = {
  		'username': '<MATRICULA>',
  		'password': '<SENHA>'
	};
	$.ajax({
		type: "POST",
    		data: dados_usuario,
		url:url,
		success:function(dados){
			token = data.token;
		}
	});
});
