"use strict";
"use strict";

$(".avaliacao").click(function (e) {});
"use strict";
"use strict";

var validaUser = function validaUser() {
    var user = lerCookie("user");
    var pass = lerCookie("pass");
    var dados = new FormData();
    dados.append("login", user);
    dados.append("senha", pass);
    buscaUsuario(dados).then(function (resp) {
        if (resp.access == true) {
            login();
        }
    });
};

function lerCookie(chave) {
    var cookies = String(document.cookie).split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var info = cookies[i].split("=");
        if (chave === info[0]) {
            return info[1];
        }
    }
    return null;
}

function criarCookie(chave, valor) {
    var data = new Date();
    data.setTime(data.getDate + 20);
    document.cookie = chave + "=" + valor + "; expires=" + data.toUTCString() + "; path=/";
    console.log("Sucesso");
}

$(document).on("click", "#btn-logar", function (e) {
    e.preventDefault();
    var dados = new FormData(formlogin);
    buscaUsuario(dados).then(function () {
        criarCookie("user", dados.get("login"));
        criarCookie("pass", dados.get("senha"));
    }).then(login);
});

var buscaUsuario = function buscaUsuario(form) {
    var status = false;

    var options = {
        method: "POST",
        body: new URLSearchParams(form)
    };
    return new Promise(function (resolve, reject) {
        fetch("/makelogin", options).then(function (resp) {
            return resp.json();
        }).then(function (conteudo) {
            if (conteudo == undefined) {
                reject("erro");return;
            } else {
                resolve(conteudo);
            }
        });
    });
};

var login = function login() {
    sectionUser = true;
    window.location.href = "#/main.html";
    UserLoggedPage();
    return true;
};

var UserLoggedPage = function UserLoggedPage() {
    $(".btn.login").hide();
    $("#menu").append("<img class='profile-pic' src='assets/imgs/blackpantherP.jpg'>");
};
"use strict";

function getPosts() {
    return new Promise(function (resolve, reject) {
        fetch("/lastposts").then(function (res) {
            return res.json();
        }).then(function (resp) {
            if (resp == undefined) {
                reject("erro");return;
            } else {
                resolve(resp);
            }
        });
    });
}

function carregaPrimeirosPosts() {
    getPosts().then(function (resp) {
        var elementos = document.querySelectorAll(".mainmovie div");
        for (var i = 0; i < 9; i++) {
            try {
                elementos[i].parentElement.setAttribute("id", resp[i].id);
                elementos[i].firstElementChild.innerHTML = resp[i].titulo;
                elementos[i].lastElementChild.innerHTML = resp[i].descricao;
                elementos[i].parentElement.style.backgroundImage = resp[i].imagem;
            } catch (err) {}
        }
    });
    fillMainMovieAndSerie().then(function (resp) {
        var posters = document.querySelectorAll("section");
        for (var i = 0; i < 2; i++) {

            var img = resp[i].imagem.replace("url(\'", "").replace("\')", "");
            posters[i + 1].firstElementChild.innerHTML = resp[i].titulo;
            posters[i + 1].children[1].setAttribute("src", "" + img);
            posters[i + 1].setAttribute("id", resp[i].id);
            var comentarios = document.querySelectorAll("." + posters[i + 1].className + " .comentario");
            try {
                for (var j = 0; j < comentarios.length; j++) {
                    comentarios[j].firstElementChild.innerHTML = resp[i].comentarios[j].nome;
                    comentarios[j].lastElementChild.innerHTML = resp[i].comentarios[j].commentario;
                    comentarios[j].previousElementSibling.setAttribute("src", "" + resp[i].comentarios[j].fotoperfil);
                }
            } catch (err) {}
        }
    });
}

function getAllPosts(page) {
    console.log(page);
    return new Promise(function (resolve, reject) {
        fetch("/allposts/" + page).then(function (res) {
            return res.json();
        }).then(function (resp) {
            if (resp == undefined) {
                reject("erro");return;
            } else {
                resolve(resp);
            }
        });
    });
}

function fillAllMovies(e) {
    if (e) {
        var elem = e.target;
        getAllPosts(elem.getAttribute("id")).then(function (resp) {
            var movies = document.querySelectorAll(".movie");
        });
    } else {
        getAllPosts(String(0)).then(function (resp) {
            var movies = document.querySelectorAll(".movie");
        });
    }
}
$(document).on("load", "[ms-main-comment]", function () {
    return console.log("dsadasd");
});

function abrirInformacoes(e) {
    getInfo(e.target.parentElement.getAttribute("id")).then(function (resp) {
        var id = resp.id;
        var titulo = resp.titulo;
        var img = resp.imagem.substr(16).replace("')", "");
        var atores = resp.atores;
        var diretores = resp.diretores;
        var resenha = resp.resenha.substr(0, 200) + "...";

        $(".info-box .informacoes h1").html(titulo);
        $(".info-box .informacoes img").attr("src", "assets/imgs" + img);
        $(".info-box .informacoes [atores]").html(atores);
        $(".info-box .informacoes [diretores]").html(diretores);
        $(".info-box .informacoes [resenha]").html(resenha);
        $(".info-box .informacoes").attr("id", id);

        var abrirInfo = function abrirInfo() {
            return $(".info-box").fadeIn(600).css("display", "flex");
        };
        var fecharInfo = function fecharInfo() {
            return $(".info-box").fadeOut(600);
        };

        $("[fechar-box-info]").click(fecharInfo);
        document.querySelector(".info-box .btn").onclick = function (elem) {
            location.hash = "#/movie/" + id;
            elem.preventDefault();
        };

        abrirInfo();
    });
}

