let input = document.querySelector('.input');
let startButton = document.querySelector('.start');
let positionBut = document.querySelector('.position');
let chat = document.querySelector(".chat");

let EchoUrl = `wss://echo-ws-service.herokuapp.com`;

let websocket = new WebSocket(EchoUrl);

websocket.addEventListener('open', (event)=>{});

function readToScreen(message){
    let string  = document.createElement(`p`);
    string.style.cssText = `
        text-align: right;
        word-wrap: break-word;
        margin: 0px 5px 10px 30px`;
    string.innerHTML = message;
    chat.appendChild(string);
}

function readToScreenAnswer(message){
    let stringAnswer = document.createElement(`p`);
    stringAnswer.style = `word-wrap: break-word;
    margin: 0px 30px 5px 5px`;
    stringAnswer.innerHTML = message;
    chat.appendChild(stringAnswer);
}
startButton.addEventListener("click", ()=>{
    let message = input.value;
    readToScreen(message);
    websocket.send(message);
})

websocket.addEventListener('message', function (event) {
    readToScreenAnswer(event.data);
});

positionBut.addEventListener("click", ()=>{
    navigator.geolocation.getCurrentPosition((position) => {
        const {coords} = position;
        let url  = document.createElement(`div`);
        url.innerHTML = `<button class = "map" href="https://yandex.ru/maps/?pt=${coords.longitude},${coords.latitude}&z=18&l=map">посмотреть геолокацию</button>`;
        chat.appendChild(url);
    }
)}
)