/** External Dependencies */
import { useContext } from 'react';

/** Internal Dependencies */
import AppContext from '@/components/ImageEditor/context';

const useStore = () => useContext(AppContext);
export default useStore;
