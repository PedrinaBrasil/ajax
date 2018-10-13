server = "https://suap.ifrn.edu.br";
token = "";
$(document).ready(function(){
	getMeusDados();
	$("#formCarregarAlunos").submit(function(e){
		e.preventDefault();
		periodo = $("#periodo").val();
		ano = $("#ano").val();
		$.ajax({
			type: "GET",
			contentType: 'application/json',
			url:server+"/api/v2/minhas-informacoes/meus-diarios/"+ano+"/"+periodo+"/",
			success:function(data){
				getAlunos(data);
				$("#carregaralunos").attr("disabled", false);
			}, beforeSend: function(req){
				req.setRequestHeader("Authorization", 'JWT '+ token);
				$("#carregaralunos").attr("disabled", true);
			}
		});
	});
});

function getAlunos(turmas){
	console.log(turmas);
	lista = $("#lista");
	lista.empty();

	$(turmas).each(function (i, t){
		turma = "<li class='turma'>";
		turma += t.componente_curricular;
		turma += "<ul class='alunos_turma'>"
		$(t.participantes).each(function(i, a){
			aluno = "<li>";
			aluno += a.matricula + " - "+ a.nome;
			aluno +="</li>";
			turma += aluno;
		});
		turma += "</ul></li>"; 
		lista.append(turma);
	});
}

function getMeusDados(){
	$.ajax({
		type: "GET",
		contentType: 'application/json',
		url:server+"/api/v2/minhas-informacoes/meus-dados/",
		success:function(data){
			$("#foto").attr("src", server+data.url_foto_75x100);
			$("#matricula").val(data.matricula);
			$("#nome").val(data.nome_usual);
		}, beforeSend: function(req){
			req.setRequestHeader("Authorization", 'JWT '+ token);
		}
	});
}
