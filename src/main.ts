import './style.css';
interface Todo {
  title: string,
  isCompleted: boolean,
  readonly id: string
}

const todoArray: Todo[] = [];

const todoContainer = document.querySelector('.todo-container') as HTMLDivElement;

const todoInput = document.getElementsByName('title')[0] as HTMLInputElement;

const myForm = document.getElementById('my-form') as HTMLFormElement;

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement('div');
  todo.className = "todo";
  const checkbox: HTMLInputElement = document.createElement('input');
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "isCompleted";
  checkbox.checked = isCompleted;
  checkbox.onchange = () => {
    paragraph.className = checkbox.checked ? "textCut" : "";
  }

  const paragraph: HTMLParagraphElement = document.createElement('p');
  paragraph.innerText = title
  const btn: HTMLButtonElement = document.createElement('button');
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  }

  todo.append(checkbox, paragraph, btn);
  todoContainer.append(todo);

}

const renderTodo = (todoArray: Todo[]): void => {
  todoArray.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  })
}

const deleteTodo = (id: string) => {
  const idx = todoArray.findIndex(item => item.id === id);
  todoArray.splice(idx, 1);
  renderTodo(todoArray);
}
myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: (Math.round(Math.random() * 10000)).toString()
  }
  todoArray.push(todo);
  todoInput.value = "";
  console.log(todoArray);
  todoContainer.innerText = ""
  renderTodo(todoArray);
}

