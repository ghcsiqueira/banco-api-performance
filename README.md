Banco API Performance
Projeto de testes de performance para APIs bancárias utilizando JavaScript e k6, com foco na avaliação do comportamento dos endpoints, tempo de resposta, taxa de falhas e estabilidade durante a execução de diferentes cenários de carga.

1. Introdução
Este repositório tem como objetivo centralizar os testes de performance da API bancária, permitindo avaliar seu comportamento diante de diferentes volumes de requisições e identificar possíveis gargalos de desempenho.
Os testes são desenvolvidos com o k6, ferramenta de testes de carga que permite simular usuários virtuais, executar requisições HTTP e coletar métricas durante a execução.
A URL da API é configurada por meio da variável de ambiente BASE_URL, permitindo executar os mesmos testes em diferentes ambientes sem precisar alterar o código-fonte.

2. Tecnologias utilizadas
Tecnologia	Finalidade
JavaScript	Linguagem utilizada para implementar os scripts de teste.
k6	Execução dos testes de performance e coleta de métricas.
Git	Controle de versão do projeto.
GitHub	Hospedagem do repositório e versionamento do código.
HTML	Exportação do relatório de execução do k6 para visualização posterior.

3. Estrutura do repositório
banco-api-performance/
├── config/
│   └── Arquivos de configuração dos testes
├── fixtures/
│   └── Dados utilizados durante os testes
├── helpers/
│   └── Funções auxiliares e operações reutilizáveis
├── tests/
│   └── Scripts de testes de performance
├── utils/
│   └── Utilitários compartilhados
├── .gitignore
└── README.md
3.1. Objetivo de cada grupo de arquivos
config/ — Configurações
Centraliza configurações compartilhadas pelos testes, como parâmetros de execução, configurações de cenários e outros valores necessários para a execução dos scripts.
fixtures/ — Dados de teste
Armazena dados utilizados durante os testes, como payloads, informações de entrada e outros dados necessários para preparar as requisições.
helpers/ — Funções auxiliares
Reúne funções reutilizáveis que apoiam a execução dos testes, evitando duplicação de código e facilitando a manutenção dos scripts.
tests/ — Scripts de teste
Contém os scripts responsáveis por executar os testes de performance da API. É o principal diretório para localizar os cenários e os fluxos que serão executados pelo k6.
utils/ — Utilitários
Agrupa funções utilitárias compartilhadas, destinadas a simplificar tarefas recorrentes e manter a organização do código.
.gitignore — Arquivos ignorados pelo Git
Define quais arquivos e diretórios não devem ser versionados, como arquivos temporários, configurações locais e relatórios gerados durante a execução, conforme as regras configuradas no projeto.

4. Instalação do projeto
4.1. Pré-requisitos
Antes de começar, instale as seguintes ferramentas:
- Git: para clonar o repositório.
- k6: para executar os testes de performance.
- Editor de código: como o Visual Studio Code, para visualizar e editar os scripts.
O k6 possui instalação própria e não depende do npm para executar os testes.
Documentação oficial: Instalação do k6.
4.2. Clonar o repositório
Execute no terminal:
git clone https://github.com/ghcsiqueira/banco-api-performance.git
Acesse o diretório:
cd banco-api-performance
4.3. Verificar a instalação do k6
Execute:
k6 version
Se a instalação estiver correta, o terminal exibirá a versão instalada do k6.
4.4. Configurar a URL da API
A variável de ambiente BASE_URL define a URL-base utilizada pelos testes.
Antes da execução, identifique o endereço do ambiente que será testado. Por exemplo:
BASE_URL=http://localhost:3000
O endereço acima é apenas ilustrativo. Utilize a URL real da API e confirme se o serviço está disponível antes de iniciar os testes.
A variável é passada ao k6 com a opção -e, permitindo que os scripts acessem seu valor por meio de __ENV.BASE_URL.
Exemplo de utilização no JavaScript:
const BASE_URL = __ENV.BASE_URL;
Dessa forma, os scripts podem reutilizar a mesma implementação em ambientes diferentes.

5. Execução dos testes e relatórios
5.1. Executar um teste de performance
No terminal, estando na raiz do repositório, execute:
k6 run -e BASE_URL=http://localhost:3000 tests/<arquivo-de-teste.js>
Substitua <arquivo-de-teste.js> pelo nome real do script que deseja executar e ajuste a URL para o ambiente correspondente.
O comando informa ao k6 qual endereço utilizar e qual arquivo executar.
Importante: o nome do arquivo é ilustrativo. Consulte o diretório tests/ para selecionar um script existente.
5.2. Acompanhar o relatório em tempo real
O k6 permite acompanhar métricas da execução por meio de um dashboard web. Para habilitá-lo e exportar o relatório em HTML ao final da execução, utilize:
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=html-report.html \
k6 run -e BASE_URL=http://localhost:3000 tests/<arquivo-de-teste.js>
Esse comando configura duas variáveis:
- K6_WEB_DASHBOARD=true: habilita o dashboard web durante a execução.
- K6_WEB_DASHBOARD_EXPORT=html-report.html: define o nome do arquivo HTML que será exportado com o relatório.
Durante o teste, o dashboard fica disponível normalmente em:
http://localhost:5665
Ao término da execução, o k6 exportará o relatório HTML para o diretório de trabalho, utilizando o nome definido na variável de ambiente.
O relatório permite consultar os resultados da execução após a finalização do teste.
Executar no Windows PowerShell
No PowerShell, configure as variáveis de ambiente separadamente:
$env:K6_WEB_DASHBOARD = "true"
$env:K6_WEB_DASHBOARD_EXPORT = "html-report.html"

k6 run -e BASE_URL=http://localhost:3000 tests/<arquivo-de-teste.js>
Executar no Windows CMD
No Prompt de Comando do Windows, utilize:
set K6_WEB_DASHBOARD=true
set K6_WEB_DASHBOARD_EXPORT=html-report.html

k6 run -e BASE_URL=http://localhost:3000 tests/<arquivo-de-teste.js>
5.3. Exportar apenas o relatório HTML
Se o objetivo for executar o teste e exportar o relatório HTML sem habilitar o dashboard web, configure apenas a variável de exportação:
K6_WEB_DASHBOARD_EXPORT=html-report.html \
k6 run -e BASE_URL=http://localhost:3000 tests/<arquivo-de-teste.js>
No PowerShell:
$env:K6_WEB_DASHBOARD_EXPORT = "html-report.html"

k6 run -e BASE_URL=http://localhost:3000 tests/<arquivo-de-teste.js>
O relatório será gerado ao final da execução, desde que o teste seja executado até a etapa de exportação e o k6 consiga gravar o arquivo no diretório de destino.
5.4. Métricas de performance
Durante a análise dos resultados, algumas métricas importantes do k6 são:
- http_req_duration: duração das requisições HTTP.
- http_req_failed: proporção de requisições que falharam.
- http_reqs: quantidade total de requisições realizadas.
- vus: quantidade de usuários virtuais ativos.
- checks: resultados das verificações implementadas nos scripts.
A interpretação dessas métricas deve considerar o cenário executado, os critérios de aceitação definidos e as características do ambiente testado.
Considerações finais
Este projeto serve como base para a execução e evolução dos testes de performance da API bancária. A organização dos scripts e a utilização de uma URL configurável permitem facilitar a manutenção, a reutilização dos testes e a análise dos resultados.
Para mais informações sobre os recursos e as opções de execução, consulte a documentação oficial do k6.
Desenvolvido por ghcsiqueira.
