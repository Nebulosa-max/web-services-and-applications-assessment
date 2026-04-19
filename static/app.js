document.addEventListener("DOMContentLoaded", function () {
    const subjectForm = document.getElementById("subject-form");
    const subjectList = document.getElementById("subject-list");

    const taskForm = document.getElementById("task-form");
    const taskList = document.getElementById("task-list");
    const taskSubjectSelect = document.getElementById("task-subject");

    async function loadSubjects() {
        const response = await fetch("/api/subjects");
        const subjects = await response.json();

        subjectList.innerHTML = "";
        taskSubjectSelect.innerHTML = '<option value="">Select a subject</option>';

        subjects.forEach(subject => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>
                    <strong>${subject.name}</strong> - ${subject.description || ""}
                </span>
                <button onclick="deleteSubject(${subject.id})">Delete</button>
            `;
            subjectList.appendChild(li);

            const option = document.createElement("option");
            option.value = subject.id;
            option.textContent = subject.name;
            taskSubjectSelect.appendChild(option);
        });
    }

    async function loadTasks() {
        const response = await fetch("/api/tasks");
        const tasks = await response.json();

        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>
                    <strong>${task.title}</strong> (${task.subject_name}) -
                    ${task.description || ""} |
                    Due: ${task.due_date || "No date"} |
                    Priority: ${task.priority} |
                    Status: ${task.completed ? "Completed" : "Pending"}
                </span>
                <div>
                    <button onclick="toggleTask(${task.id})">
                        ${task.completed ? "Undo" : "Complete"}
                    </button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    if (subjectForm) {
        subjectForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const description = document.getElementById("description").value;

            const response = await fetch("/api/subjects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    description: description
                })
            });

            if (response.ok) {
                subjectForm.reset();
                loadSubjects();
            } else {
                alert("Failed to create subject.");
            }
        });

        loadSubjects();
    }

    if (taskForm) {
        taskForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const title = document.getElementById("task-title").value;
            const description = document.getElementById("task-description").value;
            const dueDate = document.getElementById("task-due-date").value;
            const priority = document.getElementById("task-priority").value;
            const subjectId = document.getElementById("task-subject").value;

            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    due_date: dueDate,
                    priority: priority,
                    subject_id: subjectId
                })
            });

            if (response.ok) {
                taskForm.reset();
                loadTasks();
            } else {
                alert("Failed to create task.");
            }
        });

        loadTasks();
    }
});

async function deleteSubject(subjectId) {
    const response = await fetch(`/api/subjects/${subjectId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        location.reload();
    } else {
        alert("Failed to delete subject.");
    }
}

async function deleteTask(taskId) {
    const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        location.reload();
    } else {
        alert("Failed to delete task.");
    }
}

async function toggleTask(taskId) {
    const response = await fetch(`/api/tasks/${taskId}/toggle`, {
        method: "PATCH"
    });

    if (response.ok) {
        location.reload();
    } else {
        alert("Failed to update task.");
    }
}