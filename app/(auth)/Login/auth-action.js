export async function Login(prevState, formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  let errors = {};

  if (!username && (!password || password.trim().length === 0)) {
    errors.combined = "Please enter username and password";
  }

  if (!username) errors.username = "Username is required";
  if (!password || password.trim().length === 0)
    errors.password = "Password is required";

  if (Object.keys(errors).length > 0) return { errors };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_IP}/login`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const data = await response.json();
      return { errors: { server: data.error } };
    }

    return { success: true };
  } catch (error) {
    return {
      errors: { server: "Something went wrong. Please try again later." },
    };
  }
}
