const LIFE = document.querySelector('.life-count');
const BTN_RESET = document.querySelector('#reset');
const BTN_PLUS_1 = document.querySelector('#plus-one');
const BTN_PLUS_5 = document.querySelector('#plus-five');
const BTN_MINUS_1 = document.querySelector('#minus-one');
const BTN_MINUS_5 = document.querySelector('#minus-five');

let currentLife = 20;
LIFE.textContent = currentLife;

function resetLife() {
  currentLife = 20;
  LIFE.textContent = currentLife;
}

function plusOneToLife() {
  currentLife += 1;
  LIFE.textContent = currentLife;
}

function plusFiveToLife() {
  currentLife += 5;
  LIFE.textContent = currentLife;
}

function minusOneToLife() {
  currentLife -= 1;
  LIFE.textContent = currentLife;
}

function minusFiveToLife() {
  currentLife -= 5;
  LIFE.textContent = currentLife;
}

BTN_RESET.onclick = resetLife;
BTN_PLUS_1.onclick = plusOneToLife;
BTN_PLUS_5.onclick = plusFiveToLife;
BTN_MINUS_1.onclick = minusOneToLife;
BTN_MINUS_5.onclick = minusFiveToLife;
