"use client";
import { useState } from "react";
import {
  Box,
  Input,
  FormLabel,
  Autocomplete,
  Button,
  Typography,
  Card,
  Divider,
  IconButton,
} from "@mui/joy";
import { countries } from "@/app/misc/countryCode";
import { labs } from "@/app/misc/lab-codes";
import { Trash } from "lucide-react";

export default function InventorsForm({ inventors, onUpdate }) {
  const [localInventors, setLocalInventors] = useState(inventors || []);
  const [form, setForm] = useState({
    gender: "",
    name: "",
    nationality: "",
    labCode: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleAdd = () => {
    const newList = [...localInventors, form];
    setLocalInventors(newList);
    onUpdate(newList);
    setForm({
      gender: "",
      name: "",
      nationality: "",
      labCode: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
    });
  };

  const handleDelete = (index) => {
    const newList = localInventors.filter((_, i) => i !== index);
    setLocalInventors(newList);
    onUpdate(newList);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Card variant="outlined" sx={{ p: 3, borderRadius: "lg" }}>
        <Typography level="h4" gutterBottom>
          Add Inventor
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: 2,
          }}
        >
          {/* Name */}
          <Box>
            <FormLabel>Name</FormLabel>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Inventor Name"
            />
          </Box>

          {/* Gender */}
          <Box>
            <FormLabel>Gender</FormLabel>
            <Autocomplete
              placeholder="Select Gender"
              options={["Male", "Female", "Other"]}
              value={form.gender}
              onChange={(e, val) => setForm({ ...form, gender: val || "" })}
            />
          </Box>

          {/* Nationality */}
          <Box>
            <FormLabel>Nationality</FormLabel>
            <Autocomplete
              placeholder="Select Country"
              options={countries.map((c) => c.label)}
              value={form.nationality}
              onChange={(e, val) =>
                setForm({ ...form, nationality: val || "" })
              }
            />
          </Box>

          {/* Lab */}
          <Box>
            <FormLabel>Lab</FormLabel>
            <Autocomplete
              placeholder="Choose Lab"
              options={labs.map((l) => `${l.name} (${l.code})`)}
              value={
                form.labCode
                  ? `${labs.find((l) => l.code === form.labCode)?.name} (${
                      form.labCode
                    })`
                  : null
              }
              onChange={(e, val) => {
                const selected = labs.find(
                  (l) => `${l.name} (${l.code})` === val
                );
                setForm({ ...form, labCode: selected?.code || "" });
              }}
            />
          </Box>

          {/* City */}
          <Box>
            <FormLabel>City</FormLabel>
            <Input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="City"
            />
          </Box>

          {/* State */}
          <Box>
            <FormLabel>State</FormLabel>
            <Input
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              placeholder="State"
            />
          </Box>

          {/* Country */}
          <Box>
            <FormLabel>Country</FormLabel>
            <Input
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              placeholder="Country"
            />
          </Box>

          {/* Pincode */}
          <Box>
            <FormLabel>Pincode</FormLabel>
            <Input
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              placeholder="Pincode"
            />
          </Box>
        </Box>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleAdd}>Add Inventor</Button>
        </Box>
      </Card>

      {/* Inventors List */}
      {localInventors.length > 0 && (
        <Card variant="soft" sx={{ p: 3 }}>
          <Typography level="h5" gutterBottom>
            Inventors List
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {localInventors.map((i, idx) => (
            <Box key={idx} sx={{ mb: 1 }}>
              <Typography>
                <b>{i.name}</b> ({i.gender}, {i.nationality}) — Lab Code:{" "}
                {i.labCode}, {i.city}, {i.state}, {i.country}, {i.pincode}
              </Typography>
              <IconButton
                variant="soft"
                color="danger"
                onClick={() => handleDelete(idx)}
              >
                <Trash />
              </IconButton>
            </Box>
          ))}
        </Card>
      )}
    </Box>
  );
}
