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

    var newNames = names.map(function(val, index){ 
        return {key:index, value: val}; 
    }) 

    var results = runAlgo(newNames);
    console.log(results);
    document.getElementById("result-location").innerHTML = results[0];
    document.getElementById("result-pp").innerHTML = results[1];
    document.getElementById("result-pop").innerHTML = results[2];
    document.getElementById("result-f-13-44").innerHTML = results[3];
    document.getElementById("result-likely").innerHTML = results[4];
    document.getElementById("result-poverty").innerHTML = results[5];
    document.getElementById("result-young").innerHTML = results[6];

}

function runAlgo(newNames) {
    var noPP;
    var pop;
    var pop13to44f;
    var support13to44;
    var belowPov;
    var supportBelow20;

    for (i = 0; i < newNames.length; i++) {
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

    if (noPP <= 3) {
        // remove counties that contain planned parenthoods : hampden, middlesex, suffolk, worcester
    }
    if (pop == 0) {
        // return biggest of what's left (middlesex if not removed) (something else if removed)
    }
    if (pop13to44f == 0) {
        // add a column to dataframe to calculate percentages of middle aged female 
    }
    if (support13to44 == 0) {
        // column proportion of total pop
    }
    if (belowPov == 0) {
        // column proportion of support13to44
    }
    if (supportBelow20 == 0) {
        // proportion of support13to44
    }


    return ["hi", "yes", 1, 1, 1, 1, 1];
    
    
}

