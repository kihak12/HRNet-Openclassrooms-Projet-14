
import styles from './Employees.module.css';
import {DataTableComponent} from "data-table-module-kihak12";
import 'data-table-module-kihak12/dist/data-table-react.css';
import type {Employee} from "../Employee.ts";
import {Link} from "react-router";

export const Employees = () => {

    const stored = localStorage.getItem('employees');
    const employees: Employee[] = stored ? JSON.parse(stored) : [];

    const data = employees.map(item => ({
        firstName:  item.firstName,
        lastName:  item.lastName,
        dateOfBirth:  new Date(item.dateOfBirth).toLocaleDateString(),
        startDate:  new Date(item.startDate).toLocaleDateString(),
        street: item.address.street,
        city: item.address.city,
        state: item.address.state,
        zipCode: item.address.zipCode,
        department:  item.department,
    }))


    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link to="/">
                    <img src="./assets/side-arrow.svg" alt="Home" title="Home" className={styles.icon}/>
                </Link>
                <h1 className={styles.title}>HRnet</h1>
            </div>
            <DataTableComponent items={data}></DataTableComponent>
        </div>
    )
}
