import { createContext } from "react";


// Create context for Fixtures (allows sharing of fixture's result and prediction)
// This is envoked in FixtureList.jsx (Fixture component)
export const FixtureContext = createContext();