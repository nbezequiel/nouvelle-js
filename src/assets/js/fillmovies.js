/*
** Preenchimento de campos de exibição de filmes e informações dos mesmos
*/


/** Pega os posts mais recentes disponibilizados pelo servidor */
function getPosts(){    
    return new Promise((resolve,reject)=>{
        fetch("/lastposts")
        .then(res=>res.json())
            .then(resp=>{
                if(resp==undefined){
                    reject("erro");return;
                }
                else{
                    resolve(resp)
                }
            }) 
    })
}

//** Carrega os posts a serem exibidos na sessão de principais filmes da pagina inicial */
function carregaPrimeirosPosts(){
    getPosts()
    .then((resp)=>{
        const elementos=document.querySelectorAll(".mainmovie div")
         for(let i=0;i<8;i++){
             try{
                 elementos[i].parentElement.setAttribute("id",resp[i].id)
                elementos[i].firstElementChild.innerHTML=resp[i].titulo;
                elementos[i].lastElementChild.innerHTML=resp[i].descricao;
                elementos[i].parentElement.style.backgroundImage=resp[i].imagem
             }
             catch(err){
                 // Definir o tratamento de erros
             }
         }
    })
}

//**Pega quase 'todos' os posts(tem um limite definido na API) disponiveis no servidor */
function getAllPosts(page){   
    console.log(page) 
    return new Promise((resolve,reject)=>{
        fetch(`/allposts/${page}`)
        .then(res=>res.json())
            .then(resp=>{
                if(resp==undefined){
                    reject("erro");return;
                }
                else{
                    resolve(resp)
                }
            }) 
    })
}

/**Preenche todos os filmes da página de catálogo de filmes */
function fillAllMovies(e){
    if(e){
        let elem=e.target;
        getAllPosts(elem.getAttribute("id"))
            .then((resp)=>{
                let movies=document.querySelectorAll(".movie")
            })
    }
    else{
        getAllPosts(String(0))
        .then(resp=>{   
            let movies=document.querySelectorAll(".movie")
        })
    }
}

/*
** Retira as informações do post selecionado do servidor e adiciona ao form de informações visivel ao usuário.
** Define as funções de abertura e fechamento do form de informações
*/
function abrirInformacoes(e){
    getInfo(e.target.parentElement.getAttribute("id"))
        .then(resp=>{
            let id=resp.id
            let titulo=resp.titulo
            let img=resp.imagem.substr(16).replace("')","")
            let  atores=resp.atores
            let diretores=resp.diretores
            let resenha=`${resp.resenha.substr(0,200)}...`
            
            $(".info-box .informacoes h1").html(titulo)  
            $(".info-box .informacoes img").attr("src", `assets/imgs${img}`)
            $(".info-box .informacoes [atores]").html(atores)
            $(".info-box .informacoes [diretores]").html(diretores)
            $(".info-box .informacoes [resenha]").html(resenha)
            $(".info-box .informacoes").attr("id",id)

            const abrirInfo=()=> $(".info-box").fadeIn(600).css("display","flex")
            const fecharInfo=()=>  $(".info-box").fadeOut(600)
            
            $("[fechar-box-info]").click(fecharInfo)
            document.querySelector(".info-box .btn").onclick=e=>abrePost(e)
            
            abrirInfo() 
    })
}

/*
** Abre o post para leitura comentarios e avaliações.
** Incompleto*************************************
*/
function abrePost(e){
    e.preventDefault()
    location.hash="#/description.html"
    $(".info-box").fadeOut(600)
    let id=e.target.parentElement.getAttribute("id")
    $(document).ready(()=>{
        getInfo(id)
        .then(resp=>{
            let titulo=resp.titulo
            let descricao=resp.descricao
            let resenha=resp.resenha
            $("[post] h1").html(titulo)
            $("[post] h5").html(descricao)
            $("[post] main").html(resenha)     
        })
    }) 
}
/** Função para carregar os comentários e avaliações do post em exibição para leitura */
function carregaComentariosPost(post){
    
}

/** Promisse a ser retornada quando uma informação de filme for solicitada */
function getInfo(id){    
    return new Promise((resolve,reject)=>{
        fetch(`/lastposts/${id}` )
        .then(res=>res.json())
            .then(resp=>{  
                if(resp==undefined){
                    reject("erro");return;
                }
                else{
                    resolve(resp)
                }
            }) 
    })
}

// Função de simulação de troca de filmes
function trocaListaDeFilmes(elem){
    let pagina="0"
    if(elem){
        pagina=elem.target.id
    }

    
    //busca no banco por esta parte de fimes e troca
    //simulacao
    const filmes=[
        [{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        },{
            nome:"Filmes1",
            img:"url('assets/imgs/blackpantherP.jpg')"
        }],[{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        },{
            nome:"Filmes2",
            img:"url('assets/imgs/getoutP.jpg')"
        }]
    ]

    const allfilmes=$("[ms-other-movies] .movie")
    
    allfilmes.each((i,e)=>{

        e.style.doisplay="flex"
        const movie=filmes[pagina][i]
        if(movie){

            e.style.display="block"
            e.style.backgroundImage= movie.img
        }
        else{
            e.style.display="none"
        }
    })
    
}



/** A cada troca de página no catálogo de filmes a função de atualização e preenchimento é chamada */
$(document).on("change",".pagina-filmes",fillAllMovies)