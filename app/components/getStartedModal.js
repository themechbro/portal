import { Button } from "@mui/material";
import { Modal, ModalClose, ModalDialog, Typography } from "@mui/joy";
import Link from "next/link";
import { getStarted_modal_items } from "../misc/getStarted_modal_items";

export default function GetStartedModal({ open, close }) {
  return (
    <Modal open={open} onClose={close}>
      <div className="flex items-center justify-center min-h-screen">
        <ModalDialog
          size="lg"
          sx={{
            borderRadius: "16px",
            background: "linear-gradient(135deg, #ffffff, #f8fafc)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
            padding: "2rem",
            minWidth: "400px",
            transition: "all 0.3s ease-in-out",
          }}
          className={`transform transition-all duration-300 ease-out ${
            open ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <ModalClose
            sx={{
              bgcolor: "white",
              borderRadius: "50%",
              "&:hover": { bgcolor: "gray.200" },
            }}
          />
          <Typography
            level="h4"
            fontWeight="lg"
            mb={3}
            textAlign="center"
            sx={{ color: "#1e293b" }}
          >
            Get Started
          </Typography>
          {getStarted_modal_items.map((i) => {
            return (
              <Button startIcon={i.icon} key={i.id} sx={i.styles}>
                <Link href={i.link}>{i.title}</Link>
              </Button>
            );
          })}
        </ModalDialog>
      </div>
    </Modal>
  );
}
