import { useCallback, useMemo, useState } from 'react';
import PropertyContext from './property-context.jsx';
import { mockProperties } from '../data/mockProperties';

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [savedProperties, setSavedProperties] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const toggleSave = useCallback((propertyId) => {
    setSavedProperties((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      }
      return [...prev, propertyId];
    });
  }, []);

  const filterProperties = useCallback((searchTerm = '', bhk = '', budgetMin = 0, budgetMax = Infinity, possession = '') => {
    let result = [...properties];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(term) ||
        p.location.toLowerCase().includes(term) ||
        p.city.toLowerCase().includes(term) ||
        (p.state ?? 'Maharashtra').toLowerCase().includes(term)
      );
    }

    if (bhk) {
      result = result.filter((p) => p.bhk === bhk);
    }

    if (possession) {
      result = result.filter((p) => p.possession === possession);
    }

    result = result.filter((p) => p.price >= budgetMin && p.price <= budgetMax);
    setFilteredProperties(result);
  }, [properties]);

  const scheduleAppointment = useCallback((appointment) => {
    const newAppointment = {
      id: Date.now(),
      status: 'pending',
      ...appointment,
    };
    setAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  }, []);

  const approveAppointment = useCallback((appointmentId) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId
          ? { ...appointment, status: 'approved' }
          : appointment
      )
    );
  }, []);

  const value = useMemo(() => ({
    properties,
    filteredProperties,
    savedProperties,
    appointments,
    filterProperties,
    toggleSave,
    scheduleAppointment,
    approveAppointment,
    setProperties,
  }), [
    properties,
    filteredProperties,
    savedProperties,
    appointments,
    filterProperties,
    toggleSave,
    scheduleAppointment,
    approveAppointment,
    setProperties,
  ]);

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};
