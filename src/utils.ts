import jwt from "jsonwebtoken";
export function checkPasswordStrength(password: string) {
  const strengthRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return strengthRegex.test(password);
}

export function generateToken(data: { email: string; id: string }) {
  return jwt.sign({ data }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h",
  });
}
