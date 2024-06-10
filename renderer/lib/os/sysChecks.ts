
const isSysSetup = async(): Promise<boolean> => {
    const setupValue = await window.ipc.invoke("sc", "setup");
    console.log(setupValue)
    if (setupValue != undefined && setupValue == true) {
        return true;
    } else {
        return false;
    }
}



export { isSysSetup}