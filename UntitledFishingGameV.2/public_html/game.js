/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
let c1 = false;
let c2 = false;
let c3 = false;
let c4 = false;
let c5 = false;
let c6 = false;
let inv = [];
let gold = 0;
let greatRod = false;
let ultraRod = false;
let bait = 0;
let net = 0;
let lake = true;
let decay = 1;
let stockBait = 0;
let stockNet = 0;
let stockGreatRod = 0;
let stockUltraRod = 0;
let stockLake = 0;
let initialization = false;
document.addEventListener("DOMContentLoaded", () => {
    loadGame();
    console.log("Loaded game, inventory length:", inv.length);

    if ((document.getElementById("gold")) && !(document.getElementById("shopTimer")) && !(document.getElementById("inv1"))) {
        displayGold();
        displayBait();
        displayNet();
        displayRod();
    }

    if (document.getElementById("inv1")) {
        displayInv();
        displayGold();
        displayBait();
        displayNet();
        displayRod();
    }
    
    if (document.getElementById("shopTimer")) {
        displayShop();
        resumeShopTimer();
        setInterval(displayShopTimer, 1000);
        displayGold();
        displayBait();
        displayNet();
    }
});

function goToMenu() {
    saveGame();
    setTimeout(() => {
        window.location.href = "index.html";
    }, 200);
}

function getRandomInt(min, max) {
    return Math.floor (Math.random() * (max - min + 1)) + min;
}

function fishingMinigame(num) {
    disableMenuButtons();
    c1 = c2 = c3 = c4 = c5 = c6 = false;

    for (let i = 0; i < num; i++) {
        setTimeout(() => {
            const minigame = document.getElementById("minigame" + (i + 1));
            if (minigame) {
                const pxW = window.innerWidth;
                const pxH = window.innerHeight;
                const randomH = Math.floor(Math.random() * (pxH - 75) + 1);
                const randomW = Math.floor(Math.random() * (pxW - 75));
                minigame.style.left = randomW + "px";
                minigame.style.top = randomH + "px";
                minigame.style.display = "block";
            }
        }, 500 * i);
    }

    return new Promise(resolve => {
        const checkInterval = setInterval(() => {
            if (
                (num === 3 && c1 && c2 && c3) ||
                (num === 6 && c1 && c2 && c3 && c4 && c5 && c6)
            ) {
                clearInterval(checkInterval);
                resolve(true);
            }
        }, 100);

        setTimeout(() => {
            clearInterval(checkInterval);
            resolve(false);
        }, 7500);
    });
}


function click1(){
    c1 = true;
    document.getElementById("minigame1").style.display = "none";
}

function click2(){
    c2 = true;
    document.getElementById("minigame2").style.display = "none";
}

function click3(){
    c3 = true;
    document.getElementById("minigame3").style.display = "none";
}

function click4(){
    c4 = true;
    document.getElementById("minigame4").style.display = "none";
}

function click5(){
    c5 = true;
    document.getElementById("minigame5").style.display = "none";
}

function click6(){
    c6 = true;
    document.getElementById("minigame6").style.display = "none";
}

function disableMenuButtons(){
    document.getElementById("cast").disabled = true;  
    document.getElementById("sellWindow").onclick = null;
    document.getElementById("invWindow").onclick = null;
    document.getElementById("shopWindow").onclick = null;
    
}

function enableMenuButtons(){
    document.getElementById("cast").disabled = false;  
    document.getElementById("sellWindow").onclick = sellFish;
    document.getElementById("invWindow").onclick = goToInv;
    document.getElementById("shopWindow").onclick = goToStore;
}

