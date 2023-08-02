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
}  

const inputs = document.querySelectorAll(`[data-input]`)
const dia = document.getElementById(`day`);
const month = document.getElementById(`month`);
const year = document.getElementById(`year`);

inputs.forEach(input => input.addEventListener(`blur`, () => validaInput(input)))

function validaInput(input) {
  const span = input.nextElementSibling;
  console.log(span);
  
  if(input.id === `day`) {
    if(input.value > 31) {
      input.parentElement.classList.add(`invalid`);
      span.textContent = `dia invalido`
    } else {
      input.parentElement.classList.remove(`invalid`)
    }
  }

  if (input.id === `month`) {
    if(input.value > 12) {
      input.parentElement.classList.add(`invalid`);
      span.textContent = `mes invalido`
    } else {
      input.parentElement.classList.remove(`invalid`)
      validaData(input.value, dia)
    }
  }
  
  if(input.id !== `year`) {
    if (input.id === `day`) {
      const isBissexto = verificaAnoBissexto(year.value)
      const dia = document.getElementById(`day`);
  
    }
  }
}

function verificaAnoBissexto(ano) {
  let isBissexto = true;

  if(!ano % 4 === 0) {
    return false;
  }

  if (ano % 4 === 0 && ano % 100 === 0) {
    isBissexto = false;
  }

  if (ano % 4 === 0 && ano % 100 === 0 && ano % 400 === 0) {
    isBissexto = true;
  }

  if (isBissexto) {
    meses[2] = 29
  } else {
    meses[2] = 28
  }
}

function validaData(mes, input) {
  console.log(mes, input);
  const span = input.nextElementSibling;

  if (input.value > meses[mes]) {
    input.parentElement.classList.add(`invalid`);
    span.textContent = `mes com ${meses[mes]} dias`
  } else {
    input.parentElement.classList.remove(`invalid`);
  }
}