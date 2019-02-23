let sectionUser=false
let x;
const validaUser=()=>{
    const user=lerCookie("user")
    const pass=lerCookie("pass")
    const dados=new FormData()
    dados.append("login",user)
    dados.append("senha",pass)
    buscaUsuario(dados)
        .then(resp=>{
            x=resp
            if(resp.access==true){
                login()
            }
        })
        
    
}

function criarCookie(chave,valor){
    var data=new Date()
    data.setTime(data.getDate+20)
    document.cookie=chave+"="+valor+"; expires="+data.toUTCString()+"; path=/"
    console.log("Sucesso")
}


function lerCookie(chave){
    let cookies=String(document.cookie).split("; ")
    for(let i=0;i<cookies.length;i++){
        let info=cookies[i].split("=")
        if(chave ===info[0]){
            return info[1]
        }
    }
    return null
}



//Navegação// ainda pode se fazer uma funcao para marcar os links visitados
//funcao para reduzir o header
(function (){

    function reduzHeader(hash){
        const cabecalho=document.querySelector("#cabecalho")
        const menu=document.querySelector("#menu")
        const rodape=document.querySelector("#rodape")
        const conteudo=document.querySelector("#conteudo")
        const docs =document.querySelectorAll("body,html");

        if(hash=="#/login.html"){
            cabecalho.style.display="none";
            rodape.style.display="none";
            menu.style.display="none";
            conteudo.style.height="100%";
            docs[1].style.padding="0";
            docs[0].style.padding="0";
        }
        else{
            cabecalho.style.display="flex";
            menu.style.display="flex";
            rodape.style.display="grid";
            docs[1].style.paddingTop="0";
            conteudo.style.height="auto"
            docs[0].style.paddingTop="0";
        }
        if(hash!="#/main.html" ){
            cabecalho.style.height="45%";
        }else{
            cabecalho.style.height="70%";
        }
    }
    function trocarPagina(hash){
        reduzHeader(hash)

        const conteudo=document.querySelector("#conteudo")
        const navegarUrl=hash.substring(1)
        fetch(navegarUrl)
            .then(resp=>resp.text())
                .then(html=>{
                    conteudo.innerHTML=html
                })
                  ajaxPages()   
        
    }

    function iniciaSite(){
        if(location.hash){
            trocarPagina(location.hash)
        }
        else{
            let inicial="#/main.html"
            location.pathname =="/login.html" ? null:trocarPagina(inicial)
        }
    }
    
    window.onhashchange= e=>trocarPagina(location.hash)
    iniciaSite()
})()

function abrirInformacoes(e){

    getPosts2(e.target.parentElement.getAttribute("id"))
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

function abrePost(e){
    e.preventDefault()
    location.hash="#/description.html"
    $(".info-box").fadeOut(600)
    let id=e.target.parentElement.getAttribute("id")
    $(document).ready(()=>{
        getPosts2(id)
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

function carregaComentariosPost(post){
    
}
function getPosts2(id){    
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




//tentar substituir por algo que não seja um gambiarra
function ajaxPages(){
    $(document).ready(function(){
        
        $(document).on('click', '.movie', abrirInformacoes)
        $(document).on("change","[ms-other-search] .pagina-filmes",trocaListaDeFilmes)    
        trocaListaDeFilmes()

        $(document).on("click",".avaliacao",(e)=>$(e.target).css("background-color","white")   )
        if(location.hash=="#/main.html"){
           carregaPrimeirosPosts(); 
        }
        else if(location.hash=="#/others.html"){
            fillAllMovies();
        }
    })  
    setTimeout(() => {
       trocaListaDeFilmes()     
    }, 300);
}

sectionUser==false ? validaUser(): window.location.hash="#/main.html"
location.hash="#/main.html"