function determineFish(luck1, luck2) {
    let randomNum = getRandomInt(1,100);
    let name = "";
    let rv = 0;
    let rm = "";
    let rarity = "";
    let color = "";
    let environment="";
    if (lake){
       environment = "lake";
    }
        if (randomNum >= 1 && randomNum <= (29 - luck1 - luck2)){
            rv = 30 - luck1 - luck2;
            rarity = "basic";
            color = "black";
            name = fishEnvironment(environment, rarity);
        } 
        else if (randomNum >= (30 - luck1 -luck2) && randomNum <= (54 - (luck1*2) - (luck2*2))){
            rv = 25 - luck1 - luck2;
            rarity = "common";
            color = "grey";
            name = fishEnvironment(environment, rarity);
        }
        else if (randomNum >= (55 - (luck1*2) - (luck2*2)) && randomNum <= (74 - (luck1*3) - (luck2*3))){
            rv = 20 - luck1 - luck2;
            rarity = "uncommon";
            color = "green";
            name = fishEnvironment(environment, rarity);
        }
        else if (randomNum >= (75 - (luck1*3) - (luck2*3)) && randomNum <= (84 - (luck1*3) - (luck2*3))){
            rv = 10;
            rarity = "rare1";
            color = "blue";
            name = fishEnvironment(environment, rarity);
        }
        else if (randomNum >= (85 - (luck1*3) - (luck2*3)) && randomNum <= (89 - (luck1*2) - (luck2*3))){
            rv = 5 + luck1;
            rarity = "rare2";
            color = "blue";
            name = fishEnvironment(environment, rarity);
        }
        else if (randomNum >= (90 - (luck1*2) - (luck2*3)) && randomNum <= (94 - (luck1) - (luck2*3))){
            rv = 4 + luck1;
            rarity = "epic1";
            color = "purple";
            name = fishEnvironment(environment, rarity);
        }
        else if (randomNum >= (95 - (luck1) - (luck2*3)) && randomNum <= (97 - (luck2*3))){
            rv = 3 + luck1;
            rarity = "epic2";
            color = "purple";
            name = fishEnvironment(environment, rarity);
        }
        else if (randomNum >= (98 - (luck2*3)) && randomNum <= (99 - (luck2))){
            rv = 2 + luck2*2;
            rarity = "legendary";
            color = "yellow";
            name = fishEnvironment(environment, rarity);
        }
        else if (randomNum >= (100 - (luck2)) && randomNum <= 100){
            rv = 1 + luck2*1;
            rarity = "secret";
            color = "red";
            name = fishEnvironment(environment, rarity);
        }
    rm = "(" + rarity + ": " + rv + "%)";
    return {name: name, rarity: rarity, rm: rm, color: color};
}

function fishEnvironment(environment, rarity){
    if (environment == "lake"){
        return lakeFish(rarity);
    }
}

function lakeFish(rarity){
    switch(rarity){
        case "basic":
            return "blackCrappie";
        case "common":
            return "largemouthBass";
        case "uncommon":
            return "whiteSucker";
        case "rare1":
            return "brownBullhead";
        case "rare2":
            return "chainPeckrel";
        case "epic1":
            return "redbreastSunfish";
        case "epic2":
            return "rainbowTrout";
        case "legendary":
            return "americanEel";
        case "secret":
            return "kraken";
    }
}


