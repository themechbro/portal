export async function SignUpAction(prevState, formData) {
  const email = formData.get("email");
  const username = formData.get("username");
  const fullName = formData.get("fullName");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  let errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !username || !fullName || !password || !confirmPassword) {
    errors.combined = "You cannot submit an empty form.";
  }
  if (!email) {
    errors.email = "Email is required";
  }
  if (!emailRegex.test(email)) {
    errors.email = "Invalid email format";
  }
  if (!username) {
    errors.username = "Username is required";
  }
  if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters long";
  }
  if (!password && !confirmPassword) {
    errors.password = "Password is required";
  }
  if (password !== confirmPassword) {
    errors.retypepassword = "Passwords do not match";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_IP}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword,
        fullName,
      }),
    });
    if (!response.ok) {
      const data = await response.json();
      console.error(`Login failed: ${data.error}`);
      return { errors: { server: data.error } };
    }
    console.log("Signup successful");
    return { success: true, errors: null };
  } catch (error) {
    console.error("Error during login request:", error);
    return {
      errors: {
        server: "Oh Snap, Something went wrong. Please try again later.",
      },
    };
  }
}
