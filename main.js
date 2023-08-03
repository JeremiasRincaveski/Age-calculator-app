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

button.addEventListener(`click`, () => {
  inputs.forEach(input => validaInput(input));
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
  } else if(dia.value > meses[mes]) {
    dia.parentElement.classList.add(`invalid`);
    span.textContent = `informe um dia valido`;
  } else {
    dia.parentElement.classList.remove(`invalid`);
  }
}

function validaMes() {
  const span = month.nextElementSibling;

  if (month.value > 0) {
    if(month.value > 12) {
      month.parentElement.classList.add(`invalid`);
      span.textContent = `informe um mes valido`;
    } else {
      month.parentElement.classList.remove(`invalid`);
      validaDia(month.value);
    }
  }
}

function validaAno() {
  verificaAnoBissexto(year.value)
  validaMes()
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