//--- verificação de sessão.
let sectionUser=false;




/*
** Navegação-- ainda pode se fazer uma funcao para marcar os links visitados 
** Controla a troca de páginas por meio de hash e controla o tamanho do header das paginas.
*/
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
                   
                }).then(()=>{
                    validaAjax()
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


//valida a hash da pagina ajax carregada e carrega seus recursos js
function validaAjax(){
    if(location.hash.split("/")[1]=="movie"){
        abrePost(window.location.hash.split("/")[2]);
    }else if(location.hash=="#/main.html"){
        carregaPrimeirosPosts(); 
    }else if(location.hash=="#/others.html"){
        fillAllMovies();
    }
}

/** Tentar substituir por algo mais efetivo ou funcional*/
function ajaxPages(){
    $(document).ready(function(){
        $(document).on('click', '.mainMovie', abrirInformacoes)
        $(document).on('click', '.movie', abrirInformacoes)
        $(document).on("change","[ms-other-search] .pagina-filmes",trocaListaDeFilmes)  
        $(document).on("click","[ms-other-comments] .btn", postarComentario) 

        $(document).on("click",".avaliacao",(e)=>$(e.target).css("background-color","white")   )
        
    })  
    setTimeout(() => {
       trocaListaDeFilmes()     
    }, 300);
}

/**Valida se a variavel de sessão já foi setada. Se não valida o usuário e altera a hash de localização. */
sectionUser==false ? validaUser(): window.location.hash="#/main.html"

