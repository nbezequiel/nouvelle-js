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
                 
             }
         }
    })
}

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

