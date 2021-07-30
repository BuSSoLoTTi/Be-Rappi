const rappiApi = require("./rappiAPI");
const math = require("math");
const Scheduler = require("./scheduler")
const scheduler = new Scheduler(print);


let map = new Map()

const cords = [
    {
        "lat": -19.826887,
        "lng": -44.019772
    },
    {
        "lat": -19.833023,
        "lng": -43.923985
    },
    {
        "lat": -19.956991,
        "lng": -43.927418
    },
    {
        "lat": -19.951827,
        "lng": -44.004665
    }
];


let pro = [];

function print() {
    console.log(map.size)
    for (let store of map) {
        console.log(`${store[0]} | ${store[1]}`)
    }
}


(async () => {
    search(cords)

    /*
    let size = 0
    while (size!==pro.length) {
        size = pro.length
        await Promise.allSettled(pro)
        console.log(`done promises :${size} total promises :${pro.length}`)
    }
     */


})();


function getMiddles(p) {
    /*
    * p[0]  p1   p[1]
    *
    * p4    p5   p2
    *
    * p[3]  p3   p[2]
    * */

    let p1 = {
        "lat": parseFloat(((p[0].lat + p[1].lat) / 2).toFixed(6)),
        "lng": parseFloat(((p[0].lng + p[1].lng) / 2).toFixed(6))
    }
    let p2 = {
        "lat": parseFloat(((p[1].lat + p[2].lat) / 2).toFixed(6)),
        "lng": parseFloat(((p[1].lng + p[2].lng) / 2).toFixed(6))
    }
    let p3 = {
        "lat": parseFloat(((p[2].lat + p[3].lat) / 2).toFixed(6)),
        "lng": parseFloat(((p[2].lng + p[3].lng) / 2).toFixed(6))
    }
    let p4 = {
        "lat": parseFloat(((p[3].lat + p[0].lat) / 2).toFixed(6)),
        "lng": parseFloat(((p[3].lng + p[0].lng) / 2).toFixed(6))
    }
    let p5 = {
        "lat": parseFloat(((p[0].lat + p[2].lat) / 2).toFixed(6)),
        "lng": parseFloat(((p[0].lng + p[2].lng) / 2).toFixed(6))
    }

    let l1 = [p[0], p1, p5, p4]
    let l2 = [p1, p[1], p2, p5]
    let l3 = [p5, p2, p[2], p3]
    let l4 = [p4, p5, p3, p[3]]

    return [l1, l2, l3, l4]
}


function search(coordinates) {
    for (let locate of coordinates) {
        // console.log(`${locate.lat},${locate.lng}`)
        scheduler.add(rappiApi.getStore(locate.lat, locate.lng).then(r => {
            for (let store of r) {
                if (!map.has(store.id)) {
                    map.set(store.id, store.nome)
                }
            }
        }).catch(e => console.log(e)))


    }
    // console.log("done")
    for (let locates of getMiddles(coordinates)) {
        let count = 0;
        searchRecursive(locates, count)
    }

}

async function searchRecursive(coordinates, count) {
    for (let locate of coordinates) {
        // console.log(`${locate.lat},${locate.lng}`)
        scheduler.add(rappiApi.getStore(locate.lat, locate.lng).then(r => {
            for (let store of r) {
                if (!map.has(store.id)) {
                    map.set(store.id, store.nome)
                }
            }
        }).catch(e => console.log(e)))


    }
    // console.log("done")
    const newLocates = getMiddles(coordinates)
    for (let locates of newLocates) {
        const distances = distance(locates)
        if (distances && count < 2) {
            await sleep(1000)
            searchRecursive(locates, count)
        } else {
            console.log(distances)
            return true
        }
    }
    return true;
}

function distance(cord) {

    // const d = 0.005
    const d = 0.1

    const d1 = math.sqrt(math.abs(math.pow((cord[0].lat - cord[1].lat), 2) + math.pow((cord[0].lng - cord[1].lng), 2)));
    const d2 = math.sqrt(math.abs(math.pow((cord[2].lat - cord[1].lat), 2) + math.pow((cord[2].lng - cord[1].lng), 2)));
    const d3 = math.sqrt(math.abs(math.pow((cord[2].lat - cord[3].lat), 2) + math.pow((cord[2].lng - cord[3].lng), 2)));
    const d4 = math.sqrt(math.abs(math.pow((cord[3].lat - cord[0].lat), 2) + math.pow((cord[3].lng - cord[0].lng), 2)));
    const d5 = math.sqrt(math.abs(math.pow((cord[0].lat - cord[2].lat), 2) + math.pow((cord[0].lng - cord[2].lng), 2)));
    const d6 = math.sqrt(math.abs(math.pow((cord[3].lat - cord[1].lat), 2) + math.pow((cord[3].lng - cord[1].lng), 2)));

    return (d1 > d && d2 > d && d3 > d && d4 > d && d5 > d && d6 > d)
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}



