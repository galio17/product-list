function listProducts (productsData) {
    const productList = document.querySelector('ul');

    productList.innerHTML = '';    

    productsData.forEach((product) => {
        const newProduct = createProductCard(product);
        productList.append(newProduct);
    });
}

function createProductCard (product) {
    const productCard = document.createElement('li');
    const productImage = createProductImage(product);
    const productTitle = createProductInfo('h3', product.nome);
    const productPrice = createProductInfo('p', `R$ ${product.preco.toFixed(2)}`);
    const productSection = createProductInfo('span', `${product.secao}`);

    productCard.append(productImage, productTitle, productPrice, productSection);

    return productCard;
}

function createProductImage (product) {
    const productImage = document.createElement('img');

    productImage.src = product.img;
    productImage.alt = `Imagem de ${product.nome}`;

    return productImage;
}

function createProductInfo (tag, innerText) {
    const productInfo = document.createElement(tag);

    productInfo.innerText = innerText;

    return productInfo;
}

function runOnClick (event) {
    if (verifyClass('estiloGeralBotoes')) {
        filterProducts();
        calculatePrice();
    }
}

function verifyClass(className) {
    return event.target.classList.contains(className);
}

function filterProducts () {
    if(verifyClass('estiloGeralBotoes--botaoBuscaPorNome')){
        filterBySearch();
    } else {
        filterBySection();
    }
}

function filterBySearch () {
    const searchInput = document.querySelector('.campoBuscaPorNome');

    if(searchInput.value) {
        const regexCapture = new RegExp(searchInput.value, 'i');
        const filteredProducts = produtos.filter((product) => regexCapture.test(product.nome));
        
        searchInput.value = '';

        listProducts(filteredProducts);
    } else listProducts(produtos);
}

listProducts(produtos);
addEventListener('click', runOnClick);