let notes = JSON.parse(localStorage.getItem('notes')) || {};
let submitButton = document.getElementById("submit");
let result = document.getElementById("result");
let clearButton = document.getElementById("clear");

clearButton.addEventListener("click", clearPage);
submitButton.addEventListener("click", solve);
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        solve();
    }
});

// function solve() ---> main function
function solve(){
    const input = document.getElementById("command");
    const inputText = input.value;
    input.value = "";

    inputDistribution(inputText);

    localStorage.setItem('notes', JSON.stringify(notes));
}

// function inputDistribution(input) ---> finding the corresponding function based on user's input
async function inputDistribution(input){
    const percentegeToPass = 0.70;
    const basicGreetings = ["Hello", "Хеллоу", "Hi", "драсте", "аз обичам"];
    const hourService = ["Колко е часа?", "Час", "Време"];
    const weatherService = ["Weather", "прогноза" ,"вали", "градус" ,"ракия" ,"сняг" ,"дъжд"];
    const botCommand = ["боте, кво запомни?"];

    const inputArrays = [basicGreetings, hourService, weatherService, botCommand];
    const allPossibleInputs = inputArrays.flat();

    for (let i = 0; i < allPossibleInputs.length; i++){
        let similarityCoeficient = similarity(allPossibleInputs[i],input);
        if(similarityCoeficient >= percentegeToPass){
            input = allPossibleInputs[i];
            break;
        }
    }

    if(basicGreetings.includes(input)){
        let answer = greetingsAnswers(input);
        appendResult(input, result, answer);
    }

    else if(hourService.includes(input)){
        let answer = hoursAnswers(input);
        appendResult(input, result, answer);
    }

    else if(weatherService.includes(input)){
        let answer = await weatherAnswers();
        appendResult(input, result, answer);
    }

    else if(input.startsWith("боте, запомни в")){
        takeNote(input, notes)
    }

    else if(input.startsWith("боте, махни ")){
        removeNote(input, notes);
    }

    else if(input === "боте, кво запомни?" ){
        let answer = listNotes(notes);
        appendResult(input, result, answer);
    }

    else {
        randomAnswer();
    }

    optimize(notes);
}

// function greetingsAnswers(input) ---> returning corresponding answer of greeting
function greetingsAnswers(input){
    let answer;
    let index;
    const basicResponses = ["Hey, I'm bot", "Здрастииии", "Добро утроо", "Heya!", "Здравей!"];
    const helloResponses = ["from the other sideee", "is it me you're looking for?"];
    const loveResponses = ["Кондьо" , "Джена" , "Джорджано" , "Гери и Никол"]

    switch (input){
        case "Хеллоу":
        case "Hi":
        case "драсте":
            index = getRandomInt(basicResponses.length);
            answer = basicResponses[index];
            break;
            
        case "Hello":
            index = getRandomInt(helloResponses.length + basicResponses.length);
            const allHelloAnswers = basicResponses.concat(helloResponses);
            answer = allHelloAnswers[index];
            break;
        case "аз обичам":
            index = getRandomInt(loveResponses.length);
            answer = loveResponses[index];
            break;
    }
    return answer;
}

// function hoursAnswers(input) ---> returning corresponding answer about current time
function hoursAnswers(){
    const today = new Date();
    
    const hours = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
    const minutes = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    const seconds = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
    
    const time = hours + ":" + minutes + ":" + seconds;
    const unixTimestamp = Date.now();
    let x = 1;
    let y = unixTimestamp;
    
    for(let i = 10000; i > 1; i--){
        if(unixTimestamp % i === 0){
            x = i;
            y = unixTimestamp / x;
            break;
        }
    }
    
    const hoursResponses = 
    [
        `абе май е ${time}` ,
        `абе май е 16:20:00`, //(Note: Here you're actually trolling the users, the time is not 16:20:00)
        `Шес бес десет, няма бе, ${time} е..`,
        `Ако умножиш ${x} по ${y} ще получиш unix timestamp, който лесно можеш сам да си пресметнеш
        и да получиш текущата дата` //(Note: X*Y should equal to the current unix timestamp, unless the bot is trolling again) // it never lies :)
    ]
    
    const index = getRandomInt(hoursResponses.length);
    if(hoursResponses[index].startsWith("Шес бес десет")){
        if(time === "17.50.00"){
            hoursResponses[index] = `Точно ${time} е`
        }
        else {
            hoursResponses[index] = time > "17.50.00" ? `Шес бес десет мина, ${time} е.. ` : `Шес бес десет, няма бе, ${time} е..`;
        }
    }

    return hoursResponses[index];
}

