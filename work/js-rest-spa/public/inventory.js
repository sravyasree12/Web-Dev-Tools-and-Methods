"use strict";
(function iife() {

  let inventoryData = [];

  const listEl = document.querySelector('#inventory-app .inventories');
  const inputEl = document.querySelector('#inventory-app .to-add');
  const buttonEl = document.querySelector('#inventory-app .add');
  const status = document.querySelector('#inventory-app .status');

  addAbilityToIncreaseInventory();
  addAbilityToDecreaseInventory();

  function render( inventory ) {
    const html = Object.values(inventory).map( (item, index) => {
      return `
        <li class="inventory ${item.quantity === 0 ? "out-of-stock" : ""}">
            <div class="inventory-container">
                <span class="inventory-name" data-itemId="${item.itemId}">${item.name}</span>
                <div class="inventory-quantity">
                    <button class="decrease" data-itemId="${item.itemId}" ${item.quantity === 0 ? "disabled" : ""}>-</button>
                    <span class="quantity-value" data-itemId="${item.itemId}">${item.quantity}</span>
                    <button class="increase" data-itemId="${item.itemId}">+</button>
                </div>
            </div>
        </li>
      `;

    }).join('');

    listEl.innerHTML = html;

    buttonEl.disabled = !inputEl.value;
  };

  function updateStatus( message ) {
        status.innerText = message;
    }

  function addAbilityToIncreaseInventory() {

    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('increase')) {
        return;
      }

      const itemId = e.target.dataset.itemid; 
      const item = inventoryData[itemId];
      const name = item.name;
      const quantity = item.quantity + 1;
      fetch(`/inventory/${itemId}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json'
            }),
        body: JSON.stringify({ 
            itemId: {
                itemId: itemId,
                name: name,
                quantity: quantity
            }
         })
        })
        .then( response => {
            if(response.ok) {
                return response.json();
            } else {
                return response.json().then(err => Promise.reject(err));
            }
        })
        .then( inventory => {
            inventoryData = inventory;
            render(inventoryData);
            updateStatus('Operation success.');
        })
        .catch(err => updateStatus("You have an error: " + err.error));
        });
  }

  function addAbilityToDecreaseInventory() {

    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('decrease')) {
        return;
      }

      const itemId = e.target.dataset.itemid; 
      const item = inventoryData[itemId];
      const name = item.name;
      const quantity = item.quantity - 1;
      fetch(`/inventory/${itemId}`, {
        method: 'PUT',
        headers: new Headers({
            'content-type': 'application/json'
            }),
        body: JSON.stringify({ 
            itemId: {
                itemId: itemId,
                name: name,
                quantity: quantity
            }
         })
        })
        .then( response => {
            if(response.ok) {
                return response.json();
            } else {
                return response.json().then(err => Promise.reject(err));
            }
        })
        .then( inventory => {
            inventoryData = inventory;
            render(inventoryData);
            updateStatus('Operation success.');
        })
        .catch(err => updateStatus("You have an error: " + err.error));
        });
  }

  fetch('/inventory', {
        method: 'GET'
    })
    .then( response => {
        if(response.ok) {
            return response.json();
        } else {
            return response.json().then(err => Promise.reject(err));
        }
    })
    .then( inventory => {
        inventoryData = inventory;
        render(inventoryData);
        updateStatus('Load success.');
    })
    .catch(err => updateStatus("You have an error: " + err.error));

})();






