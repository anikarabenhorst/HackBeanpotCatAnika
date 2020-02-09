var source;

var df = [['County Name', 'New County', 'Population', ]]
var df = d3.csv("/Datasets/finalCSV.csv", function(d) {
    return {
        county : +d['County Name'],
        new_loc : +d['New County'],
        pop : +d['Population'],
        pop13_44 : +d['Population of Women Aged 13-44'],
        support13_44 : +d['Number of women who likely need public support for contraceptive services and supplies, ' +
        'aged 13-44'],
        poverty20_44 : +d['Number of women who likely need public support for contraceptive services and supplies, ' +
        'aged 20-44 and below the federal poverty level'],
        younger_than20 : +d['Number of women who likely need public support for contraceptive services and supplies, ' +
        'younger than 20'],
        prop13_44 : +d['Prop 13 to 44'],
        prop_support : +d['Prop Support 13 to 44'],
        prop_pov : +d['Prop Poverty of Support 13 to 44'],
        prop_young : +d['Prop 30 of Support 13 to 44']
    };
}).get(function(data) {
    console.log(data);
});     

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

    console.log(newNames);

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

    console.log(df[0]);

    return [df[0].county, 
    df[0].new_loc, 
    df[0].pop, 
    df[0].pop13_44, 
    df[0].support13_44, 
    df[0].poverty20_44, 
    df[0].younger_than20];
     
}




