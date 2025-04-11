// import { createClient } from "~/utils/supabase-server";
// import { redirect } from "next/navigation";
// import { TextLink } from "~/app/_components/buttons";
// import type { Profile } from "~/utils/profiles";

// // Extend Profile type with the additional fields we need
// interface ExtendedProfile extends Profile {
//   username?: string | null;
//   website?: string | null;
// }

// export default async function ProfilePage() {
//   const supabase = await createClient();
//   const { data } = await supabase.auth.getSession();
//   const session = data.session;

//   if (!session) {
//     redirect("/login");
//   }

//   // Get profile data
//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("id", session.user.id)
//     .single();

//   // Cast to ExtendedProfile type
//   const profileData = profile as ExtendedProfile | null;

//   return (
//     <div className="relative min-h-screen bg-[#F8F9FA] dark:bg-[#0D0D0D]">
//       {/* Grid background */}
//       <div className="bg-grid-small-black/[0.2] dark:bg-grid-small-white/[0.05] absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-center" />

//       <div className="absolute top-4 left-4 z-10 md:top-8 md:left-8">
//         <TextLink href="/dashboard">← Back to Dashboard</TextLink>
//       </div>

//       <div className="relative z-10 container mx-auto px-4 py-16">
//         <header className="animate-fade-in mb-12 text-center">
//           <h1 className="font-heading text-4xl font-bold text-black md:text-6xl dark:text-white">
//             Profile
//           </h1>
//           <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
//             Manage your account information
//           </p>
//         </header>

//         <div
//           className="animate-fade-in mx-auto max-w-3xl"
//           style={{ animationDelay: "0.2s" }}
//         >
//           <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
//             <div className="mb-6 border-b border-gray-200 pb-6 dark:border-gray-700">
//               <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
//                 Account Information
//               </h2>

//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 <div>
//                   <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Email
//                   </label>
//                   <p className="rounded bg-gray-100 p-2 text-gray-900 dark:bg-gray-800 dark:text-white">
//                     {session.user.email}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     User ID
//                   </label>
//                   <p className="overflow-hidden rounded bg-gray-100 p-2 text-sm text-ellipsis text-gray-900 dark:bg-gray-800 dark:text-white">
//                     {session.user.id}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6 border-b border-gray-200 pb-6 dark:border-gray-700">
//               <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
//                 Profile Details
//               </h2>

//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 <div>
//                   <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Full Name
//                   </label>
//                   <p className="rounded bg-gray-100 p-2 text-gray-900 dark:bg-gray-800 dark:text-white">
//                     {profileData?.display_name ?? "Not set"}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Username
//                   </label>
//                   <p className="rounded bg-gray-100 p-2 text-gray-900 dark:bg-gray-800 dark:text-white">
//                     {profileData?.username ?? "Not set"}
//                   </p>
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Website
//                   </label>
//                   <p className="rounded bg-gray-100 p-2 text-gray-900 dark:bg-gray-800 dark:text-white">
//                     {profileData?.website ?? "Not set"}
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <a
//                   href="/profile/edit"
//                   className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
//                 >
//                   Edit Profile
//                 </a>
//               </div>
//             </div>

//             <div>
//               <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
//                 Account Management
//               </h2>
//               <p className="mb-4 text-gray-700 dark:text-gray-300">
//                 Need to change your password or update security settings?
//               </p>
//               <a
//                 href="https://app.supabase.com/account/security"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
//               >
//                 Manage Account Security
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function TemporaryProfilePage() {
  return <div>Profile page temporarily disabled</div>;
}
