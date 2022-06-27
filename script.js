let seuNome = 'Anavlia'
function EntrarSala(){
    let nome = {
        name: seuNome
    }
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome)
    promise.then(SucessoEntrar)
    promise.catch(ErroEntrar)
}
function ErroEntrar(elemento){
    if(elemento.response.status === 400){
        seuNome = prompt('erro 400, nome inválido, digite novamente')
        EntrarSala()
    }
}
function SucessoEntrar(elemento){
    console.log('entrou na sala')
}
function BuscarMensagens(){
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    promise.then(CarregarMensagens)
}
function CarregarMensagens(elementos){
    
    for( let i = elementos.data.length - 1 ; i > 0 ; i = i-1){
        if(elementos.data[i].type === 'status'){
            const MensagensTemplate =
            `<div class="DivMensagem status">
                <span class="horario">(${elementos.data[i].time})</span>
                <span class="usuario">${elementos.data[i].from}</span>
                <span class="mensagem">${elementos.data[i].text}</span>
            </div>`
            document.querySelector('.chat').innerHTML += MensagensTemplate
            console.log(i)
        }
        if(elementos.data[i].type === 'message'){
            const MensagensTemplate =
            `<div class="DivMensagem ">
                <span class="horario">(${elementos.data[i].time})</span>
                <span class="usuario">${elementos.data[i].from}</span>
                <span>para</span>
                <span class="usuario">${elementos.data[i].to}: </span>
                <span class="mensagem">${elementos.data[i].text}</span>
            </div>`
            document.querySelector('.chat').innerHTML += MensagensTemplate
            console.log(i)
        }
        if(elementos.data[i].type === 'private_message'){
            if(seuNome === elementos.data[i].to || seuNome === elementos.data[i].from){
                const MensagensTemplate =
                `<div class="DivMensagem reservadas">
                    <span class="horario">(${elementos.data[i].time})</span>
                    <span class="usuario">${elementos.data[i].from}</span>
                    <span>reservadamente para</span>
                    <span class="usuario">${elementos.data[i].to}: </span>
                    <span class="mensagem">${elementos.data[i].text}</span>
                </div>`
                document.querySelector('.chat').innerHTML += MensagensTemplate
                console.log(i)
                }else{
                console.log('n apareceu')
            }
        }    
    }
const ultimoelemento = document.querySelector('.DivMensagem')
ultimoelemento.scrollIntoView()
}

BuscarMensagens()