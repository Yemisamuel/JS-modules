//Create a iffy function for the item controller

const ItemCrl = (function(){
    //item controller
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;  
    }

    const data = {
        items: [
            {id:1, name:'Ofada Rice', calories:100},
            {id:2, name:'Yam&Egg', calories:200},
            {id:3, name:'Spag&Chicken', calories:100}
        ],

    currentItem: null,
    totalCalories: 0
    }
 return{
       


    addInputData: function( name, calories){
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
  
    addTotalCalories: function(){
      let total = 0;
      data.items.forEach(function(item){
          total += item.calories
      })
      data.totalCalories = total;
  
      return data.totalCalories;
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
    setCurrentItem: function(item){
     data.currentItem = item;
    },

    getCurrentItem: function(){
      return data.currentItem;
    },
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
    showTotalCalories: function(totalCalories){
   document.querySelector(UISelectors.totalCal).textContent = totalCalories; 
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
        //create new li element
      const li = document.createElement('li')
      li.className = 'collection-item';
      li.id = `${item.id}`;
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
   document.querySelector(UISelectors.addMeal).addEventListener('click', addItemSubmitF);
   document.querySelector(UISelectors.itemList).addEventListener('click', updateDynamicItem);     
 }
 
 //addItem submit
 function addItemSubmitF(e){
 const input = UICrl.addItemSubmit();

 if(input.name !== '' && input.calories !== ''){
    const newInput = ItemCrl.addInputData( input.name, input.calories)
   
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
 

 function updateDynamicItem(e){
   console.log('ready')
    if(e.target.classList.contains('edit-item')){
    //identify dynamic list id.
       const listId = e.target.parentNode.parentNode.id;
       //split item and id
      const listIdArr = listId.split('-') 
        const id = parseInt(listIdArr[1])

        ItemCrl.modifyNewItem(id);

     const currentItemToEdit =  ItemCrl.modifyNewItem(id);
     
     ItemCrl.setCurrentItem(currentItemToEdit);

     UICrl.displayCurrentItem();
    }
    e.preventDefault();
 }
  
 //Public Method
    return {      
        init: function(){
      //items from ItemCrl data structure
      const items =   ItemCrl.getDataItems();

       if(ItemCrl.getDataItems === ''){
         UICrl.hideItemList();
       }else{
        UICrl.visualizeItems(items);
       }   

      
       

    loadEventListeners();    
    },

 }

})(ItemCrl, UICrl);

App.init();