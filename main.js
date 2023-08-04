const meses = {
  1 : 31,
  2 : 28,
  3 : 31,
  4 : 30,
  5 : 31,
  6 : 30,
  7 : 31,
  8 : 31,
  9 : 30,
  10 : 31,
  11 : 30,
  12 : 31,
};

const inputs = document.querySelectorAll(`[data-input]`);
const dia = document.getElementById(`day`);
const month = document.getElementById(`month`);
const year = document.getElementById(`year`);
const button = document.querySelector(`button`);
const pastYears = document.getElementById(`pastYears`).querySelector(`span`);
const pastMonths = document.getElementById(`pastMonths`).querySelector(`span`);
const pastDays = document.getElementById(`pastDays`).querySelector(`span`);
const ultimoDataPassada = [dia.value, month.value, year.value];
const ultimaDataFiltrada = {};

window.addEventListener('load', () => {
  dia.value = dia.defaultValue;
  month.value = month.defaultValue;
  year.value = year.defaultValue;
  for (let i = 0; i < ultimoDataPassada.length; i++) {
    ultimoDataPassada[i] = 0;
  }
  delete ultimaDataFiltrada.year;
  delete ultimaDataFiltrada.month;
  delete ultimaDataFiltrada.day;
})

window.addEventListener(`keydown`, (e) => {
  if(e.key === `Enter`) {
    button.click();
  }
});

button.addEventListener(`click`, () => {
  let isValido = true;

  inputs.forEach(input => {
    validaInput(input)
    if(input.parentElement.classList.contains(`invalid`)) {
      isValido = false;
    }
  });

  if(!isValido){
    const inputsInvalidos = document.querySelectorAll('.invalid')
    inputsInvalidos[0].querySelector('input').focus()

    pastYears.innerText = `--`;
    pastMonths.innerText = `--`;
    pastDays.innerText = `--`;
  } 

  if (ultimoDataPassada[2] !== year.value && isValido) {
    validaData(pastYears, 'year');
    ultimoDataPassada[2] = year.value;
  }
  
  if (ultimoDataPassada[1] !== month.value && isValido) {
    validaData(pastMonths, 'month');
    ultimoDataPassada[1] = month.value;
  }

  if(ultimoDataPassada[0] !== dia.value && isValido) {
    validaData(pastDays, 'day');
    ultimoDataPassada[0] = dia.value;
  }
});

function validaInput(input) {
  if(input.id === `day`) {
    validaDia();
  }
  
  if (input.id === `month`) {
    validaMes();
  }
  
  if(input.id === `year`) {
    validaAno()
  }
}

function validaDia(mes = 1) {
  const span = dia.nextElementSibling;
  if (dia.value > meses[mes] && (month.value > 0 && month.value <= 12)) {
    dia.parentElement.classList.add(`invalid`);
    span.textContent = `mes com ${meses[mes]} dias`;
  } else if(dia.value > meses[mes] || dia.value < 1) {
    dia.parentElement.classList.add(`invalid`);
    span.textContent = `informe um dia valido`;
  } else {
    dia.parentElement.classList.remove(`invalid`);
  }
}

function validaMes() {
  const span = month.nextElementSibling;

  if (month.value > 0 && month.value <= 12) {
    month.parentElement.classList.remove(`invalid`);
    validaDia(month.value);
  } else {
    month.parentElement.classList.add(`invalid`);
    span.textContent = `informe um mes valido`;
  }
}

function validaAno() {
  const span = year.nextElementSibling;

  if(Number(year.value)) {
    verificaAnoBissexto(year.value)
    validaMes()
    year.parentElement.classList.remove('invalid')
  } else {
    span.innerText = 'informe um ano valido'
    year.parentElement.classList.add('invalid')
  }

}

function verificaAnoBissexto(ano) {
  let isBissexto = true;

  if(ano % 4 !== 0) {
    isBissexto = false;
  }

  if (ano % 4 === 0 && ano % 100 === 0) {
    isBissexto = false;
  }

  if (ano % 4 === 0 && ano % 100 === 0 && ano % 400 === 0) {
    isBissexto = true;
  }

  if (isBissexto) {
    meses[2] = 29;
  } else {
    meses[2] = 28;
  }
}

function validaData(span, id) {
  const date = new Date();
  const newDate = new Date(year.value, month.value - 1, dia.value);
  newDate.setFullYear(year.value)
  
  const milissegundos = Math.abs(date.getTime() - newDate.getTime());
  const msPorDia = 1000 * 60 * 60 * 24;
  const msPorMes = msPorDia * 30.437;
  const msPorAno = msPorMes * 12;
  
  const datasProcessadas = {
    year: Math.floor(milissegundos / msPorAno),
    month:  Math.floor((milissegundos % msPorAno) / msPorMes),
    day: Math.floor(((milissegundos % msPorAno) % msPorMes) / msPorDia),
  }
  
  const ultimoValor = ultimaDataFiltrada[id] || 0;
  
  if (datasProcessadas[id] > ultimoValor) {
    for (let i = ultimoValor; i <= datasProcessadas[id]; i++) {
      setTimeout(() => {
        span.textContent = i
      }, i * 23)
    }
    ultimaDataFiltrada[id] = datasProcessadas[id];
  } else {
    for (let i = ultimoValor, j = 0; i >= datasProcessadas[id]; i--, j++) {
      setTimeout(() => {
        span.textContent = i
      }, j * 23)
    }
    ultimaDataFiltrada[id] = datasProcessadas[id];
  }
}