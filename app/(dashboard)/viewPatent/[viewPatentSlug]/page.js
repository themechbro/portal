// "use client";
// import { useEffect, useState } from "react";
// import { Box, Typography, Card, Chip, Button, Divider } from "@mui/joy";
// import { Download, FileText } from "lucide-react";
// import { usePathname } from "next/navigation";

// export default function ViewPatentPage() {
//   const path = usePathname();
//   const nf_no = path.split("/")[2]?.trim();
//   const [patentData, setPatentData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (nf_no) {
//       setLoading(true);
//       fetch(`${process.env.NEXT_PUBLIC_HOST_IP}/view-patent?nf_no=${nf_no}`, {
//         credentials: "include",
//       })
//         .then(async (res) => {
//           if (!res.ok) throw new Error(`Error: ${res.status}`);
//           const json = await res.json();
//           console.log("Fetched:", json);
//           // json.data is your array
//           setPatentData(json.data[0]); // ✅ correct
//         })
//         .catch((err) => console.error(err))
//         .finally(() => setLoading(false));
//     }
//   }, [nf_no]);

//   if (loading) {
//     return (
//       <Box className="flex justify-center items-center h-screen">
//         <Typography level="h4">Loading patent details...</Typography>
//       </Box>
//     );
//   }

//   if (!patentData) {
//     return (
//       <Box className="flex justify-center items-center h-screen">
//         <Typography level="h4">No patent found</Typography>
//       </Box>
//     );
//   }

//   const { patentDetails, fileDetails } = patentData;
//   const Uploads = [
//     { name: "NBA Approved?", status: patentDetails.nba_approved },
//     {
//       name: "Specification Available?",
//       status: patentDetails.specification_available,
//     },
//     {
//       name: "Softcopies Available?",
//       status: patentDetails.softcopies_available,
//     },
//     { name: "Form 1 Available?", status: patentDetails.form1_available },
//     { name: "IDF Available?", status: patentDetails.idf_available },
//   ];
//   console.log(Uploads);

//   const fileKeys = [
//     { key: "nba", label: "NBA File" },
//     { key: "idf", label: "IDF File" },
//     { key: "specification", label: "Specification" },
//     { key: "form1", label: "Form 1" },
//     { key: "softcopies", label: "Softcopies" },
//   ];

//   return (
//     <Box className="p-6 max-w-6xl mx-auto">
//       {/* Title */}
//       <Typography
//         level="h2"
//         className="mb-6 text-center font-bold tracking-wide"
//         sx={{ fontFamily: "Roboto Condensed" }}
//       >
//         Patent Details – {patentDetails.nf_no}
//       </Typography>

//       {/* Patent Details Card */}
//       <Card className="rounded-2xl shadow-lg p-6 bg-white mb-8">
//         <Typography level="h4" className="mb-4 font-semibold">
//           Patent Information
//         </Typography>
//         <div className="grid md:grid-cols-2 gap-4">
//           <div>
//             <Typography level="body-sm">
//               <strong>Title:</strong> {patentDetails.title_of_invention}
//             </Typography>
//             <Typography level="body-sm">
//               <strong>Type:</strong> {patentDetails.type_of_invention}
//             </Typography>
//             <Typography level="body-sm">
//               <strong>Subject:</strong> {patentDetails.subject_of_invention}
//             </Typography>
//             <Typography level="body-sm">
//               <strong>Industrial Application:</strong>{" "}
//               {patentDetails.industrial_application}
//             </Typography>
//           </div>
//           <div>
//             <Typography level="body-sm">
//               <strong>Country:</strong> {patentDetails.country_to_be_filed}
//             </Typography>
//             <Typography level="body-sm">
//               <strong>Lab Code:</strong> {patentDetails.lab_code}
//             </Typography>
//             <Typography level="body-sm">
//               <strong>Filed On:</strong>{" "}
//               {new Date(patentDetails.created_at).toLocaleDateString()}
//             </Typography>
//           </div>
//           {/* Upload section */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-evenly",
//             }}
//           >
//             {Uploads.map((item, index) => {
//               return (
//                 <Typography level="body-sm" key={index}>
//                   <strong>{item.name}</strong>{" "}
//                   {item.status ? (
//                     <Chip
//                       color="success"
//                       size="sm"
//                       sx={{ fontFamily: "Roboto Condensed" }}
//                     >
//                       Yes
//                     </Chip>
//                   ) : (
//                     <Chip color="danger" size="sm">
//                       No
//                     </Chip>
//                   )}
//                 </Typography>
//               );
//             })}
//           </Box>
//         </div>
//       </Card>

//       {/* File Details */}
//       <Card className="rounded-2xl shadow-lg p-6 bg-white">
//         <Typography level="h4" className="mb-4 font-semibold">
//           Files
//         </Typography>
//         <Divider className="mb-4" />
//         <div className="grid md:grid-cols-2 gap-4">
//           {fileKeys.map(({ key, label }) => {
//             const file = fileDetails[`${key}_file`];
//             const filename = fileDetails[`${key}_filename`];
//             const mimetype = fileDetails[`${key}_mimetype`];

