import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a simple unique client ID (using UUID v4).
 */
export const generateClientId = (): string => {
  // Using UUID for simplicity, prefix for clarity
  return `mock-client-${uuidv4()}`;
};
