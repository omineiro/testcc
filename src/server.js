const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')();
const path = require('path');

let tokens = [];

let courses = [
        { id: 1, name: 'Filosofia', dateCreation: '11/12/2018', teacher: 'Roberto' },
        { id: 2, name: 'Historia', dateCreation: '11/12/2018', teacher: 'Carlos' },
        { id: 3, name: 'Sistemas', dateCreation: '11/12/2018', teacher: 'Ronaldo' },
        { id: 4, name: 'Matematica', dateCreation: '11/12/2018', teacher: 'Cafu' },
        { id: 5, name: 'Portugues', dateCreation: '11/12/2018', teacher: 'Alexandre' },
        { id: 6, name: 'Direito', dateCreation: '11/12/2018', teacher: 'Felipe' }
]

let alunos = [
    { id: 1, name: 'João', nascimento: '11/12/2018', cursoid: 1, email: 'ce@a.com.br' },
    { id: 2, name: 'Maria', nascimento: '11/12/2018', cursoid: 2, email: 'ce@a.com.br' },
    { id: 3, name: 'Josefina', nascimento: '11/12/2018', cursoid: 3, email: 'ce@a.com.br' },
    { id: 4, name: 'Josefá', nascimento: '11/12/2018', cursoid: 4, email: 'ce@a.com.br' },
    { id: 5, name: 'Roberta', nascimento: '11/12/2018', cursoid: 4, email: 'ce@a.com.br' },
    { id: 6, name: 'Robervalda', nascimento: '11/12/2018', cursoid: 5, email: 'ce@a.com.br' },
    { id: 7, name: 'Jucilei', nascimento: '11/12/2018', cursoid: 5, email: 'ce@a.com.br' },
    { id: 8, name: 'Carlos', nascimento: '11/12/2018', cursoid: 6, email: 'ce@a.com.br' },
    { id: 9, name: 'Estevão', nascimento: '11/12/2018', cursoid: 6, email: 'ce@a.com.br' },
    { id: 10, name: 'Maicon', nascimento: '11/12/2018', cursoid: 6, email: 'ce@a.com.br' },
    { id: 11, name: 'Paulo', nascimento: '11/12/2018', cursoid: 4, email: 'ce@a.com.br' },
    { id: 67, name: 'Caio', nascimento: '11/12/2018', cursoid: 3, email: 'ce@a.com.br' }
]

app = express();

app.use(cors);
app.options('*', cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// arquivos estáticos
app.use(express.static('./dist/apptcc'));

app.get('/*', function(req,res) {
    res.sendFile(path.join('./dist/apptcc/index.html'));
});

// Start server
app.listen(process.env.PORT || 4201, () => { console.log('Running in port 4201')});


app.get('/api/menu', function (request, response) {
    const menus = [
        { name: 'Cursos', rota: 'cursos/busca' },
        { name: 'Alunos', rota: 'alunos'}
    ];
    response.json(menus);
})

app.get('/api/courses/search-by-id/:id', function (request, response) {
    const _id = request.params.id;
    
    let searchCourseByID = courses.find(courseWithID => {
        return courseWithID.id == _id;
    })
    response.json(searchCourseByID);
})

app.get('/api/courses/all', function(request, response) {
    response.json(courses)
})

app.get('/api/courses/search-by-name/:name', function (request, response) {
    const name = request.params.name;

    let _courses = courses.filter(course => {
        return course.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    })
    response.json(_courses);
})

app.put('/api/courses/update', function(request, response) {
    const curso = request.body;
    let courseModify;
    for(let index = 0; index<=courses.length; index++){
        if(courses[index].id == curso.id){
            courseModify = courses[index];
            courseModify.name = curso.name
            courseModify.teacher = curso.teacher
            courseModify.dateCreation = curso.dateCreation;
            break;
        }
    }
    response.json({state: 'success'});
})

app.delete('/api/courses/remove/:id', function(request, response){
    const _id = request.params.id

    let index = courses.findIndex(course => {
        return course.id == _id;
    })
    courses.splice(index, 1)
    response.json({state: 'success'})
    
})

app.post('/api/course/new', function(request, response){
    const body = request.body
    body.id = 999;
    
    courses.push(body)
    response.json({state: 'success'})
})

/**
 * API DE ALUNOS
 */

app.get('/api/alunos/search-by-id/:id', function (request, response) {
    const _id = request.params.id;
    
    let searchAlunoByID = alunos.find(alunoWithID => {
        return alunoWithID.id == _id;
    })
    response.json(searchAlunoByID);
})

app.get('/api/alunos/search-by-name/:name', function (request, response) {
    const name = request.params.name;

    let _alunos = alunos.filter(aluno => {
        return aluno.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
    })
    response.json(_alunos);
})

app.put('/api/alunos/update', function(request, response) {
    const aluno = request.body;

    let alunoModify;
    for(let index = 0; index<=alunos.length; index++){
        if(alunos[index].id == aluno.id){
            alunoModify = alunos[index];
            alunoModify.name = aluno.name
            alunoModify.nascimento = aluno.nascimento
            alunoModify.cursoid = aluno.cursoid;
            break;
        }
    }
    response.json({state: 'success'});
})

app.delete('/api/alunos/remove/:id', function(request, response){
    const _id = request.params.id

    let index = alunos.findIndex(aluno => {
        return aluno.id == _id;
    })
    alunos.splice(index, 1)
    response.json({state: 'success'})
    
})

app.post('/api/aluno/new', function(request, response){
    const body = request.body
    body.id = 999;
    alunos.push(body)
    response.json({state: 'success'})
})

