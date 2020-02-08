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

    var newNames = arr.map(function(val, index){ 
        return {key:index, value: val}; 
    }) 

    var results = runAlgo(newNames);
}

function runAlgo(newNames) {
    var noPP;
    var pop;
    var pop13to44f;
    var support13to44;
    var belowPov;
    var supportBelow20;

    for (i = 0; i < newNames.length(); i++) {
        switch (newNames[i][1]) {
            case "New County":
                noPP = newNames[i][0];
                break;
            case "Population" :
                pop = newNames[i][0];
                break;
            case "Population of Women Aged 13-44" :
                pop13to44f = newNames[i][0];
                break;
            case "Number of women who likely need public support for contraceptive services and supplies, aged 13-44" :
                support13to44 = newNames[i][0];
                break;
            case "Number of women who likely need public support for contraceptive services and supplies, aged 20-44 and below the federal poverty level" :
                belowPov = newNames[i][0];
                break;
            case "Number of women who likely need public support for contraceptive services and supplies, younger than 20" :
                pop = newNames[i][0];
                break;                
        }
    }

    
}

