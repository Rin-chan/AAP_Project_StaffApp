import flaskServer from "../../../settings.json";
const flaskIP = flaskServer.flaskServer;

const getAllBins = async () => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getStaffAllBins`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        result = data.result;
    })
    .catch(err => console.error(err));

    return result
}

const getBins = async (page, itemsPerPage, query) => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getStaffBins`, {
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

const updateBins = async (id, selected) => {
    fetch(`http://${flaskIP}/updateStaffBins`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id, selected: selected})
    })
    return "Done"
}

const getAllBinsCount = async (query) => {
    let result = undefined;

    await fetch(`http://${flaskIP}/getStaffAllBinsCount`, {
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

export default { getAllBins, getBins, updateBins, getAllBinsCount };