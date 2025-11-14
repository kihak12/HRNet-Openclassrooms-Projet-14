export interface Employee {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    startDate: string;
    address: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
    }
}
