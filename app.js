// Display projects on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    displayProjects();
    
    // Check if admin section should be visible (via URL hash)
    if (window.location.hash === '#admin') {
        toggleAdmin();
    }
});

// Display projects in the main section
function displayProjects() {
    const projectGrid = document.getElementById('projectGrid');
    const projectList = loadProjects();
    
    projectGrid.innerHTML = '';
    
    if (projectList.length === 0) {
        projectGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1;">No projects yet. Add some from the admin panel!</p>';
        return;
    }
    
    projectList.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.github}" target="_blank">View on GitHub</a>
            ${project.demo ? `<a href="${project.demo}" target="_blank" class="demo-link">Live Demo</a>` : ''}
        `;
        projectGrid.appendChild(projectCard);
    });
    
    // Update admin list if admin panel is visible
    if (document.getElementById('admin').style.display !== 'none') {
        displayAdminProjects();
    }
}

// Toggle admin panel
function toggleAdmin() {
    const adminSection = document.getElementById('admin');
    if (adminSection.style.display === 'none') {
        adminSection.style.display = 'block';
        window.location.hash = 'admin';
        displayAdminProjects();
    } else {
        adminSection.style.display = 'none';
        window.location.hash = '';
        clearForm();
    }
}

// Display projects in admin panel
function displayAdminProjects() {
    const adminList = document.getElementById('adminProjectList');
    const projectList = loadProjects();
    
    adminList.innerHTML = '';
    
    if (projectList.length === 0) {
        adminList.innerHTML = '<p style="color: #999;">No projects yet.</p>';
        return;
    }
    
    projectList.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'admin-project-item';
        projectItem.innerHTML = `
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <p><strong>GitHub:</strong> ${project.github}</p>
            ${project.demo ? `<p><strong>Demo:</strong> ${project.demo}</p>` : ''}
            <div class="admin-project-buttons">
                <button onclick="editProject(${index})" class="btn-edit">Edit</button>
                <button onclick="deleteProject(${index})" class="btn-delete">Delete</button>
            </div>
        `;
        adminList.appendChild(projectItem);
    });
}

// Save or update project
function saveProject() {
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const github = document.getElementById('projectLink').value.trim();
    const demo = document.getElementById('projectDemo').value.trim();
    const editIndex = document.getElementById('editIndex').value;
    
    if (!title || !description || !github) {
        alert('Please fill in all required fields!');
        return;
    }
    
    const projectData = {
        title: title,
        description: description,
        github: github,
        demo: demo
    };
    
    if (editIndex === '') {
        // Add new project
        projects.push(projectData);
    } else {
        // Update existing project
        projects[parseInt(editIndex)] = projectData;
    }
    
    saveProjectsToStorage();
    displayProjects();
    clearForm();
    
    alert('Project saved successfully!');
}

// Edit project
function editProject(index) {
    const project = projects[index];
    
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectLink').value = project.github;
    document.getElementById('projectDemo').value = project.demo || '';
    document.getElementById('editIndex').value = index;
    
    // Scroll to form
    document.querySelector('.project-form').scrollIntoView({ behavior: 'smooth' });
}

// Delete project
function deleteProject(index) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects.splice(index, 1);
        saveProjectsToStorage();
        displayProjects();
    }
}

// Cancel edit and clear form
function cancelEdit() {
    clearForm();
}

// Clear form
function clearForm() {
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('projectLink').value = '';
    document.getElementById('projectDemo').value = '';
    document.getElementById('editIndex').value = '';
}
