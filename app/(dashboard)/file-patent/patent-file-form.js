"use client";
import {
  Box,
  FormLabel,
  Input,
  Autocomplete,
  Checkbox,
  Card,
  Typography,
  Divider,
} from "@mui/joy";
import { typeOfInvention } from "@/app/misc/type-of-invention";
import { countries } from "@/app/misc/countryCode";
import { labs } from "@/app/misc/lab-codes";
import { subjectOfInvention } from "@/app/misc/subjectOfInvention";
import { useState } from "react";

export default function PatentFilingForm({ data, onUpdate }) {
  const [form, setForm] = useState(
    data || {
      labCode: "",
      titleOfInvention: "",
      typeOfInvention: "",
      subjectOfInvention: "",
      industrialApplication: "",
      countryTobeFiled: "",
      nbaApproved: false,
      specificationAvailable: false,
      softCopiesAvailable: false,
      form1Available: false,
      idfAvailable: false,
    }
  );

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onUpdate(updated); // push updates to parent
  };

  return (
    <Card
      variant="outlined"
      sx={{
        p: 4,
        borderRadius: "xl",
        boxShadow: "md",
        maxWidth: 1200,
        mx: "auto",
        mt: 6,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Header */}
      <Typography
        level="h4"
        sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}
      >
        Patent Filing Form
      </Typography>
      <Divider />

      {/* Form Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 3,
        }}
      >
        {/* Lab */}
        <Box>
          <FormLabel>Lab Name</FormLabel>
          <Autocomplete
            placeholder="Lab?"
            options={labs}
            getOptionLabel={(option) => `${option.name} (${option.code})`}
            isOptionEqualToValue={(option, value) => option.code === value.code}
            value={labs.find((l) => l.code === form.labCode) || null}
            onChange={(e, val) => handleChange("labCode", val?.code || "")}
          />
        </Box>

        {/* Title */}
        <Box>
          <FormLabel>Title of the Invention</FormLabel>
          <Input
            value={form.titleOfInvention}
            onChange={(e) => handleChange("titleOfInvention", e.target.value)}
            placeholder="Enter Title"
          />
        </Box>

        {/* Type */}
        <Box>
          <FormLabel>Type of Invention</FormLabel>
          <Autocomplete
            placeholder="Select Type"
            options={typeOfInvention.map((i) => i.label)}
            value={form.typeOfInvention}
            onChange={(e, val) => handleChange("typeOfInvention", val || "")}
          />
        </Box>

        {/* Subject */}
        <Box>
          <FormLabel>Subject of Invention</FormLabel>
          <Autocomplete
            placeholder="Enter Subject"
            options={subjectOfInvention.map((i) => i.label)}
            value={form.subjectOfInvention}
            onChange={(e, val) => handleChange("subjectOfInvention", val || "")}
          />
        </Box>

        {/* Industrial Application */}
        <Box>
          <FormLabel>Industrial Application</FormLabel>
          <Input
            value={form.industrialApplication}
            onChange={(e) =>
              handleChange("industrialApplication", e.target.value)
            }
            placeholder="Enter Industrial Application"
          />
        </Box>

        {/* Place */}
        <Box>
          <FormLabel>Place to be Filed</FormLabel>
          <Autocomplete
            placeholder="Select Country"
            options={countries.map((i) => i.code)}
            value={form.countryTobeFiled}
            onChange={(e, val) => handleChange("countryTobeFiled", val || "")}
          />
        </Box>
      </Box>

      {/* Checkboxes */}
      <Divider sx={{ my: 2 }} />
      <Typography level="title-md">Required Approvals</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 2,
        }}
      >
        <Checkbox
          label="NBA Approved?"
          checked={form.nbaApproved}
          onChange={(e) => handleChange("nbaApproved", e.target.checked)}
        />
        <Checkbox
          label="Specification Available?"
          checked={form.specificationAvailable}
          onChange={(e) =>
            handleChange("specificationAvailable", e.target.checked)
          }
        />
        <Checkbox
          label="SoftCopies Available?"
          checked={form.softCopiesAvailable}
          onChange={(e) =>
            handleChange("softCopiesAvailable", e.target.checked)
          }
        />
        <Checkbox
          label="Form 1 Available?"
          checked={form.form1Available}
          onChange={(e) => handleChange("form1Available", e.target.checked)}
        />
        <Checkbox
          label="IDF Available?"
          checked={form.idfAvailable}
          onChange={(e) => handleChange("idfAvailable", e.target.checked)}
        />
      </Box>
    </Card>
  );
}
