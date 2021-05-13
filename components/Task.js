class Task {

    constructor(publyTask){
        this.publyTask = publyTask;
    }

    render = () => {
        let component = document.createElement('div');
        component.className = 'bloqueTarea';

        let nombreTarea = document.createElement('div'); //nombre tarea
        nombreTarea.className = 'nombreTareas';
        nombreTarea.innerHTML = this.publyTask.tarea;

        //tiempo de subida

        let botonBorrar = document.createElement('button');//boton borrar
        botonBorrar.className = "botonEliminar";
        botonBorrar.innerHTML = "X";

        let botonSubir = document.createElement('button');//boton derecho
        botonSubir.className = "botonSubirRango";
        botonSubir.innerHTML = ">";

        let botonBajar = document.createElement('button');//boton izquierdo
        botonBajar.className = "botonBajarRango";
        botonBajar.innerHTML = "<";

        switch (this.publyTask.nivel){
            case 1:

                component.appendChild(nombreTarea);
                component.appendChild(botonBorrar);
                component.appendChild(botonSubir);
            break;
            case 2:

                component.appendChild(nombreTarea);
                component.appendChild(botonBorrar);
                component.appendChild(botonSubir);
                component.appendChild(botonBajar);
                break;
            case 3:

                component.appendChild(nombreTarea);
                component.appendChild(botonBorrar);
                component.appendChild(botonBajar);


        }

    

        botonBorrar.addEventListener('click', ()=>{
            const database = firebase.database();

            database.ref('tareas/'+this.publyTask.id).set(null);
        });

        botonSubir.addEventListener('click', ()=>{
            const database = firebase.database();

                this.publyTask.nivel++;
                database.ref('tareas/'+this.publyTask.id).set(this.publyTask);
                    
        });


        botonBajar.addEventListener('click', ()=>{
            const database = firebase.database();

            this.publyTask.nivel--;
                database.ref('tareas/'+this.publyTask.id).set(this.publyTask);

        });

        return component;
        
    }
}