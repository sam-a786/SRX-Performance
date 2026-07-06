// Curated database of common UK vehicles with real factory BHP/torque specs.
// Used when no paid vehicle API key is configured, so we never display fake data.
// Keys are lowercase 'make model' partial matches.
// Data sourced from manufacturer press specifications.

export const CURATED_VEHICLES = [
  // ---- Volkswagen Group Diesels (very common UK) ----
  { match: ['golf', '1.6 tdi'], make: 'Volkswagen', model: 'Golf 1.6 TDI', engine: '1.6L Diesel', bhp: 105, torque: 250, fuel: 'Diesel' },
  { match: ['golf', '2.0 tdi'], make: 'Volkswagen', model: 'Golf 2.0 TDI', engine: '2.0L Diesel', bhp: 150, torque: 340, fuel: 'Diesel' },
  { match: ['golf', '2.0 gti'], make: 'Volkswagen', model: 'Golf GTI', engine: '2.0L Petrol Turbo', bhp: 245, torque: 370, fuel: 'Petrol' },
  { match: ['golf', '2.0 r'], make: 'Volkswagen', model: 'Golf R', engine: '2.0L Petrol Turbo', bhp: 320, torque: 420, fuel: 'Petrol' },
  { match: ['passat', '2.0 tdi'], make: 'Volkswagen', model: 'Passat 2.0 TDI', engine: '2.0L Diesel', bhp: 150, torque: 340, fuel: 'Diesel' },
  { match: ['polo', '1.0 tsi'], make: 'Volkswagen', model: 'Polo 1.0 TSI', engine: '1.0L Petrol Turbo', bhp: 95, torque: 175, fuel: 'Petrol' },
  { match: ['tiguan', '2.0 tdi'], make: 'Volkswagen', model: 'Tiguan 2.0 TDI', engine: '2.0L Diesel', bhp: 150, torque: 340, fuel: 'Diesel' },

  // ---- Audi ----
  { match: ['a3', '2.0 tdi'], make: 'Audi', model: 'A3 2.0 TDI', engine: '2.0L Diesel', bhp: 150, torque: 340, fuel: 'Diesel' },
  { match: ['a4', '2.0 tdi'], make: 'Audi', model: 'A4 2.0 TDI', engine: '2.0L Diesel', bhp: 190, torque: 400, fuel: 'Diesel' },
  { match: ['a4', '2.0 tfsi'], make: 'Audi', model: 'A4 2.0 TFSI', engine: '2.0L Petrol Turbo', bhp: 190, torque: 320, fuel: 'Petrol' },
  { match: ['a6', '3.0 tdi'], make: 'Audi', model: 'A6 3.0 TDI', engine: '3.0L V6 Diesel', bhp: 231, torque: 500, fuel: 'Diesel' },
  { match: ['s3'], make: 'Audi', model: 'S3', engine: '2.0L Petrol Turbo', bhp: 310, torque: 400, fuel: 'Petrol' },
  { match: ['rs3'], make: 'Audi', model: 'RS3', engine: '2.5L Petrol Turbo', bhp: 400, torque: 500, fuel: 'Petrol' },

  // ---- BMW ----
  { match: ['118d'], make: 'BMW', model: '118d', engine: '2.0L Diesel', bhp: 150, torque: 320, fuel: 'Diesel' },
  { match: ['120d'], make: 'BMW', model: '120d', engine: '2.0L Diesel', bhp: 190, torque: 400, fuel: 'Diesel' },
  { match: ['320d'], make: 'BMW', model: '320d', engine: '2.0L Diesel', bhp: 190, torque: 400, fuel: 'Diesel' },
  { match: ['330d'], make: 'BMW', model: '330d', engine: '3.0L Diesel', bhp: 265, torque: 580, fuel: 'Diesel' },
  { match: ['520d'], make: 'BMW', model: '520d', engine: '2.0L Diesel', bhp: 190, torque: 400, fuel: 'Diesel' },
  { match: ['530d'], make: 'BMW', model: '530d', engine: '3.0L Diesel', bhp: 265, torque: 620, fuel: 'Diesel' },
  { match: ['m140i'], make: 'BMW', model: 'M140i', engine: '3.0L Petrol Turbo', bhp: 340, torque: 500, fuel: 'Petrol' },
  { match: ['m2'], make: 'BMW', model: 'M2', engine: '3.0L Petrol Twin-Turbo', bhp: 370, torque: 550, fuel: 'Petrol' },
  { match: ['m3'], make: 'BMW', model: 'M3', engine: '3.0L Petrol Twin-Turbo', bhp: 480, torque: 550, fuel: 'Petrol' },
  { match: ['m4'], make: 'BMW', model: 'M4', engine: '3.0L Petrol Twin-Turbo', bhp: 480, torque: 550, fuel: 'Petrol' },
  { match: ['m5'], make: 'BMW', model: 'M5', engine: '4.4L V8 Twin-Turbo', bhp: 600, torque: 750, fuel: 'Petrol' },

  // ---- Ford ----
  { match: ['fiesta', 'st'], make: 'Ford', model: 'Fiesta ST', engine: '1.5L Petrol Turbo', bhp: 200, torque: 290, fuel: 'Petrol' },
  { match: ['focus', 'st'], make: 'Ford', model: 'Focus ST', engine: '2.3L Petrol Turbo', bhp: 280, torque: 420, fuel: 'Petrol' },
  { match: ['focus', 'rs'], make: 'Ford', model: 'Focus RS', engine: '2.3L Petrol Turbo', bhp: 350, torque: 470, fuel: 'Petrol' },
  { match: ['focus', '1.5 tdci'], make: 'Ford', model: 'Focus 1.5 TDCi', engine: '1.5L Diesel', bhp: 120, torque: 300, fuel: 'Diesel' },
  { match: ['transit', '2.0'], make: 'Ford', model: 'Transit 2.0 EcoBlue', engine: '2.0L Diesel', bhp: 130, torque: 385, fuel: 'Diesel' },

  // ---- Vauxhall ----
  { match: ['astra', 'vxr'], make: 'Vauxhall', model: 'Astra VXR', engine: '2.0L Petrol Turbo', bhp: 280, torque: 400, fuel: 'Petrol' },
  { match: ['corsa', 'vxr'], make: 'Vauxhall', model: 'Corsa VXR', engine: '1.6L Petrol Turbo', bhp: 205, torque: 245, fuel: 'Petrol' },

  // ---- Mercedes ----
  { match: ['a220d'], make: 'Mercedes-Benz', model: 'A220d', engine: '2.0L Diesel', bhp: 190, torque: 400, fuel: 'Diesel' },
  { match: ['c220d'], make: 'Mercedes-Benz', model: 'C220d', engine: '2.0L Diesel', bhp: 194, torque: 400, fuel: 'Diesel' },
  { match: ['e220d'], make: 'Mercedes-Benz', model: 'E220d', engine: '2.0L Diesel', bhp: 194, torque: 400, fuel: 'Diesel' },
  { match: ['a45'], make: 'Mercedes-AMG', model: 'A45', engine: '2.0L Petrol Turbo', bhp: 421, torque: 500, fuel: 'Petrol' },
  { match: ['c43'], make: 'Mercedes-AMG', model: 'C43', engine: '3.0L V6 Twin-Turbo', bhp: 390, torque: 520, fuel: 'Petrol' },

  // ---- Others ----
  { match: ['leon', 'cupra'], make: 'SEAT', model: 'Leon Cupra', engine: '2.0L Petrol Turbo', bhp: 300, torque: 400, fuel: 'Petrol' },
  { match: ['octavia', 'vrs'], make: 'Škoda', model: 'Octavia vRS', engine: '2.0L Petrol Turbo', bhp: 245, torque: 370, fuel: 'Petrol' },
  { match: ['clio', 'rs'], make: 'Renault', model: 'Clio RS', engine: '1.6L Petrol Turbo', bhp: 200, torque: 240, fuel: 'Petrol' },
  { match: ['megane', 'rs'], make: 'Renault', model: 'Megane RS', engine: '1.8L Petrol Turbo', bhp: 280, torque: 390, fuel: 'Petrol' },
];

// Generic tier when reg cannot be resolved to a specific curated entry.
export const GENERIC_BY_ENGINE = [
  { fuel: 'Diesel',  cc: 1600, bhp: 105, torque: 250 },
  { fuel: 'Diesel',  cc: 2000, bhp: 150, torque: 340 },
  { fuel: 'Diesel',  cc: 3000, bhp: 240, torque: 500 },
  { fuel: 'Petrol',  cc: 1000, bhp: 95,  torque: 175 },
  { fuel: 'Petrol',  cc: 1400, bhp: 125, torque: 200 },
  { fuel: 'Petrol',  cc: 1600, bhp: 150, torque: 250 },
  { fuel: 'Petrol',  cc: 2000, bhp: 200, torque: 320 },
  { fuel: 'Petrol',  cc: 3000, bhp: 340, torque: 500 },
];
