
const ONE_DAY_MILISECONDS = 86400000 // (1000 * 60 * 60 * 24) um dia em milisegundos
const THREEHOURS_IN_MILISECONDS = 10800000 // 180 (MINUTOS) * 60000
function DateRange(inicitalDate, finalDate) {

    const iDate = new Date(inicitalDate) // Data inicial
    const fDate = new Date(finalDate) // Data final

    //Converte as datas de milisegundos para dias na linha do tempo
    const dayIDate = Math.ceil(iDate.getTime() / ONE_DAY_MILISECONDS)
    const dayFDate = Math.ceil(fDate.getTime() / ONE_DAY_MILISECONDS)

    let dates = []
    let count = 0;
    for (var i = dayIDate; i < dayFDate; i++) {
        count++
        dates.push(new Date(i * 86400000 + THREEHOURS_IN_MILISECONDS))

    }

    return dates;
}


export default DateRange


