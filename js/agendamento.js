// Simulação de front-end. Os dados ficam somente na memória desta página.
const formulario = document.querySelector('#booking-form');
const resultado = document.querySelector('#booking-result');
const campoData = document.querySelector('#data');
const campoHorario = document.querySelector('#horario');
const campoServico = document.querySelector('#servico');
const campoCpf = document.querySelector('#cpf');
const campoTelefone = document.querySelector('#telefone');
const campoCep = document.querySelector('#cep');
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const servicos = { banho: { nome: 'Banho', valor: 4500 }, tosa: { nome: 'Tosa higiênica', valor: 3500 } };

function hojeEmManaus() {
  const partes = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Manaus', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date()).map(({ type, value }) => [type, value]));
  return partes.year + '-' + partes.month + '-' + partes.day;
}

function cpfValido(valor) {
  const digitos = valor.replace(/\D/g, '');
  if (!/^\d{11}$/.test(digitos) || /^(\d)\1{10}$/.test(digitos)) return false;
  for (let tamanho = 9; tamanho <= 10; tamanho++) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(digitos[i]) * (tamanho + 1 - i);
    const resto = (soma * 10) % 11;
    if ((resto === 10 ? 0 : resto) !== Number(digitos[tamanho])) return false;
  }
  return true;
}

function validarHorario() {
  campoData.min = hojeEmManaus();
  campoHorario.setCustomValidity('');
  if (campoData.value && campoHorario.value) {
    const escolhido = new Date(campoData.value + 'T' + campoHorario.value + ':00-04:00');
    if (escolhido <= new Date()) campoHorario.setCustomValidity('Escolha uma data e um horário futuros.');
  }
}

function transporteSelecionado() {
  return formulario.elements.transporte.value;
}

function atualizarEstimativa() {
  const servico = servicos[campoServico.value];
  const telebusca = transporteSelecionado() === 'telebusca';
  document.querySelector('#transport-help').textContent = telebusca ?
    'Retirada e devolução no endereço informado no cadastro. Adicional de R$ 15,00.' :
    'Você leva e retira o pet no horário agendado.';
  document.querySelector('#estimate-description').textContent = servico ?
    servico.nome + (telebusca ? ' + tele-busca' : ' com entrega no local') :
    'Selecione um serviço para calcular o valor.';
  document.querySelector('#estimate-total').textContent = servico ?
    'Total estimado ' + moeda.format((servico.valor + (telebusca ? 1500 : 0)) / 100) :
    'Total estimado —';
}

campoCpf.addEventListener('input', () => {
  campoCpf.setCustomValidity(cpfValido(campoCpf.value) ? '' : 'Informe um CPF com 11 dígitos e verificadores válidos.');
});
campoTelefone.addEventListener('input', () => {
  campoTelefone.setCustomValidity(/^\d{10,11}$/.test(campoTelefone.value.replace(/\D/g, '')) ?
    '' : 'Informe o DDD e o telefone com 10 ou 11 dígitos.');
});
campoCep.addEventListener('input', () => {
  campoCep.setCustomValidity(/^\d{8}$/.test(campoCep.value.replace(/\D/g, '')) ?
    '' : 'Informe os 8 dígitos do CEP.');
});
// Campos obrigatórios de texto não aceitam somente espaços.
for (const campo of formulario.querySelectorAll('input[required]:not([type]), input[required][type="text"]')) {
  if (campo === campoCpf || campo === campoCep) continue;
  campo.addEventListener('input', () => campo.setCustomValidity(campo.value.trim() ? '' : 'Preencha este campo.'));
}
campoData.addEventListener('input', validarHorario);
campoHorario.addEventListener('input', validarHorario);
campoServico.addEventListener('change', atualizarEstimativa);
for (const radio of formulario.querySelectorAll('[name="transporte"]')) radio.addEventListener('change', atualizarEstimativa);
setInterval(validarHorario, 60000);

const preferencia = new URLSearchParams(window.location.search).get('servico');
if (Object.hasOwn(servicos, preferencia)) campoServico.value = preferencia;
validarHorario();
atualizarEstimativa();

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  validarHorario();
  campoCpf.setCustomValidity(cpfValido(campoCpf.value) ? '' : 'Informe um CPF válido.');
  if (!formulario.reportValidity()) return;
  const dados = new FormData(formulario);
  const servico = servicos[dados.get('servico')];
  const telebusca = dados.get('transporte') === 'telebusca';
  const detalhes = document.querySelector('#result-details');
  detalhes.replaceChildren();
  const dia = dados.get('data').split('-').reverse().join('/');
  const resumo = [
    ['Cliente', dados.get('nome').trim()],
    ['Pet', dados.get('pet').trim() + ' · ' + dados.get('raca').trim() + ' · ' + dados.get('idade') + ' ano(s)'],
    ['Serviço', servico.nome],
    ['Transporte', telebusca ? 'Tele-busca' : 'Entrega no local'],
    ['Dia e horário', dia + ' às ' + dados.get('horario') + ' (Manaus)'],
    ['Total estimado', moeda.format((servico.valor + (telebusca ? 1500 : 0)) / 100)]
  ];
  if (telebusca) resumo.push(['Retirada e devolução',
    dados.get('endereco').trim() + ', ' + dados.get('numero').trim() +
    (dados.get('complemento').trim() ? ' · ' + dados.get('complemento').trim() : '') +
    ' · ' + dados.get('bairro').trim() + ' · ' + dados.get('cidade').trim() + '/AM · CEP ' + dados.get('cep').trim()]);
  for (const [rotulo, valor] of resumo) {
    const termo = document.createElement('dt');
    const descricao = document.createElement('dd');
    termo.textContent = rotulo;
    descricao.textContent = valor;
    detalhes.append(termo, descricao);
  }
  formulario.hidden = true;
  resultado.hidden = false;
  document.querySelector('#result-title').focus();
});
document.querySelector('#edit-booking').addEventListener('click', () => {
  resultado.hidden = true;
  formulario.hidden = false;
  document.querySelector('#nome').focus();
});
