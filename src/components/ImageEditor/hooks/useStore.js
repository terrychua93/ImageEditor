/** External Dependencies */
import { useContext } from "react";

/** Internal Dependencies */
import AppContext from "../../ImageEditor/context";

const useStore = () => useContext(AppContext);
export default useStore;
