document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('#dishes_list').onclick = (e)=>{
        if (e.target.className=='categorie_name') {
            let v = document.querySelector("."+e.target.id);
            v.hidden= !v.hidden;
            // document.querySelector("."+e.target.innerText+"_li").visibility=(v=='hidden')?'visible':'hidden';
        }
    };

})