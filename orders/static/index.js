class CategorieInOrder{

    constructor(id, name, subtype){
        this.id = id;
        this.name = name;
        this.subtype=subtype;
        this.summ = 0;
    }

    get getAllInDict(){
        return {id: this.id, name: this.name, summ: this.summ};
    }

    set addToSumm(addValue){
        this.summ+=addValue;
        console.log(this.summ);
    }

    get getSumm(){return this.summ};
};
//
// class CategoriesInOrder{
//     constructor() {
//         this.list=[];
//     };
//
//     isInList(idItem){
//         let rez=false;
//         this.list.forEach(){};
//         // for (item in this.list){
//         //     if (item == idItem){
//                 // rez=true;
//             // };
//         // };
//         return rez;
//     }
//
//     set addInList(newItem){
//         if (this.isInList(newItem))
//             this.list.push(newItem);
//         console.log(this.list)
//     }
//
//
//
// };
//
// class ItemInOrder{
//     constructor(iddish, name, idctg, commpl, count, price, summ){
//         //this.
//     }
// };

let ctgrsInOrder=[];
let ctgDishAll, dishAll, ctgPriceAll, priceAll;

function createNewCategorieElement (dishId){
    ctgID=dishAll.forEach(function (item) {
        if (item.id==parseInt(dishId)){
            console.log(item.categorie_id)
        }
    })

    // ctgToList=new CategorieInOrder()
}

function createNewItemElement(SelectDishName){
    const newItemOrders=document.createElement('li');
    // newItemOrders.setAttribute('class','groupItemOrders');
    newItemOrders.innerText=SelectDishName;
    document.getElementById('order_items').appendChild(newItemOrders)
}

    document.addEventListener('DOMContentLoaded', ()=>{
        // Open new request to get new posts.
        const request = new XMLHttpRequest();
        request.open('GET', '/data');
        request.send();
        request.onload = () => {
            const dataJSON = JSON.parse(request.responseText);
            // localStorage.setItem('categories_dish', JSON.stringify(dataJSON['categories_dish_list']));
            ctgDishAll=dataJSON['categories_dish_list'];
            // localStorage.setItem('dishes', JSON.stringify(dataJSON['dishes_list']));
            dishAll=dataJSON['dishes_list'];
            // localStorage.setItem('categories_price', JSON.stringify(dataJSON['categories_price_list']));
            ctgPriceAll=dataJSON['categories_price_list'];
            // localStorage.setItem('prices', JSON.stringify(dataJSON['prices_list']));
            priceAll=dataJSON['prices_list'];
        };

    document.querySelector('#dishes_list').onclick = (e)=>{
        if (e.target.className=='categorie_name') {
            let v = document.querySelector("."+e.target.id);
            v.hidden= !v.hidden;
            // document.querySelector("."+e.target.innerText+"_li").visibility=(v=='hidden')?'visible':'hidden';
        };
        if (e.target.className=="dish"){
          // alert(e.target.innerText);
          //   createNewCategorieElement(e.target.id);
            createNewItemElement(e.target.innerText);
        };
    };
})