async function castRod() {
    const video = document.getElementById("castVideo");
    const fishingWindow = document.getElementById("fishingWindow");

    fishingWindow.style.backgroundImage = "none";
    video.style.display = "block";
    video.currentTime = 0;
    video.play();

    // hide video and restore background after 10 seconds
    setTimeout(() => {
        video.pause();
        video.style.display = "none";
        fishingWindow.style.backgroundImage = "url('images/default.png')";
    }, 10000);

    setTimeout(async () => {
        try {
            let gRLuck1 = 0;
            let uRLuck1 = 0;
            let uRLuck2 = 0;
            let bLuck1 = 0;
            let bLuck2 = 0;
            if (greatRod) {
                gRLuck1 = 3;
            }
            if (ultraRod) {
                uRLuck1 = 2;
                uRLuck2 = 1;
            }
            if (bait > 0) {
                bLuck1 = 5;
                bLuck2 = 1;
                bait = bait - 1;
                displayBait();
            }

            let luck1 = gRLuck1 + uRLuck1 + bLuck1;
            let luck2 = uRLuck2 + bLuck2;

            if (inv.length == 16) {
                updateMessages();
                document.getElementById("message7").innerHTML = "inventory is full";
                document.getElementById("message7").style.color = "black";
            } else {
                if (net > 0) {
                    let caughtFish = [];
                    for (let i = 0; i < 3; i++) {
                        let fish = determineFish(luck1, luck2);
                        caughtFish.push(fish);
                    }

                    let hasKraken = false;
                    for (let i = 0; i < caughtFish.length; i++) {
                        if (caughtFish[i].name === "kraken") {
                            hasKraken = true;
                            break;
                        }
                    }

                    let clicks = hasKraken ? 6 : 3;
                    let win = await fishingMinigame(clicks);

                    if (win) {
                        for (let fish of caughtFish) {
                            if (inv.length >= 16) break;
                            inv.push(fish);
                            updateMessages();
                            document.getElementById("message7").innerHTML =
                                "you caught a " + fish.name + "! " + fish.rm;
                            document.getElementById("message7").style.color = fish.color;
                        }
                    } else {
                        updateMessages();
                        document.getElementById("message7").innerHTML = "the fish got away!";
                        document.getElementById("message7").style.color = "black";
                    }

                    net -= 1;
                    displayNet();
                } else {
                    let fish = determineFish(luck1, luck2);
                    if (inv.length == 16) {
                        updateMessages();
                        document.getElementById("message7").innerHTML = "inventory is full";
                        document.getElementById("message7").style.color = "black";
                        return;
                    }

                    let win = await fishingMinigame(fish.name == "kraken" ? 6 : 3);
                    if (win) {
                        updateMessages();
                        document.getElementById("message7").innerHTML =
                            "you caught a " + fish.name + "! " + fish.rm;
                        document.getElementById("message7").style.color = fish.color;
                        inv.push(fish);
                    } else {
                        updateMessages();
                        document.getElementById("message7").innerHTML = "the fish got away!";
                        document.getElementById("message7").style.color = "black";
                    }
                }
            }
            saveGame();
            enableMenuButtons();
            fishingWindow.style.backgroundImage = "url('images/default.png')";
        } catch (err) {
            console.error(err);
            enableMenuButtons();
            fishingWindow.style.backgroundImage = "url('images/default.png')";
        }
    }, 10000);
}

function displayInv(){
    for(let i=0;i<16;i++){
        const image=document.getElementById("inv"+(i+1));
        const text=document.getElementById("inv"+(i+1)+"txt");
        if(image) image.style.backgroundImage="";
        if(text) text.innerHTML="";
    }
    for(let i=0;i<inv.length && i<16;i++){
        const fish=inv[i];
        if(!fish) continue;
        const image=document.getElementById("inv"+(i+1));
        const text=document.getElementById("inv"+(i+1)+"txt");
        if(!image||!text) continue;
        const ftext=`<span style="color:${fish.color};">${fish.name} ${fish.rm}</span><br>`;
        image.style.backgroundImage=`url('images/${fish.name}.png')`;
        text.innerHTML=ftext;
    }
}

function goToInv() {
    saveGame();
    setTimeout(() => {
        window.location.href = "inv.html";
    }, 200);
}

function displayShopTimer(){
    let now = Date.now();
    let savedTime = localStorage.getItem("nextRefresh");
    let remainingTime = parseInt(savedTime) - now;
    let minutes = Math.floor(remainingTime/60000);
    let seconds = Math.floor((remainingTime - minutes * 60000)/1000);
    let timeRemaining = "Time Remaining: " + minutes + "m " + seconds + "s" ;
    document.getElementById("shopTimer").innerHTML = timeRemaining ;
}

function resumeShopTimer(){
    let now = Date.now();
    let savedTime = localStorage.getItem("nextRefresh");
    if (savedTime){
        let remainingTime = parseInt(savedTime) - now;
        if (remainingTime > 0){
            setTimeout(() => {
                refreshShop();
            resumeShopTimer();
            }, remainingTime);
        }
        else{
            refreshShop();
            resumeShopTimer();
        }
    }
    else{
        refreshShop();
        resumeShopTimer();
    }
}

