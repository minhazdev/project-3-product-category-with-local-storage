(function () {
    const formElm = document.querySelector('form')
    const nameInputElm = document.querySelector('.product-name')
    const priceInputElm = document.querySelector('.product-price')
    const listGroupElm = document.querySelector('.list-group')
    const filterElm = document.querySelector('#filter')
  
    //tracking item
    let products = []
  
    function showAllItemsToUI(items) {
      listGroupElm.innerHTML = ''
      items.forEach((item) => {
        const listElm = `<li class="list-group-item item-${item.id} collection-item">
      <strong>${item.name}</strong>- <span class="price">$${item.price}</span>
      <i class="fa fa-trash delete-item float-right"></i>
      </li>`
  
        listGroupElm.insertAdjacentHTML('afterbegin', listElm)
      })
    }
  
    function removeItemFromDataStore(id) {
      const productsAfterDelete = products.filter((product) => product.id !== id)
      products = productsAfterDelete
    }
  
    function removeItemFromUI(id) {
      document.querySelector(`.item-${id}`).remove()
    }
  
    function getItemID(elm) {
      const liElm = elm.parentElement
      return Number(liElm.classList[1].split('-')[1])
    }
  
    function resetInput() {
      nameInputElm.value = ''
      priceInputElm.value = ''
    }
  
    function addItemToUI(id, name, price) {
      //generate id
      const listElm = `<li class="list-group-item item-${id} collection-item">
              <strong>${name}</strong>- <span class="price">$${price}</span>
              <i class="fa fa-trash delete-item float-right"></i>
            </li>`
  
      listGroupElm.insertAdjacentHTML('afterbegin', listElm)
    }
  
    function validateInput(name, price) {
      let isError = false
      if (!name || name.length < 5) {
        isError = true
      }
      if (!price || Number(price) <= 0) {
        isError = true
      }
  
      return isError
    }
  
    function receiveInputs() {
      const nameInput = nameInputElm.value
      const priceInput = priceInputElm.value
      return {
        nameInput,
        priceInput,
      }
    }
  

    function addItemToStorage(product) {
        let products
        if (localStorage.getItem('storeProducts')) {
          products = JSON.parse(localStorage.getItem('storeProducts'))
          products.push(product)
          //update to localStorage
          localStorage.setItem('storeProducts', JSON.stringify(products))
        } else {
          products = []
          products.push(product)
          //update to localStorage
          localStorage.setItem('storeProducts', JSON.stringify(products))
        }
      }
      function updateAfterRemove(products,id) {
       return products.filter((product) => product.id !== id)
      }

      function removeItemFromDataStore(id) {
       // const productsAfterDelete = products.filter((product) => product.id !== id)
        const productsAfterDelete = updateAfterRemove(products, id)
        products = productsAfterDelete
      }
     
    function removeProductFromStorage(id) {
        //pick from localStorage
        const products = JSON.parse(localStorage.getItem('storeProducts'))
        //filter
        const productsAfterRemove = updateAfterRemove(products, id)
        //save data to localStorage
        localStorage.setItem('storeProducts', JSON.stringify(productsAfterRemove))
      }

      function init() {
      formElm.addEventListener('submit', (evt) => {
        //prevent default action(browser reloading)
        evt.preventDefault()
        //receiving input
        const { nameInput, priceInput } = receiveInputs()
  
        //validate input
        const isError = validateInput(nameInput, priceInput)
        if (isError) {
          alert('please provide valid input')
          return
        }
  
        //add item to data store
        //generate item
        const id = products.length
        const product = {
            id: id,
            name: nameInput,
            price: priceInput,
        }

        //add item to data store
      products.push(product)
      //add item to the UI
      addItemToUI(id, nameInput, priceInput)

      //add Item to localStorage
      addItemToStorage(product)
      //reset the input
      resetInput()
    })
    
  
      filterElm.addEventListener('keyup', (evt) => {
        //filter depend on this value
        const filterValue = evt.target.value
        const filteredArr = products.filter((product) =>
          product.name.includes(filterValue)
        )
        showAllItemsToUI(filteredArr)
        //show Item to UI
      })
  
      //deleting item (event delegation)
      listGroupElm.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('delete-item')) {
          const id = getItemID(evt.target)
          //delete item from UI
          removeItemFromUI(id)
          //remove item from data store
          removeItemFromDataStore(id)
          //delete item from storage
          removeProductFromStorage(id)

        }
      })
      document.addEventListener('DOMContentLoaded', e => {
          //checking item into localStorage
          if(localStorage.getItem('storeProducts')) {
        const products = JSON.parse(localStorage.getItem('storeProducts'))
        showAllItemsToUI(products)
        //console.log(products)
          }
      })

    }

    init()
  })()
























