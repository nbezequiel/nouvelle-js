

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
         for(let i=0;i<9;i++){
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
    fillMainMovieAndSerie()
        .then(resp=>{
            let posters=document.querySelectorAll("section")
            for(let i=0;i<2;i++){

                let img=resp[i].imagem.replace("url(\'","").replace("\')","")
                posters[i+1].firstElementChild.innerHTML=resp[i].titulo
                posters[i+1].children[1].setAttribute("src",`${img}`)
                posters[i+1].setAttribute("id",resp[i].id)
                let comentarios=document.querySelectorAll(`.${posters[i+1].className} .comentario`)
                try{
                    for(let j=0;j<comentarios.length;j++){
                        comentarios[j].firstElementChild.innerHTML=resp[i].comentarios[j].nome;
                        comentarios[j].lastElementChild.innerHTML=resp[i].comentarios[j].commentario;
                        comentarios[j].previousElementSibling.setAttribute("src",`${resp[i].comentarios[j].fotoperfil}`);
                    }
                }
                catch(err){

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
$(document).on("load","[ms-main-comment]",()=>console.log("dsadasd"))

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
            document.querySelector(".info-box .btn").onclick=elem=>{
                location.hash=`#/movie/${id}`
                elem.preventDefault()
                //abrePost(id)
            }
            
            abrirInfo() 
    })
}

/*
** Abre o post para leitura comentarios e avaliações.
** Incompleto*************************************
*/
function abrePost(id){
   
    $(".info-box").fadeOut(600)
    
    $(document).ready(()=>{
        
        function a(){
            getInfo(window.location.hash.split("/")[2])
        .then(resp=>{
           
            let titulo=resp.titulo
            let descricao=resp.descricao
            let resenha=resp.resenha
            $("[post] h1").html(titulo)
            $("[post] h5").html(descricao)
            $("[post] main").html(resenha)  
            $("[post] header").css("background",`${resp.imagem}`)
            adicionaComentarios(resp.comentarios)
            let rating=calculaRating(resp.avaliacoes)
            preencheRating(rating)
        })
        }
        a()
    }) 
}


function postarComentario(elem){
  
    elem.preventDefault()
    let text=document.querySelector(".user-comment").children[1].value 
    $(".comentarios").append(`<article id=>
        <img class="profile-pic other" src="assets/imgs/blackpantherP.jpg" alt="">
        <p class="nome">Nome</p>
        <p>${text}</p>
        <div class="avaliacao-box">
            <button class="avaliacao"></button>
            <button class="avaliacao"></button>
        </div>
    </article>`)
    //função para gravar
    
    window.location.reload();
}

function adicionaComentarios(comentarios){
    comentarios.forEach((comment)=>{
        $(".comentarios").append(`<article id="${comment.id}">
        <img class="profile-pic other" src="${comment.fotoperfil}" alt="">
        <p class="nome">${comment.nome}</p>
        <p>${comment.commentario}</p>
        <div class="avaliacao-box">
            <button class="avaliacao"></button>
            <button class="avaliacao"></button>
        </div>
    </article>`)
    })
}
function calculaRating(avaliacoes){
    const objRating={5:0,4:0,3:0,2:0,1:0,sum:0}
    avaliacoes.forEach(aval => {
        objRating[aval.nivel]+=1
        objRating.sum+=1
    })
    return objRating;
}

function preencheRating(rating){
    $(".aval-progress").each((i,barra)=>{
        let porcentBarra=(rating[5-i]*100)/rating.sum
        $(barra).css("width",`${porcentBarra}%`)
        $(barra).after($(`<h4 class="percent">${porcentBarra.toFixed(2)}%</h4>`))
       
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

    fetch(`/getPage/${pagina}`)
    .then(resp=>resp.json()).then(filmes=>{
       
        const allfilmes=$("[ms-other-movies] .movie")
        allfilmes.each((i,e)=>{
            e.style.doisplay="flex"
            const movie=filmes[i]
            
            if(movie){
                e.parentNode.style.display="block"
                e.parentNode.setAttribute("id",movie.id)
                e.style.backgroundImage= movie.imagem
            }
            else{
                e.parentElement.style.display="none"
            }
        })
    })
}

/**Preencher o principal filme e série do mês */
function fillMainMovieAndSerie(){    
    return new Promise((resolve,reject)=>{
        fetch(`/mainmovieserie` )
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

function avaliarFilme(){
    
}

/** A cada troca de página no catálogo de filmes a função de atualização e preenchimento é chamada */
 $(document).on("change",".pagina-filmes",fillAllMovies)