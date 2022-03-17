function getLATime() {
    let offset = '-7'
    let d = new Date();
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return utc + (3600000*offset)
}

export default getLATime