function refreshShop(){
    
   if (!document.getElementById("baitStock")) return;
    
   let randomNum = getRandomInt(1, 100);
   if (randomNum <= 40){
       randomNum = getRandomInt(1, 100);
       if (randomNum <= 50){
            stockBait = stockBait + 1;
        }
        else if (randomNum >= 51 && randomNum <= 85){
            stockBait = stockBait + 2;
        }
        else if (randomNum >= 86){
            stockBait = stockBait + 3;
        }
   }
   else if (randomNum >= 41 && randomNum <= 65){
       randomNum = getRandomInt(1, 100);
       if (randomNum <= 50){
            stockNet = stockNet + 1;
        }
        else if (randomNum >= 51 && randomNum <= 85){
            stockNet = stockNet + 2;
        }
        else if (randomNum >= 86){
            stockNet = stockNet + 3;
        }
   }
   else if (randomNum >= 66 && randomNum <= 75){
       stockGreatRod = stockGreatRod + 1;
       if (stockGreatRod >= 2){
           stockGreatRod = 1;
           decay = decay/2;
       }
   }
   else if (randomNum >= 76 && randomNum <= 80){
       stockUltraRod = stockUltraRod + 1;
       if (stockUltraRod >= 2){
           stockUltraRod = 1;
           decay = decay/4;
        }
   }
   else if (randomNum >= 81 && randomNum <= 90){
       stockLake = stockLake + 1;
       if (stockLake >= 2){
           stockLake = 1;
           decay = decay/2;
        }
   }
   else if (randomNum >= 91 && randomNum <= 100){
       randomNum = getRandomInt(1, 100);
       if (randomNum >= 40){
           // future environment
           decay = decay/4;
       }
       else if (randomNum >= 41 && randomNum <= 70){
           // future environment
            decay = decay/4;
       }
       else if (randomNum >= 71 && randomNum <= 90){
           // future environment
            decay = decay/4;
       }
       else if (randomNum >= 91 && randomNum <= 100){
           // future environment
            decay = decay/4;
       }
   }
    chanceRefresh();
    nextRefresh = Date.now() + 300000;
    localStorage.setItem("nextRefresh", nextRefresh);
}

function chanceRefresh (){
    if (decay > 100){
            decay = 100;
        }
        randomNum = getRandomInt(1,100);
    if (randomNum <= 100 - decay){
        decay = decay * 2;
        refreshShop();
    }
    else{
        decay = 1;
        displayShop();
    }
}

function displayShop(){
    document.getElementById("baitStock").innerHTML = "x" + stockBait + " stock";
    document.getElementById("netStock").innerHTML = "x" + stockNet + " stock";
    document.getElementById("greatRodStock").innerHTML = "x" + stockGreatRod + " stock";
    document.getElementById("ultraRodStock").innerHTML = "x" + stockUltraRod + " stock";
    document.getElementById("lakeStock").innerHTML = "x" + stockLake + " stock";
    if (stockGreatRod <= 0){
        document.getElementById("greatRodWindow").onclick = null;
    }
    else{
        document.getElementById("greatRodWindow").onclick = buyGreatRod;
    }
    if (stockUltraRod <= 0){
        document.getElementById("ultraRodWindow").onclick = null;
    }
    else{
        document.getElementById("ultraRodWindow").onclick = buyUltraRod;
    }
    if (stockBait <= 0){
        document.getElementById("baitWindow").onclick = null;
    }
    else{
        document.getElementById("baitWindow").onclick = buyBait;
    }
    if (stockNet <= 0){
        document.getElementById("netWindow").onclick = null;
    }
    else{
        document.getElementById("netWindow").onclick = buyNet;
    }
    if (stockLake <= 0){
        document.getElementById("lakeWindow").onclick = null;
    }
    else{
        document.getElementById("lakeWindow").onclick = goLake;
    }
}

function goToStore() {
    saveGame();
    setTimeout(() => {
        window.location.href = "store.html";
    }, 200);
}

function buyGreatRod(){
    if (gold >= 500){
        gold = gold -500;
        greatRod = true;
        stockGreatRod = stockGreatRod -1;
    }
    displayShop();
    displayGold();
    saveGame();
}

function buyUltraRod(){
    if (gold >= 2500){
        gold = gold -2500;
        ultraRod = true;
        stockUltraRod = stockUltraRod -1;
    }
    displayShop();
    displayGold();
    saveGame();
}

function displayRod() {
    let x = "";
    let y = "";
    if (greatRod) {
        x = ", <span style='color: yellow;'>great rod</span>";
    }
    if (ultraRod) {
        y = ", <span style='color: purple;'>ultra rod</span>";
    }
    document.getElementById("rod").innerHTML = "Rod(s): basic rod" + x + y;
}

function buyBait(){
    if (gold >= 50){
        gold = gold -50;
        bait = bait + 1;
        stockBait = stockBait - 1;
    }
    displayShop();
    displayBait();
    displayGold();
    saveGame();
}

function displayBait(){
    document.getElementById("bait").innerHTML = "Bait(s): " + bait;
}

