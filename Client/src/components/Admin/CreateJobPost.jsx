

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import {
//   Briefcase,
//   MapPin,
//   DollarSign,
//   Clock,
//   Blocks,
//   FileText,
//   GraduationCap,
//   Send,
//   Building,
//   Globe,
//   X,
//   CheckCircle,
//   IndianRupee,
//   Plus,
//   Link,
// } from "lucide-react";
// import { BASEURL } from "../../utility/config";

// const CreateJobPost = () => {
//   const { employerProfile } = useSelector((state) => state.employer);
//   const [formData, setFormData] = useState({
//     job_title: "",
//     company: "",
//     job_description: "",
//     employment_type: "",
//     work_mode: "",
//     job_location: "",
//     salary_range: "",
//     job_experience_required: "",
//     job_skills_required: [],
//     industry: "",
//     job_link_external: "",
//     status: "Open",
//     posted_at: new Date().toISOString().split("T")[0],

//   });
//   const [companies, setCompanies] = useState();
//   const [skillInput, setSkillInput] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [error, setError] = useState(null);
//   const [employer_id, setEmployer_id] = useState(null);



//   const industries = [
//     "Technology",
//     "Healthcare",
//     "Finance",
//     "Education",
//     "Manufacturing",
//     "Retail",
//     "Marketing",
//     "Media & Entertainment",
//     "Real Estate",
//     "Transportation",
//     "Energy",
//     "Construction",
//     "Agriculture",
//     "Hospitality",
//     "Telecommunications",
//     "Consulting",
//     "Aerospace",
//     "Automotive",
//     "Biotechnology",
//     "E-commerce",
//   ];

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSkillInputChange = (e) => {
//     setSkillInput(e.target.value);
//   };

//   const handleSkillAdd = () => {
//     if (skillInput.trim() && !formData.job_skills_required.includes(skillInput.trim())) {
//       setFormData((prev) => ({
//         ...prev,
//         job_skills_required: [...prev.job_skills_required, skillInput.trim()],
//       }));
//       setSkillInput("");
//     }
//   };

//   const handleKeyDown = (e) => {
//     if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
//       e.preventDefault();
//       handleSkillAdd();
//     }
//   };

//   const removeSkill = (skillToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       job_skills_required: prev.job_skills_required.filter((skill) => skill !== skillToRemove),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     if (formData.job_skills_required.length === 0) {
//       setError("Please add at least one skill.");
//       return;
//     }
//     console.log(formData)

//     try {
//       const response = await axios.post(`${BASEURL}/external_jobs/create_external_jobs`, formData, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });

//       if (response.status === 201) {
//         setShowModal(true);
//         setFormData({
//           job_title: "",
//           company: "",
//           job_description: "",
//           employment_type: "",
//           work_mode: "",
//           job_location: "",

//           salary_range: "",
//           job_experience_required: "",
//           job_skills_required: [],
//           industry: "",
//           job_link_external: "",
//           status: "Open",
//           posted_at: new Date().toISOString().split("T")[0],
//         });
//         setSkillInput("");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setError("Failed to create job post. Please try again.");
//     }
//   };

//   const fetchCompanies = async () => {
//     try {
//       const res = await axios.get(`${BASEURL}/external_jobs/external_companies_details`)
//       if (res?.data?.success) {
//         setCompanies(res?.data?.companies)
//         console.log(res?.data?.companies)
//       }
//     }catch(err){
//       console.log(err)
//     }
//   }

//   useEffect(() => {
//     fetchCompanies()
//   }, [])

//   return (
//     <div className="min-h-screen bg-gray-50 ">
//       <div className="max-w-6xl mx-auto rounded-xl shadow-xl overflow-hidden">


//         {/* Main Form Card */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 ">
//           <h2 className="text-2xl font-bold text-white flex items-center gap-3">
//             <Briefcase className="w-8 h-8 text-blue-200" strokeWidth={2} />
//             Create Job Post
//           </h2>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8">
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
//               <div className="p-1 bg-red-100 rounded-full">
//                 <X className="w-5 h-5 text-red-500" />
//               </div>
//               <p>{error}</p>
//             </div>
//           )}

//           {/* Job Header Section */}
//           <div className="mb-8 pb-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h2>

//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Job Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Job Title <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Briefcase className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="job_title"
//                     placeholder="e.g. Senior Frontend Developer"
//                     value={formData.job_title}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Company Selection */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Company <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Building className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <select
//                     name="company"
//                     value={formData.company}
//                     onChange={handleChange}
//                     required
//                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-no-repeat bg-right"
//                     style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23A0AEC0\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')", backgroundPosition: "right 0.5rem center" }}
//                   >
//                     <option value="">Select Company</option>
//                     {companies?.map((company,idx) => (
//                       <option key={idx} value={company?.employer_id}>
//                         {company?.company_display_name}
//                       </option>
//                     ))}

//                   </select>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Job Details Section */}
//           <div className="mb-8 pb-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-800 mb-6">Job Details</h2>

//             <div className="space-y-6">
//               {/* Job Description */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Job Description <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <textarea
//                     name="job_description"
//                     value={formData.job_description}
//                     onChange={handleChange}
//                     placeholder="Describe the responsibilities, qualifications, and benefits..."
//                     className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-32"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-6">
//                 {/* Employment Type */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Employment Type <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Clock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <select
//                       name="employment_type"
//                       value={formData.employment_type}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-no-repeat bg-right"
//                       style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23A0AEC0\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')", backgroundPosition: "right 0.5rem center" }}
//                       required
//                     >
//                       <option value="">Select Type</option>
//                       <option value="Full-time">Full-time</option>
//                       <option value="Part-time">Part-time</option>
//                       <option value="Contract">Contract</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Work Mode */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Work Mode <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Globe className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <select
//                       name="work_mode"
//                       value={formData.work_mode}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-no-repeat bg-right"
//                       style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23A0AEC0\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')", backgroundPosition: "right 0.5rem center" }}
//                       required
//                     >
//                       <option value="">Select Work Mode</option>
//                       <option value="On-site">On-site</option>
//                       <option value="Hybrid">Hybrid</option>
//                       <option value="Remote">Remote</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Location <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <MapPin className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       name="job_location"
//                       placeholder="e.g. New York, NY"
//                       value={formData.job_location}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Industry */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Industry <span className="text-red-500">*</span>
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Building className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <select
//                       name="industry"
//                       value={formData.industry}
//                       onChange={handleChange}
//                       className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-no-repeat bg-right"
//                       style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23A0AEC0\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')", backgroundPosition: "right 0.5rem center" }}
//                       required
//                     >
//                       <option value="">Select Industry</option>
//                       {industries.map((industry, index) => (
//                         <option key={index} value={industry}>
//                           {industry}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Requirements & Compensation Section */}
//           <div className="mb-8">
//             <h2 className="text-xl font-semibold text-gray-800 mb-6">Requirements & Compensation</h2>

//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Salary Range */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Salary Range <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <IndianRupee className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="salary_range"
//                     placeholder="e.g. ₹60,000 - ₹80,000"
//                     value={formData.salary_range}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Experience Required */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Experience Required <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <GraduationCap className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="text"
//                     name="job_experience_required"
//                     placeholder="e.g. 2-3 years"
//                     value={formData.job_experience_required}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* External Job Link */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   External Job Link
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Link className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     type="url"
//                     name="job_link_external"
//                     placeholder="e.g. https://company.com/careers/job-123"
//                     value={formData.job_link_external}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               {/* Skills Required */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Skills Required <span className="text-red-500">*</span>
//                 </label>
//                 <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
//                   <div className="flex flex-wrap gap-2 mb-3">
//                     {formData.job_skills_required.map((skill, index) => (
//                       <span
//                         key={index}
//                         className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 group"
//                       >
//                         {skill}
//                         <button
//                           type="button"
//                           onClick={() => removeSkill(skill)}
//                           className="ml-1 text-blue-400 hover:text-blue-700 transition-colors group-hover:bg-blue-100 rounded-full h-5 w-5 flex items-center justify-center"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                       </span>
//                     ))}
//                   </div>
//                   <div className="flex items-center">
//                     <input
//                       type="text"
//                       value={skillInput}
//                       onChange={handleSkillInputChange}
//                       onKeyDown={handleKeyDown}
//                       className="flex-grow border-none focus:outline-none p-1 bg-transparent placeholder-gray-400 text-sm"
//                       placeholder="Type skill and press Enter or comma to add"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleSkillAdd}
//                       className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
//                     >
//                       <Plus className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//                 <p className="mt-1 text-xs text-gray-500">Press Enter or comma after each skill</p>
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               <Send className="w-5 h-5" />
//               Post Job
//             </button>
//           </div>
//         </form>
//       </div>


//       {/* Success Modal */}
//       {
//         showModal && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center">
//             <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
//             <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100 overflow-hidden">
//               <div className="p-1">
//                 <div className="bg-gradient-to-r from-green-400 to-teal-500 h-2 w-full"></div>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>

//                 <div className="p-6 pt-8">
//                   <div className="flex justify-center mb-6">
//                     <div className="bg-green-100 rounded-full p-4">
//                       <CheckCircle className="w-12 h-12 text-green-500" />
//                     </div>
//                   </div>

//                   <div className="text-center">
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">Job Posted Successfully!</h3>
//                     <p className="text-gray-600 mb-6">Your job post has been created and is now live for candidates to view.</p>

//                     <div className="flex gap-4">
//                       <button
//                         onClick={() => setShowModal(false)}
//                         className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
//                       >
//                         Close
//                       </button>
//                       <button
//                         onClick={() => setShowModal(false)}
//                         className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 font-medium"
//                       >
//                         View Job
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )
//       }
//     </div >
//   );
// };

// export default CreateJobPost;


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Blocks,
  FileText,
  GraduationCap,
  Send,
  Building,
  Globe,
  X,
  CheckCircle,
  IndianRupee,
  Plus,
  Link,
  Loader2,
} from "lucide-react";
import { BASEURL } from "../../utility/config";

