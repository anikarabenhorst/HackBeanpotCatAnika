var source;

var df = [
['County Name', 'New County', 'Population', 'Population of Women Aged 13-44', 'Number of women who likely need public support for contraceptive services and supplies, ' +
'aged 13-44', 'Number of women who likely need public support for contraceptive services and supplies, ' +
'aged 20-44 and below the federal poverty level', 'Number of women who likely need public support for contraceptive services and supplies, ' +
'younger than 20', 'Prop 13 to 44', 'Prop Support 13 to 44', 'Prop Poverty of Support 13 to 44', 'Prop 30 of Support 13 to 44'],
['Barnstable County',0,213413,30510,7390,1300,2310,0.14296223753941886,0.24221566699442806,0.17591339648173207,0.3125845737483085],
['Berkshire County',0,126348,22760,6990,2030,1870,0.18013739829676767,0.3071177504393673,0.290414878397711,0.2675250357653791],
['Bristol County',0,564022,113240,28700,7820,8310,0.20077231029995285,0.25344401271635464,0.2724738675958188,0.28954703832752615],
['Dukes County',0,17352,2840,720,170,180,0.1636698939603504,0.2535211267605634,0.2361111111111111,0.25],
['Essex County',0,790638,155590,38940,10540,11610,0.19679044012556948,0.2502731538016582,0.2706728299948639,0.2981510015408321],
['Franklin County',0,70963,12500,4090,1520,830,0.17614813353437708,0.3272,0.37163814180929094,0.20293398533007334],
['Hampden County',1,470406,98470,31850,9190,7600,0.20932981297007267,0.3234487661216614,0.28854003139717427,0.23861852433281006],
['Hampshire County',0,161355,42040,14640,4250,4540,0.2605435220476589,0.34823977164605135,0.29030054644808745,0.31010928961748635],
['Middlesex County',1,1614714,347820,70730,19930,22930,0.21540656735496194,0.20335230866540163,0.28177576700127244,0.32419058391064615],
['Nantucket County',0,11327,2170,560,140,120,0.19157764633177363,0.25806451612903225,0.25,0.21428571428571427],
['Norfolk County',0,705388,142980,26690,5440,10440,0.20269695543445593,0.18666946426073577,0.20382165605095542,0.3911577369801424],
['Plymouth County',0,518132,96670,21530,4330,8190,0.18657407764816689,0.22271645805317059,0.20111472364143057,0.38039944263817926],
['Suffolk County',1,807252,215630,64030,26500,12350,0.2671160926203961,0.29694383898344384,0.41386849914102763,0.19287833827893175],
['Worcester County',1,830839,167130,42910,11700,13020,0.2011581064442088,0.25674624543768326,0.2726637147518061,0.3034257748776509]
]
// var df = d3.csv("/Datasets/finalCSV.csv", function(d) {
//     return {
//         county : +d['County Name'],
//         new_loc : +d['New County'],
//         pop : +d['Population'],
//         pop13_44 : +d['Population of Women Aged 13-44'],
//         support13_44 : +d['Number of women who likely need public support for contraceptive services and supplies, ' +
//         'aged 13-44'],
//         poverty20_44 : +d['Number of women who likely need public support for contraceptive services and supplies, ' +
//         'aged 20-44 and below the federal poverty level'],
//         younger_than20 : +d['Number of women who likely need public support for contraceptive services and supplies, ' +
//         'younger than 20'],
//         prop13_44 : +d['Prop 13 to 44'],
//         prop_support : +d['Prop Support 13 to 44'],
//         prop_pov : +d['Prop Poverty of Support 13 to 44'],
//         prop_young : +d['Prop 30 of Support 13 to 44']
//     };
// }).get(function(data) {
//     console.log(data);
// });     

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
    var names = [];
        
    listItems.forEach((item) => {
        names.push(item.innerHTML.trim());
    })

    var newNames = names.map(function(val, index){ 
        return {key:index, value: val}; 
    }) 

    var results = runAlgo(newNames);

    document.getElementById("result-location").innerHTML = results[0];
    document.getElementById("result-pp").innerHTML = results[1];
    document.getElementById("result-pop").innerHTML = results[2];
    document.getElementById("result-f-13-44").innerHTML = results[3];
    document.getElementById("result-likely").innerHTML = results[4];
    document.getElementById("result-poverty").innerHTML = results[5];
    document.getElementById("result-young").innerHTML = results[6];

}