function buyNet(){
    if (gold >= 100){
        gold = gold -100;
        net = net + 1;
        stockNet = stockNet - 1;
    }    
    displayShop();
    displayNet();
    displayGold();
    saveGame();
}

function displayNet(){
    document.getElementById("net").innerHTML = "Net(s): " + net;
}


function goLake(){
    if (gold >= 100){
        gold = gold -100;
        lake = true;
        stockLake = stockLake - 1;
    }
    displayShop();
    displayGold();
    saveGame();
}

function sellFish(){
    let environment = "";
    if (lake){;

        environment = 1;    
    }
    let soldFish = 0;
    inv.forEach( fish => {
        soldFish = soldFish + Math.ceil(environment * fishPrice(fish.rarity));
    });
    gold = gold + soldFish;
    updateMessages();
    document.getElementById("message7").innerHTML = "you sold your fish for <span style='color: yellow;'>" + soldFish + "g!</span>";
    inv.length = 0;
    displayGold();
}

function displayGold(){
    document.getElementById("gold").innerHTML = "Gold: " + gold + "g";
}

function fishPrice(rarity){
    switch (rarity){
        case"basic":
            return 5;
        case"common":
            return 10;
        case"uncommon":
            return 15;
        case"rare1":
            return 25;
        case"rare2":
            return 50;
        case"epic1":
            return 65;
        case"epic2":
            return 80;
        case"legendary":
            return 125;
        case"secret":
            return 500;
    }
}

function updateMessages(){
    for (let i = 1; i < 7; i++) {
        document.getElementById("message" + i).innerHTML =
            document.getElementById("message" + (i + 1)).innerHTML;
        document.getElementById("message" + i).style.color =
            document.getElementById("message" + (i + 1)).style.color;
    }
}

function saveGame(){
    localStorage.setItem("inv", JSON.stringify(inv));
    localStorage.setItem("gold", gold);
    localStorage.setItem("bait", bait);
    localStorage.setItem("net", net);
    localStorage.setItem("greatRod", greatRod);
    localStorage.setItem("ultraRod", ultraRod);
    localStorage.setItem("lake", lake);
    localStorage.setItem("decay", decay);
    localStorage.setItem("stockBait", stockBait);
    localStorage.setItem("stockNet", stockNet);
    localStorage.setItem("stockGreatRod", stockGreatRod);
    localStorage.setItem("stockUltraRod", stockUltraRod);
    localStorage.setItem("stockLake", stockLake);
}

function loadGame(){
   if (localStorage.getItem("inv")){
       inv = JSON.parse(localStorage.getItem("inv"));
   }
   if (localStorage.getItem("gold")){
       gold = parseInt(localStorage.getItem("gold"));
   }
   if (localStorage.getItem("bait")){
       bait = parseInt(localStorage.getItem("bait"));
   }
   if (localStorage.getItem("net")){
       net = parseInt(localStorage.getItem("net"));
   }
   if (localStorage.getItem("greatRod")){
       greatRod = localStorage.getItem("greatRod") === "true";
   }
   if (localStorage.getItem("ultraRod")){
       ultraRod = localStorage.getItem("ultraRod") === "true";
   }
   if (localStorage.getItem("lake")){
       lake = localStorage.getItem("lake") === "true";
   }
   if (localStorage.getItem("decay")){
       decay = parseFloat(localStorage.getItem("decay"));
   }
   if (localStorage.getItem("stockBait")){
       stockBait = parseInt(localStorage.getItem("stockBait"));
   }
   if (localStorage.getItem("stockNet")){
       stockNet = parseInt(localStorage.getItem("stockNet"));
   }
   if (localStorage.getItem("stockGreatRod")){
       stockGreatRod = parseInt(localStorage.getItem("stockGreatRod"));
   }
   if (localStorage.getItem("stockUltraRod")){
       stockUltraRod = parseInt(localStorage.getItem("stockUltraRod"));
   }
   if (localStorage.getItem("stockLake")){
       stockLake = parseInt(localStorage.getItem("stockLake"));
   }
   if (localStorage.getItem("initialization")){
       initialization = localStorage.getItem("initialization") === "true";
   }
   if (!initialization){
       refreshShop();
       gold = 50;
       saveGame();
       initialization = true;
       localStorage.setItem("initialization", initialization);
   }
}

