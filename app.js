//Create a iffy function for the item controller

const ItemCrl = (function(){
    //item controller contructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;  
    }

    const data = { 
        items: [
            // {id:1, name:'Ofada Rice', calories:100},
            // {id:2, name:'Yam&Egg', calories:200},
            // {id:3, name:'Spag&Chicken', calories:100}
        ],
    currentItem: null,
    totalCalories: 0
    }
   return{   
  
    addInputData: function(name, calories){
        let ID;
        if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1;
        }else{
        ID = 0;
        } 

        calories = parseInt(calories);
        
        newItem = new Item(ID, name, calories);
        data.items.push(newItem);

        return newItem;                
    }, 

    setCurrentItem: function(item){
      data.currentItem = item;
     },
 
     getCurrentItem: function(){
     return data.currentItem;
     },

   
    modifyNewItem: function(id){
     let found = null
     //loop through
      data.items.forEach(function(item){
        if(item.id === id){
          found = item
        }
      });
      return found;
    },
   
    updateMeal: function(name, calories){
    calories = parseInt(calories);

    let found = null;
    data.items.forEach(function(item){
      if(item.id === data.currentItem.id){
        item.name = name;
        item.calories = calories;

        found = item;
      }
    })
   return found; 
    },
    deleteItem: function(id){
      //get all id in items array
    const ids = data.items.map(function(item){
        return item.id
      })
     //indexing all id
     const index = ids.indexOf(id)
     data.items.splice(index, 1)
    },
  //sum up total calories
    addTotalCalories: function(){
      let total = 0;
      //loop through items
      data.items.forEach(function(item){
          total += item.calories
      })
        data.totalCalories = total;
  
      return data.totalCalories;
    },
  //clear all from data structure
  clearAll: function(){
   return data.items = []
  },  
  //get data in item controller/ data structure  
      getData: function(){
        return data;
    },
      
     getDataItems: function(){
        return data.items;
      },

}

})()

//UI controller to viualize items
const UICrl = (function(){
   const UISelectors= {
        addMeal: '.add-btn',
        updateMeal: '.update-btn',
        deleteMeal: '.delete-btn',
        clearAll: '.clear-btn',
        backBtn: '.back-btn',
        addMealInput:'#item-name',
        addCaloriesInput:'#item-calories',
        itemList:'#item-list',
        totalCal:'.total-calories',
        listItems:'#item-list li'
    }

   return{
    //hide ul at initial state
  hideItemList:function(){
  document.querySelector(UISelectors.itemList).style.display = 'none'
},


    visualizeItems: function(items){ 
        let html = '';
        items.forEach(function(item){
         html +=`
         <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>
         `
        }) 
    document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    showTotalCalories: function(computeCalories){
     document.querySelector(UISelectors.totalCal).textContent = computeCalories; 
    },
     getSelectors: function(){
        return UISelectors;
    },

    addItemSubmit: function(){
    return{
         name: document.querySelector(UISelectors.addMealInput).value,
         calories: document.querySelector(UISelectors.addCaloriesInput).value      
      }
    },

    addUpdatedList: function(item){
      document.querySelector(UISelectors.itemList).style.display = 'block' 
        //create new li element
      const li = document.createElement('li')
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
    //Html
   li.innerHTML = `
     <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
   `
   //insert in Dom
   document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li)
 },
//updating the list in the Ui 
 updateListItem: function(item){
  //get li nodes
  let listItems = document.querySelectorAll(UISelectors.listItems);
  listItems = Array.from(listItems);

listItems.forEach(function(listItem){
  const itemID = listItem.getAttribute('id')

  if(itemID === `item-${item.id}`){

    document.querySelector(`#${itemID}`).innerHTML = `
    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
    <a href="#" class="secondary-content">
      <i class="edit-item fa fa-pencil"></i>
    </a>
    `
  }
})
  },
  deleteListItem: function(id){
  const itemID = `#item-${id}`
  let item = document.querySelector(itemID)
  item.remove();
  },
//remove all items from UI
removeAllItems: function(){
  let listItems = document.querySelectorAll(UISelectors.listItems);
  listItems = Array.from(listItems);

  listItems.forEach(function(item){
    item.remove();
  })
},


 clearInput: function(){
  document.querySelector(UISelectors.addMealInput).value = '';
  document.querySelector(UISelectors.addCaloriesInput).value = '';
},

 clearInitialState: function(){
  UICrl.clearInput();
  document.querySelector(UISelectors.addMeal).style.display = 'inline'    
  document.querySelector(UISelectors.updateMeal).style.display = 'none';
  document.querySelector(UISelectors.deleteMeal).style.display = 'none';
  document.querySelector(UISelectors.backBtn).style.display = 'none';
  },
  showOptions: function (){

    document.querySelector(UISelectors.addMeal).style.display = 'none'    
    document.querySelector(UISelectors.updateMeal).style.display = 'inline';
    document.querySelector(UISelectors.deleteMeal).style.display = 'inline';
    document.querySelector(UISelectors.backBtn).style.display = 'inline';
  },
  displayCurrentItem: function(){
    UICrl.showOptions();
    document.querySelector(UISelectors.addMealInput).value = ItemCrl.getCurrentItem().name;
    document.querySelector(UISelectors.addCaloriesInput).value = ItemCrl.getCurrentItem().calories;
    
  },


 //return ending  
}
})()

