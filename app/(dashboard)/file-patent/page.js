// import { Typography, Box, Stepper, Step, StepLabel } from "@mui/joy";
// import PatentFilingForm from "./patent-file-form";

// export default function FilePatentPage() {
//   return (
//     <Box
//       sx={{
//         width: "100%",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         p: 2,
//       }}
//     >
//       <Typography
//         level="h2"
//         sx={{
//           fontFamily: "Roboto Condensed",
//           textTransform: "uppercase",
//           letterSpacing: 1.5,
//           wordSpacing: 2,
//         }}
//       >
//         File a new patent
//       </Typography>
//       <Box
//         sx={{
//           mt: 2,
//           p: 2,
//         }}
//       >
//         <PatentFilingForm />
//       </Box>
//     </Box>
//   );
// }

"use client";
import { useState } from "react";
import { Stepper, Step, StepIndicator } from "@mui/joy";
import { Button, Box } from "@mui/joy";
import PatentFilingForm from "./patent-file-form";
import InventorsForm from "./inventors-form";
import ReviewForm from "./review-form";

export default function PatentStepper() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    patent: {},
    inventors: [],
  });

  const steps = ["Patent Filing", "Inventors", "Review"];

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      {/* Stepper */}
      <Stepper size="lg" sx={{ mb: 3 }}>
        {steps.map((label, index) => (
          <Step key={index} completed={index < step}>
            <StepIndicator>{index + 1}</StepIndicator>
            {label}
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
          <Button
            color="success"
            onClick={() => {
              fetch(`${process.env.NEXT_PUBLIC_HOST_IP}/patents`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              })
                .then((res) => res.json())
                .then((data) => console.log("Saved:", data));
            }}
          >
            Submit
          </Button>
        )}
      </Box>
    </Box>
  );
}
