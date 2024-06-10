
const setSysSetup = (value: boolean): boolean => {
    // set sys value
    window.ipc.send("sc1", value);
    return true
}

const createSetupNetwork = () => {
    window.ipc.send("setup_network", undefined);
    return true;
}

export { setSysSetup, createSetupNetwork }