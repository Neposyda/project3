let ctgDishAll, dishAll, ctgPriceAll, priceAll={};
let orderItems={'countDish':0, 'maxNumber':0 };


function createNewItem (dishId){
    //create elements of new item in order
    const divNewItem=document.createElement('div');
    divNewItem.setAttribute('class','item');
    divNewItem.setAttribute('data-dishid',dishId); // !!! data

   //create elements of new item in order
    const divName= document.createElement('input');{
    divName.setAttribute('type','text');
    divName.setAttribute('class', 'itemLine name');
    divName.setAttribute('value',dishAll.get(dishId).name);
    divName.setAttribute('disabled','off');
    }

    const divType=document.createElement('input');{
    divType.setAttribute('type','button');
    divType.setAttribute('class', 'itemLine btntype');
    divType.setAttribute('value','SMALL');
    divType.setAttribute('data-type','small'); // !!! data
    }

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
    divPrice.setAttribute('value', parseInt(document.getElementById(dishId).dataset.small).toFixed(2));
    divPrice.setAttribute('disabled','off');}

    const divSumm=document.createElement('input');{
    divSumm.setAttribute('type','text');
    divSumm.setAttribute('class','itemLine summ');
    divSumm.setAttribute('value', '0.00');
    divSumm.setAttribute('disabled','off');}

    const divCopy=document.createElement('input');{
    divCopy.setAttribute('type','button');
    divCopy.setAttribute('class','itemLine btncopy');
    divCopy.setAttribute('value','+');}

    const divDel=document.createElement('input');{
    divDel.setAttribute('type','button');
    divDel.setAttribute('class','itemLine btndel');
    divDel.setAttribute('value','X');}

    divNewItem.appendChild(divName);
    if (ctgDishAll.getListForSubtype(dishAll.get(dishId).categorie_id, true)){
        const divCompl=document.createElement('input');
        divCompl.setAttribute('type', 'button');
        divCompl.setAttribute('class', 'itemLine btncompl');
        divCompl.setAttribute('value','>>');
        divCompl.setAttribute('data-count', '0');
        divCompl.setAttribute('data-open', '0');
        // divCompl.setAttribute('-webkit-transform','rotate(90deg)');
        divCompl.setAttribute('name',dishId.toString());
        divNewItem.appendChild(divCompl);
    }
    divNewItem.appendChild(divType);
    divNewItem.appendChild(divCount);
    divNewItem.appendChild(divPrice);
    divNewItem.appendChild(divSumm);
    divNewItem.appendChild(divCopy);
    divNewItem.appendChild(divDel);

    return divNewItem;
}


function  createGroupCtgr(dishId) {
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
        divCtgr.setAttribute('data-ctgrid',ctgId.toString());//!!!! data
        divCtgr.setAttribute('data-count','0'); //!!!data
        // divOrder.appendChild(h4Ctg);
        divCtgr.appendChild(h4Ctg); //??????????????????
        divOrder.appendChild(divCtgr);
    } else{
        divCtgr=document.querySelector('.order > .ctgr'+ctgId);
    }
    return divCtgr;
}

