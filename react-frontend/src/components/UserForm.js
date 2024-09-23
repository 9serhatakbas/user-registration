import React, { useState } from 'react';
import './App.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: ''
  });

  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

    const handleClearUsers = () => {
        setUsers([]);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUsers([...users, formData]);

    console.log(formData);

    try {
      const response = await fetch('http://localhost:5000/api/users', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
            firstName: '',
            lastName: '',
            age: '',
          });
        alert('Kullanıcı başarıyla kaydedildi!');
      } else{
        alert('hataaaa');
      }
    } catch (err) {
      console.error('Hata:', err);
    }
  };

  return (
    <div className='form-container'>
      <h2>please enter user information</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>name: <hr/>
          <input
          id='firstName'
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          </label>
        </div>
        <div className='form-group'>
          <label>surname: <hr/>
          <input
          id='lastName'
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          </label>
        </div>
        <div className='form-group'>
          <label>age: <hr/>
          <input
          id='age'
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          </label>
        </div>
        <button type="submit" className='submit-button'>submit</button>
      </form>
        <div className="user-list">
            <table>
            <thead>
                <tr>
                <th>name</th>
                <th>surname</th>
                <th>age</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                <tr key={index}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.age}</td>
                </tr>
                ))}
            </tbody>
            </table>  
        </div>
       <button onClick={handleClearUsers} className='clear-button'>clear</button>
    </div>
  );
};

export default UserForm;
