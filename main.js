const todo_container = document.getElementById("todos")
const add_button = document.getElementById("Add")
const input = document.getElementById("input")

var todos = []

var id_counter = 0

input.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        input_handler()
    }
})

function render() {
    todo_container.replaceChildren()
    todos.forEach((data) => {
        const main_div = document.createElement("div")
        main_div.classList.add("Todo")

        const message = document.createElement("p")
        message.innerText = data.message

        const btn_div = document.createElement("div")
        btn_div.classList.add("btn-container")

        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.id = `btncheck-${data.id}`
        checkbox.classList.add("checkbox")
        checkbox.checked = data.completed

        const completed_label = document.createElement("span")
        completed_label.innerText = data.completed ? "Completed" : "Pending"
        completed_label.classList.add("completed-label")

        const delete_btn = document.createElement("button")
        delete_btn.innerHTML = "Delete"

        delete_btn.classList.add("btn")
        delete_btn.classList.add("btn-danger")

        checkbox.addEventListener("click", () => {
            todos = todos.map(item => item.id === data.id ? { ...item, completed: checkbox.checked } : item)
            render()
        })

        delete_btn.addEventListener("click", () => {
            const index = todos.findIndex(item => item.id === data.id)
            todos.splice(index, 1)
            render()
        })

        main_div.appendChild(message)
        btn_div.appendChild(checkbox)
        btn_div.appendChild(completed_label)
        btn_div.appendChild(delete_btn)
        main_div.appendChild(btn_div)

        todo_container.appendChild(main_div)
    })
}

function input_handler() {
    if (input.value.trim() !== "") {
        todos.push({ id: id_counter++, message: input.value, completed: false })
        input.value = ""
        render()
    }
    else {
        alert("Can not have an empty todo")
    }
}

add_button.addEventListener("click", input_handler)


