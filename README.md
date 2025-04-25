Agenda de Contatos
Este é um projeto simples de Agenda de Contatos, onde você pode facilmente adicionar, editar, excluir e buscar contatos. Desenvolvido com HTML, CSS, JavaScript para o frontend e Node.js para o backend, com MySQL para armazenamento de dados.

Tecnologias Utilizadas
Frontend: HTML, CSS, JavaScript

Backend: Node.js

Banco de Dados: MySQL

Arquivos do Projeto:
1. index.html
Este é o arquivo principal da aplicação, responsável pela estrutura e conteúdo da página. Ele contém:

Cabeçalho: Título e uma breve descrição da aplicação.

Formulário de Contato: Permite adicionar um novo contato com campos para nome, e-mail e telefone.

Lista de Contatos: Exibe todos os contatos cadastrados com opções para editar ou excluir.

Barra de Busca: Permite buscar contatos por nome ou e-mail.



2. styles.css
Este arquivo contém os estilos da aplicação, que tornam a interface mais moderna e agradável. Ele define:

Design Responsivo: Layout adaptável para diferentes tamanhos de tela.

Interatividade: Efeitos de hover, focus e transições suaves nos elementos interativos (botões e campos de entrada).



3. script.js
O JavaScript gerencia a interação da aplicação. Ele oferece:

Gerenciamento de Contatos: Funções para adicionar, editar, excluir e listar os contatos.

Busca de Contatos: Filtra a lista de contatos com base na pesquisa por nome ou e-mail.

Armazenamento Temporário: Os contatos são armazenados em memória durante a sessão (até que a página seja recarregada).



4. banco.sql
Este arquivo contém a definição do banco de dados MySQL, incluindo:

Criação do Banco de Dados: Criação do banco agenda_contatos.

Criação da Tabela de Contatos: A tabela contatos com os campos id (auto-incremento), nome, email e telefone.



5. Backend com Node.js
Este arquivo foi criado para gerenciar a parte do backend utilizando Node.js e conectar com o banco de dados MySQL. Ele permite que o frontend se comunique com o banco de dados para adicionar, editar, excluir e buscar contatos.

server.js: Contém a configuração do servidor Node.js que lida com as requisições HTTP para adicionar, editar, excluir e listar contatos.

config.js: Arquivo de configuração para conectar ao banco de dados MySQL.

package.json: Dependências do backend, incluindo bibliotecas como Express e MySQL.

Como Usar:
Configuração do Banco de Dados
Importe o arquivo banco.sql no seu sistema MySQL para criar o banco de dados e a tabela de contatos.

Configure a conexão do banco de dados no arquivo config.js para garantir que o backend se conecte corretamente ao MySQL.

Inicie a Aplicação:
Abra o arquivo index.html em seu navegador para visualizar e usar a aplicação.

Adicione, edite ou remova contatos diretamente na interface.

Utilize a barra de pesquisa para encontrar contatos por nome ou e-mail.
