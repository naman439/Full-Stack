const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const employees = [
    { name: 'Alice', id: 'E101' },
    { name: 'Bob', id: 'E102' },
    { name: 'Charlie', id: 'E103' }
];

const showMenu = () => {
    console.log('\nEmployee Management System');
    console.log('1. Add Employee');
    console.log('2. List Employees');
    console.log('3. Remove Employee');
    console.log('4. Exit');
};

const addEmployee = () => {
    rl.question('Enter employee name: ', (name) => {
        rl.question('Enter employee ID: ', (id) => {
            employees.push({ name, id });
            console.log(`Employee ${name} (ID: ${id}) added successfully.`);
            showPrompt();
        });
    });
};

const listEmployees = () => {
    console.log('\nEmployee List:');
    if (employees.length === 0) {
        console.log('No employees found.');
    } else {
        employees.forEach((employee, index) => {
            console.log(`${index + 1}. Name: ${employee.name}, ID: ${employee.id}`);
        });
    }
    showPrompt();
};

const removeEmployee = () => {
    rl.question('Enter employee ID to remove: ', (idToRemove) => {
        const index = employees.findIndex(emp => emp.id === idToRemove);
        if (index > -1) {
            const removedEmployee = employees.splice(index, 1)[0];
            console.log(`Employee ${removedEmployee.name} (ID: ${removedEmployee.id}) removed successfully.`);
        } else {
            console.log(`Error: Employee with ID "${idToRemove}" not found.`);
        }
        showPrompt();
    });
};

const showPrompt = () => {
    showMenu();
    rl.question('\nEnter your choice: ', (choice) => {
        switch (choice) {
            case '1':
                addEmployee();
                break;
            case '2':
                listEmployees();
                break;
            case '3':
                removeEmployee();
                break;
            case '4':
                console.log('Exiting the application.');
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                showPrompt();
                break;
        }
    });
};

showPrompt();