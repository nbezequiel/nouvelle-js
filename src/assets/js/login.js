//** Dedicada a criação e validação de usuários */



/* 
** Busca por informações de Cookies no armazenamento do navegador.    
** Caso exista, envia um form de validação ao servidor que retorna ou não a sessão.
** Caso retorne, a função login(login.js) é chamada para atualização da página
*/ 
const validaUser=()=>{
    const user=lerCookie("user")
    const pass=lerCookie("pass")
    const dados=new FormData()
    dados.append("login",user)
    dados.append("senha",pass)
    buscaUsuario(dados)
        .then(resp=>{
            if(resp.access==true){
                login()
            }
        })
}

//** Função responsável por ler e retornar os valores de login e senha dos cookies */
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

//** Cria o cookie, no momento que o usuário faz login no site, e define o tempo para a expiração do mesmo */
function criarCookie(chave,valor){
    var data=new Date()
    data.setTime(data.getDate+20)
    document.cookie=chave+"="+valor+"; expires="+data.toUTCString()+"; path=/"
    console.log("Sucesso")
}

/**Função responsável por criar os cookies assim que o usuário se loga no site */
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

//** Busca pelo o usuário no servidor e retorna uma Promisse com a existencia ou não de um usuário para este login e senha */
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

//** Altera a página para que tenha as caracteristicas de página para membros */
const login=()=>{
    sectionUser=true
    window.location.href="#/main.html"
    UserLoggedPage()
    return true
}
//v-v-v-v-v
//**Retira o botão de login e adiciona a foto de perfil do usuário*/
const UserLoggedPage=()=>{
    $(".btn.login").hide()
    $("#menu").append("<img class='profile-pic' src='assets/imgs/blackpantherP.jpg'>")
}





