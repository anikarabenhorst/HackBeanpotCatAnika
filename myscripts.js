var source;

function dragStarted(evt){
    source=evt.target;
    evt.dataTransfer.setData("index.html", evt.target.innerHTML);
    evt.dataTransfer.effectAllowed = "move";
}
   
function draggingOver(evt){
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
}

function dropped(evt){
    evt.preventDefault();
    evt.stopPropagation();
    source.innerHTML = evt.target.innerHTML;
    evt.target.innerHTML = evt.dataTransfer.getData("index.html");
}

function saveform() {
    var listItems = document.querySelectorAll(".listbox li");
    console.log(listItems);
    var names = [];
        
    listItems.forEach((item) => {
        names.push(item.innerHTML.trim());
    })
    console.log(names);
}