//             return (
//               <Box
//                 key={key}
//                 className="flex justify-between items-center border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
//               >
//                 <div className="flex items-center gap-2">
//                   <FileText className="text-blue-500" size={20} />
//                   <Typography level="body-sm">{label}</Typography>
//                 </div>
//                 {file && filename ? (
//                   <Button
//                     size="sm"
//                     variant="solid"
//                     color="primary"
//                     className="flex items-center gap-2"
//                     onClick={() => {
//                       const blob = new Blob([file], { type: mimetype });
//                       const url = URL.createObjectURL(blob);
//                       const link = document.createElement("a");
//                       link.href = url;
//                       link.download = filename;
//                       link.click();
//                       URL.revokeObjectURL(url);
//                     }}
//                   >
//                     <Download size={16} /> Download
//                   </Button>
//                 ) : (
//                   <Chip color="neutral" size="sm">
//                     Not Available
//                   </Chip>
//                 )}
//               </Box>
//             );
//           })}
//         </div>
//       </Card>
//     </Box>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Chip,
  Button,
  Divider,
  Input,
  LinearProgress,
} from "@mui/joy";
import {
  Download,
  FileText,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function ViewPatentPage() {
  const path = usePathname();
  const nf_no = path.split("/")[2]?.trim();
  const [patentData, setPatentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingFiles, setUploadingFiles] = useState({});

  useEffect(() => {
    if (nf_no) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_HOST_IP}/view-patent?nf_no=${nf_no}`, {
        credentials: "include",
      })
        .then(async (res) => {
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          const json = await res.json();
          console.log("Fetched:", json);
          setPatentData(json.data[0]);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [nf_no]);

  const handleFileUpload = async (fileKey, file) => {
    if (!file) return;

    setUploadingFiles((prev) => ({ ...prev, [fileKey]: true }));

    const formData = new FormData();
    formData.append("file", file);
    formData.append("nf_no", nf_no);
    formData.append("fileType", fileKey);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_IP}/upload-patent-file`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        // Refresh patent data after successful upload
        window.location.reload();
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [fileKey]: false }));
    }
  };

  if (loading) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center">
        <Card className="p-8 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
          <Box className="text-center">
            <LinearProgress variant="soft" className="mb-4" />
            <Typography level="h4" className="text-gray-700 font-medium">
              Loading patent details...
            </Typography>
          </Box>
        </Card>
      </Box>
    );
  }

  if (!patentData) {
    return (
      <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center">
        <Card className="p-8 shadow-2xl rounded-3xl bg-white/80 backdrop-blur-sm">
          <Box className="text-center">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <Typography level="h4" className="text-gray-700">
              No patent found
            </Typography>
          </Box>
        </Card>
      </Box>
    );
  }

  const { patentDetails, fileDetails } = patentData;

  const statusItems = [
    {
      name: "NBA Approved",
      status: patentDetails.nba_approved,
      icon: CheckCircle,
    },
    {
      name: "Specification Available",
      status: patentDetails.specification_available,
      icon: FileText,
    },
    {
      name: "Softcopies Available",
      status: patentDetails.softcopies_available,
      icon: Download,
    },
    {
      name: "Form 1 Available",
      status: patentDetails.form1_available,
      icon: FileText,
    },
    {
      name: "IDF Available",
      status: patentDetails.idf_available,
      icon: FileText,
    },
  ];

  const fileKeys = [
    { key: "nba", label: "NBA File", color: "primary" },
    { key: "idf", label: "IDF File", color: "success" },
    { key: "specification", label: "Specification", color: "warning" },
    { key: "form1", label: "Form 1", color: "neutral" },
    { key: "softcopies", label: "Softcopies", color: "danger" },
  ];

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8">
      <Box className="max-w-7xl mx-auto">
        {/* Header */}
        <Box className="text-center mb-8">
          <Typography
            level="h1"
            className="mb-2 font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            sx={{
              fontFamily: "Roboto Condensed",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Patent Portfolio
          </Typography>
          <Typography level="h3" className="text-gray-600 font-medium">
            {patentDetails.nf_no}
          </Typography>
          <Box className="flex justify-center items-center gap-2 mt-2">
            <Star className="text-yellow-500 fill-yellow-500" size={20} />
            <Typography level="body-sm" className="text-gray-500">
              Filed on {new Date(patentDetails.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        {/* Status Overview */}
        <Card className="mb-8 p-6 shadow-2xl rounded-3xl bg-white/90 backdrop-blur-sm border border-white/20">
          <Typography
            level="h4"
            className="mb-6 font-semibold text-gray-800 flex items-center gap-2"
          >
            <CheckCircle className="text-green-500" size={24} />
            Status Overview
          </Typography>
          <Box className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {statusItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Box
                  key={index}
                  className="text-center p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <IconComponent
                    size={32}
                    className={`mx-auto mb-2 ${
                      item.status ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                  <Typography
                    level="body-xs"
                    className="font-medium text-gray-700 mb-2"
                  >
                    {item.name}
                  </Typography>
                  <Chip
                    color={item.status ? "success" : "neutral"}
                    size="sm"
                    variant="soft"
                    className="font-semibold"
                  >
                    {item.status ? "Yes" : "No"}
                  </Chip>
                </Box>
              );
            })}
          </Box>
        </Card>

        {/* Patent Details */}
        <Card className="mb-8 shadow-2xl rounded-3xl bg-white/90 backdrop-blur-sm border border-white/20">
          <Box className="p-6">
            <Typography
              level="h4"
              className="mb-6 font-semibold text-gray-800 flex items-center gap-2"
            >
              <FileText className="text-blue-500" size={24} />
              Patent Information
            </Typography>

            <Box className="grid md:grid-cols-2 gap-8">
              <Box className="space-y-4">
                <Box className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                  <Typography
                    level="body-sm"
                    className="text-blue-700 font-semibold mb-1"
                  >
                    Title of Invention
                  </Typography>
                  <Typography
                    level="body-md"
                    className="text-gray-800 font-medium"
                  >
                    {patentDetails.title_of_invention}
                  </Typography>
                </Box>

                <Box className="p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                  <Typography
                    level="body-sm"
                    className="text-green-700 font-semibold mb-1"
                  >
                    Type of Invention
                  </Typography>
                  <Typography level="body-md" className="text-gray-800">
                    {patentDetails.type_of_invention}
                  </Typography>
                </Box>

                <Box className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                  <Typography
                    level="body-sm"
                    className="text-purple-700 font-semibold mb-1"
                  >
                    Subject of Invention
                  </Typography>
                  <Typography level="body-md" className="text-gray-800">
                    {patentDetails.subject_of_invention}
                  </Typography>
                </Box>
              </Box>

              <Box className="space-y-4">
                <Box className="p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100">
                  <Typography
                    level="body-sm"
                    className="text-orange-700 font-semibold mb-1"
                  >
                    Industrial Application
                  </Typography>
                  <Typography level="body-md" className="text-gray-800">
                    {patentDetails.industrial_application}
                  </Typography>
                </Box>

                <Box className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100">
                  <Typography
                    level="body-sm"
                    className="text-teal-700 font-semibold mb-1"
                  >
                    Filing Country
                  </Typography>
                  <Typography level="body-md" className="text-gray-800">
                    {patentDetails.country_to_be_filed}
                  </Typography>
                </Box>

                <Box className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-100">
                  <Typography
                    level="body-sm"
                    className="text-gray-700 font-semibold mb-1"
                  >
                    Lab Code
                  </Typography>
                  <Typography level="body-md" className="text-gray-800">
                    {patentDetails.lab_code}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>

        {/* File Management */}
        <Card className="shadow-2xl rounded-3xl bg-white/90 backdrop-blur-sm border border-white/20">
          <Box className="p-6">
            <Typography
              level="h4"
              className="mb-6 font-semibold text-gray-800 flex items-center gap-2"
            >
              <FileText className="text-purple-500" size={24} />
              Document Management
            </Typography>
            <Divider className="mb-6" />

            <Box className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fileKeys.map(({ key, label, color }) => {
                const file = fileDetails[`${key}_file`];
                const filename = fileDetails[`${key}_filename`];
                const mimetype = fileDetails[`${key}_mimetype`];
                const isUploading = uploadingFiles[key];

                return (
                  <Card
                    key={key}
                    className="p-6 shadow-lg rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <Box className="text-center">
                      <Box className="flex justify-center mb-4">
                        <Box
                          className={`p-4 rounded-full bg-gradient-to-br ${
                            file
                              ? "from-green-100 to-green-200"
                              : "from-gray-100 to-gray-200"
                          }`}
                        >
                          <FileText
                            className={
                              file ? "text-green-600" : "text-gray-400"
                            }
                            size={32}
                          />
                        </Box>
                      </Box>

                      <Typography
                        level="title-md"
                        className="mb-3 font-semibold text-gray-800"
                      >
                        {label}
                      </Typography>

                      {file && filename ? (
                        <Button
                          variant="solid"
                          color="success"
                          className="w-full flex items-center justify-center gap-2 rounded-xl font-semibold"
                          onClick={() => {
                            const blob = new Blob([file], { type: mimetype });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = filename;
                            link.click();
                            URL.revokeObjectURL(url);
                          }}
                        >
                          <Download size={18} />
                          Download
                        </Button>
                      ) : (
                        <Box className="space-y-3">
                          <Chip color="neutral" variant="soft" className="mb-3">
                            Not Available
                          </Chip>

                          <Input
                            type="file"
                            disabled={isUploading}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(key, file);
                              }
                            }}
                            sx={{
                              "& input": {
                                cursor: "pointer",
                                "&::-webkit-file-upload-button": {
                                  display: "none",
                                },
                              },
                            }}
                          />

                          {isUploading && (
                            <Box className="mt-2">
                              <LinearProgress variant="soft" />
                              <Typography
                                level="body-xs"
                                className="text-center mt-1 text-gray-500"
                              >
                                Uploading...
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
