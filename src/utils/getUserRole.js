// getUserRole.js
import jwtDecode from "jwt-decode";

export function getUserRole(token) {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch (error) {
    return null;
  }
}
