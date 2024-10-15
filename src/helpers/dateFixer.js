const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

function returnMonthName(monthNumber) {
    return monthNames[monthNumber - 1]
}

const provideFullDateText = (fullDate) => {
    
    const dateAndTime = fullDate.split('T')
    const dayMonthYear = dateAndTime[0].split('-')
    const time = dateAndTime[1].split(":")

    return `${dayMonthYear[2]} ${returnMonthName(Number(dayMonthYear[1]))} ${dayMonthYear[0]} at ${time[0]}:${time[1]}`

}

export default provideFullDateText