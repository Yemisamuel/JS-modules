//Create a iffy function for the item controller

const ItemController = (function(){
    //item controller
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;  
    }

    const data = {
        items: [
            // {id:1, name:'Ofada Rice', calories:100},
            // {id:2, name:'Yam&Egg', calories:100},
            // {id:3, name:'Spag&Chicken', calories:100}
        ],

    currentItem: null,
    totalCalories: 0
    }
 return{
       
    addInputData: function(id,name, calories){
        let ID;
        if(data.items.length > 0){
        ID = data.items[data.items.length - 1].id + 1
        }else{
        ID = 0;
        } 

        calories = parseInt(calories);
        
        newItem = new Item(id, name, calories);
        data.items.push(newItem);
        return newItem;                
    }, 

      getData: function(){
       return data;
    },


        getDataItems: function(){
            return data.items;
        }
}

})()

//UI controller to viualize items
const UICrl = (function(){
   const UISelectors= {
        addMeal: '.add-btn',
        addMealInput:'#item-name',
        addCaloriesInput:'#item-calories',
        itemList:'#item-list'
    }

   return{

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
 }
   
   }
})()

//App Initialization iffy function

const App = (function(ItemController, UICrl){
    const UISelectors = UICrl.getSelectors();
  
    const loadEventListeners = function(){
   document.querySelector(UISelectors.addMeal).addEventListener('click', addItemSubmit);     
 }
 
 //addItem submit
 function addItemSubmit(e){
 const input = UICrl.addItemSubmit();

 if(input.name !== '' && input.calories !== ''){
    const newInput = ItemController.addInputData(input.id, input.name, input.calories)
    UICrl.addUpdatedList(newInput);
    UICrl.clearInput();

 }
    e.preventDefault();
 }
  
 //Public Method
    return {      
        init: function(){
            const items =   ItemController.getDataItems();
        UICrl.visualizeItems(items);

    loadEventListeners();    
    },

 }

})(ItemController, UICrl);

App.init();