import React from 'react';
import Table from 'react-bootstrap/Table';
import Users from "../data/users.json"
import { v4 as uuid } from 'uuid';


function UserList() {
  return (
    <div>
      <h4>User Management</h4>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th> Name</th>
            <th>age</th>
            <th>Balance</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {Users.map((person)=> {
            return (
              <tr key={uuid()}>
                <td>{uuid()}</td>
                <td>  {person.name}  </td>
                <td> {person.age}</td>
                <td> {person.balance}</td>
                <td>{person.company}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    
    </div>
  )
}

export default UserList;