function createItemCompl (complItem){

    const divItemCompl=document.createElement('div');
    divItemCompl.setAttribute('class', 'complItm');
    divItemCompl.setAttribute('data-dishId', complItem.id.toString());
    // divItemCompl.maxWidth=800;
    // divItemCompl.scrollIntoView();

    // const inpSel=document.createElement('input');
    // inpSel.setAttribute('type', 'checkbox');
    // inpSel.setAttribute('class', 'itemInline');
    // inpSel.setAttribute('value','false');

    const inpName=document.createElement('input');
    inpName.setAttribute('type','text');
    inpName.setAttribute('class','itemLine');
    inpName.setAttribute('value', complItem.name);
    inpName.setAttribute('disabled','off');

    const inpCount=document.createElement('input');
    inpCount.setAttribute('type','number');
    inpCount.setAttribute('class', 'itemLine countCompl');
    inpCount.setAttribute('value','0');
    inpCount.setAttribute('step','1');
    inpCount.setAttribute('min','0');

    // divItemCompl.appendChild(inpSel);
    divItemCompl.appendChild(inpName);
    divItemCompl.appendChild(inpCount);

    if (priceAll.get(complItem.id)){ //??????????????
    const inpPrice=document.createElement('input');
    inpPrice.setAttribute('type','number');
    inpPrice.setAttribute('class', 'itemLine price');
    let pr=priceAll.get(complItem.id).toFixed(2);
    inpPrice.setAttribute('value',pr);
    inpPrice.setAttribute('data-price', pr);
    inpPrice.setAttribute('disabled','off');
    inpPrice.setAttribute('max-width','100');

    divItemCompl.appendChild(inpPrice);
    }



    return divItemCompl;
}
//+++
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
            request.abort();

            //=======================================================
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

            //========================================================
            dishAll=dataJSON['dishes_list'];
            //add new funct. 'get' for 'dishAll'
            dishAll.get=(idDish)=>{
                let i=0;
                while (dishAll[i++].id!==parseInt(idDish)){}
                return dishAll[i-1];
            };

            //add funct for dishAll 'getListForCategorie'
            dishAll.getListForCategorie=(ctgId)=>{
                myList=[];
                dishAll.forEach(function(item){
                    if(item.categorie_id===ctgId){
                        item.complement=false; //change for order
                        item.count=0;//added for order !!!!!
                        myList[myList.length]=item;}
                });
                return myList;
            };
       };
        //======================================================================
        //add function for priceAll --- adding price for selection dish
        priceAll.addPriceJSON=(dishId)=>{
            if (priceAll[dishId.toString()]){
                console.log(priceAll[dishId.toString()]);
                return true;
            }
            const request = new XMLHttpRequest();
            request.open('GET', '/'+dishId);
            request.onload=()=>{
                const dataJSON=JSON.parse(request.responseText);//{'dish_id':[0:{...}, 1:{...},...]}
                priceAll[dishId.toString()]=dataJSON[dishId.toString()];
                request.abort();
            };
            request.send();
        };

        //add funct priceAll --- get price
        priceAll.get=(dishId, prCtgId=1, type='small')=>{
            // {'dish_id':[0:{'categorie':1, ...}, 1:{'categorie':2, ...},...]}
            let pr=priceAll[dishId];
            if (!pr || pr.length===0){
                return 0.00;
            }
            let rezPr=0.00;
            if (pr[prCtgId-1]){
                rezPr=pr[prCtgId-1][type];
            }
            return rezPr;
        };
        //======================================================================
        //add funct 'addItem' for orderItems={} !!!!!
        orderItems.addItem=(dishId)=>{
            let selToOrd={};
            let selDish=dishAll.get(dishId);
            let ctgComplList=ctgDishAll.getListForSubtype(selDish.categorie_id);
            let complList=[];
            for (let i=0; i<ctgComplList.length; i++){
                if (selDish.categorie_id===2 && !selDish.name.includes('Steak')){
                    i++;
                }
                complList = complList.concat(dishAll.getListForCategorie(ctgComplList[i].id));
            }
            selToOrd.idItem=Math.max(++orderItems.maxNumber, ++orderItems.countDish); //

            selToOrd.idDish=parseInt(dishId);
            selToOrd.idCtgDish=selDish.categorie_id;
            selToOrd.nameDish=selDish.name;
            selToOrd.type='small';
            selToOrd.idCtgPrice=1;
            selToOrd.countCompl=0;
            selToOrd.price=priceAll.get(dishId);
            selToOrd.complements=complList;
            selToOrd.summ=0;

            orderItems[orderItems.maxNumber]=selToOrd;
        };
        //add funct calculate and setting count complements for order item
        orderItems.calcCountCompls=(self, itemsId='')=>{
            let cnt=0;
            let compl;
            if (itemsId==='') {
                compl=self.complements;
            }else{
                compl=orderItems[itemsId].complements;
            }
            compl.forEach(function (item) {
                cnt+=item.count;
            });
            compl.countCompl=cnt;
            return cnt;
        };

        //add funct calc ctg price for pizza for order item
        orderItems.setCtgPriceForPizza=(self, itemsId='')=>{
            let item;
            if (itemsId===''){
                item=self;
            } else {
                item=orderItems[itemsId];
            }

            if (item[itemsId]!==1){
                console.log(itemsId+ ' --- no Pizza');
                return 0;
            }

            let idCtgPr=1;
            switch (item.countCompl) {
                case 0:
                    idCtgPr=1;
                    break;
                case 1:
                    idCtgPr=2;
                    break;
                case 2:
                    idCtgPr=3;
                    break;
                case 3:
                    idCtgPr=4;
                    break;
                case 4:
                    idCtgPr=5;
                    break;
                case 5:
                    idCtgPr=5;
                    break;
            }
            if (itemsId===''){
                self.idCtgPrice=idCtgPr;
            }else{
                orderItems[itemsId].idCtgPrice=idCtgPr;
            }
        };

        orderItems.getCountDish=(dishId)=>{
            if (orderItems.length===1){return 0;}
            let c=0;
            for (item in orderItems){
                if (orderItems[item]['idDish']==dishId) {c++ }
            }
            return c;
        }
        //add funct del item of orderItems
        orderItems.del=(itemId)=>{
            delete orderItems[itemId];
            --orderItems.countDish;
        }

        // add funct set price for order item  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // orderItems.calcPrice=(itemsId)=>{
        //     let prItem=0, prCompl=0;
        //     let ctgPrCompl=orderItems[itemsId].idCtgPrice
        // };

        //======================================================================

    document.querySelector('.countCompl').onclick=(e)=>{
        //pizza

        //subs

    }

        //event listener for orders button
        document.querySelector('.order ').onclick=(e)=>{
            let obj=e.target;
            if (obj.classList[1]=='count'){
                if (obj.parentElement.childNodes[4].value==0){
                    obj.parentElement.childNodes[4].value=priceAll.get(obj.parentNode.dataset.dishid);
                }
                let price=parseFloat(obj.parentElement.childNodes[4].value).toFixed(2);
                let count=parseInt(obj.value);
                obj.parentElement.childNodes[5].value=(count*price).toFixed(2);

            }
            if (obj.type==='button') {
                switch (obj.classList[1]) {
                    case 'btntype':
                        let type=(obj.dataset.type=='small')?'large':'small'
                        obj.dataset.type=type
                        obj.value=(type==='small')?type.toUpperCase():type;
                        orderItems[obj.parentNode.dataset.orderid]['type']=type;
                        let price=priceAll.get(obj.parentNode.dataset.dishid, 1, type);
                        let count=parseInt(obj.parentElement.childNodes[3].value);
                        obj.parentElement.childNodes[4].value=price;
                        obj.parentElement.childNodes[5].value=(count*price).toFixed(2);

                        // obj.value=(obj.value==='Small')?'Large':'Small';
                        break;
                    case 'btncompl':
                        let objPar=obj.parentNode;
                        if (obj.dataset.open=='0'){
                            obj.dataset.open='1';
                            obj.value='<<';
                            objPar.appendChild(createCompl(obj.name));
                        }else{
                            obj.dataset.open='0';
                            obj.value='>>';
                            objPar.removeChild(objPar.lastChild);
                        }
                        break;
                    case 'btncopy':
                        const groupItem=obj.parentElement.parentElement;
                        const cloneItem=obj.parentElement.cloneNode(true);
                        orderItems.addItem(obj.parentNode.dataset.dishid);
                        cloneItem.setAttribute('data-orderid',orderItems.maxNumber); // ---- data
                        cloneItem.childNodes[2].value='SMALL'; //type
                        cloneItem.childNodes[2].dataset.type='small'; // --- data in type
                        cloneItem.childNodes[3].value=0; // count
                        cloneItem.childNodes[4].value=priceAll.get(cloneItem.dataset.dishid).toFixed(2); // price
                        cloneItem.childNodes[5].value='0.00'; // summ
                        // groupItem.appendChild(cloneItem);
                        groupItem.insertBefore(cloneItem, obj.parentElement);
                        groupItem.dataset.count++;
                        break;
                    case 'btndel':
                        let countSelDish=orderItems.getCountDish(obj.parentNode.dataset.dishid);
                        let objCtg=obj.parentElement.parentElement;
                        orderItems.del(obj.parentNode.dataset.orderid);
                        obj.parentElement.remove();
                        objCtg.dataset.count--;
                        if (countSelDish===1){
                            const objDish=document.getElementById(obj.parentNode.dataset.dishid);
                            objDish.classList.remove(objDish.classList[1]); // unselect
                        }
                        if (objCtg.dataset.count == 0){objCtg.remove();}
                        break;
                }
            }
        };

        document.querySelector('#dishes_list').onclick = (e)=>{
        // click group name zgort rozg grupu menyu
        if (e.target.className==="ctgr_name") {
            const v = document.querySelector("ul > ."+e.target.id);
            v.hidden= !v.hidden;
        }

        //select dish
        if (e.target.className==="dish") {
            priceAll.addPriceJSON(e.target.dataset.dishid);
            //added new item in order
            // orderItems.addItem(e.target.id);
            orderItems.addItem(e.target.dataset.dishid);

            // complements/toppings/addons add price
            let itemCtgId = dishAll.get(e.target.id).categorie_id;
            //check have it compl.
            if (ctgDishAll.getListForSubtype(itemCtgId, true)) {
            //added prices compl. in priceAll
                let ctgCompl = ctgDishAll.getListForSubtype(itemCtgId);
                dishAll.forEach(function (itemDish) {
                    ctgCompl.forEach(function (itemCtg) {
                        if (itemDish.categorie_id === itemCtg.id) {
                            priceAll.addPriceJSON(itemDish.id);
                        }
                    });
                });
            }

            let divCtg = createGroupCtgr(e.target.id);
            let divSelItem = createNewItem(e.target.id);//!!!
            divCtg.dataset.count++;
            // divSelItem.marginTop='15px';
            divSelItem.setAttribute('data-dishid', e.target.id.toString()); //--- data
            divSelItem.setAttribute('data-orderid', orderItems.maxNumber.toString()); // --- data

            divCtg.appendChild(divSelItem);

            e.target.classList.add('select'); //!!!
        }
        };

        //zgort rozg zamovlennya
        document.querySelector('#title_order').onclick=()=>{
            document.querySelector('.order').hidden=!document.querySelector('.order').hidden;
        };
});