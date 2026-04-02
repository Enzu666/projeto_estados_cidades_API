/********************************************************************************************************
 * Objetivo: Arquivo responsável pela criação de API do projeto de Estados e Cidades
 * Data: 01/04/2026
 * Autor: Enzo
 * Versão: 1.0
 * 
 * Instalação do Express - npm install express --save
 *      Dependência responsável pela ultilização do protocolo HTTP para criar um API
 * 
 * Instalação do Cors - npm install cors --save
 *      Dependência responsável pelas configurações a serem realizadas para a permissão de acesso da API
*********************************************************************************************************/

//import das dependências para criar a API

const express   = require('express')
const cors = require('cors')

//criando um objeto para manipular o express 
const app = express()

//conjunto de permissões a serem aplicadas no cors da api
const corsOptions = {
    origin : ['*'], //A origem da requisição, podendo ser um ip ou o * (todos)
    methods: 'GET', //verbos que serão liberados na API (GET, POST, PUT e DELETE)
    allowedHeaders: ['Content type', 'Autorization'], //allowedHeaders são permissões de cabeçalho de CORS
}

//configura as permissões da api através do cors
app.use(cors(corsOptions))

//request -> Retornos de API
//require -> Chegadas de dados da API

//import do arquivo de funções
const estadosCidades = require('./modulo/array_jason.js')

//criando EndPoints para a API
app.get('/v1/senai/estados', function(request, response){

    //chama a função que retorna a lista de estados
    let estados = estadosCidades.getListaDeEstados()

    response.json(estados)
    response.status('200')
})

app.get('/v1/senai/dados/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let dadosEstados = estadosCidades.getDadosEstado(sigla)
    
    if(dadosEstados){
        response.json(dadosEstados)
        response.status(200)
    }else{
        response.json({"message": "erro na url"})
        response.status(404)
    }
})

app.get('/v1/senai/capital/estados/:uf', function(request, response){
    let sigla = request.params.uf
    let capital = estadosCidades.getCapitalEstado(sigla)
    
    if(capital){
        response.json(capital)
        response.status('200')
    }else{
        response.json({"message": "erro na url"})
        response.status(404)
    }
})

app.get('/v1/senai/regiao/estados/:regiao', function(request, response){
    let regiao = request.params.regiao
    let regioes = estadosCidades.getEstadosRegiao(regiao)
    
    if(regioes){
        response.json(regioes)
        response.status('200')
    }else{
        response.json({"message": "erro na url"})
        response.status(404)
    }
    
})

app.get('/v1/senai/capitais/brasil', function(request, response){
    let capitais = estadosCidades.getCapitalPais()
    response.json(capitais)
    response.status('200')
})

app.get('/v1/senai/cidades/:uf', function(request, response){

    let sigla = request.params.uf
    let cidades = estadosCidades.getCidades(sigla)

    if(cidades){
        response.json(cidades)
        response.status(200)
    }else{
        response.json({"message": "erro na url"})
        response.status(404)
    }
})

app.get('/v1/senai/help', function(request, response){
    let docAPI = {
        "API-descripition": "API para manipular dados de Estados e Cidades",
        "Date": "2026-04-02",
        "Development": "Enzo",
        "Version": "1.0",
        "Endpoints": [
            {   "id": 1,
                "Rota 1": "/v1/senai/estados",
                "obs": "retorna a lista de todos os estados"
            },
            {
                "id": 2,
                "Rota 2": "/v1/senai/dados/estado/sp",
                "obs": "retorna os dados do estado, filtrando pela sigla do estado"
            },
            {
                "id": 3,
                "Rota 3": "/v1/senai/capital/estados/rj",
                "obs": "retorna a capital do estado, filtrando pela sigla do estado"
            },
            {
                "id": 4,
                "Rota 4": "/v1/senai/regiao/estados/sul",
                "obs": "retorna os estados, filtrando pela região"
            },
            {
                "id": 5,
                "Rota 5": "/v1/senai/capitais/brasil",
                "obs": "retorna os estados que já foram capitais do Brasil"
            },
            {
                "id": 6,
                "Rota 6": "/v1/senai/cidades/am",
                "obs": "retorna as cidades, filtrado pelo estado"
            }
        ]
    }
    response.status(200)
    response.json(docAPI)
})

app.listen(8080, function(){
    console.log('API funcionando')
})