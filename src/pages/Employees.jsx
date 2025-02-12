import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddEmployee from "../features/employees/AddEmployee";
import EmployeeTableOperations from "../features/employees/EmployeeTableOperations";
import EmployeeTable from "../features/employees/EmployeeTable";

export const Employees = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      username: "ahmed123",
      fullName: "Ahmed Hcini",
      email: "ahmed@example.com",
      phone: "123-456-7890",
      address: "123 Main St, City",
      titleId: "Software Engineer",
      departmentId: "IT",
      status: "accepted",
      qrCode: "qr_ahmed123.png",
    },
    {
      id: 2,
      username: "sarah456",
      fullName: "Sarah Doe",
      email: "sarah@example.com",
      phone: "987-654-3210",
      address: "456 Elm St, City",
      titleId: "Project Manager",
      departmentId: "Management",
      status: "pending",
      qrCode: "qr_sarah456.png",
    },
  ]);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Employees</Heading>
        <EmployeeTableOperations />
      </Row>

      <Row type="vertical">
        <EmployeeTable employees={employees} />
        <AddEmployee setEmployees={setEmployees} />
      </Row>
    </>
  );
};

export default Employees;
