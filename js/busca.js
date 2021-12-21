window.onload = function () {
    const BASE_URL = 'https://rickandmortyapi.com/api/character';

    search_input = getElement('.search-input');
    search_button = getElement('.search-button');
    content = getElement('.container');
    error_message = getElement('.error');

    var nome;
    var personagem;
    var card_item;

    search_button.addEventListener('click', event => {
        nome = search_input.value.toLowerCase().trim();
        start_app(nome);
    });

    function start_app(nome) {
        request_api(BASE_URL, nome);

        setTimeout(function () {
            if (personagem.detail) {
                //Erro
                error_message.style.display = 'block';
                content.style.display = 'none';
            } else {
                //Sucesso
                error_message.style.display = 'none';
                content.style.display = 'flex';
                content.innerHTML = create_content();
            }
        }, 2000);
    }

    function create_content() {

        card_item =
            `<div class="card">
            <img src=`+ personagem.image + `>
            <strong>`+ personagem.name + ` </strong><br>
            <span>`+ personagem.species + ` </span><br>
            <i>` + personagem.status + ` </i><br>
            </div>`

        return card_item;
    }

    function request_api(url, nome) {
        fetch(url + nome)
            .then(response => response.json())
            .then(data => {
                personagem = data;
            })
            .catch(err => console.log(err));
    }
}

function getElement(element) {
    return document.querySelector(element);
}