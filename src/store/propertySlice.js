import { createSlice } from '@reduxjs/toolkit';
import { mockProperties } from '../data/mockProperties';

const filterPropertyList = (properties, query = '', bhk = '', minPrice = 0, maxPrice = Infinity, possession = '') => {
  let result = [...properties];

  if (query) {
    const term = query.toLowerCase();
    result = result.filter((p) =>
      p.name.toLowerCase().includes(term) ||
      p.location.toLowerCase().includes(term) ||
      p.city.toLowerCase().includes(term) ||
      p.state.toLowerCase().includes(term)
    );
  }

  if (bhk) {
    result = result.filter((p) => p.bhk === bhk);
  }

  if (possession) {
    result = result.filter((p) => p.possession === possession);
  }

  return result.filter((p) => p.price >= minPrice && p.price <= maxPrice);
};

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    properties: mockProperties,
    filteredProperties: mockProperties,
    savedProperties: [],
    appointments: [],
    inquiries: [],
  },
  reducers: {
    toggleSave(state, action) {
      const propertyId = action.payload;
      if (state.savedProperties.includes(propertyId)) {
        state.savedProperties = state.savedProperties.filter((id) => id !== propertyId);
      } else {
        state.savedProperties.push(propertyId);
      }
    },
    filterProperties(state, action) {
      const { query = '', bhk = '', minPrice = 0, maxPrice = Infinity, possession = '' } = action.payload || {};
      state.filteredProperties = filterPropertyList(state.properties, query, bhk, minPrice, maxPrice, possession);
    },
    scheduleAppointment(state, action) {
      state.appointments.unshift({
        id: Date.now(),
        status: 'pending',
        ...action.payload,
      });
    },
    approveAppointment(state, action) {
      const appointmentId = action.payload;
      state.appointments = state.appointments.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status: 'approved' } : appointment
      );
    },
    addInquiry(state, action) {
      state.inquiries.unshift({
        id: Date.now(),
        createdAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    addProperty(state, action) {
      state.properties.unshift(action.payload);
      state.filteredProperties = [...state.properties];
    },
    approveProperty(state, action) {
      const id = action.payload;
      state.properties = state.properties.map((p) => (p.id === id ? { ...p, approved: true } : p));
      state.filteredProperties = [...state.properties];
    },
    rejectProperty(state, action) {
      const id = action.payload;
      state.properties = state.properties.filter((p) => p.id !== id);
      state.filteredProperties = [...state.properties];
    },
  },
});

export const {
  toggleSave,
  filterProperties,
  scheduleAppointment,
  approveAppointment,
  addInquiry,
  addProperty,
  approveProperty,
  rejectProperty,
} = propertySlice.actions;
export default propertySlice.reducer;
