// Generic API call, requires url and destination array
async function apiCall(uri, dsName){
    h = new Headers();
    h.append('Accept', 'application/json');
    h.append('Api-Key', apiKey);

    // Prefix all urls to run requests through a LAN local CORS proxy
    uri = corsProxy+uri;

    req = new Request(uri, {
        method: 'GET',
        headers: h,
        mode: 'cors'
    });

    await getDat(req, dsName);
}

// Generic data retrieval and array push
async function getDat(req, dsName) {
    window[dsName] = await fetch(req)
    .then ((response)=>{
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Bad Request');
        }
    })
    .catch((err)=>{
        console.log('ERROR', err.message);
    });
}

// Retrieve report license key
async function fetchSKey() {
    h = new Headers();
    h.append('Accept', 'application/json');
    h.append('Authorization', 'Bearer '+skeyApiKey);

    req = new Request(skeyUrl, {
        method: 'GET',
        headers: h,
    });

    const response = await fetch(req);
    const sKeyJson = await response.json();
    return sKeyJson;
};