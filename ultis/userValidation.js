function validateUser({ email, password, displayName }) {
    const errors = [];
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid or missing email');
    if (!password || password.length < 8) errors.push('Password is required');
    if (!displayName || displayName.trim().length < 3) errors.push('Display name must be at least 3 chars');
    return errors;
}
module.exports = validateUser;
