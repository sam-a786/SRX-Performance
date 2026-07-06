// SRX Performance — Vehicle Lookup Service
// A modular adapter layer. The provider is chosen via VEHICLE_API_PROVIDER env var.
// You can add / switch providers later by simply setting a key in .env — no code
// changes required elsewhere in the application.
//
//   VEHICLE_API_PROVIDER = 'ukvd'    (UK Vehicle Data — paid, full spec incl. BHP/torque) [RECOMMENDED]
//                        = 'vdg'     (VehicleDataGlobal — paid, full spec)
//                        = 'vd'      (Vehicle Databases — paid)
//                        = 'dvla'    (DVLA VES — free but registrations currently closed)
//                        = 'none'    (no lookup — manual entry mode; default)
//
// The service always returns a consistent shape:
//   { ok, provider, hasPerformanceData, vehicle, factory: {bhp,torque}|null, stage1: {...}|null, notice }
//
// IMPORTANT: This service will NEVER return fake BHP or torque figures. If the
// underlying provider does not supply performance data, the calling UI is
// responsible for capturing the customer's details and SRX will follow up with
// a bespoke Stage 1 estimate.

import { calculateStage1 } from './vehicle-estimator';

function normalizeReg(reg) {
  return (reg || '').toUpperCase().replace(/\s+/g, '').trim();
}

// ----------------------------------------------------------------
// Adapter: DVLA Vehicle Enquiry Service (free, but registrations currently closed as of 2025)
// Kept in case registrations reopen in future. Returns: make, colour, year, fuel, engineCC.
// ----------------------------------------------------------------
async function dvlaLookup(reg) {
  const key = process.env.DVLA_API_KEY;
  if (!key) throw new Error('DVLA_API_KEY not configured');
  const res = await fetch('https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': key, Accept: 'application/json' },
    body: JSON.stringify({ registrationNumber: reg }),
  });
  if (res.status === 404) throw new Error('Vehicle not found on DVLA records.');
  if (!res.ok) throw new Error(`DVLA lookup failed (HTTP ${res.status})`);
  const data = await res.json();
  return {
    make: data.make || null,
    colour: data.colour || null,
    year: data.yearOfManufacture || null,
    fuel: data.fuelType || null,
    engineCC: data.engineCapacity || null,
  };
}

