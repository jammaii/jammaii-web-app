// import { ProjectResponseDto } from "@/features/projects/types/app";
// import {
//   UserInvestmentsResponse,
//   UserResponse,
// } from "@/features/users/types/app";

// export const defaultProject: ProjectResponseDto[] = [
//   {
//     id: "1",
//     status: "Pending",
//     propertyDetails: {
//       name: "Test Project",
//       description: "A test project description",
//       type: "Apartment",
//       units: 10,
//       unitDetail: {
//         description: "Test unit description",
//         bedrooms: 3,
//         bathrooms: 2,
//         toilets: 2,
//       },
//     },
//     mediaDetails: {
//       images: [
//         "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
//         "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800",
//         "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800",
//         "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800",
//       ],
//       videos: [
//         "https://youtu.be/KGVaBo8JNbI?si=TblPlCoXjb-WnMbe",
//         "https://youtu.be/KGVaBo8JNbI?si=TblPlCoXjb-WnMbe",
//         "https://youtu.be/KGVaBo8JNbI?si=TblPlCoXjb-WnMbe",
//         "https://youtu.be/KGVaBo8JNbI?si=TblPlCoXjb-WnMbe",
//       ],
//       brochure: "https://example.com/brochure.pdf",
//     },
//     investmentDetails: {
//       slots: 5,
//       slotPrice: 500000,
//       duration: 12,
//       roi: 15,
//       startDate: new Date("2025-01-01"),
//     },
//   },
// ];

// export const defaultUsers: UserResponse[] = [
//   {
//     id: "1",
//     role: "ADMIN",
//     status: "active",
//     email: "admin@example.com",
//     firstName: "John",
//     lastName: "Doe",
//     middleName: "Smith",
//     phoneNumber: "+234 123 456 7890",
//     profilePicture: "https://avatars.githubusercontent.com/u/1234567",
//     createdAt: "2025-01-01T00:00:00.000Z",
//   },
//   {
//     id: "2",
//     role: "USER",
//     status: "active",
//     email: "jane@example.com",
//     firstName: "Jane",
//     lastName: "Smith",
//     phoneNumber: "+234 098 765 4321",
//     createdAt: "2025-01-15T00:00:00.000Z",
//   },
//   {
//     id: "3",
//     role: "USER",
//     status: "inactive",
//     email: "mike@example.com",
//     firstName: "Michael",
//     lastName: "Johnson",
//     profilePicture: "https://avatars.githubusercontent.com/u/7654321",
//     createdAt: "2025-02-01T00:00:00.000Z",
//   },
// ];

// export const defaultUserInvestments: UserInvestmentsResponse[] = [
//   {
//     id: "1",
//     user: defaultUsers[1], // Jane Smith
//     investments: [
//       {
//         id: "1",
//         status: "Approved",
//         name: "Luxury Villa Project",
//         description:
//           "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.",
//         slots: 2,
//         slotPrice: 500000,
//         boughtAt: new Date("2025-01-02"),
//         startDate: new Date("2025-02-02"),
//         endDate: new Date("2025-03-02"),
//         location: "New area around Area, Lagos",
//       },
//       {
//         id: "2",
//         status: "Pending",
//         name: "City Apartment Complex",
//         description:
//           "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.",
//         slots: 1,
//         slotPrice: 250000,
//         boughtAt: new Date("2025-01-02"),
//         startDate: new Date("2025-02-02"),
//         endDate: new Date("2025-03-02"),
//         location: "New area around Area, Lagos",
//       },
//     ],
//   },
//   {
//     id: "2",
//     user: defaultUsers[2], // Michael Johnson
//     investments: [
//       {
//         id: "3",
//         status: "Rejected",
//         name: "Beach Resort Development",
//         description:
//           "Lorem ipsum is a dummy or placeholder text commonly used in graphic design, publishing, and web development to fill empty spaces in a layout that does not yet have content.",
//         slots: 3,
//         slotPrice: 750000,
//         boughtAt: new Date("2025-01-02"),
//         startDate: new Date("2025-02-02"),
//         endDate: new Date("2025-03-02"),
//         location: "New area around Area, Lagos",
//       },
//     ],
//   },
// ];
