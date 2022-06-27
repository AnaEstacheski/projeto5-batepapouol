function EntrarSala(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants')
    promise.then(NomeUsuario)
}
function NomeUsuario(){
    let nome = {
        name: ana
    }
    return nome
}
function BuscarMensagens(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promise.then(CarregarMensagens)
}
function CarregarMensagens(elementos){
    console.log(elementos)
    for( let i = 0 ; i < elementos.data.length ; i++){
        if(elementos.data[i].type === 'status'){
            const MensagensTemplate =
            `<div class="DivMensagem status">
                <span class="horario">(${elementos.data[i].time})</span>
                <span class="usuario">${elementos.data[i].from}</span>
                <span class="mensagem">${elementos.data[i].text}</span>
            </div>`
            document.querySelector('.chat').innerHTML += MensagensTemplate
        }
        if(elementos.data[i].type === 'message'){
            const MensagensTemplate =
            `<div class="DivMensagem">
                <span class="horario">(${elementos.data[i].time})</span>
                <span class="usuario">${elementos.data[i].from}</span>
                <span>para</span>
                <span class="usuario">${elementos.data[i].to}: </span>
                <span class="mensagem">${elementos.data[i].text}</span>
            </div>`
            document.querySelector('.chat').innerHTML += MensagensTemplate
        }
        if(elementos.data[i].type === 'private_message'){
            const MensagensTemplate =
            `<div class="DivMensagem reservadas">
                <span class="horario">(${elementos.data[i].time})</span>
                <span class="usuario">${elementos.data[i].from}</span>
                <span>reservadamente para</span>
                <span class="usuario">${elementos.data[i].to}: </span>
                <span class="mensagem">${elementos.data[i].text}</span>
            </div>`
            document.querySelector('.chat').innerHTML += MensagensTemplate
        }
    }
}
BuscarMensagens()