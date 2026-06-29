const form = document.getElementById('student-form');
const studentList = document.getElementById('student-list');

// Modal Elements
const modal = document.getElementById('edit-modal');
const editIdInput = document.getElementById('edit-student-id');
const editMajorInput = document.getElementById('edit-major-input');
const editStudentName = document.getElementById('edit-student-name');
const saveEditBtn = document.getElementById('save-edit');
const cancelEditBtn = document.getElementById('cancel-edit');

// 1. READ: Fetch students from API and display them
async function fetchStudents() {
    studentList.innerHTML = '';
    try {
        const res = await fetch('/api/students');
        const students = await res.json();
        
        students.forEach(student => {
            const li = document.createElement('li');
            li.className = 'student-item';
            li.innerHTML = `
                <div class="student-info">
                    <strong>${student.name}</strong>
                    <span>${student.major}</span>
                </div>
                <div class="action-btns">
                    <button class="btn btn-sm btn-edit" onclick="openEditModal(${student.id}, '${student.name}', '${student.major}')">Edit</button>
                    <button class="btn btn-sm btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
                </div>
            `;
            studentList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching students:', error);
        // Fallback for visual testing if API is down
        studentList.innerHTML = '<li class="student-item" style="justify-content: center; color: gray;">No students found or API unreachable.</li>';
    }
}

// 2. CREATE: Submit new student
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const major = document.getElementById('major').value;

    try {
        await fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, major })
        });

        document.getElementById('name').value = '';
        document.getElementById('major').value = '';
        fetchStudents();
    } catch (error) {
        console.error('Error adding student:', error);
    }
});

// 3. UPDATE UI: Open the custom modal
function openEditModal(id, name, currentMajor) {
    editIdInput.value = id;
    editStudentName.textContent = `Editing major for ${name}`;
    editMajorInput.value = currentMajor;
    modal.classList.remove('hidden');
}

// Close modal logic
cancelEditBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// 3. UPDATE API: Save the new major
saveEditBtn.addEventListener('click', async () => {
    const id = editIdInput.value;
    const newMajor = editMajorInput.value.trim();

    if (!newMajor) {
        alert("Major cannot be empty.");
        return;
    }

    try {
        await fetch(`/api/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ major: newMajor })
        });
        
        modal.classList.add('hidden');
        fetchStudents();
    } catch (error) {
        console.error('Error updating student:', error);
    }
});

// 4. DELETE: Delete a student record
async function deleteStudent(id) {
    // Kept standard confirm for delete, as it is a safe standard practice, 
    // but the edit prompt has been entirely modernized.
    if (confirm("Are you sure you want to remove this student from the directory?")) {
        try {
            await fetch(`/api/students/${id}`, {
                method: 'DELETE'
            });
            fetchStudents();
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    }
}

// Run on page load
fetchStudents();