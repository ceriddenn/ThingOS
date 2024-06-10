
const setSysSetup = (value: boolean): boolean => {
    // set sys value
    window.ipc.send("sc1", value);
    return true
}

export { setSysSetup }