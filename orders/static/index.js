let ctgDishAll, dishAll, ctgPriceAll, priceAll={};
let ctgInOrder={};


function createNewItem (dishId){
    let ctgId=dishAll.get(dishId).categorie_id;
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
    // divNewItem.setAttribute('name',dishId+<cuonter>); // !!!!!!

   //create elements of new item in order
    const divName= document.createElement('input');{
    divName.setAttribute('type','text');
    divName.setAttribute('class', 'itemLine name');
    divName.setAttribute('value',dishAll.get(dishId).name);
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
    if (dishAll.get(dishId).complement){
        const divCompl=document.createElement('input');
        divCompl.setAttribute('type', 'button');
        divCompl.setAttribute('class', 'itemLine btncompl');
        divCompl.setAttribute('value','>>');
        divNewItem.appendChild(divCompl);
    }
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
            //add new funct. 'get' for 'dishAll'
            dishAll.get=(idDish, field='')=>{
                let i=0;
                while (dishAll[i++].id!=parseInt(idDish)){}
                if (field!='')
                    return (dishAll[i-1][field])?dishAll[i-1][field]:'No fieldname:'+field;
                return dishAll[i-1];
            };
        };

        //new function for priceAll --- get and adding price for selection dish
        priceAll.addPriceJSON=(dishId)=>{
            if (priceAll[dishAll.toString()]){
                console.log(priceAll[dishId.toString()]);
                return false;
            }
            request.open('GET', '/'+dishId);
            request.send();
            request.onload=()=>{
                const dataJSON=JSON.parse(request.responseText);//{'dish_id':[{...}]}
                priceAll[dishId]=dataJSON[dishId]
            }
            return true;
            };

        //event listener for order
        document.querySelector('.order').onclick=(e)=>{
            obj=e.target;
            if (obj.type=='button') {
                switch (obj.classList[1]) {
                    case 'btntype':
                        obj.value=(obj.value=='Small')?'Large':'Small';
                        break;
                    case 'btncompl':
                        //stvoryty div dla pizza-topping / subs- on any subs, subs-steak-addons
                        //pryvazaty do div
                        //yaksco zapovn masyv dodatkiv dla cogo bluda
                        obj.value=(obj.value=='>>')?'<<':'>>';
                        console.log('add topping/addons');
                        break;
                    case 'btncopy':
                        const groupItem=obj.parentElement.parentElement;
                        const cloneItem=obj.parentElement.cloneNode(true);
                        groupItem.appendChild(cloneItem);
                        break;
                    case 'btndel':
                        obj.parentElement.remove();
                        break
                }
            }
        };

        //zgort rozg grupu menyu
        document.querySelector('#dishes_list').onclick = (e)=>{
        //click group name
        if (e.target.className=='ctgr_name') {
            const v = document.querySelector("ul > ."+e.target.id);
            v.hidden= !v.hidden;
        }
        //select dish
        if (e.target.className=="dish"){

            createNewItem(e.target.id);
            priceAll.addPriceJSON(e.target.id);
            e.target.classList.add('select');
        }

        };

        //zgort rozg zamovlennya
        document.querySelector('#title_order').onclick=()=>{
            document.querySelector('.order').hidden=!document.querySelector('.order').hidden;
        };
});