function runAlgo(newNames) {
    const maPOP = 6902149;
    var noPP;
    var pop;
    var pop13to44f;
    var support13to44;
    var belowPov;
    var supportBelow20;


    for (var i = 0; i < newNames.length; i++) {
        switch (newNames[i].value) {
            case "New County":
                noPP = newNames[i].key;
                break;
            case "Population" :
                pop = newNames[i].key;
                break;
            case "Population of Women Aged 13-44" :
                pop13to44f = newNames[i].key;
                break;
            case "Number of women who likely need public support for contraceptive services and supplies, aged 13-44" :
                support13to44 = newNames[i].key;
                break;
            case "Number of women who likely need public support for contraceptive services and supplies, aged 20-44 and below the federal poverty level" :
                belowPov = newNames[i].key;
                break;
            case "Number of women who likely need public support for contraceptive services and supplies, younger than 20" :
                supportBelow20 = newNames[i].key;
                break;                
        }
    } 

    if (noPP <= 3) {
        df = [
            ['County Name', 'New County', 'Population', 'Population of Women Aged 13-44', 'Number of women who likely need public support for contraceptive services and supplies, ' +
            'aged 13-44', 'Number of women who likely need public support for contraceptive services and supplies, ' +
            'aged 20-44 and below the federal poverty level', 'Number of women who likely need public support for contraceptive services and supplies, ' +
            'younger than 20', 'Prop 13 to 44', 'Prop Support 13 to 44', 'Prop Poverty of Support 13 to 44', 'Prop 30 of Support 13 to 44'],
            ['Barnstable County',0,213413,30510,7390,1300,2310,0.14296223753941886,0.24221566699442806,0.17591339648173207,0.3125845737483085],
            ['Berkshire County',0,126348,22760,6990,2030,1870,0.18013739829676767,0.3071177504393673,0.290414878397711,0.2675250357653791],
            ['Bristol County',0,564022,113240,28700,7820,8310,0.20077231029995285,0.25344401271635464,0.2724738675958188,0.28954703832752615],
            ['Dukes County',0,17352,2840,720,170,180,0.1636698939603504,0.2535211267605634,0.2361111111111111,0.25],
            ['Essex County',0,790638,155590,38940,10540,11610,0.19679044012556948,0.2502731538016582,0.2706728299948639,0.2981510015408321],
            ['Franklin County',0,70963,12500,4090,1520,830,0.17614813353437708,0.3272,0.37163814180929094,0.20293398533007334],
            ['Hampshire County',0,161355,42040,14640,4250,4540,0.2605435220476589,0.34823977164605135,0.29030054644808745,0.31010928961748635],
            ['Nantucket County',0,11327,2170,560,140,120,0.19157764633177363,0.25806451612903225,0.25,0.21428571428571427],
            ['Norfolk County',0,705388,142980,26690,5440,10440,0.20269695543445593,0.18666946426073577,0.20382165605095542,0.3911577369801424],
            ['Plymouth County',0,518132,96670,21530,4330,8190,0.18657407764816689,0.22271645805317059,0.20111472364143057,0.38039944263817926],
            ]
    }

    var importances = [pop, pop13to44f, support13to44, belowPov, supportBelow20];

    for (var j = 0; j < importances.length; j++) {
        var curr = importances[j];
        if (curr > noPP) {
            curr = curr - 1;
        }
        switch (curr) {
            case 0:
                curr = .5;
                break;
            case 1:
                curr = .25;
                break;
            case 2:
                curr = .13;
                break;
            case 3:
                curr = .08;
                break;
            case 4:
                curr = .04;
                break;
        }
        importances[j] = curr;
            
    }

    var weights = [];

    for(var c = 1; c < df.length; c++) {
        var curr = df[c];
        var popProp = curr[2] / maPOP;

        var w = (importances[0]*popProp) + (importances[1]*curr[7]) + (importances[2]*curr[8]) +  (importances[3]*curr[9]) + (importances[4]*curr[10]);
        weights.push(w);
    }

    // get index of max weight and add 1
    var max = weights.reduce(function(a,b) {
        return Math.max(a, b)
    });
    var m = weights.indexOf(max) - 1;

    var notYet = makeString(df[m][1]); 

    return [df[m][0], 
    notYet, 
    df[m][2], 
    df[m][3], 
    df[m][4], 
    df[m][5], 
    df[m][6]];
     
}

function makeString(x) {
    if (x == 0) {
        return "No";
    }
    else {
        return "Yes";
    }
}




