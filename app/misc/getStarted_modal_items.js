import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

export const getStarted_modal_items = [
  {
    id: 1,
    title: "Login",
    link: "/Login",
    icon: <LoginIcon />,
    styles: {
      paddingX: 4,
      paddingY: 2,
      backgroundColor: "white",
      color: "#4615b2",
      borderRadius: 2,
      boxShadow: 3,
    },
  },
  {
    id: 2,
    title: "Sign Up",
    link: "/Signup",
    icon: <AppRegistrationIcon />,
    styles: {
      paddingX: 4,
      paddingY: 2,
      backgroundColor: "#4615b2",
      color: "white",
      borderRadius: 2,
      boxShadow: 3,
    },
  },
];
