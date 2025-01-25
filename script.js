const uploadBtn = document.getElementById('upload-btn')
const inputUpload = document.getElementById('image-upload')

uploadBtn.addEventListener('click', () =>{
    inputUpload.click()
})

function lerConteudoDoArquivo(arquivo){
    return new Promise((resolve, reject) => {
        const leitor = new FileReader()
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name})
        } 

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector('.main-imagem')
const nomeDaImagem = document.querySelector('.container-imagem-nome p')

inputUpload.addEventListener('change', async (event)=> {
    const arquivo = event.target.files[0]

    if(arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo)
            imagemPrincipal.src = conteudoDoArquivo.url
            nomeDaImagem.textContent = conteudoDoArquivo.nome
        } catch (erro) {
            console.error('Erro na leitura do arquivo')
        }
    }
})

const inputTags = document.getElementById('input-tags')
const listaTags = document.querySelector('.lista-tags')

listaTags.addEventListener('click', (event) => {
    if(event.target.classList.contains("remove-tag")) {
        const removerTag = event.target.parentElement
        listaTags.removeChild(removerTag)
    }
})

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"]

async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto))
        }, 1000)
    })
}

inputTags.addEventListener('keypress', async (event) => {
    if(event.key === "Enter") {
        event.preventDefault()
        const tagTexto = inputTags.value.trim()
        if(tagTexto != "") {
            try{
            const tagsExiste = await verificaTagsDisponiveis(tagTexto)
            if(tagsExiste) {
                const tagNova = document.createElement('li')
                tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">` 
                listaTags.appendChild(tagNova)
                inputTags.value = ''
                } else{
                    alert('A tag não foi encontrada.')
                }
            } catch (error) {
                console.error('Erro ao verificar a')
                alert('Erro ao verificar a existência da tag. Verifique o console.')
            }
        }
    }
})

const botaoPublicar = document.querySelector('.botao-publicar')

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
    return new Promisse ((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5

            if(deuCerto) {
                resolve('Projeto publicado com sucesso!')
            } else{
                reject('Erro ao publicar o projeto')
            }
        }, 2000)
    })
}

botaoPublicar.addEventListener('click', async (event) => {
    event.preventDefault()

    const nomeDoProjeto = document.getElementById('nome').value
    const descricaoDoProjeto = document.getElementById('descricao').value
    const tagsProjeto = Array.from(listaTags.querySelectorAll('p')).map((tag) => tag.textContent)

    try{
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto)
        console.log(resultado)
        alert('Deu tudo certo"')
    } catch (error) {
        console.log('Deu errado: ', error)
        alert('Deu errado!')
    }
})