//App Initialization iffy function

const App = (function(ItemCrl, UICrl){
    const UISelectors = UICrl.getSelectors();
     UICrl.clearInitialState();
  

    const loadEventListeners = function(){
      //Add meal event listener
   document.querySelector(UISelectors.addMeal).addEventListener('click', addItemSubmitFunc);

   // Add edit-item event listener
   document.querySelector(UISelectors.itemList).addEventListener('click', editItemFunc);     


   //Add update meal event listener
   document.querySelector(UISelectors.updateMeal).addEventListener('click', updateItemFunc)

   // back btn event listener
   document.querySelector(UISelectors.backBtn).addEventListener('click', UICrl.clearInitialState)
    //Delete btn event listener
   document.querySelector(UISelectors.deleteMeal).addEventListener('click', deleteItemFunc)
   //clear all btn event listener
  document.querySelector(UISelectors.clearAll).addEventListener('click', clearAllFunc)
}
 //addItem submit
 function addItemSubmitFunc(e){
 const input = UICrl.addItemSubmit();

 if(input.name !== '' && input.calories !== ''){
    const newInput = ItemCrl.addInputData(input.name, input.calories)
   
    //add dynamic item to the list of items
    UICrl.addUpdatedList(newInput);
    UICrl.clearInput();

     //compute calories
     const computeCalories = ItemCrl.addTotalCalories();
     //insert total calories in the UI controller
      UICrl.showTotalCalories(computeCalories);

      e.preventDefault();

 }
 //Disable Enter Key
    document.addEventListener('keypress', function(e){
      if(e.keyCode === 13 || e.which === 13 ){
      e.preventDefault();

      return false;
      }
      })
   
  }
 

 function editItemFunc(e){
  
    if(e.target.classList.contains('edit-item')){
    //identify dynamic list id.
       const listId = e.target.parentNode.parentNode.id;
       //split item and id
      const listIdArr = listId.split('-') 
        const id = parseInt(listIdArr[1])
        ItemCrl.addInputData();
        ItemCrl.modifyNewItem(id);

     const currentItemToEdit =  ItemCrl.modifyNewItem(id);
     
    ItemCrl.setCurrentItem(currentItemToEdit);
    
     UICrl.displayCurrentItem();
    
    }
    e.preventDefault();
 }
  
 // Update meal function
 function updateItemFunc(e){

   //compute calories
 const computeCalories = ItemCrl.addTotalCalories();
 //insert total calories in the UI controller
  UICrl.showTotalCalories(computeCalories);

  //get form value
  const input = UICrl.addItemSubmit()
//create new item data 
  const update = ItemCrl.updateMeal(input.name, input.calories) 

//display update item in the UI
 UICrl.updateListItem(update)


//clear state/input
UICrl.clearInitialState()

  e.preventDefault()
 }

 function deleteItemFunc(e){
  //compute calories
  const computeCalories = ItemCrl.addTotalCalories();
  //insert total calories in the UI controller
    UICrl.showTotalCalories(computeCalories);

   const currentItem = ItemCrl.getCurrentItem();
//delete item from data structure
   ItemCrl.deleteItem();
 //delete list from UI
   UICrl.deleteListItem(currentItem.id)

//clear state/input
  UICrl.clearInitialState()

  e.preventDefault()
 }
//clear all function
 function clearAllFunc(e){

  const computeCalories = ItemCrl.addTotalCalories();
  //insert total calories in the UI controller
   UICrl.showTotalCalories(computeCalories);

 ItemCrl.clearAll()

 UICrl.removeAllItems()

 
 //clear state/input
   UICrl.clearInitialState()

e.preventDefault()
 }
 //Public Method
    return {      
        init: function(){
      //items from ItemCrl data structure
      const items = ItemCrl.getDataItems();

       if(items.length === 0){
         UICrl.hideItemList();
       }else{
        UICrl.visualizeItems(items);
       }    
 //compute calories
 const computeCalories = ItemCrl.addTotalCalories();
 //insert total calories in the UI controller
  UICrl.showTotalCalories(computeCalories);


    loadEventListeners();    
},

 }

})(ItemCrl, UICrl);

App.init();