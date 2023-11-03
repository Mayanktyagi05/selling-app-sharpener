document.addEventListener("DOMContentLoaded", function () {
    const apiEndpoint = 'https://crudcrud.com/api/4ef5270b1169430fb7244daa16fdcac2'; 
    const totalCostElement = document.getElementById('totalCost');

    function fetchDataAndDisplay() {
        axios.get(apiEndpoint)
            .then((response) => {
                const data = response.data;

                let totalCost = 0;

                const listOfItems = document.getElementById('listOfItems');
                listOfItems.innerHTML = ''; 

                data.forEach(item => {
                    showUserOnScreen(item);
                    totalCost += parseFloat(item.SellingPrice);
                });

                
                totalCostElement.textContent = totalCost.toFixed(2);
            })
            .catch((error) => {
                console.error('Error fetching data from the API: ' + error);
            });
    }

    fetchDataAndDisplay();

    
    document.getElementById('productForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const sellingPrice = event.target.sellingPrice.value;
        const productName = event.target.productName.value;

        const productData = {
            SellingPrice: sellingPrice,
            ProductName: productName
        };

        axios.post(apiEndpoint, productData)
            .then((response) => {
                fetchDataAndDisplay();
            })
            .catch((error) => {
                console.error('Error saving data to the API: ' + error);
            });

        
        event.target.sellingPrice.value = "";
        event.target.productName.value = "";
    });

    function showUserOnScreen(productData) {
        const listOfItems = document.getElementById('listOfItems');
        const listItem = document.createElement('li');
        listItem.innerHTML = `${productData.SellingPrice} - ${productData.ProductName}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
        
            axios.delete(`${apiEndpoint}/${productData._id}`)
                .then((response) => {
                    fetchDataAndDisplay();
                })
                .catch((error) => {
                    console.error('Error deleting data from the API: ' + error);
                });
        });

        listItem.appendChild(deleteButton);
        listOfItems.appendChild(listItem);
    }
});
