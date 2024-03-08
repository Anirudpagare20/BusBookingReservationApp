const BusData = require('./data')
const fs = require('fs')

// console.log(BusData[0])

BusData.forEach(elem => {
    if (!elem.hasOwnProperty('seatsUpper')) {
        elem['seatsUpper'] = [
            { "seatNo": "UP01" },
            { "seatNo": "UP02" },
            { "seatNo": "UP03" },
            { "seatNo": "UP04" },
            { "seatNo": "UP05" },
            { "seatNo": "UP06" },
            { "seatNo": "UP07" },
            { "seatNo": "UP08" },
            { "seatNo": "UP09" },
            { "seatNo": "UP10" },
            { "seatNo": "UP11" },
            { "seatNo": "UP12" },
            { "seatNo": "UP13" },
            { "seatNo": "UP14" },
            { "seatNo": "UP15" },
            { "seatNo": "UP16" },
            { "seatNo": "UP17" },
            { "seatNo": "UP18" },
            { "seatNo": "UP19" },
            { "seatNo": "UP20" }
        ]
    }
    if (!elem.hasOwnProperty('seatsLower')) {
        elem['seatsLower'] = [
            { seatNo: 'LW01' }, { seatNo: 'LW02' },
            { seatNo: 'LW03' }, { seatNo: 'LW04' },
            { seatNo: 'LW05' }, { seatNo: 'LW06' },
            { seatNo: 'LW07' }, { seatNo: 'LW08' },
            { seatNo: 'LW09' }, { seatNo: 'LW10' },
            { seatNo: 'LW11' }, { seatNo: 'LW12' },
            { seatNo: 'LW13' }, { seatNo: 'LW14' },
            { seatNo: 'LW15' }, { seatNo: 'LW16' },
            { seatNo: 'LW17' }, { seatNo: 'LW18' },
            { seatNo: 'LW19' }
        ]
    }
})

fs.writeFileSync('alteredBusData.js', `const BusData = ${JSON.stringify(BusData, null, 2)};\nmodule.exports = BusData;\n`);