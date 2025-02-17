import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('All');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=10');
      const formattedEmployees = response.data.results.map((user, index) => ({
        id: index + 1,
        name: `${user.name.first} ${user.name.last}`,
        department: getRandomDepartment(),
        email: user.email,
        photo: user.picture.thumbnail
      }));
      setEmployees(formattedEmployees);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  const getRandomDepartment = () => {
    const departments = ['Finance', 'Marketing', 'IT', 'HR'];
    return departments[Math.floor(Math.random() * departments.length)];
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (department === 'All' || employee.department === department)
  );

  return (
    <div className="App">
      <h1>Employee Directory</h1>
      
      <input
        type="text"
        className="search-bar"
        placeholder="Search employees by name..."
        value={searchTerm}
        onChange={handleSearch}
      />
      
      <select value={department} onChange={handleDepartmentChange} className="filter-dropdown">
        <option value="All">All Departments</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
      </select>

      <ul className="employee-list">
        {filteredEmployees.map((employee) => (
          <li key={employee.id} className="employee-card">
            <img src={employee.photo} alt={employee.name} className="employee-photo" />
            <div className="employee-info">
              <div className="employee-name">{employee.name}</div>
              <div className="employee-department">{employee.department}</div>
              <div className="employee-email">{employee.email}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
