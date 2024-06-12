import { setExtSetup, setSysSetup } from "./sysUtil";

const isSysSetup = async(): Promise<boolean> => {

    // verify the extSetup store is init.
    const extSetupValue = await window.ipc.invoke("store_get", "extSetup");
    if (extSetupValue == undefined) {
        setExtSetup(false);
    }

    const setupValue = await window.ipc.invoke("store_get", "setup");
    if (setupValue != undefined && setupValue == true) {
        return true;
    } else {
        // set to false to init key/value pair
        setSysSetup(false);
        return false;
    }
}




export { isSysSetup }