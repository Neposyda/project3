let stLog=false;
let ctgDishAll, dishAll, priceAll={};
let orderItems={'countDish':0, 'maxNumber':0, 'total':0.00 };

function cancelRequest() {
    document.getElementById('modal').remove();
}

function sendRequest(type){
    const request = new XMLHttpRequest();
    let status={'log':type};
    if (type=='login'){
        if (document.getElementById('username').value=='' || document.getElementById('password').value==''){
            request.abort();
            return 0;
        }
        status['username']=document.getElementById('username').value;
        status['password']=document.getElementById('password').value;
    }
    if (type=='reg'){

    }
    request.open('GET', '/log/'+JSON.stringify(status));
    request.send();
    request.onerror=()=>{
        request.abort();
    }
    request.onload=()=>{
        let rez=JSON.parse(request.responseText);
        request.abort();
        stLog=rez['log'];
        let message='Register or loging, please.';
        if (stLog){
            message='Hello, '+ rez['user'] +'.';
            document.getElementById('modal').remove();
        }
        document.querySelector('.hellouser > a').innerHTML=message;
        document.querySelector('#log > a').innerHTML=(stLog)?'Logout':'Login';
    }
}

function createModal(type) {
        const modal=document.createElement('div');
            modal.setAttribute('id', 'modal');
            modal.setAttribute('style',
                'display:flex; ' +
                'flex-direction: column; ' +
                'justify-content: center; ' +
                'align-items: center;')
            //!!!!!!!!!!!!!!!!!!!!!!!
            //mod.setAttribute('style','display: none; color: red;')
            //mod['setAttribute']('style','display: block; color: red;')
            // !!!!!!!!!!!!!!!!!!!!!!
            const inpName=document.createElement('input');
            inpName.setAttribute('type', 'text');
            inpName.setAttribute('id', 'username');
            inpName.setAttribute('name', 'username');
            inpName.setAttribute('autocomplete', 'off');
            inpName.setAttribute('required', 'true');
            inpName.setAttribute('margin', '5px');

            const inpPassw=document.createElement('input');
            inpPassw.setAttribute('type', 'password');
            inpPassw.setAttribute('id', 'password');
            inpPassw.setAttribute('name', 'password');
            inpPassw.setAttribute('autocomplete', 'off');
            inpPassw.setAttribute('required', 'true');
            inpPassw.setAttribute('margin', '5px');

            const lblName=document.createElement('label');
            lblName.setAttribute('for','username');
            lblName.innerHTML='Input you\'re name.'

            const lblPassw=document.createElement('label');
            lblPassw.setAttribute('for','password');
            lblPassw.innerHTML='Input you\'re password.';

            const inpSend=document.createElement('input');
            inpSend.setAttribute('type','submit');
            inpSend.setAttribute('id','send');
            inpSend.innerHTML='Submit';
            inpSend.setAttribute('style','width-max: 100px');
            inpSend.setAttribute('onclick', 'sendRequest(\'login\')');

            // inpSend.setAttribute('onclick', 'requestLogingReg(\'login\')');

            const inpCancel=document.createElement('button');
            // inpCancel.setAttribute('type','');
            inpCancel.setAttribute('id','cancel');
            inpCancel.innerHTML='Cancel';
            inpCancel.setAttribute('style','width-max: 100px');
            inpCancel.setAttribute('onclick', "cancelRequest()");

            modal.appendChild(lblName);
            modal.appendChild(inpName);
            if (type=='reg'){
                const lblFName=lblName.cloneNode(true);
                const inpFName=inpName.cloneNode(true);
                lblFName.setAttribute('for', 'inpFName');
                lblFName.innerHTML='Input yuo\'re first name.' ;
                inpFName.setAttribute('id', 'fname');
                modal.appendChild(lblFName);
                modal.appendChild(inpFName);
                const lblLName=lblName.cloneNode(true);
                const inpLName=inpName.cloneNode(true);
                lblLName.setAttribute('for','inpLName');
                lblLName.innerHTML='Input you\'re last name.' ;
                inpLName.setAttribute('id', 'lname');
                modal.appendChild(lblLName);
                modal.appendChild(inpLName);
                const lblEmail=lblName.cloneNode(true);
                const inpEmail=inpName.cloneNode(true);
                lblEmail.setAttribute('for','inpEmail');
                lblEmail.innerHTML='Input you\'re e-mail.';
                inpEmail.setAttribute('type','email');
                inpEmail.setAttribute('id', 'email');
                modal.appendChild(lblEmail);
                modal.appendChild(inpEmail);
            }
            modal.appendChild(lblPassw);
            modal.appendChild(inpPassw);
            modal.appendChild(inpSend);
            modal.appendChild(inpCancel);
            document.querySelector('body').appendChild(modal);
}