// const formElm = document.querySelector("form");
// const nameInputElm = document.querySelector(".product-name");
// const priceInputElm = document.querySelector(".product-price");
// const listGroupElm = document.querySelector(".list-group");
// const filterElm = document.querySelector("#filter");

// //traking item
// let products = getDataFromLocalStorage();

// //data state
// function getDataFromLocalStorage() {
//   let items = "";
//   if (localStorage.getItem("productItems") === null) {
//     items = [];
//   } else {
//     items = JSON.parse(localStorage.getItem("productItems"));
//   }
//   return items;
// }
// function saveDataToLocalStorage(item) {
//   let items = "";
//   if (localStorage.getItem("productItems") === null) {
//     items = [];
//     items.push(item);
//     localStorage.setItem("productItems", JSON.stringify(items));
//   } else {
//     items = JSON.parse(localStorage.getItem("productItems"));
//     items.push(item);
//     localStorage.setItem("productItems", JSON.stringify(items));
//   }
// }

// function deleteItemsFromLocalStorage(id) {
//   const items = JSON.parse(localStorage.getItem("productItems"));
//   let productsAfterDelet = items.filter((product) => product.id !== id);
//   localStorage.setItem("productItems", JSON.stringify(productsAfterDelet));
//   if (productsAfterDelet.length === 0) location.reload();
//   //   let items = "";
//   // if (localStorage.getItem("productItems") === null) {
//   //   items = [];
//   // }
//   // const productsAfterDelet = products.filter((product) => product.id !== id);
//   // products = productsAfterDelet;
// }
// formElm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const { nameInput, priceInput } = receiveInputs();

//   //validate input
//   const isError = validateInput(nameInput, priceInput);
//   if (!isError) {
//     //add item to data store
//     //generate id
//     let id = products.length;
//     const data = {
//       id,
//       nameInput,
//       priceInput,
//     }; //
//     products.push(data);
//     // database
//     saveDataToLocalStorage(data);
//     //add item to UI
//     addItemToUi(id, nameInput, priceInput);

//     //reseet input
//     resetInput();
//   }
// });
// filterElm.addEventListener("keyup", (evt) => {
//   const filterValue = evt.target.value;
//   const filteredArr = products.filter((product) => 
//   product.name.includes(filterValue)
//   );
//   showAllItemToUi(filteredArr);
//   //   console.log(result);
// });

// function showAllItemToUi(items) {
//   listGroupElm.innerHTML = "";
//   items.forEach((item) => {
//     const listElm = `<li class="list-group-item item-${item.id} collection-item">
//             <strong>${item.name}</strong>- <span class="price">$${item.price}</span>
//             <i class="fa fa-trash delete-item float-right"></i>
//           </li>`;
//     listGroupElm.insertAdjacentHTML("afterbegin", listElm);
//   });
// }
// //delet item(event delegation)
// listGroupElm.addEventListener("click", (evt) => {
//   if (evt.target.classList.contains("delete-item")) {
//     const id = getItemId(evt.target);
//     //delete item from ui
//     removeItemFromUi(id);

//     //delete item from data store
//     removeItemFromDataStore(id);
//   }
// });

// //remove from ui function
// function removeItemFromUi(id) {
//   document.querySelector(`.item-${id}`).remove();
//   deleteItemsFromLocalStorage(id);
// }

// //remove from database function
// function removeItemFromDataStore(id) {
//   const productsAfterDelet = products.filter((product) => product.id !== id);
//   products = productsAfterDelet;
// }
// //delete function
// function getItemId(elm) {
//   const liElm = elm.parentElement;
//   return Number(liElm.classList[1].split("-")[1]);
// }
// //reset input function
// function resetInput() {
//   nameInputElm.value = "";
//   priceInputElm.value = "";
// }

// //add input in UI function
// function addItemToUi(id, name, price) {
//   const listElm = `<li class="list-group-item item-${id} collection-item">
//             <strong>${name}</strong>- <span class="price">$${price}</span>
//             <i class="fa fa-trash delete-item float-right"></i>
//           </li>`;
//   listGroupElm.insertAdjacentHTML("afterbegin", listElm);
// }

// //validation function
// function validateInput(name, price) {
//   let isError = false;
//   if (!name || name.length < 4) {
//     isError = true;
//   }
//   if (!price || Number(price) <= 0) {
//     isError = true;
//   }
//   return isError;
// }

// function receiveInputs() {
//   const nameInput = nameInputElm.value;
//   const priceInput = priceInputElm.value;
//   return {
//     nameInput,
//     priceInput,
//   };
// }
