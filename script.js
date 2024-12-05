const input = document.querySelector('input')
const Add = document.querySelector('button')
const listContainer = document.querySelector('.list-container')

let addTask = ()=>{
    if(input.value.trim() === ''){
        alert('you must write something')
    }
    else{
        let li = document.createElement('li');
        li.innerHTML = input.value;
        listContainer.appendChild(li);

        let span = document.createElement('span');
        span.innerHTML = "\u00d7"
        li.appendChild(span)
    }
    input.value = "";
    savedata()
}

Add.addEventListener('click',function (){
    addTask();
    savedata()
})

listContainer.addEventListener('click',function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
    }
    else if(e.target.tagName === 'SPAN'){
        const confirmDelete = confirm("Are you sure you want to delete this task ?");
        if(confirmDelete){
           e.target.parentElement.remove();
        }
    }
    savedata()
});

function savedata(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function getdata(){
    listContainer.innerHTML = localStorage.getItem("data")
}

getdata();