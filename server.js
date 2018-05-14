const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
mongoose.connect('mongodb://localhost/rest');
app.use(bodyParser.json());
app.use(express.static( __dirname + '/restfulangularz/dist/restfulangularz' ));

// db stuff
const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, default: ""},
    completed: {type: Boolean, default: false}
},{timestamps: true});

const Task = mongoose.model('Task', TaskSchema);

// handle the things!
app.get('/tasks', function(request, response){
    Task.find({}, function(errs, data){
        if(errs){
            console.log('we got errors:');
            console.log(errs);
        } else {
            response.json(data);
        }
    })
});

app.get('/tasks/:id', function(request, response){
    var id = new mongoose.Types.ObjectId(request.params.id);
    Task.findById(id, function(errs, data){
        if(errs){
            console.log('got errors');
            console.log(errs);
        }else{
            console.log(data);
            response.json(data);
        }
    })
});

app.post('/tasks', function(request, response){
    console.log('we hit the post route')
    let newTask = new Task(request.body);
    newTask.save(function(errs){
        if(errs){
            console.log('Hello, I am the post route console log for errs');
            console.log(errs);
        }else{
            console.log("hit that POST homie")
        response.json({status: 'everything went okay!'});
    }
    });
});

app.put('/tasks/:id', function(request, response){
    Task.update({_id: mongoose.Types.ObjectId(request.params.id)},request.body,function(errs, data){
        if(errs){
            console.log('fail army');
            console.log(errs);
        }else{
            console.log('updated');
            console.log(data);
            response.json({status: 'gucci'});
        }
    })
});

app.delete('/tasks/:id', function(request, response){
    var id = mongoose.Types.ObjectId(request.params.id);
    Task.remove({_id: id}, function(errs){
        if(errs){
            console.log(errs);
            response.json({status: 'not gucci'});
        }
    });
    response.json({status: 'gucci'});
})





app.listen(8000, function(){
    console.log('Listening to old school rap on localhost 8000');
});