function abrePost(id) {

    $(".info-box").fadeOut(600);

    $(document).ready(function () {

        function a() {
            getInfo(window.location.hash.split("/")[2]).then(function (resp) {

                var titulo = resp.titulo;
                var descricao = resp.descricao;
                var resenha = resp.resenha;
                $("[post] h1").html(titulo);
                $("[post] h5").html(descricao);
                $("[post] main").html(resenha);
                $("[post] header").css("background", "" + resp.imagem);
                adicionaComentarios(resp.comentarios);
                var rating = calculaRating(resp.avaliacoes);
                preencheRating(rating);
            });
        }
        a();
    });
}
function adicionaComentarios(comentarios) {
    comentarios.forEach(function (comment) {
        $(".comentarios").append("<article id=\"" + comment.id + "\">\n        <img class=\"profile-pic other\" src=\"" + comment.fotoperfil + "\" alt=\"\">\n        <p class=\"nome\">" + comment.nome + "</p>\n        <p>" + comment.commentario + "</p>\n        <div class=\"avaliacao-box\">\n            <button class=\"avaliacao\"></button>\n            <button class=\"avaliacao\"></button>\n        </div>\n    </article>");
    });
}
function calculaRating(avaliacoes) {
    var objRating = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, sum: 0 };
    avaliacoes.forEach(function (aval) {
        objRating[aval.nivel] += 1;
        objRating.sum += 1;
    });
    return objRating;
}

function preencheRating(rating) {
    $(".aval-progress").each(function (i, barra) {
        var porcentBarra = rating[5 - i] * 100 / rating.sum;
        $(barra).css("width", porcentBarra + "%");
        $(barra).after($("<h4 class=\"percent\">" + porcentBarra.toFixed(2) + "%</h4>"));
    });
}

function carregaComentariosPost(post) {}

function getInfo(id) {
    return new Promise(function (resolve, reject) {
        fetch("/lastposts/" + id).then(function (res) {
            return res.json();
        }).then(function (resp) {
            if (resp == undefined) {
                reject("erro");return;
            } else {
                resolve(resp);
            }
        });
    });
}

function trocaListaDeFilmes(elem) {
    var pagina = "0";
    if (elem) {
        pagina = elem.target.id;
    }

    fetch("/getPage/" + pagina).then(function (resp) {
        return resp.json();
    }).then(function (filmes) {

        var allfilmes = $("[ms-other-movies] .movie");
        allfilmes.each(function (i, e) {
            e.style.doisplay = "flex";
            var movie = filmes[i];

            if (movie) {
                e.parentNode.style.display = "block";
                e.parentNode.setAttribute("id", movie.id);
                e.style.backgroundImage = movie.imagem;
            } else {
                e.parentElement.style.display = "none";
            }
        });
    });
}

function fillMainMovieAndSerie() {
    return new Promise(function (resolve, reject) {
        fetch("/mainmovieserie").then(function (res) {
            return res.json();
        }).then(function (resp) {
            if (resp == undefined) {
                reject("erro");return;
            } else {
                resolve(resp);
            }
        });
    });
}

function avaliarFilme() {}

$(document).on("change", ".pagina-filmes", fillAllMovies);
"use strict";
"use strict";

var sectionUser = false;

(function () {

    function reduzHeader(hash) {
        var cabecalho = document.querySelector("#cabecalho");
        var menu = document.querySelector("#menu");
        var rodape = document.querySelector("#rodape");
        var conteudo = document.querySelector("#conteudo");
        var docs = document.querySelectorAll("body,html");

        if (hash == "#/login.html") {
            cabecalho.style.display = "none";
            rodape.style.display = "none";
            menu.style.display = "none";
            conteudo.style.height = "100%";
            docs[1].style.padding = "0";
            docs[0].style.padding = "0";
        } else {
            cabecalho.style.display = "flex";
            menu.style.display = "flex";
            rodape.style.display = "grid";
            docs[1].style.paddingTop = "0";
            conteudo.style.height = "auto";
            docs[0].style.paddingTop = "0";
        }
        if (hash != "#/main.html") {
            cabecalho.style.height = "45%";
        } else {
            cabecalho.style.height = "70%";
        }
    }
    function trocarPagina(hash) {
        reduzHeader(hash);

        var conteudo = document.querySelector("#conteudo");
        var navegarUrl = hash.substring(1);
        fetch(navegarUrl).then(function (resp) {
            return resp.text();
        }).then(function (html) {

            conteudo.innerHTML = html;
        }).then(function () {
            validaAjax();
        });
        ajaxPages();
    }
    function iniciaSite() {
        if (location.hash) {
            trocarPagina(location.hash);
        } else {
            var inicial = "#/main.html";
            location.pathname == "/login.html" ? null : trocarPagina(inicial);
        }
    }

    window.onhashchange = function (e) {
        return trocarPagina(location.hash);
    };
    iniciaSite();
})();

function validaAjax() {
    if (location.hash.split("/")[1] == "movie") {
        abrePost(window.location.hash.split("/")[2]);
    } else if (location.hash == "#/main.html") {
        carregaPrimeirosPosts();
    } else if (location.hash == "#/others.html") {
        fillAllMovies();
    }
}

function ajaxPages() {
    $(document).ready(function () {
        $(document).on('click', '.mainMovie', abrirInformacoes);
        $(document).on('click', '.movie', abrirInformacoes);
        $(document).on("change", "[ms-other-search] .pagina-filmes", trocaListaDeFilmes);

        $(document).on("click", ".avaliacao", function (e) {
            return $(e.target).css("background-color", "white");
        });
    });
    setTimeout(function () {
        trocaListaDeFilmes();
    }, 300);
}

sectionUser == false ? validaUser() : window.location.hash = "#/main.html";
"use strict";