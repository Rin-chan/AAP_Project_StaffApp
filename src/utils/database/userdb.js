import flaskServer from "../../../settings.json";
const flaskIP = flaskServer.flaskServer;

const addStaffUser = async (username, email, hashedPassword, type) => {
    fetch(`http://${flaskIP}/addStaffUser`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, email: email, password: hashedPassword, type: type})
    })
};

const getStaffSpecificUser = async (email) => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getStaffSpecificUser`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
    })
    .then(response => response.json())
    .then(data => {
        result = data.result;
    })
    .catch(err => console.error(err));

    return result
}

const getStaffAllUsersCount = async (query) => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getStaffAllUsersCount`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: query})
    })
    .then(response => response.json())
    .then(data => {
        result = data.result;
    })
    .catch(err => console.error(err));

    return result
}

const getAllUsersCount = async (query) => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getAllUsersCount`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query: query})
    })
    .then(response => response.json())
    .then(data => {
        result = data.result;
    })
    .catch(err => console.error(err));

    return result
}

const getStaffAllUsers = async (page, itemsPerPage, query) => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getStaffAllUsers`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({page: page, itemsPerPage: itemsPerPage, query: query})
    })
    .then(response => response.json())
    .then(data => {
        result = data.result;
    })
    .catch(err => console.error(err));

    return result
}

const getAllUsers = async (page, itemsPerPage, query) => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getAllUsers`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({page: page, itemsPerPage: itemsPerPage, query: query})
    })
    .then(response => response.json())
    .then(data => {
        result = data.result;
    })
    .catch(err => console.error(err));

    return result
}

const updateUserDisabled = async (email, disabled) => {
    await fetch(`http://${flaskIP}/updateUserDisabled`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, disabled: disabled})
    })
}

const updateStaffUserDisabled = async (email, disabled) => {
    await fetch(`http://${flaskIP}/updateStaffUserDisabled`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, disabled: disabled})
    })
}

const updateStaffUserType = async (email, type) => {
    await fetch(`http://${flaskIP}/updateStaffUserType`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, type: type})
    })
}

const updateStaffUserPassword = async (email, password) => {
    await fetch(`http://${flaskIP}/updateStaffUserPassword`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, password: password})
    })
}

export default { addStaffUser, getStaffSpecificUser, getStaffAllUsersCount, getAllUsersCount, getStaffAllUsers, getAllUsers, updateUserDisabled, updateStaffUserDisabled, updateStaffUserType, updateStaffUserPassword };