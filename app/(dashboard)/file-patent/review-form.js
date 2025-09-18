// import { Box } from "@mui/joy";

// export default function ReviewForm({ data }) {
//   return (
//     <Box>
//       <h3>Review Patent Filing</h3>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </Box>
//   );
// }

// "use client";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Divider,
//   Stack,
//   Chip,
// } from "@mui/joy";

// export default function ReviewForm({ data }) {
//   if (!data) return null;

//   const { patent, inventors } = data;

//   // Helper to render boolean values as colored chips
//   const renderBoolean = (label, value) => (
//     <Stack direction="row" spacing={1} alignItems="center" key={label}>
//       <Typography level="body-sm" sx={{ minWidth: 160 }}>
//         {label}:
//       </Typography>
//       <Chip
//         size="sm"
//         variant="soft"
//         color={value ? "success" : "danger"}
//         sx={{ fontWeight: "md" }}
//       >
//         {value ? "Yes" : "No"}
//       </Chip>
//     </Stack>
//   );

//   return (
//     <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
//       {/* Patent Info */}
//       <Card variant="outlined" sx={{ borderRadius: "lg", boxShadow: "sm" }}>
//         <CardContent>
//           <Typography level="title-lg" sx={{ mb: 1 }}>
//             📄 Patent Information
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           <Stack spacing={1}>
//             <Typography level="body-sm">
//               <strong>Lab Code:</strong> {patent.labCode}
//             </Typography>
//             <Typography level="body-sm">
//               <strong>Title:</strong> {patent.titleOfInvention}
//             </Typography>
//             <Typography level="body-sm">
//               <strong>Type:</strong> {patent.typeOfInvention}
//             </Typography>
//             <Typography level="body-sm">
//               <strong>Subject:</strong> {patent.subjectOfInvention}
//             </Typography>
//             <Typography level="body-sm">
//               <strong>Application:</strong> {patent.industrialApplication}
//             </Typography>
//             <Typography level="body-sm">
//               <strong>Country to be filed:</strong> {patent.countryTobeFiled}
//             </Typography>

//             {renderBoolean("NBA Approved", patent.nbaApproved)}
//             {renderBoolean(
//               "Specification Available",
//               patent.specificationAvailable
//             )}
//             {renderBoolean("Soft Copies Available", patent.softCopiesAvailable)}
//             {renderBoolean("Form-1 Available", patent.form1Available)}
//             {renderBoolean("IDF Available", patent.idfAvailable)}
//           </Stack>
//         </CardContent>
//       </Card>

//       {/* Inventors */}
//       <Card variant="outlined" sx={{ borderRadius: "lg", boxShadow: "sm" }}>
//         <CardContent>
//           <Typography level="title-lg" sx={{ mb: 1 }}>
//             👩‍🔬 Inventors
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           {inventors?.length ? (
//             <Stack spacing={2}>
//               {inventors.map((inv, index) => (
//                 <Card
//                   key={index}
//                   variant="soft"
//                   sx={{
//                     borderRadius: "md",
//                     p: 2,
//                     boxShadow: "sm",
//                   }}
//                 >
//                   <Typography level="title-sm" sx={{ mb: 0.5 }}>
//                     {inv.name} ({inv.gender})
//                   </Typography>
//                   <Typography level="body-sm">
//                     Nationality: {inv.nationality}
//                   </Typography>
//                   <Typography level="body-sm">
//                     Lab Code: {inv.labCode}
//                   </Typography>
//                   <Typography level="body-sm">
//                     {inv.city}, {inv.state}, {inv.country} - {inv.pincode}
//                   </Typography>
//                 </Card>
//               ))}
//             </Stack>
//           ) : (
//             <Typography level="body-sm" color="neutral">
//               No inventors added yet.
//             </Typography>
//           )}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

"use client";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Chip,
  Link,
} from "@mui/joy";

export default function ReviewForm({ data }) {
  if (!data) return null;

  const { patent, inventors } = data;

  // ✅ Helper to render boolean values as colored chips
  const renderBoolean = (label, value) => (
    <Stack direction="row" spacing={1} alignItems="center" key={label}>
      <Typography level="body-sm" sx={{ minWidth: 180 }}>
        {label}:
      </Typography>
      <Chip
        size="sm"
        variant="soft"
        color={value ? "success" : "danger"}
        sx={{ fontWeight: "md" }}
      >
        {value ? "Yes" : "No"}
      </Chip>
    </Stack>
  );

  // ✅ Helper to render file info
  const renderFile = (file) => {
    if (!file) {
      return (
        <Typography level="body-xs" color="neutral">
          Not uploaded
        </Typography>
      );
    }
    return (
      <Typography level="body-xs" sx={{ color: "primary.600" }}>
        📎 {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
      </Typography>
    );
  };

  return (
    <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Patent Info */}
      <Card variant="outlined" sx={{ borderRadius: "lg", boxShadow: "sm" }}>
        <CardContent>
          <Typography level="title-lg" sx={{ mb: 1 }}>
            📄 Patent Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Stack spacing={1}>
            <Typography level="body-sm">
              <strong>Lab Code:</strong> {patent.labCode}
            </Typography>
            <Typography level="body-sm">
              <strong>Title:</strong> {patent.titleOfInvention}
            </Typography>
            <Typography level="body-sm">
              <strong>Type:</strong> {patent.typeOfInvention}
            </Typography>
            <Typography level="body-sm">
              <strong>Subject:</strong> {patent.subjectOfInvention}
            </Typography>
            <Typography level="body-sm">
              <strong>Application:</strong> {patent.industrialApplication}
            </Typography>
            <Typography level="body-sm">
              <strong>Country to be filed:</strong> {patent.countryTobeFiled}
            </Typography>

            {renderBoolean("NBA Approved", patent.nbaApproved)}
            {patent.nbaApproved && renderFile(patent.nbaFile)}

            {renderBoolean(
              "Specification Available",
              patent.specificationAvailable
            )}
            {patent.specificationAvailable &&
              renderFile(patent.specificationFile)}

            {renderBoolean("Soft Copies Available", patent.softCopiesAvailable)}
            {patent.softCopiesAvailable && renderFile(patent.softCopiesFile)}

            {renderBoolean("Form-1 Available", patent.form1Available)}
            {patent.form1Available && renderFile(patent.form1File)}

            {renderBoolean("IDF Available", patent.idfAvailable)}
            {patent.idfAvailable && renderFile(patent.idfFile)}
          </Stack>
        </CardContent>
      </Card>

      {/* Inventors */}
      <Card variant="outlined" sx={{ borderRadius: "lg", boxShadow: "sm" }}>
        <CardContent>
          <Typography level="title-lg" sx={{ mb: 1 }}>
            👩‍🔬 Inventors
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {inventors?.length ? (
            <Stack spacing={2}>
              {inventors.map((inv, index) => (
                <Card
                  key={index}
                  variant="soft"
                  sx={{
                    borderRadius: "md",
                    p: 2,
                    boxShadow: "sm",
                  }}
                >
                  <Typography level="title-sm" sx={{ mb: 0.5 }}>
                    {inv.name} ({inv.gender})
                  </Typography>
                  <Typography level="body-sm">
                    Nationality: {inv.nationality}
                  </Typography>
                  <Typography level="body-sm">
                    Lab Code: {inv.labCode}
                  </Typography>
                  <Typography level="body-sm">
                    {inv.city}, {inv.state}, {inv.country} - {inv.pincode}
                  </Typography>
                </Card>
              ))}
            </Stack>
          ) : (
            <Typography level="body-sm" color="neutral">
              No inventors added yet.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