// function weatherAnswers ---> returning corresponding answer about the weather
async function weatherAnswers(){
    try{

    
    const data = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=42.43&lon=25.28&appid=1b90499dfa74a24840fd7b40f15208a8&lang=bg&units=metric")
        .then((response) => {
            if(response.ok){
                return response.json();
            }
            throw new Error('Something went wrong');
        });

    let weatherDescription = data.weather[0].description;
    let temperature = data.main.temp;
    let windSpeed = data.wind.speed;
    let windDeg = data.wind.deg;

    //(Note: When temperature is below 0 celsius) 
    if(temperature < 0){
        return `Вън е ${temperature} градуса, егати студа!`;
    }

    //(Note: When temperature is above 30 celsius)
    if(temperature > 30){
        return `${temperature} градуса, как живеете вие в тая жега, добре че съм бот!`;
    }

    const weatherResponses = 
    [
        `В момента е ${weatherDescription}`,
        `За тези, които ги мързи да погледнат през прозореца - вън е ${weatherDescription}`,
        `*Наплюнчва пръст и го показва през прозореца* Усещам вятър в посока ${degToCompass(windDeg)}, около ${windSpeed} метра в секунда`,
        `Термометрите отчитат ${temperature} градуса по Целзий`
    ]

    const index = getRandomInt(weatherResponses.length);

    return weatherResponses[index];
    }
    catch(error){
        alert(error);
    }
}

// function takeNote(input, mainObj) ---> adding new note
function takeNote(input, mainObj){
    const command = input.replace("боте, запомни в ", "").trim();
    let[list, note] = command.split(" - ");
    let sublists = list.split(" ");
    
    createNestedObject(mainObj, sublists, note);
    let answer = `Записах "${note}" в ${sublists[sublists.length-1]}`

    appendResult(input, result, answer);
}

// function removeNote(input, mainObj) ---> removing note
function removeNote(input, mainObj) {
    let isDeleted;
    let answer;
    const command = input.replace("боте, махни ", "").trim();
    let[list, note] = command.split(" - ");
    let sublists = list.split(" ");
    if(sublists[0] === "TODO"){
        isDeleted = deleteNote(mainObj, sublists, note);
    }

    if(isDeleted){
        answer = `Премахнах "${note}" от ${sublists[sublists.length-1]}`;
    }
    else{
        answer = `Тази задача я няма в ${sublists[sublists.length-1]}`
    }
    appendResult(input, result, answer);

}

// function listNotes(obj) ---> show all existing notes
let counter = 0;
function listNotes(obj) {
    let listIsEmpty = false;
    if(counter === 0){
        buff = "<div><p>Ето ти бележките бе! </p>";
    }

    if(Object.keys(obj).length === 0){
        return "нямаш бележки :)";
    }


    for (let key in obj) {
        if (typeof obj[key] === "object") {
            if(Object.keys(obj[key]).length === 0){
                return "нямаш бележки :)";
            }
            if(obj[key].hasOwnProperty("list")){
                buff += `<p> --- ${key}---  </p>`;
                for(let i = 0; i < obj[key].list.length; i ++){
                    buff += `<p>"${obj[key].list[i]}"  </p>`;
                    listIsEmpty = true;
                }
            }
            if(!listIsEmpty){
                return "нямаш бележки :)";
            }
            counter++;
            listNotes(obj[key]);   
        } 
    }

    buff += "</div>"
    counter = 0;
    return buff;
}

