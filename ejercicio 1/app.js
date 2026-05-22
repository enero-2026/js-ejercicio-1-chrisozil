// 1. Selección de elementos del DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const pendingCounter = document.getElementById('pending-counter');
const errorMsg = document.getElementById('error-msg');

// Array para manejar el estado de las tareas (Estructura lógica separada del DOM)
let todos = [];

// Cargar tareas desde LocalStorage al iniciar (Mejora de IA 1)
document.addEventListener('DOMContentLoaded', () => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    }
});

// 2. Manejo del Evento de Enviar Formulario (Requisito 2)
todoForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita recargar la página (Consideraciones de la rúbrica)
    
    const taskText = todoInput.value.trim();

    // Validación visual (Mejora de IA 2)
    if (taskText === "") {
        errorMsg.classList.add('show');
        return;
    }
    errorMsg.classList.remove('show');

    // Crear el objeto de la nueva tarea
    const newTodo = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    todos.push(newTodo);
    saveAndUpdate();
    
    todoInput.value = ''; // Limpiar el input
});

// 3. Función principal para renderizar los elementos en el DOM
function renderTodos() {
    todoList.innerHTML = ''; // Limpiar lista visualmente antes de renderizar

    todos.forEach(todo => {
        // Uso de createElement
        const li = document.createElement('li');
        li.classList.add('todo-item');
        if (todo.completed) {
            li.classList.add('completed');
        }

        const spanText = document.createElement('span');
        spanText.classList.add('todo-text');
        spanText.textContent = todo.text;
        
        // Evento para Marcar como Completada (Requisito 3)
        spanText.addEventListener('click', () => {
            todo.completed = !todo.completed;
            saveAndUpdate();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&times;'; // Icono de x
        
        // Evento para Eliminar Tarea (Requisito 4)
        deleteBtn.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            saveAndUpdate();
        });

        // Uso de appendChild
        li.appendChild(spanText);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    updateCounter();
}

// 4. Actualizar el contador de tareas pendientes (Requisito 5)
function updateCounter() {
    const pendingTasks = todos.filter(todo => !todo.completed).length;
    pendingCounter.textContent = pendingTasks;
}

// 5. Sincronizar cambios (LocalStorage y vista)
function saveAndUpdate() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}