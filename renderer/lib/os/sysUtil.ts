
const setSysSetup = (value: boolean): boolean => {
    // set sys value
    window.ipc.send("store_set", {key: "setup", value: value});
    return true
}

const setExtSetup = (value: boolean): boolean => {
    window.ipc.send("store.set", { key: "extSetup", value: value})
    return true;
}

const createSetupNetwork = () => {
    window.ipc.send("setup_setup-network");
    return true;
}


export { setSysSetup, createSetupNetwork, setExtSetup }