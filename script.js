const input = document.getElementById('taskInput')
const Add = document.querySelector('button')
const listContainer = document.getElementById('listContainer')
const taskCounter = document.getElementById('taskCounter')

let updateCounter = () => {
    const totalTasks = listContainer.querySelectorAll('li').length
    const checkedTasks = listContainer.querySelectorAll('li.checked').length
    if (totalTasks === 0) {
        taskCounter.textContent = '0 tasks'
    } else if (checkedTasks === totalTasks) {
        taskCounter.textContent = 'All done!'
    } else {
        taskCounter.textContent = `${totalTasks - checkedTasks} pending`
    }
}

let showEmptyState = () => {
    const existing = listContainer.querySelector('.empty-state')
    if (existing) existing.remove()
    if (listContainer.querySelectorAll('li').length === 0) {
        const empty = document.createElement('div')
        empty.className = 'empty-state'
        empty.innerHTML = '<i class="fas fa-clipboard-list"></i><p>No tasks yet. Add one above!</p>'
        listContainer.appendChild(empty)
    }
}

let addTask = () => {
    if (input.value.trim() === '') {
        input.focus()
        input.style.border = '2px solid #ef4444'
        setTimeout(() => { input.style.border = 'none' }, 1000)
        return
    }
    showEmptyState()
    const empty = listContainer.querySelector('.empty-state')
    if (empty) empty.remove()

    let li = document.createElement('li')
    li.innerHTML = input.value
    listContainer.appendChild(li)

    let span = document.createElement('span')
    span.innerHTML = "×"
    li.appendChild(span)

    input.value = ""
    input.focus()
    updateCounter()
    savedata()
}

Add.addEventListener('click', function () {
    addTask()
})

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask()
    }
})

listContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked')
        updateCounter()
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.style.animation = 'slideIn 0.3s ease reverse'
        setTimeout(() => {
            e.target.parentElement.remove()
            showEmptyState()
            updateCounter()
        }, 250)
    }
    savedata()
})

function savedata() {
    localStorage.setItem("data", listContainer.innerHTML)
}

function getdata() {
    listContainer.innerHTML = localStorage.getItem("data")
    updateCounter()
    showEmptyState()
}

getdata()
