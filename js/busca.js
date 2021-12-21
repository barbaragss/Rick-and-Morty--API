window.onload = function () {
    const BASE_URL = 'https://rickandmortyapi.com/api/character/?name=';

    search_input = getElement('.search-input');
    search_button = getElement('.search-button');
    content = getElement('.container');
    error_message = getElement('.error');
    formulario = getElement('.buscarPersonagem-caixa-formulario')
    imagem = getElement ('.caixa-img')
    busca = getElement ('.busca')

    var nome;
    var personagem;
    var card_item;

    search_button.addEventListener('click', event => {
        nome = search_input.value.trim();

        request_api(BASE_URL, nome);
        start_app(nome);
    });

    function start_app(nome) {
        request_api(BASE_URL, nome);
      
        setTimeout(function () {
            if (personagem == undefined) {
                //Erro
                error_message.style.display = 'block';
                content.style.display = 'none';
            } else {
                //Sucesso
                error_message.style.display = 'none';
                busca.style.display = 'none';
                content.style.display = content.classList.add('container-busca')
                content.innerHTML = create_content();
            }
        }, 1000);
    }

    function create_content() {

        card_item =
            
            `
            <div class="container">

            <div class ="elementos"> 
            <div class ="imagem-busca"> <img src=`+ personagem.image + `>
            </div>
            <strong>`+ personagem.name + ` </strong><br>
            <span>`+ personagem.species + ` </span><br>
            <i>` + personagem.status + ` </i><br>
            </div>

            </div>`

        return card_item;
    }

    async function request_api(url, nome) {
        fetch(url + nome)
            .then(response => response.json())
            .then(data => {
                data.results.map(function (results) {
                    personagem = results;
                }


                )
            })
            .catch(err => alert("Personagem não encontrado"));
    }

}

function getElement(element) {
    return document.querySelector(element);
}