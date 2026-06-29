const form = document.getElementById('student-form');
const studentList = document.getElementById('student-list');

// 1. READ: Fetch students from API and display them
async function fetchStudents() {
    studentList.innerHTML = '';
    const res = await fetch('/api/students');
    const students = await res.json();
    
    students.forEach(student => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <strong>${student.name}</strong> - <span>${student.major}</span>
            </div>
            <div>
                <button class="edit-btn" onclick="updateMajor(${student.id}, '${student.major}')">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
            </div>
        `;
        studentList.appendChild(li);
    });
}

// 2. CREATE: Submit new student
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const major = document.getElementById('major').value;

    await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, major })
    });

    document.getElementById('name').value = '';
    document.getElementById('major').value = '';
    fetchStudents();
});

// 3. UPDATE: Prompt user to change a student's major
async function updateMajor(id, currentMajor) {
    const newMajor = prompt("Enter new major:", currentMajor);
    if (!newMajor) return;

    await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ major: newMajor })
    });
    fetchStudents();
}

// 4. DELETE: Delete a student record
async function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        await fetch(`/api/students/${id}`, {
            method: 'DELETE'
        });
        fetchStudents();
    }
}

// Run on page load
fetchStudents();