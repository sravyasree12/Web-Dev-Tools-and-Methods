const express = require('express');
const app = express();
const PORT = 3000;

const inventoryStorage = require('./inventoryStorage');

app.use(express.static('./public'));

const inventory  = inventoryStorage.inventory;

app.get('/inventory', (req, res) => {
    res.json(inventory);
});

app.get('/inventory/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    if(inventory[itemId]) {
        res.json(inventory[itemId]);
    }  else {
        res.status(404).json({error: `unknown itemId: ${itemId}`});
    }
 });

app.put('/inventory/:itemId', express.json(), (req, res) => {
    const itemId = req.params.itemId;
    const item = req.body.itemId;
    if (!itemId) {
        res.status(400).json({error: `itemId missing`});
    } else if (!item) {
        res.status(400).json({error: `item content missing`});
    } else {
        inventory[itemId] = item;
        res.json(inventory);
    }
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));