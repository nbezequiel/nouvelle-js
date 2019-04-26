$(document).on("click",".label-escolha button",adicionaAvaliacao)

function adicionaAvaliacao(e){
    let btn=e.target.getAttribute("name");
    fetch("/rating",{method:"post"})
        .then(()=>console.log("a"))
    
}