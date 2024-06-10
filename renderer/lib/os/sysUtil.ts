
const setSysSetup = (value: boolean): boolean => {
    // set sys value
    window.ipc.send("store_set", value);
    return true
}

const createSetupNetwork = () => {
    window.ipc.send("setup_network", undefined);
    return true;
}

export { setSysSetup, createSetupNetwork }