const CreateJobPost = () => {
  const [formData, setFormData] = useState({
    job_title: "",
    company: "",
    job_description: "",
    employment_type: "",
    work_mode: "",
    job_location: "",
    salary_range: "",
    job_experience_required: "",
    job_skills_required: [],
    industry: "",
    job_link_external: "",
    status: "Open",
    posted_at: new Date().toISOString().split("T")[0],
    employer_id: "", // Add employer_id field
  });
  const [companies, setCompanies] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Marketing",
    "Media & Entertainment",
    "Real Estate",
    "Transportation",
    "Energy",
    "Construction",
    "Agriculture",
    "Hospitality",
    "Telecommunications",
    "Consulting",
    "Aerospace",
    "Automotive",
    "Biotechnology",
    "E-commerce",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // When company dropdown changes, update both company and employer_id fields
    if (name === "company") {
      const selectedCompany = companies.find(c => c.employer_id === value);

      setFormData((prev) => ({
        ...prev,
        company: selectedCompany?.company_display_name || "",
        employer_id: value // Set the employer_id field with the selected value
      }));
    } else {
      // Handle other form fields normally
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.job_skills_required.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        job_skills_required: [...prev.job_skills_required, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      handleSkillAdd();
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      job_skills_required: prev.job_skills_required.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    
    if (formData.job_skills_required.length === 0) {
      setError("Please add at least one skill.");
      return;
    }

    // Validate employer_id is present
    if (!formData.employer_id) {
      setError("Please select a company.");
      return;
    }

    console.log("Submitting form data:", formData);

    try {
      setLoading(true)
      const response = await axios.post(`${BASEURL}/external_jobs/create_external_jobs`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 201) {
        setShowModal(true);
        setFormData({
          job_title: "",
          company: "",
          job_description: "",
          employment_type: "",
          work_mode: "",
          job_location: "",
          salary_range: "",
          job_experience_required: "",
          job_skills_required: [],
          industry: "",
          job_link: "",
          status: "Open",
          posted_at: new Date().toISOString().split("T")[0],
          employer_id: "",
        });
        setLoading(false)
        setSkillInput("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(error.response?.data?.message || "Failed to create job post. Please try again.");
      setLoading(false)
    }
  };

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(`${BASEURL}/external_jobs/external_companies_details`);
      if (res?.data?.success) {
        setCompanies(res?.data?.companies);
        console.log("Companies loaded:", res?.data?.companies);
      }
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError("Failed to load companies. Please refresh the page.");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-6xl mx-auto rounded-xl shadow-xl overflow-hidden">
        {/* Main Form Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 ">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-blue-200" strokeWidth={2} />
            Create Job Post
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg flex items-center gap-3">
              <div className="p-1 bg-red-100 rounded-full">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <p>{error}</p>
            </div>
          )}

          {/* Job Header Section */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="job_title"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.job_title}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Company Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="company"
                    value={formData.employer_id} // Use employer_id as the value
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-no-repeat bg-right"
                    style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23A0AEC0\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')", backgroundPosition: "right 0.5rem center" }}
                  >
                    <option value="">Select Company</option>
                    {companies.map((company, idx) => (
                      <option key={idx} value={company?.employer_id}>
                        {company?.company_display_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Job Details Section */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Job Details</h2>

            <div className="space-y-6">
              {/* Job Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    name="job_description"
                    value={formData.job_description}
                    onChange={handleChange}
                    placeholder="Describe the responsibilities, qualifications, and benefits..."
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-32"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Employment Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employment Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="employment_type"
                      value={formData.employment_type}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-no-repeat bg-right"
                      style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23A0AEC0\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')", backgroundPosition: "right 0.5rem center" }}
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Internship">Internship</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>

                {/* Work Mode */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Mode <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="work_mode"
                      value={formData.work_mode}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-no-repeat bg-right"
                      style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23A0AEC0\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')", backgroundPosition: "right 0.5rem center" }}
                      required
                    >
                      <option value="">Select Work Mode</option>
                      <option value="On-site">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="job_location"
                      placeholder="e.g. New York, NY"
                      value={formData.job_location}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-no-repeat bg-right"
                      style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8l5 5 5-5\" fill=\"none\" stroke=\"%23A0AEC0\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>')", backgroundPosition: "right 0.5rem center" }}
                      required
                    >
                      <option value="">Select Industry</option>
                      {industries.map((industry, index) => (
                        <option key={index} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements & Compensation Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Requirements & Compensation</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Salary Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Salary Range <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="salary_range"
                    placeholder="e.g. ₹60,000 - ₹80,000"
                    value={formData.salary_range}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Experience Required */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Required <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <GraduationCap className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="job_experience_required"
                    placeholder="e.g. 2-3 years"
                    value={formData.job_experience_required}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* External Job Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  External Job Link
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    name="job_link"
                    placeholder="e.g. https://company.com/careers/job-123"
                    value={formData.job_link}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Skills Required */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills Required <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.job_skills_required.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 group"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-1 text-blue-400 hover:text-blue-700 transition-colors group-hover:bg-blue-100 rounded-full h-5 w-5 flex items-center justify-center"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={handleSkillInputChange}
                      onKeyDown={handleKeyDown}
                      className="flex-grow border-none focus:outline-none p-1 bg-transparent placeholder-gray-400 text-sm"
                      placeholder="Type skill and press Enter or comma to add"
                    />
                    <button
                      type="button"
                      onClick={handleSkillAdd}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Press Enter or comma after each skill</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            {
              loading ? (
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                  disabled
                >
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />Please Wait
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg flex items-center justify-center gap-2 hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  <Send className="w-5 h-5" />
                  Post Job
                </button>
              )
            }

          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all duration-300 scale-100 overflow-hidden">
            <div className="p-1">
              <div className="bg-gradient-to-r from-green-400 to-teal-500 h-2 w-full"></div>
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6 pt-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 rounded-full p-4">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Job Posted Successfully!</h3>
                  <p className="text-gray-600 mb-6">Your job post has been created and is now live for candidates to view.</p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 font-medium"
                    >
                      View Job
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateJobPost;

