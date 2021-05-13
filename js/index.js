const inputTask = document.getElementById('inputTask'); //input de texto
const newTaskBtn = document.getElementById('AddBtn');// boton
const taskContainer = document.getElementById('taskContainer'); //donde aparecen las tareas
const toDo = document.getElementById('toDo');
const Doing = document.getElementById('Doing');
const Done = document.getElementById('Done');

const db = firebase.database();

//funciones

registrarTarea = () => {

    if (inputTask.value === ''){
        alety('No se ha registrado tarea');
        return;
    }

    let reference = db.ref('tareas').push();
    let publyTask = {
        id: reference.key,
        nivel: 1,
        tarea: inputTask.value, 
    };

    reference.set(publyTask);

    inputTask.value='';
}

newTaskBtn.addEventListener('click', registrarTarea); //boton que sube las tareas a firebase

//lectura
db.ref('tareas').on('value', function(data) {
    taskContainer.innerHTML = ''; //para que se borren las tareas con cada cambio
    data.forEach(
        publyTask => {
            let valor = publyTask.val();
            
            if(valor.nivel === 1){
                toDo.value='';
                let bloqueTarea = new Task(valor);
                toDo.appendChild(bloqueTarea.render());
                
            }

            if(valor.nivel === 2){
                Doing.value='';
                let bloqueTarea = new Task(valor);
                Doing.appendChild(bloqueTarea.render());
            }

            if(valor.nivel === 3){
                Done.value='';
                let bloqueTarea = new Task(valor);
                Done.appendChild(bloqueTarea.render());
            }
           
        }
    )

});