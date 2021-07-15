const locates = [
    {
        "lat":0,
        "lng":0
    },
    {
        "lat":0,
        "lng":0
    },
    {
        "lat":0,
        "lng":0
    },
    {
        "lat":0,
        "lng":0
    }
];


console.log(getMiddle(
    {
    "lat":5,
    "lng":5
},
    {
    "lat":10,
    "lng":10
}))

function getMiddle(p1,p2){
    let pm =    {
        "lat":0,
        "lng":0
    };
     pm.lat = (p1.lat + p2.lat)/2
     pm.lng = (p1.lng + p2.lng)/2
    return pm
}
