// Default projects - you can edit these
let projects = [
    {
        title: "Portfolio Website",
        description: "My personal portfolio website built with HTML, CSS, and JavaScript. Features dynamic project management and responsive design.",
        github: "https://github.com/Samarali-lab/Samarali-lab.github.io",
        demo: "https://Samarali-lab.github.io"
    },
    {
        title: "Student Management System",
        description: "A Java-based application with MySQL database for managing student records and grades. Features include adding, editing, and deleting student information.",
        github: "https://github.com/Samarali-lab/student-management",
        demo: ""
    },
    {
        title: "Linux Server Configuration",
        description: "Automated Linux server setup scripts for web hosting, including Apache, MySQL, and security configurations. Perfect for quick deployment.",
        github: "https://github.com/Samarali-lab/linux-server-config",
        demo: ""
    }
];

// Load projects from localStorage if available
function loadProjects() {
    const stored = localStorage.getItem('portfolioProjects');
    if (stored) {
        projects = JSON.parse(stored);
    }
    return projects;
}

// Save projects to localStorage
function saveProjectsToStorage() {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
}
