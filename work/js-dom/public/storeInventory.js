"use strict";
(function iife() {

  const inventories = [
    {
      name:'Screws',
      quantity: 0,
    },
  ];
  const listEl = document.querySelector('#storeInventory-app .inventories');
  const inputEl = document.querySelector('#storeInventory-app input');
  const buttonEl = document.querySelector('#storeInventory-app button');

  disableButtonIfNoInput();
  addAbilityToAddItems();
  addAbilityToDeleteItems();
  decrement();
  increment();

  render(inventories);

  function render( inventories ) {
    const html = inventories.map( (inv, index) => {
      return `
      <li class="inv ${inv.quantity === 0 ? "no-stock" : ""}"">
        <div class="inv-container">
          <span class="inv-name data-index="${index}">${inv.name}</span>
          <div class="inv-quantity">
              <button class="decrease" data-index="${index}" ${inv.quantity === 0 ? "disabled" : ""}>-</button>
              <span class="quantity-value" data-index="${index}">${inv.quantity}</span>
              <button class="increase" data-index="${index}">+</button>
          </div>
          <button class="delete" data-index="${index}">X</button>
        </div>
      </li>
      `;
    }).join('');

    listEl.innerHTML = html;
    buttonEl.disabled = !inputEl.value;
  };

  function disableButtonIfNoInput() {
    inputEl.addEventListener('input', () => {
      buttonEl.disabled = !inputEl.value;
    });
  }

  function addAbilityToAddItems() {
    buttonEl.addEventListener('click', (e) => {
      const newInventory = {
        name: inputEl.value,
        quantity: 0,
      };
      inventories.push(newInventory);
      inputEl.value = '';
      render(inventories);
    });
  }

  function addAbilityToDeleteItems() {
    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('delete')) {
        return;
      }

      const index = e.target.dataset.index; 
      inventories.splice(index, 1); 
      render(inventories);
    });
  }

  function increment() {
    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('increase')) {
        return;
      }
      const index = e.target.dataset.index; 
      inventories[index].quantity += 1;
      render(inventories);
    });
  }

  function decrement() {
    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('decrease')) {
        return;
      }
      const index = e.target.dataset.index; 
      inventories[index].quantity -= 1;
      render(inventories);
    });
  }

})();
