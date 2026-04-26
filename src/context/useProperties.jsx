import { useContext } from 'react';
import PropertyContext from './property-context.jsx';

export const useProperties = () => useContext(PropertyContext);
