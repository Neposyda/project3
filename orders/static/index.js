let ctgDishAll, dishAll, ctgPriceAll, priceAll;
let ctgInOrder={};


function createNewItem (dishId){
    let ctgId=dishAll.getIdCategorie(dishId);
    let ctgName=ctgDishAll.getName(ctgId);
    let divCtgr;
    if (!document.querySelector('.order > .ctgr'+ctgId)){
        // ctgInOrder.push(toString(ctgId))
        const divOrder = document.querySelector('.order');
        const h4Ctg=document.createElement('h4');
        h4Ctg.innerText=ctgName + ':    total for group= ' +'$<summ.group>';

        divCtgr=document.createElement('div');
        divCtgr.setAttribute('class', 'ctgr'+ctgId);

        divOrder.appendChild(h4Ctg);
        divOrder.appendChild(divCtgr);
    } else{
        divCtgr=document.querySelector('.order > .ctgr'+ctgId);
    }
    //create elements of new item in order
    const divNewItem=document.createElement('div');
    divNewItem.setAttribute('class','item');
    // divNewItem.setAttribute('id','item'+dishId); // !!!!!!

   //create elements of new item in order
    const divName= document.createElement('input');{
    divName.setAttribute('type','text');
    divName.setAttribute('class', 'itemLine name');
    divName.setAttribute('value',dishAll.getName(dishId));
    divName.setAttribute('disabled','off');}

    const divType=document.createElement('input');{
    divType.setAttribute('type','button');
    divType.setAttribute('class', 'itemLine btntype');
    divType.setAttribute('value','Small');}

    const divCount=document.createElement('input');{
    divCount.setAttribute('type','number');
    divCount.setAttribute('class','itemLine count');
    divCount.setAttribute('value','0');
    divCount.setAttribute('min','0');
    divCount.setAttribute('max','10');
    divCount.setAttribute('step','1');}

    const divPrice=document.createElement('input');{
    divPrice.setAttribute('type','text');
    divPrice.setAttribute('class','itemLine price');
    divPrice.setAttribute('value', '$ <price>');
    divPrice.setAttribute('disabled','off');}

    const divSumm=document.createElement('input');{
    divSumm.setAttribute('type','text');
    divSumm.setAttribute('class','itemLine summ');
    divSumm.setAttribute('value', '$ 0.00>');
    divSumm.setAttribute('disabled','off');}

    const divCopy=document.createElement('input');{
    divCopy.setAttribute('type','button');
    divCopy.setAttribute('class','itemLine btncopy');
    divCopy.setAttribute('value','+');}

    const divDel=document.createElement('input');{
    divDel.setAttribute('type','button');
    divDel.setAttribute('class','itemLine btndel');
    divDel.setAttribute('value','-');}


    divNewItem.appendChild(divName);
    divNewItem.appendChild(divType);
    divNewItem.appendChild(divCount);
    divNewItem.appendChild(divPrice);
    divNewItem.appendChild(divSumm);
    divNewItem.appendChild(divCopy);
    divNewItem.appendChild(divDel);

    divCtgr.appendChild(divNewItem);
}

document.addEventListener('DOMContentLoaded', ()=>{
        // Open new request to get new posts.
        const request = new XMLHttpRequest();
        request.open('GET', '/data');
        request.send();
        request.onload = () => {
            const dataJSON = JSON.parse(request.responseText);
            ctgDishAll=dataJSON['categories_dish_list'];
            ctgDishAll.getName=function(idCtg){
                let i=0;
                while (ctgDishAll[i++].id != parseInt(idCtg)){}
                return ctgDishAll[i-1].name ;
            };

            dishAll=dataJSON['dishes_list'];
            dishAll.getName=(idDish)=>{
                let i=0;
                while (dishAll[i++].id!=parseInt(idDish)){}
                return dishAll[i-1].name;
            };
            dishAll.getIdCategorie=(idDish)=>{
                let i=0;
                while(dishAll[i++].id!=parseInt(idDish)){};
                return dishAll[i-1].categorie_id;
            };

            // ctgPriceAll=dataJSON['categories_price_list'];
            // priceAll=dataJSON['prices_list'];
            // priceAll.getPrice=(dishId, priceCtg=0,  type='small')=>{
            //     let i=0;
            //     while (priceAll[i].id!=parseInt(dishId) && priceAll[i].categorie_id==parseInt(priceCtg)){++i;}
            //     console.log(priceAll[i-1][type]);
            // }
        };

        //event listener for order
        document.querySelector('.order').onclick=(e)=>{
            obj=e.target;
            if (obj.type=='button') {
                switch (obj.classList[1]) {
                    case 'btntype':
                        obj.value=(obj.value=='Small')?'Large':'Small';
                        break;
                    case 'btncopy':
                        const groupItem=obj.parentElement.parentElement;
                        const cloneItem=obj.parentElement.cloneNode(true);
                        // cloneItem.childNodes
                        groupItem.appendChild(cloneItem);
                        break;
                    case 'btndel':
                        obj.parentElement.remove();
                        break;
                }
            }
        };

        document.querySelector('#dishes_list').onclick = (e)=>{
        //click group name
        if (e.target.className=='ctgr_name') {
            const v = document.querySelector("ul > ."+e.target.id);
            v.hidden= !v.hidden;
        }
        //select dish
        if (e.target.className=="dish"){
            createNewItem(e.target.id);
            e.target.classList.add('select')
        }
        };

        document.querySelector('#title_order').onclick=()=>{
            document.querySelector('.order').hidden=!document.querySelector('.order').hidden;
        };
});