// ----------------------------------------------------------------
// Adapter: UK Vehicle Data (paid) — full spec incl. BHP/torque/model.
// Get an API key at https://ukvehicledata.co.uk/. Once you have one:
//   VEHICLE_API_PROVIDER=ukvd
//   UKVD_API_KEY=your-key-here
// ----------------------------------------------------------------
async function ukvdLookup(reg) {
  const key = process.env.UKVD_API_KEY;
  if (!key) throw new Error('UKVD_API_KEY not configured');
  const url = `https://uk1.ukvehicledata.co.uk/api/datapackage/VehicleData?v=2&api_nullitems=1&auth_apikey=${key}&key_VRM=${reg}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`UKVD lookup failed (${res.status})`);
  const data = await res.json();
  const dp = data?.Response?.DataItems || {};
  const vr = dp.VehicleRegistration || {};
  const perf = dp?.TechnicalDetails?.Performance || {};
  const dim = dp?.TechnicalDetails?.Dimensions || {};
  return {
    make: vr.Make || null,
    model: vr.Model || dp?.ClassificationDetails?.Dvla?.Model || null,
    year: vr.YearOfManufacture || null,
    fuel: vr.FuelType || null,
    colour: vr.Colour || null,
    engineCC: dim.EngineCapacityCc || null,
    bhp: perf?.Power?.Bhp || null,
    torque: perf?.Torque?.Nm || null,
  };
}

// ----------------------------------------------------------------
// Adapter: VehicleDataGlobal (paid) — stub; implement per docs when subscribing.
// ----------------------------------------------------------------
async function vdgLookup(reg) {
  const key = process.env.VDG_API_KEY;
  if (!key) throw new Error('VDG_API_KEY not configured');
  throw new Error('VehicleDataGlobal adapter not yet implemented.');
}

// ----------------------------------------------------------------
// Adapter: Vehicle Databases (paid) — stub; implement per docs when subscribing.
// ----------------------------------------------------------------
async function vdLookup(reg) {
  const key = process.env.VD_API_KEY;
  if (!key) throw new Error('VD_API_KEY not configured');
  throw new Error('Vehicle Databases adapter not yet implemented.');
}

function pickProvider() {
  const cfg = (process.env.VEHICLE_API_PROVIDER || '').toLowerCase().trim();
  if (cfg === 'ukvd' && process.env.UKVD_API_KEY) return 'ukvd';
  if (cfg === 'vdg' && process.env.VDG_API_KEY) return 'vdg';
  if (cfg === 'vd' && process.env.VD_API_KEY) return 'vd';
  if (cfg === 'dvla' && process.env.DVLA_API_KEY) return 'dvla';
  // Auto — prefer full-spec provider if a key exists.
  if (process.env.UKVD_API_KEY) return 'ukvd';
  if (process.env.VDG_API_KEY) return 'vdg';
  if (process.env.VD_API_KEY) return 'vd';
  if (process.env.DVLA_API_KEY) return 'dvla';
  return 'none';
}

// Basic UK registration format validation (accepts most current + prefix styles).
function validReg(reg) {
  if (!reg || reg.length < 2 || reg.length > 8) return false;
  return /^[A-Z0-9]+$/.test(reg);
}

export async function lookupVehicle(regInput) {
  const reg = normalizeReg(regInput);
  if (!validReg(reg)) {
    return { ok: false, error: 'Please enter a valid UK registration.' };
  }

  const provider = pickProvider();

  // ---- No provider configured: manual-entry mode. ----
  // We still confirm the registration is well-formed and hand control to the UI
  // so it can capture the customer's vehicle details + contact info directly.
  if (provider === 'none') {
    return {
      ok: true,
      provider: 'none',
      hasPerformanceData: false,
      manualEntry: true,
      vehicle: { registration: reg },
      factory: null,
      stage1: null,
      notice: "We'll confirm your vehicle's exact specification and email you a personalised Stage 1 estimate.",
    };
  }

  let base = null;
  try {
    if (provider === 'ukvd') base = await ukvdLookup(reg);
    else if (provider === 'vdg') base = await vdgLookup(reg);
    else if (provider === 'vd') base = await vdLookup(reg);
    else if (provider === 'dvla') base = await dvlaLookup(reg);
  } catch (err) {
    // Any provider failure gracefully falls back to manual entry so the funnel
    // is never blocked for the customer.
    return {
      ok: true,
      provider,
      hasPerformanceData: false,
      manualEntry: true,
      vehicle: { registration: reg },
      factory: null,
      stage1: null,
      notice: "We couldn't automatically retrieve your vehicle details. Please confirm them below and we'll email you a personalised Stage 1 estimate.",
      lookupError: err.message,
    };
  }

  if (!base) {
    return {
      ok: true,
      provider,
      hasPerformanceData: false,
      manualEntry: true,
      vehicle: { registration: reg },
      factory: null,
      stage1: null,
      notice: "We couldn't automatically retrieve your vehicle details. Please confirm them below and we'll email you a personalised Stage 1 estimate.",
    };
  }

  const vehicle = {
    registration: reg,
    make: base.make || null,
    model: base.model || null,
    year: base.year || null,
    fuel: base.fuel || null,
    colour: base.colour || null,
    engineCC: base.engineCC || null,
    engineCCDisplay: base.engineCC ? `${base.engineCC} cc (${(base.engineCC / 1000).toFixed(1)}L)` : null,
  };

  // Full-spec provider supplied BHP + torque → compute Stage 1 straight away.
  if (base.bhp && base.torque) {
    const stage1 = calculateStage1({ bhp: base.bhp, torque: base.torque, fuel: base.fuel, engine: `${base.engineCC || ''} ${base.fuel || ''}` });
    return {
      ok: true,
      provider,
      hasPerformanceData: true,
      manualEntry: false,
      vehicle,
      factory: { bhp: base.bhp, torque: base.torque },
      stage1,
    };
  }

  // Basic provider (e.g. DVLA) returned identifying info but no BHP/torque.
  // We deliberately do NOT invent performance figures.
  return {
    ok: true,
    provider,
    hasPerformanceData: false,
    manualEntry: false,
    vehicle,
    factory: null,
    stage1: null,
    notice: 'Your vehicle has been identified. Enter your details below and we\u2019ll email you a personalised Stage 1 estimate.',
  };
}
