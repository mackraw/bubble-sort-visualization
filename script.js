'use strict';

const box = document.getElementById('box');
const btnSort = document.getElementById('btnSort');
const btnReset = document.getElementById('btnReset');
const speed = document.getElementById('speed');
let speedSetting = 100;

function createItems() {
  box.innerHTML = '';
  for (let i = 0; i < 20; i++) {
    let num = Math.ceil(Math.random() * 100);
    let item = document.createElement('div');
    item.classList.add('item');
    item.style.height = `${num}%`;
    let itemLabel = document.createElement('label');
    itemLabel.classList.add('itemLabel');
    itemLabel.textContent = num;
    item.appendChild(itemLabel);
    box.appendChild(item);
  }
}

function swap(a, b) {
  return new Promise((res) => {
    setTimeout(() => {
      box.insertBefore(b, a);
      res();
    }, speedSetting);
  });
}

async function bubbleSort() {
  let itemsArr = box.children;
  for (let lastElem = itemsArr.length - 1; lastElem > 0; lastElem--) {
    for (let i = 0; i < lastElem; i++) {
      itemsArr[i].style.backgroundColor = 'orange';
      itemsArr[i + 1].style.backgroundColor = 'orange';
      let item1 = Number(itemsArr[i].childNodes[0].innerText);
      let item2 = Number(itemsArr[i + 1].childNodes[0].innerText);
      if (item1 > item2) {
        await swap(itemsArr[i], itemsArr[i + 1]);
      }
      itemsArr[i + 1].style.backgroundColor = 'green';
      itemsArr[i].style.backgroundColor = 'red';
    }
  }
  itemsArr[0].style.backgroundColor = 'green';
}

createItems();

btnSort.addEventListener('click', bubbleSort);
btnReset.addEventListener('click', createItems);

speed.addEventListener('change', () => {
  speedSetting = speed.value;
});