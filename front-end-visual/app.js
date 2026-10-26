// A small product list to use as a starting point. No framework required.
const products = [
  { name: 'Noise-Cancelling Headphones', category: 'Audio', price: 299, description: 'Immersive sound with industry-leading noise cancellation.', image: './assets/headphones.jpg' },
  { name: 'Ultralight Laptop', category: 'Computers', price: 1299, description: 'Powerful performance in a lightweight design.', image: './assets/laptop.jpg' },
  { name: 'Mirrorless Camera', category: 'Photography', price: 899, description: 'Capture stunning photos and videos anywhere.', image: './assets/camera.jpg' },
  { name: 'Wireless Earbuds', category: 'Audio', price: 199, description: 'Crystal clear audio with all-day battery life.', image: './assets/earbuds.jpg' },
  { name: 'Mechanical Keyboard', category: 'Accessories', price: 149, description: 'Premium build quality for a better typing experience.', image: './assets/keyboard.jpg' },
  { name: '4K Curved Monitor', category: 'Computers', price: 499, description: 'Stunning visuals for work and play.', image: './assets/monitor.jpg' },
];

const list = document.querySelector('#products');

for (const product of products) {
  const item = document.createElement('li');
  item.innerHTML = `
    <img src="${product.image}" alt="${product.name}" width="160">
    <h2>${product.name}</h2>
    <p>${product.category} | $${product.price}</p>
    <p>${product.description}</p>
  `;
  list.appendChild(item);
}
