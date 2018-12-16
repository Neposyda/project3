let ctgDishAll, dishAll, ctgPriceAll, priceAll={};
// let ctgInOrder={};


function createNewItem (dishId){
    let ctgId=dishAll.get(dishId).categorie_id;
    let ctgName=ctgDishAll.get(ctgId).name;
    let divCtgr;
    //verify or create new group for selicted dishes
    if (!document.querySelector('.order > .ctgr'+ctgId)){
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
    if (ctgDishAll.getListForSubtype(dishAll.get(dishId).categorie_id, true)){
        const divCompl=document.createElement('input');
        divCompl.setAttribute('type', 'button');
        divCompl.setAttribute('class', 'itemLine btncompl');
        divCompl.setAttribute('value','>>');
        divCompl.setAttribute('name',dishId.toString());
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

function createItemCompl (complItem){

    const divItemCompl=document.createElement('div');
    divItemCompl.setAttribute('class', 'complItm');
    divItemCompl.setAttribute('data', complItem.id.toString());
    // divItemCompl.maxWidth=800;
    // divItemCompl.scrollIntoView();

    const inpSel=document.createElement('input');
    inpSel.setAttribute('type', 'checkbox');
    inpSel.setAttribute('class', 'itemInline');
    inpSel.setAttribute('value','false');

    const inpName=document.createElement('input');
    inpName.setAttribute('type','text');
    inpName.setAttribute('class','itemInline');
    inpName.setAttribute('value', complItem.name);
    inpName.setAttribute('disabled','off');

    const inpCount=document.createElement('input');
    inpCount.setAttribute('type','number');
    inpCount.setAttribute('class', 'itemLine count');
    inpCount.setAttribute('value','0');
    inpCount.setAttribute('step','1');
    inpCount.setAttribute('min','0');
    inpCount.setAttribute('max-width', '100');

    const inpPrice=document.createElement('input');
    inpPrice.setAttribute('type','number');
    inpPrice.setAttribute('class', 'itemLine price');
    // inpCount.setAttribute('value',priceAll[complItem.id].small);
    inpPrice.setAttribute('step','0.01');
    inpPrice.setAttribute('min','0.00');
    inpPrice.setAttribute('disabled','off');
    inpPrice.setAttribute('max-width','100');

    divItemCompl.appendChild(inpSel);
    divItemCompl.appendChild(inpName);
    divItemCompl.appendChild(inpCount);
    divItemCompl.appendChild(inpPrice);

    return divItemCompl;
}

function createCompl (dishId){
    let ctgDishId=dishAll.get(dishId).categorie_id;
    let ctgComplList=ctgDishAll.getListForSubtype(ctgDishId);
    let complList=[];

    for (let i=0; i<ctgComplList.length; i++){
        let selDish=dishAll.get(dishId);
        if (ctgDishId===2 && !selDish.name.includes('Steak')){
            i++;
        }
        complList = complList.concat(dishAll.getListForCategorie(ctgComplList[i].id));
    }

    if (complList===[]) return false;
    const divCompl=document.createElement('div');
    divCompl.setAttribute('class','complGrp');
    for (let i=0; i< complList.length; i++) {
        const divItemCompl=createItemCompl(complList[i]);
        divCompl.appendChild(divItemCompl);//!!!
    }
    return divCompl;
}

document.addEventListener('DOMContentLoaded', ()=>{
        // Open new request to get new posts.
        const request = new XMLHttpRequest();
        request.open('GET', '/data');
        request.send();
        request.onload = () => {
            const dataJSON = JSON.parse(request.responseText);
            ctgDishAll=dataJSON['categories_dish_list'];
            //add function 'get' for ctgDishAll
            ctgDishAll.get=(idCtg)=>{
                let i=0;
                while (ctgDishAll[i++].id !== parseInt(idCtg)){}
                return ctgDishAll[i-1];
            };
            //add funct 'getListForSubtype
            ctgDishAll.getListForSubtype=(idCtg, noList=false)=>{
                if (noList) {
                    let rez=false;
                    ctgDishAll.forEach(function (item) {
                        if (item.subtype===idCtg){
                            rez= true;
                        }
                    });
                    return rez;
                }
                let myList=[];
                ctgDishAll.forEach(function(item){
                    if (item.subtype===idCtg)
                        myList[myList.length]=item;
                });
                return myList;
            };

            dishAll=dataJSON['dishes_list'];
            //add new funct. 'get' for 'dishAll'
            dishAll.get=(idDish)=>{
                let i=0;
                while (dishAll[i++].id!==parseInt(idDish)){}
                return dishAll[i-1];
            };
            //add funct 'getListForCategorie'
            dishAll.getListForCategorie=(ctgId)=>{
                myList=[];
                dishAll.forEach(function(item){
                    if(item.categorie_id===ctgId)
                        myList[myList.length]=item;
                });
                return myList;
            };
            request.abort();//????
        };

        //new function for priceAll --- get and adding price for selection dish
        priceAll.addPriceJSON=(dishId)=>{
            if (priceAll[dishId.toString()]){
                console.log(priceAll[dishId.toString()]);
                return true;
            }
            const request = new XMLHttpRequest();
            request.open('GET', '/'+dishId);
            request.send();
            request.onload=()=>{
                const dataJSON=JSON.parse(request.responseText);//{'dish_id':[{...}]}
                priceAll[dishId.toString()]=dataJSON[dishId.toString()];
                request.abort();//???
            };
            return true;
            };

        //event listener for orders button
        document.querySelector('.order').onclick=(e)=>{
            let obj=e.target;
            if (obj.type==='button') {
                switch (obj.classList[1]) {
                    case 'btntype':
                        obj.value=(obj.value==='Small')?'Large':'Small';
                        break;
                    case 'btncompl':
                        let objPar=obj.parentNode;
                        if (obj.value==='>>'){
                            obj.value='<<';
                            objPar.appendChild(createCompl(obj.name));
                        }else{
                            obj.value='>>';
                            objPar.removeChild(objPar.lastChild);
                        }
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
        if (e.target.className==='ctgr_name') {
            const v = document.querySelector("ul > ."+e.target.id);
            v.hidden= !v.hidden;
        }
        //select dish
        if (e.target.className==="dish"){
            createNewItem(e.target.id);
            priceAll.addPriceJSON(e.target.id);
            e.target.classList.add('select');
            // complements/toppings/addons add price
            let itemCtgId=dishAll.get(e.target.id).categorie_id;
            if (!ctgDishAll.getListForSubtype(itemCtgId, true)){
                return 0;
            }
            let ctgCompl=ctgDishAll.getListForSubtype(itemCtgId);
            dishAll.forEach(function (itemDish) {//!!!!!
                ctgCompl.forEach(function (itemCtg) {
                    if(itemDish.categorie_id===itemCtg.id){
                        priceAll.addPriceJSON(itemDish.id);
                    }
                });
            });
        }
        };

        //zgort rozg zamovlennya
        document.querySelector('#title_order').onclick=()=>{
            document.querySelector('.order').hidden=!document.querySelector('.order').hidden;
        };
});