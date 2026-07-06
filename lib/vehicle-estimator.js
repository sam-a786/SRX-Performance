// Realistic Stage 1 gain estimator based on engine type.
// Percentages reflect typical safe Stage 1 gains from reputable UK tuners.
export function calculateStage1(factory) {
  const { bhp = 0, torque = 0, fuel = 'Petrol', engine = '' } = factory || {};
  const isTurbo = /turbo|tdi|tfsi|tsi|tdci|ecoboost|hdi|cdti|dci|crdi/i.test(engine) || fuel === 'Diesel';
  const engineLower = (engine || '').toLowerCase();

  let bhpPct, torquePct;
  if (fuel === 'Diesel') {
    // Modern turbo diesels: strong gains
    bhpPct = 0.28;      // ~28%
    torquePct = 0.30;   // ~30%
  } else if (isTurbo) {
    // Turbo petrol: solid gains
    bhpPct = 0.22;
    torquePct = 0.20;
  } else if (engineLower.includes('hybrid')) {
    bhpPct = 0.06;
    torquePct = 0.06;
  } else {
    // Naturally aspirated petrol: modest gains
    bhpPct = 0.08;
    torquePct = 0.08;
  }

  const stage1Bhp = Math.round(bhp * (1 + bhpPct));
  const stage1Torque = Math.round(torque * (1 + torquePct));
  return {
    bhp: stage1Bhp,
    torque: stage1Torque,
    bhpIncrease: stage1Bhp - bhp,
    torqueIncrease: stage1Torque - torque,
    bhpPct: Math.round(bhpPct * 100),
    torquePct: Math.round(torquePct * 100),
  };
}
