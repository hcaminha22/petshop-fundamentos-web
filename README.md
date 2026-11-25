# Petshop Patas do Rio

Projeto de Fundamentos de Sistemas Web da PUCRS. A Fase 2 continua as páginas, o catálogo e a identidade do petshop da Fase 1.

- [Site publicado](https://hcaminha22.github.io/petshop-fundamentos-web/)
- [Código-fonte](https://github.com/hcaminha22/petshop-fundamentos-web)

## Funcionalidades

- **Início** apresenta um carrossel de três destaques, os dois serviços e produtos do catálogo.
- **Produtos** mantém os seis produtos da Fase 1, organizados em Alimentação, Acessórios e Higiene e cuidados. Cada item tem imagem, descrição e preço.
- **Serviços** apresenta banho e tosa higiênica, seus preços e as duas formas de transporte.
- **Cadastro e agendamento** reúne os dados do cliente, os dados do pet, o serviço, o transporte, o calendário e o horário. O valor estimado é atualizado quando o usuário muda o serviço ou a tele-busca.
- **Contato** identifica o autor e oferece o link para seu perfil no GitHub.

## Como experimentar o agendamento

1. Clique em Agendar um cuidado.
2. Preencha os dados fictícios do cliente e do pet. O CPF exige 11 dígitos e verificadores válidos. Para testar, pode ser usado 52998224725.
3. Selecione banho ou tosa higiênica e entrega no local ou tele-busca.
4. Escolha uma data futura e um horário entre 08h e 17h em intervalos de 30 minutos. Os horários são interpretados em Manaus.
5. Marque a ciência da demonstração e clique em Gerar resumo do agendamento.
6. Confira o resumo. Para alterar os dados, use Editar dados.

O cadastro e o agendamento são demonstrativos de front-end. Os dados permanecem somente na memória da página, sem envio para servidor ou gravação no navegador. Recarregar ou fechar a página descarta os dados. O formulário não efetua uma reserva real nem consulta uma agenda compartilhada.

O banho custa R$ 45,00 e a tosa higiênica R$ 35,00. A tele-busca acrescenta R$ 15,00 ao serviço selecionado e inclui retirada e devolução no endereço informado.

## Ajustes realizados na Fase 2

- Aplicado CSS responsivo em arquivo próprio, com nova tipografia, cores, espaçamento, grades de produtos e adaptação para celular.
- Mantidos os seis produtos, as três categorias, os preços e os dois serviços da Fase 1.
- Incluído um carrossel em JavaScript, com intervalo de sete segundos, navegação anterior/próximo e controle de pausa. O temporizador é interrompido com foco, ponteiro sobre o carrossel e aba inativa. A preferência por movimento reduzido inicia a apresentação pausada.
- Criado o formulário com nome, endereço, CPF, sexo, telefone, e-mail, nome do pet, raça e idade. Os controles incluem inputs de texto, telefone, e-mail, número, data e hora, além de radio buttons, selects, textarea e checkbox.
- Acrescentadas validações de campos obrigatórios, CPF, telefone e CEP. Datas e horários passados, horários fora da faixa e minutos fora do intervalo de meia hora são recusados.
- Ampliada a tele-busca para a tosa higiênica nesta fase. As duas páginas de serviços e o formulário apresentam a mesma regra, com adicional de R$ 15,00.
- Acrescentados resumo dinâmico e edição dos dados, com atualização do preço e indicação explícita de simulação.
- Melhorada a acessibilidade com textos alternativos nas imagens, labels, fieldsets, legends, link para saltar ao conteúdo, foco visível, identificação da página atual e foco automático no título do resumo.
- A apresentação das imagens usa arquivos locais e os scripts carregam com defer. O primeiro slide e o catálogo continuam disponíveis quando o JavaScript está desativado.

## Estrutura

- index.html, produtos.html, servicos.html e contato.html dão continuidade às páginas originais.
- cadastro.html contém o cadastro e o agendamento.
- css/estilos.css contém a apresentação de todas as páginas.
- js/carrossel.js controla o carrossel e as funções temporais.
- js/agendamento.js valida o formulário, calcula o preço e gera o resumo.
- imagens contém as imagens utilizadas.

O projeto usa HTML, CSS e JavaScript nativos. A estilização e o carrossel são implementados nos arquivos locais do projeto. As fontes Bricolage Grotesque e DM Sans são carregadas do Google Fonts, com alternativa sans-serif.

## Execução local e publicação

Abra index.html no navegador ou sirva a pasta com um servidor HTTP local. Os caminhos são relativos para permitir a publicação como projeto no GitHub Pages. A publicação usa main e a raiz do repositório. O histórico do Git mantém a versão em HTML da Fase 1.

## Créditos das imagens

As imagens ilustrativas foram geradas com a ferramenta de imagens integrada ao Codex. Os seis produtos foram fotografias simuladas de estúdio, com fundo claro e sem marcas comerciais. A imagem principal foi gerada a partir de um pedido de fotografia editorial de um cão caramelo e um gato cinza, juntos em um estúdio de cuidados para pets, com luz natural e fundo creme e verde suave. As imagens finais estão na pasta imagens deste repositório.
