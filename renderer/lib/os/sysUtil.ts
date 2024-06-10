
const setSysSetup = (value: boolean): boolean => {
    // set sys value
    window.ipc.send("store_set", "setup", value);
    return true
}

const createSetupNetwork = () => {
    window.ipc.send("setup_setup-network");
    return true;
}

export { setSysSetup, createSetupNetwork }