function createNewItem (dishId){
    //create elements of new item in order
    const divNewItem=document.createElement('div');
    divNewItem.setAttribute('class','item');

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
    divType.setAttribute('value','small');
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
    divPrice.setAttribute('value', parseFloat(document.getElementById(dishId).dataset.small).toFixed(2));
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
//+++
function  createGroupCtgr(dishId) {
    let ctgId=dishAll.get(dishId).categorie_id;
    let ctgName=ctgDishAll.get(ctgId).name;
    let divCtgr;
    //verify or create new group for selicted dishes
    if (!document.querySelector('.order > .ctgr'+ctgId)){
        const divOrder = document.querySelector('.order');

        const h4Ctg=document.createElement('h4');
        h4Ctg.innerText=ctgName;

        divCtgr=document.createElement('div');
        divCtgr.setAttribute('class', 'ctgr'+ctgId);
        divCtgr.setAttribute('data-ctgrid',ctgId.toString());//--- data
        divCtgr.setAttribute('data-count','0'); //--- data
        // divOrder.appendChild(h4Ctg);
        divCtgr.appendChild(h4Ctg);
        divOrder.appendChild(divCtgr);
    } else{
        divCtgr=document.querySelector('.order > .ctgr'+ctgId);
    }
    return divCtgr;
}


function createItemCompl (complItem){

    const divItemCompl=document.createElement('div');
    divItemCompl.setAttribute('class', 'complItm');

    const inpName=document.createElement('input');
    inpName.setAttribute('type','text');
    inpName.setAttribute('class','itemLine name');
    inpName.setAttribute('value', complItem.name);
    inpName.setAttribute('disabled','off');

    const inpCount=document.createElement('input');
    inpCount.setAttribute('type','number');
    inpCount.setAttribute('class', 'itemLine countCompl');
    inpCount.setAttribute('value','0');
    inpCount.setAttribute('step','1');
    inpCount.setAttribute('min','0');
    if (ctgDishAll[complItem.categorie_id-1].subtype===1){
        inpCount.setAttribute('max','5');
    }else{
        inpCount.setAttribute('max','50');
    }

    // divItemCompl.appendChild(inpSel);
    divItemCompl.appendChild(inpName);
    divItemCompl.appendChild(inpCount);

    if (priceAll.get(complItem.id)){
    const inpPrice=document.createElement('input');
    inpPrice.setAttribute('type','number');
    inpPrice.setAttribute('class', 'itemLine price');
    let pr=priceAll.get(complItem.id).toFixed(2);
    inpPrice.setAttribute('value',pr);
    inpPrice.setAttribute('data-price', pr);
    inpPrice.setAttribute('disabled','off');

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
    divCompl.setAttribute('class','complGrp hideoff');
    for (let i=0; i< complList.length; i++) {
        const divItemCompl=createItemCompl(complList[i]);
        divItemCompl.setAttribute('data-dishid',complList[i].id.toString());//---data
        divItemCompl.setAttribute('data-listId',i.toString()); //---data
        divItemCompl.setAttribute('data-countcmpl','0'); //---data
        divCompl.appendChild(divItemCompl);//!!!
    }
    return divCompl;
}

document.addEventListener('DOMContentLoaded', ()=>{
        // Open new request to get new posts.
        const request = new XMLHttpRequest();
        request.open('GET', '/data/');
        request.send();
        request.onload = () => {
            const dataJSON = JSON.parse(request.responseText);
            request.abort();
            stLog=dataJSON['log'];

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
                // console.log(priceAll[dishId.toString()]);
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
            selToOrd.countDish=0;
            selToOrd.price=priceAll.get(dishId);
            selToOrd.countCompl=0;
            selToOrd.complements=complList;
            selToOrd.summ=0;

            orderItems[orderItems.maxNumber]=selToOrd;
        };
        //add funct calculate and setting count complements for order item
        orderItems.calcCountComplsItem=(itemsId)=>{
            let cnt=0;
            let compl=orderItems[itemsId].complements;

            compl.forEach(function (item) {
                cnt+=item.count;
            });
            orderItems[itemsId].countCompl=cnt;
            return cnt;
        };

        //add funct calculate and setting count complements for order ite
        orderItems.calcSummComplItem=(itemsId)=>{
            let ctgPr=orderItems[itemsId].idCtgPrice;
            let typePr=orderItems[itemsId].type;
            let compl=orderItems[itemsId].complements;
            let summ=0;

            // typePr=orderItems.idCtgPrice;
            for (let item in compl){
                let pr =priceAll.get( compl[item].id, ctgPr, typePr);
                summ+= pr*compl[item].count;
            }
            return summ;
        };

        //add funct calculate and setting summ all complements for order item
        orderItems.calcSummItem=(itemsId)=>{
            // let ordrItem=orderItems[itemsId];
            let summCompl=orderItems.calcSummComplItem(itemsId);
            let pr = priceAll.get(orderItems[itemsId].idDish,orderItems[itemsId].idCtgPrice, orderItems[itemsId].type);

            if (orderItems[itemsId].price===0){orderItems[itemsId].price=pr}else{pr=orderItems[itemsId].price};//??????

            let summ=orderItems[itemsId].countDish*(pr+summCompl);
            orderItems[itemsId].summ=summ;
            return summ;
        };

        //add funct calc total cost order
        orderItems.calcSummOrder=()=>{
            orderItems.total=0.00;
            for(let i in orderItems){
                if (typeof(orderItems[i]) === 'object'){
                    orderItems.total+=orderItems[i].summ;
                    // console.log(i + ': type ' + typeof(orderItems[i]) + ": " + orderItems.total + '..' + orderItems[i].summ);
                };
            };
            return orderItems.total;
        };

        //add funct calc and set ctg price for pizza for order item
        orderItems.calcCtgPriceForPizza=(itemsId)=>{
            let item;
            item=orderItems[itemsId];
            if (item.idCtgDish!==1){
                console.log(itemsId+ ' --- no Pizza');
                return 1;
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
            orderItems[itemsId].idCtgPrice=idCtgPr;
            return idCtgPr;
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
            orderItems.countDish=Math.max(0,--orderItems.countDish);
        }

        //add funct get all items of
        orderItems.getAllItems=()=>{
            let rezDict=[]
                for (i in orderItems){
                    if(typeof(orderItems[i])=='object'){
                        rezDict=rezDict.concat(orderItems[i]);
                    }
                }
                return rezDict;
        }

        orderItems.clearItems=()=>{
            orderItems.countDish=0;
            orderItems.maxNumber=0;
            for (i in orderItems){
                if (typeof (orderItems[i])=='object'){
                    delete(orderItems[i]);
                }
            }
        }
        //=====================================================================


        //event listener for orders button
    if (document.querySelector('.order ')) {
        document.querySelector('.order ').onclick = (e) => {
            let obj = e.target;
            let ctgId = obj.parentElement.parentElement.dataset.ctgrid;
            let k = (ctgId == 1 || ctgId == 2) ? 0 : 1;
            let objParent = obj.parentNode;

            if (obj.classList[1] === 'count') {
                orderItems[objParent.dataset.orderid].countDish = parseInt(obj.value);
                objParent.childNodes[5 - k].value = orderItems.calcSummItem(objParent.dataset.orderid).toFixed(2);
                if (ctgId == 1) {
                    let ctgPr = orderItems.calcCtgPriceForPizza(objParent.dataset.orderid);
                    objParent.dataset.priceid = ctgPr;
                    orderItems[objParent.dataset.orderid].idCtgPrice = ctgPr;
                }
                let summ = orderItems.calcSummItem(objParent.dataset.orderid);
                objParent.childNodes[5 - k].value = summ.toFixed(2);
                document.getElementById('total_order').innerText='$'+ orderItems.calcSummOrder().toFixed(2);
            }
            if (obj.type === 'button') {
                switch (obj.classList[1]) {
                    case 'btntype':
                        let type = (obj.dataset.type === 'small') ? 'large' : 'small';
                        let price = priceAll.get(
                            orderItems[objParent.dataset.orderid].idDish,
                            orderItems[objParent.dataset.orderid].idCtgPrice,
                            type);
                        if (price === 0) return 0;

                        obj.dataset.type = type;
                        obj.value = (type === 'large') ? type.toUpperCase() : type;
                        orderItems[obj.parentNode.dataset.orderid]['type'] = type;
                        orderItems[objParent.dataset.orderid].price = price;

                        obj.parentElement.childNodes[4 - k].value = price.toFixed(2);
                        obj.parentElement.childNodes[5 - k].value = orderItems.calcSummItem(objParent.dataset.orderid).toFixed(2);
                        document.getElementById('total_order').innerText='$'+ orderItems.calcSummOrder().toFixed(2); //????
                        break;
                    case 'btncompl':
                        if (objParent.childNodes[3].value==0){
                          alert ("Input COUNT!!!");
                          break;
                        }
                        let objPar = obj.parentNode;
                        if (obj.dataset.open === '0') {
                            obj.dataset.open = '1';
                            obj.value = '<<';
                            if (objPar.dataset.countcmpl > 0) {
                                objPar.lastChild.classList.remove(objPar.lastChild.classList[1]);
                                objPar.lastChild.classList.add('hideoff');
                            } else {
                                objPar.appendChild(createCompl(obj.name));
                            }
                        } else {
                            obj.dataset.open = '0';
                            obj.value = '>>';
                            if (objPar.dataset.countcmpl > 0) {
                                objPar.lastChild.classList.remove(objPar.lastChild.classList[1]);
                                objPar.lastChild.classList.add('hideon');
                            } else {
                                objPar.removeChild(objPar.lastChild);
                            }
                        }
                        break;
                    case 'btncopy':
                        const groupItem = obj.parentElement.parentElement;
                        const cloneItem = obj.parentElement.cloneNode(true);
                        orderItems.addItem(obj.parentNode.dataset.dishid);
                        cloneItem.setAttribute('data-orderid', orderItems.maxNumber); // ---- data
                        cloneItem.setAttribute('data-priceid', '1'); // --- data
                        cloneItem.setAttribute('data-countcmpl', '0'); // --- data

                        if (groupItem.dataset.ctgid == 1 || groupItem.dataset.ctgid == 2) {
                            cloneItem.childNodes[1].value = '>>';
                            cloneItem.childNodes[1].dataset.open = '0'; // --- data
                        }
                        cloneItem.childNodes[2 - k].value = 'small'; //type
                        cloneItem.childNodes[2 - k].dataset.type = 'small'; // --- data
                        cloneItem.childNodes[3 - k].value = 0; // count
                        cloneItem.childNodes[4 - k].value = priceAll.get(cloneItem.dataset.dishid).toFixed(2); // price
                        cloneItem.childNodes[5 - k].value = '0.00'; // summ
                        // groupItem.appendChild(cloneItem);
                        if (cloneItem.lastElementChild.classList[0] == 'complGrp') {
                            cloneItem.lastChild.remove();
                            // cloneItem.remove(cloneItem.lastChild);
                        }
                        groupItem.insertBefore(cloneItem, obj.parentElement);
                        groupItem.dataset.count++;
                        break;
                    case 'btndel':
                        let countSelDish = orderItems.getCountDish(obj.parentNode.dataset.dishid);
                        let objCtg = obj.parentElement.parentElement;
                        let itemOrd = obj.parentNode;
                        objCtg.dataset.councmpl = (parseInt(objCtg.dataset.countcmpl) - parseInt(itemOrd.dataset.countcmpl)).toString()
                        orderItems.del(obj.parentNode.dataset.orderid);
                        obj.parentElement.remove();
                        objCtg.dataset.count--;
                        if (countSelDish === 1) {
                            const objDish = document.getElementById(obj.parentNode.dataset.dishid);
                            objDish.classList.remove(objDish.classList[1]); // unselect
                        }
                        if (objCtg.dataset.count == 0) {
                            objCtg.remove();
                        }
                        break;
                }
            }
            if (obj.parentNode.classList[0] === 'complItm') {
                let grItemOrd = obj.parentNode.parentNode.parentNode;
                let grItemCompl = obj.parentNode;
                if (obj.classList[1] === 'countCompl') {
                    let itemId = grItemOrd.dataset.orderid;
                    let listId = grItemCompl.dataset.listid;
                    let actCountCompl = parseInt(grItemOrd.dataset.countcmpl);
                    let selCount = parseInt(grItemCompl.dataset.countcmpl);
                    let clkCount = parseInt(obj.value);
                    if (orderItems[itemId].idCtgDish === 1) {
                        if (actCountCompl == 5 && (clkCount - selCount) == 1) {
                            obj.value = selCount.toString();
                        } else {
                            actCountCompl += (clkCount - selCount);
                            grItemOrd.dataset.countcmpl = actCountCompl.toString();
                            grItemCompl.dataset.countcmpl = obj.value;
                            orderItems[itemId].countCompl = actCountCompl;
                        }
                        grItemOrd.dataset.priceid = orderItems.calcCtgPriceForPizza(itemId);
                        orderItems[itemId].price = priceAll.get(
                            grItemOrd.dataset.dishid,
                            grItemOrd.dataset.priceid,
                            orderItems[itemId].type);
                    } else {
                        actCountCompl += (clkCount - selCount);
                        grItemOrd.dataset.countcmpl = actCountCompl.toString();
                        grItemCompl.dataset.countcmpl = obj.value;
                        orderItems[itemId].countCompl = actCountCompl;
                    }
                    orderItems[itemId].complements[listId].count = parseInt(obj.value);
                    grItemOrd.childNodes[4].value = orderItems[itemId].price.toFixed(2);
                    grItemOrd.childNodes[5].value = orderItems.calcSummItem(itemId).toFixed(2);
                    document.getElementById('total_order').innerText='$' + orderItems.calcSummOrder().toFixed(2);                }
            }
        };
    }else{console.log("document.querySelector('.order ') is NONE")};

    if (document.querySelector('#dishes_list')) {
        document.querySelector('#dishes_list').onclick = (e) => {
            // click group name zgort rozg grupu menyu
            if (e.target.className === "ctgr_name") {
                const v = document.querySelector("ul > ." + e.target.id);
                e.target.lastChild.innerText=(v.hidden)?"":" ..."
                v.hidden = !v.hidden;
            }

            //select dish
            if (e.target.className === "dish") {
                priceAll.addPriceJSON(e.target.dataset.dishid);
                //added new item in order
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
                let divSelItem = createNewItem(e.target.id);
                divCtg.dataset.count++;
                divSelItem.setAttribute('data-dishid', e.target.id.toString()); //--- data
                divSelItem.setAttribute('data-orderid', orderItems.maxNumber.toString()); // --- data
                divSelItem.setAttribute('data-countcmpl', '0'); //---data
                divSelItem.setAttribute('data-priceid', '1');// --- data

                divCtg.appendChild(divSelItem);

                e.target.classList.add('select');
            }
        };
    }else{"document.querySelector('#dishes_list') is NONE"};

if (document.querySelector('#title_order')) {
        //zgort rozg zamovlennya
        document.querySelector('#title_order').onclick = (e) => {
            e.target.lastChild.innerHTML=(document.querySelector('.order').hidden)?"":" ..."
            document.querySelector('.order').hidden = !document.querySelector('.order').hidden;
        };
    }else{console.log("document.querySelector('#title_order') is NONE")};

    if(document.querySelector('#submit')) {
        document.querySelector('#submit').onclick = () => {
            if (!stLog){
                alert ("You need loging!!!");
                return 0;
            }
            if (orderItems.total==0){
                alert("You need selection dish of menu.");
                return 0;
            };
            const request = new XMLHttpRequest();
            // let dataord = JSON.stringify(orderItems.getAllItems());
            let dataord = orderItems.getAllItems();
            let reqdata=JSON.stringify(dataord);
            request.open('GET', '/submit/' + reqdata);
            // request.setRequestHeader("Content-Type", "application/json");
            request.send();
            request.onload = () => {
                if (request.status == 404){
                    alert ('Error SUBMIT, status request: '+ request.status);
                    request.abort();
                    return false;
                }
                const dataJSON = JSON.parse(request.responseText);
                request.abort();
                console.log('rez:' + dataJSON.rez);
                if (dataJSON.rez){
                    //del child in div class 'order'
                    const divOrder=document.querySelector('.order');
                    while (divOrder.firstChild){
                        const divCtg=divOrder.firstChild;
                        while (divCtg.firstChild){
                            if (divCtg.firstChild.className=='item'){
                                //unselect all 'select' dish
                                let list=document.getElementById(divCtg.firstChild.dataset.dishid).classList;
                                list.remove(list[1]);
                            }
                            divCtg.removeChild(divCtg.firstChild);
                        }
                        divCtg.remove();
                    }
                    // clear order items
                    orderItems.clearItems();
                    document.getElementById('total_order').innerText='$'+ orderItems.calcSummOrder().toFixed(2);
                }
            }
        };
    }else{console.log("document.querySelector('#submit') is NONE")}

    document.getElementById('log').onclick=()=>{
        if (!stLog) {
            createModal('log');
        }else {
            sendRequest('logout');
        }
    }

    document.getElementById('reg').onclick=()=>{
        if (stLog){return 0;}
        createModal('reg');
    }
});