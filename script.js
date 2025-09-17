
    const form = document.getElementById("formCadastro");
    const mensagem = document.getElementById("mensagem");

    // Limpar mensagens de erro
    function limparErros() {
      document.querySelectorAll(".erro").forEach(span => span.textContent = "");
      mensagem.textContent = "";
    }

    // Calcular idade a partir da data de nascimento
    function calcularIdade(dataNascimento) {
      const hoje = new Date();
      const nascimento = new Date(dataNascimento);
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();
      if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }
      return idade;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      limparErros();

      try {
        const nome = document.getElementById("nome").value.trim();
        const usuario = document.getElementById("usuario").value.trim();
        const senha = document.getElementById("senha").value.trim();
        const email = document.getElementById("email").value.trim();
        const nascimento = document.getElementById("nascimento").value;

        if (!nome) throw { campo: "erroNome", msg: "Nome é obrigatório." };
        if (!usuario) throw { campo: "erroUsuario", msg: "Usuário é obrigatório." };
        if (senha.length < 6) throw { campo: "erroSenha", msg: "A senha deve ter no mínimo 6 caracteres." };
        if (!email.includes("@")) throw { campo: "erroEmail", msg: "Email inválido." };
        if (!nascimento) throw { campo: "erroNascimento", msg: "Data de nascimento é obrigatória." };

        const idade = calcularIdade(nascimento);
        if (idade < 18) throw { campo: "erroNascimento", msg: "É necessário ter pelo menos 18 anos." };

        // Se chegou até aqui, está tudo válido
        mensagem.textContent = "Cadastro realizado com sucesso!";
      } catch (erro) {
        if (erro.campo && erro.msg) {
          document.getElementById(erro.campo).textContent = erro.msg;
        } else {
          console.error("Erro inesperado:", erro);
        }
      }
    });
  