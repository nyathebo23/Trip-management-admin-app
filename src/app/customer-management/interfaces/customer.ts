interface Customer {
    id: string,
    user: {
        firstname: string,
        lastname: string,
        username: string,
        password: string,
        role: string
    },
    phoneNumber: string,
    dateBirth: string
}