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
            localStorage.setItem('content', dataJSON);
        };

    document.querySelector('#dishes_list').onclick = (e)=>{
        if (e.target.className=='categorie_name') {
            let v = document.querySelector("."+e.target.id);
            v.hidden= !v.hidden;
            // document.querySelector("."+e.target.innerText+"_li").visibility=(v=='hidden')?'visible':'hidden';
        };
        if (e.target.className=="dish"){
          // alert(e.target.innerText);
            createNewItemElement(e.target.innerText)
        };
    };
})