function optimize(obj){
    if(Object.keys(obj).length === 0){
        notes = {};
    }
    for (let key in obj) {
        if (typeof obj[key] === "object") {
            if(Object.keys(obj[key]).length === 0){
                notes = {};
                break;
            }
            optimize(obj[key]);
        } 
    }
}


// Helping functions
// -----------------

// function appendResult(input, resultDiv, lineToAppend) ---> appending result div
function appendResult(input, resultDiv, lineToAppend){
    resultDiv.innerHTML += `<p class="bold italic">${input}</p>`;
    resultDiv.innerHTML += `<p>${lineToAppend}</p>`;
    resultDiv.innerHTML += "<hr>"
}

// function getRandomInt(max) ---> getting random number between 0 and {max}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};

// function similarity(s1, s2) + function editDistande(s1, s2) ---> Coefficient of likelihood of identity between {s1} and {s2};
function similarity(s1, s2) {
    let longer = s1;
    let shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    let longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
};

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    let costs = new Array();
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
};

// function degToCompass(num) ---> convert degree to wind directions ()
function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["север", "север-североизток", "североизток", "изток-североизток", "изток", "изток-югоизток", "югоизток", "юг-югоизток", "юг",
     "юг-югозапад", "югозапад", "запад-югозапад", "запад", "запад-северозапад", "северозапад", "север-северозапад"];
    return arr[(val % 16)];
};

// function createNestedObject(base, names) ---> create
function createNestedObject(base, names, note) {
    for( let i = 0; i < names.length; i++ ) {
        base = base[ names[i] ] = base[ names[i] ] || {};
        if(i === names.length - 1){
            if(!base.hasOwnProperty("list")){
                base["list"] = [];
            }
            base.list.push(note);
            addTrollNote(base.list);
        }
    }
};

// function deleteNote(base, names, note) ---> remove note from nested object
function deleteNote(base, names, note) {
    let currentNotes = Object.assign({}, base);
    let isDeleted = false;
    for( let i = 0; i < names.length; i++ ) {
        base = base[ names[i] ] = base[ names[i] ] || {};
        if(i === names.length - 1){
            if(base.hasOwnProperty("list")){
                isDeleted = base.list.includes(note) ? true : false;
                base.list = base.list.filter(item => item !== note);
                if(base.list.length === 0){
                    delete base.list;
                }
            }           
        }
    }
    if(!isDeleted){
        notes = Object.assign({}, currentNotes);
    }
    return isDeleted;
}

// function addTrollNote(listArray) ---> have {chancePercentage}% chance to add troll note
function addTrollNote(listArray){
    const chancePercentage = 5;
    let numberFromZeroToHundred = getRandomInt(100);
    const trollNotes = 
    [
        "да ъпгрейдна бота",
        "да си гледам работата!",
        "да спра да занимавам бота с глупости",
        "да си пусна новата песен на Криско"
    ];

    const randomNoteIndex = getRandomInt(trollNotes.length);
    const trollNote = trollNotes[randomNoteIndex];

    if(numberFromZeroToHundred < chancePercentage){
        listArray.push(trollNote);
    }
};

// function randomAnswer() ---> generating random answer if the input is not valid
function randomAnswer(){
    let index = getRandomInt(2);
    const randomAnswers = 
    [
        "Oh my!",
        "Yeah dude, I feel that..",
        "Аха, ясно"
    ];

    const randomAnswerIndex = getRandomInt(randomAnswers.length);
    const randomAnswer = randomAnswers[randomAnswerIndex];

    if(index === 1){
        result.innerHTML += `<p>${randomAnswer}</p>`;
        result.innerHTML += `<hr>`;
    }
};

// function clearPage() ---> clear current results
function clearPage(){
    result.innerHTML = "";
};
