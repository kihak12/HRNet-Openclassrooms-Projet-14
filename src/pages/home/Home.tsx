
import {type FormEvent, useState} from 'react';
import styles from './Home.module.css';
import {type AddressState, addressStates} from "../../assets/AddressStates.ts";
import {DatePickerComponent} from "date-picker-module-kihak12";
import 'date-picker-module-kihak12/dist/date-picker-react.css';

import {SelectComponent, type SelectOption} from "select-module-kihak12";
import "select-module-kihak12/dist/select-react.css";

import {ModalComponent} from "modal-module-kihak12";
import "modal-module-kihak12/dist/modal-react.css";
import type {Employee} from "../Employee.ts";
import {Link} from "react-router";

export const Home = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
    const [startDate, setStartDate] = useState<Date>(new Date());

    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');

    const addressStatesList: AddressState[] = addressStates;
    const addressStatesListAsSelectOptions: SelectOption[] = addressStatesList.map(addressState => ({ key: addressState.abbreviation, label: addressState.name }));

    const [state, setState] = useState(addressStatesList[0].abbreviation);

    const [zipCode, setZipCode] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const data: Employee = {
            firstName,
            lastName,
            dateOfBirth: dateOfBirth.toISOString().split('T')[0], // Format as YYYY-MM-DD
            startDate: startDate.toISOString(), // Include time information
            address: {
                street,
                city,
                state,
                zipCode
            }
        };
        const stored = localStorage.getItem('employees');
        const employees: Employee[] = stored ? JSON.parse(stored) : [];


        employees.push(data);
        localStorage.setItem('employees', JSON.stringify(employees));
        setIsModalOpen(true);
    };

    const getIsoCodeFromState = (state: string): string => addressStatesList.find(addressState => addressState.name === state)!.abbreviation;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>HRnet</h1>
                <Link to="/employees">Employees</Link>
            </div>
            <div className={styles.formContainer}>
                <h2 className={styles.formTitle}>Create Employee</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="firstName" className={styles.label}>First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            className={styles.input}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="lastName" className={styles.label}>Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            className={styles.input}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="dateOfBirth" className={styles.label}>Date of Birth</label>
                        <DatePickerComponent
                            id="dateOfBirth"
                            selectedDate={dateOfBirth}
                            onChange={setDateOfBirth}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="startDate" className={styles.label}>Start Date</label>
                        <DatePickerComponent
                            id="startDate"
                            selectedDate={startDate}
                            onChange={setStartDate}
                        />
                    </div>
                    <div className={styles.form}>
                        <h3 className={styles.sectionTitle}>Address</h3>
                        <div className={styles.formGroup}>
                            <label htmlFor="street" className={styles.label}>Street</label>
                            <input
                                type="text"
                                id="street"
                                className={styles.input}
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="city" className={styles.label}>City</label>
                            <input
                                type="text"
                                id="city"
                                className={styles.input}
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="state" className={styles.label}>State</label>
                            <SelectComponent
                                name={"state"}
                                options={addressStatesListAsSelectOptions}
                                selectedOption={addressStatesListAsSelectOptions.find(e => e.key === state)!}
                                onSelect={option => setState(getIsoCodeFromState(option.label))}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="zipCode" className={styles.label}>Zip Code</label>
                            <input
                                type="text"
                                id="zipCode"
                                className={styles.input}
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className={styles.submitButton}>Submit</button>
                </form>
                {isModalOpen && <ModalComponent onClose={() => setIsModalOpen(false)} title={'Employee Created!'} showCancelButton={false} onConfirm={() => setIsModalOpen(false)} />}
            </div>
        </div>
    )
}
