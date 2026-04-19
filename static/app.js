document.addEventListener("DOMContentLoaded", function () {
    const subjectForm = document.getElementById("subject-form");
    const subjectList = document.getElementById("subject-list");

    async function loadSubjects() {
        const response = await fetch("/api/subjects");
        const subjects = await response.json();

        subjectList.innerHTML = "";

        subjects.forEach(subject => {
            const li = document.createElement("li");

            li.innerHTML = `
                <span>
                    <strong>${subject.name}</strong> - ${subject.description || ""}
                </span>
                <button onclick="deleteSubject(${subject.id})">Delete</button>
            `;

            subjectList.appendChild(li);
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