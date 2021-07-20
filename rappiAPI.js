const axios = require("axios");

const lat = '-12.987393';
const lng = '-38.515201';

module.exports = {
    getStore
}

async function fetch(lat, lng) {
    const options = {
        method: 'POST',
        url: 'https://services.rappi.com.br/api/dynamic/context/content',
        headers: {'content-type': 'application/json'},
        data: {
            state: {lat: lat.toString(), lng: lng.toString(), parent_store_type: "market"},
            limit: 100,
            offset: 0,
            context: "cpgs_landing"
        }
    };
    return axios.request(options).then(resp => resp).catch(error => console.log(error.message))
}

// (async () => {
//     let array = await getStore(lat, lng);
//     console.log(array);
// })();

async function getStore(lat, lng) {
    let array = []
    let obj = {
        "nome": "",
        "id": ""
    }

    let resp = await fetch(lat, lng);

    if(resp.data.data) {
        let dados = resp.data.data.context_info.stores;
        // console.log(`realizando busca em ${lat} : ${lng} lojas encontradas: ${dados.length}`)
        for (let store of dados) {
            obj.nome = store.name;
            obj.id = store.store_id;
            array.push({...obj});
        }
    }else {
     //    console.log('epa')
     // console.log(resp.status)
    }
    return array;
}

