// "use client";
// import { useState } from "react";
// import { Stepper, Step, StepIndicator } from "@mui/joy";
// import { Button, Box } from "@mui/joy";
// import PatentFilingForm from "./patent-file-form";
// import InventorsForm from "./inventors-form";
// import ReviewForm from "./review-form";

// export default function PatentStepper() {
//   const [step, setStep] = useState(0);
//   const [formData, setFormData] = useState({
//     patent: {},
//     inventors: [],
//   });

//   const steps = ["Patent Filing", "Inventors", "Review"];

//   const handleNext = () =>
//     setStep((prev) => Math.min(prev + 1, steps.length - 1));
//   const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

//   return (
//     <Box sx={{ width: "100%", p: 3 }}>
//       {/* Stepper */}
//       <Stepper size="lg" sx={{ mb: 3 }}>
//         {steps.map((label, index) => (
//           <Step key={index} completed={index < step}>
//             <StepIndicator>{index + 1}</StepIndicator>
//             {label}
//           </Step>
//         ))}
//       </Stepper>

//       {/* Step Content */}
//       {step === 0 && (
//         <PatentFilingForm
//           data={formData.patent}
//           onUpdate={(data) =>
//             setFormData((prev) => ({ ...prev, patent: data }))
//           }
//         />
//       )}

//       {step === 1 && (
//         <InventorsForm
//           inventors={formData.inventors}
//           onUpdate={(data) =>
//             setFormData((prev) => ({ ...prev, inventors: data }))
//           }
//         />
//       )}

//       {step === 2 && <ReviewForm data={formData} />}

//       {/* Navigation Buttons */}
//       <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
//         <Button disabled={step === 0} onClick={handleBack}>
//           Back
//         </Button>
//         {step < steps.length - 1 ? (
//           <Button onClick={handleNext}>Next</Button>
//         ) : (
//           <Button
//             color="success"
//             onClick={() => {
//               fetch(`${process.env.NEXT_PUBLIC_HOST_IP}/patents`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData),
//                 credentials: "include",
//               })
//                 .then((res) => res.json())
//                 .then((data) => console.log("Saved:", data));
//             }}
//           >
//             Submit
//           </Button>
//         )}
//       </Box>
//     </Box>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepIndicator,
  Snackbar,
  LinearProgress,
  Typography,
} from "@mui/joy";
import { Button, Box } from "@mui/joy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PatentFilingForm from "./patent-file-form";
import InventorsForm from "./inventors-form";
import ReviewForm from "./review-form";

export default function PatentStepper() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    patent: {},
    inventors: [],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    color: "success",
    progress: 0,
  });

  const steps = ["Patent Filing", "Inventors", "Review"];

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    // Show snackbar immediately with progress bar
    setSnackbar({
      open: true,
      message: "Submitting patent...",
      color: "neutral",
      progress: 30,
    });

    fetch(`${process.env.NEXT_PUBLIC_HOST_IP}/patents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setSnackbar({
          open: true,
          message: `✅ Patent filed successfully! NF_NO: ${data.nf_no}`,
          color: "success",
          progress: 100,
        });
      })
      .catch((err) => {
        setSnackbar({
          open: true,
          message: `❌ ${err.message}`,
          color: "danger",
          progress: 100,
        });
      });
  };

  // progress animation (for neutral state)
  useEffect(() => {
    if (snackbar.open && snackbar.color === "neutral") {
      const interval = setInterval(() => {
        setSnackbar((prev) =>
          prev.progress < 90 ? { ...prev, progress: prev.progress + 10 } : prev
        );
      }, 300);
      return () => clearInterval(interval);
    }
  }, [snackbar.open, snackbar.color]);

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      {/* Stepper */}
      <Stepper size="lg" sx={{ mb: 3 }}>
        {steps.map((label, index) => (
          <Step
            key={index}
            completed={index < step}
            sx={{ transition: "all 0.2s ease-in-out" }}
          >
            <StepIndicator
              sx={{
                background: index < step ? "success.500" : "neutral.300",
                color: "#fff",
                borderRadius: "50%",
                width: 30,
                height: 30,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {index < step ? <CheckCircleIcon fontSize="small" /> : index + 1}
            </StepIndicator>
            <Typography level="body-sm">{label}</Typography>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      {step === 0 && (
        <PatentFilingForm
          data={formData.patent}
          onUpdate={(data) =>
            setFormData((prev) => ({ ...prev, patent: data }))
          }
        />
      )}
      {step === 1 && (
        <InventorsForm
          inventors={formData.inventors}
          onUpdate={(data) =>
            setFormData((prev) => ({ ...prev, inventors: data }))
          }
        />
      )}
      {step === 2 && <ReviewForm data={formData} />}

      {/* Navigation Buttons */}
      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button disabled={step === 0} onClick={handleBack}>
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button color="success" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </Box>

      {/* Snackbar with progress bar */}
      <Snackbar
        open={snackbar.open}
        color={snackbar.color}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        size="lg"
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1, width: 300 }}
        >
          <Typography>{snackbar.message}</Typography>
          <LinearProgress
            determinate
            value={snackbar.progress}
            color={snackbar.color === "danger" ? "danger" : "primary"}
          />
        </Box>
      </Snackbar>
    </Box>
  );
}
