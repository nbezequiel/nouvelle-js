

$(document).on("click","#btn-logar",(e)=>{
    e.preventDefault()
    let dados=new FormData(formlogin)    
    buscaUsuario(dados)
        .then(()=>{
                criarCookie("user",dados.get("login")) 
                criarCookie("pass",dados.get("senha"))
            })
            .then(login)


})


const login=()=>{
    sectionUser=true
    window.location.href="#/main.html"
    UserLoggedPage()
    return true
}
const buscaUsuario=(form)=>{
    let status=false
    
    const options={
        method:"POST",
        body:new URLSearchParams(form)
    }
    return new Promise((resolve,reject)=>{
        fetch("/makelogin",options)
        .then(resp=>resp.json())
            .then(conteudo=>{
                if(conteudo ==undefined){   
                    reject("erro"); return;
                }
                else{
                    resolve(conteudo)
                }
            })
    })
    
}


const UserLoggedPage=()=>{
    $(".btn.login").hide()
    $("#menu").append("<img class='profile-pic' src='assets/imgs/blackpantherP.jpg'>")
   
}