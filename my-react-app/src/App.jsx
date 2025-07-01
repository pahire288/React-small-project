import React, { useState } from 'react';

function VegShop() {
  const [vegName, setVegName] = useState('');
  const [vegQty, setVegQty] = useState('');
  const [vegPrice, setVegPrice] = useState('');
  const [vegList, setVegList] = useState([]);

  const handleAdd = () => {
    if (vegName && vegQty && vegPrice) {
      const newVeg = {
        id: Date.now(),
        name: vegName,
        quantity: parseInt(vegQty),
        price: parseFloat(vegPrice),
      };
      setVegList([...vegList, newVeg]);
      setVegName('');
      setVegQty('');
      setVegPrice('');
    }
  };

  const handleBuy = (id) => {
    const buyQty = parseInt(prompt('Enter quantity to buy (kg):'));
    setVegList(
      vegList.map((veg) =>
        veg.id === id
          ? {
              ...veg,
              quantity: veg.quantity - buyQty >= 0 ? veg.quantity - buyQty : veg.quantity,
            }
          : veg
      )
    );
  };

  const handleDelete = (id) => {
    setVegList(vegList.filter((veg) => veg.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2> Vegetable Shop</h2>

      <input
        type="text"
        placeholder="Vegetable name"
        value={vegName}
        onChange={(e) => setVegName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity (kg)"
        value={vegQty}
        onChange={(e) => setVegQty(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={vegPrice}
        onChange={(e) => setVegPrice(e.target.value)}
      />
      <button onClick={handleAdd}>Add Vegetable</button>

      <h3>Total Vegetables: {vegList.length}</h3>

      <ul>
        {vegList.map((veg) => (
          <li key={veg.id}>
            {veg.name} is available: {veg.quantity}kg | Price: ₹{veg.price}
            <button onClick={() => handleBuy(veg.id)}>Buy</button>
            <button onClick={() => handleDelete(veg.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VegShop;
