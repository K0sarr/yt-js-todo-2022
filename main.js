window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const userName = localStorage.getItem('username') || ''; // Saving username to localstorage

    nameInput.value = userName; // Users input name is being saved to userName var.

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    });

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value, // Get users input from content
            category: e.target.elements.category.value, // Get users category input
            done: false, 
            createdAt: new Date().getTime() // Get Time
        };

        todos.push(todo);  // Push the todo with user values.
        localStorage.setItem('todos', JSON.stringify(todos)); // Save users todo to LocalStorage in string
        e.target.reset(); // Reset Form

        DisplayTodos();
    });
    
    DisplayTodos();
});

function DisplayTodos() {
    const todosList = document.querySelector('#todo-list');

    todosList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        // ADD ui for each todo
        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button'); // Adding button to the todo
        const deleteButton = document.createElement('button'); // Adding button to the todo

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble'); // Added checkbox bubble

        if (todo.category == 'personal') {
            span.classList.add('personal');
        } else {
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');  // Adding button to the todo
        deleteButton.classList.add('delete');  // Adding button to the todo

        content.innerHTML = `<input type="text" value="${todo.content}"
        readonly>`;
        edit.innerHTML = 'Edit'; // Creating text for button
        deleteButton.innerHTML = 'Delete'; // Creating text for button

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todosList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        });

        // Adding edit functionality
        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
            })
        })
         // Adding delete functionality
         deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
         });

    })
}



