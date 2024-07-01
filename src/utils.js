export const toStringUser = (user) => {
    let firstName = user.firstName;
    let lastName = "";
    const email = user.email;
    const login = email.split("@")[0];

    if (user.firstName === undefined || user.firstName === null || user.firstName.length === 0) {
        firstName = login;
    }
    if (user.lastName !== undefined && user.lastName !== null && user.lastName !== "null" && user.lastName.length > 0) {
        lastName = user.lastName;
    }

    return `${firstName} ${lastName}`;
}