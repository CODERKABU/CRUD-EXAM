document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const searchTitle = document.getElementById('search-title');
    const sortPrice = document.getElementById('sort-price');
    const filterCategory = document.getElementById('filter-category');

    let products = JSON.parse(localStorage.getItem('products')) || [];

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = document.getElementById('product-name').value;
        const productPrice = document.getElementById('product-price').value;
        const productCategory = document.getElementById('product-category').value;

        const product = {
            id: Date.now(),
            name: productName,
            price: parseFloat(productPrice),
            category: productCategory
        };

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts(products);
        productForm.reset();
    });

    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const id = e.target.parentElement.parentElement.dataset.id;
            products = products.filter(product => product.id != id);
            localStorage.setItem('products', JSON.stringify(products));
            displayProducts(products);
        } else if (e.target.classList.contains('edit')) {
            const id = e.target.parentElement.parentElement.dataset.id;
            const product = products.find(product => product.id == id);
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-category').value = product.category;
            products = products.filter(product => product.id != id);
            localStorage.setItem('products', JSON.stringify(products));
            displayProducts(products);
        }
    });

    searchTitle.addEventListener('input', () => {
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTitle.value.toLowerCase())
        );
        displayProducts(filteredProducts);
    });

    sortPrice.addEventListener('change', () => {
        let sortedProducts = [...products];
        if (sortPrice.value === 'low-to-high') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortPrice.value === 'high-to-low') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        displayProducts(sortedProducts);
    });

    filterCategory.addEventListener('input', () => {
        const filteredProducts = products.filter(product => 
            product.category.toLowerCase().includes(filterCategory.value.toLowerCase())
        );
        displayProducts(filteredProducts);
    });

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.dataset.id = product.id;
            li.innerHTML = `
                ${product.name} - $${product.price} (${product.category})
                <div>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;
            productList.appendChild(li);
        });
    }

    displayProducts(products);
});
