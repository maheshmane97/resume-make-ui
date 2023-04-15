

export const columnDefsResume = [
  {
    headerName: "Name",
    field: "name",
    sortable: true,
    sortingOrder: ["asc", "desc"],
    filter: true,
    width: 150,
    cellStyle: { textAlign: "center" },
  },
  {
    headerName: "Email",
    field: "email",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    filter: true,
    width: 110,
  },
  {
    headerName: "Designation",
    field: "designation",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    filter: true,
    width: 110,
  },
  {
    headerName: "Skills",
    field: "skills",
    sortable: false,
    filter: true,
    width: 110,
  },
  {
    headerName: "View",
    cellRenderer: "buttonRendererViewResume",
  },
  {
    headerName: "Delete",
    cellRenderer: "buttonRendererDeleteResume",
  },
];

export const columnDefsUser = [
  {
    headerName: "Name",
    field: "name",
    sortable: true,
    sortingOrder: ["asc", "desc"],
    filter: true,
    width: 150,
    cellStyle: { textAlign: "center" },
  },
  {
    headerName: "Email",
    field: "email",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    filter: true,
    width: 110,
  },
  {
    headerName: "Role",
    field: "role",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    filter: true,
    width: 110,
  },
  
  {
    headerName: "View",
    cellRenderer: "buttonRendererViewResume",
  },
  {
    headerName: "Delete",
    cellRenderer: "buttonRendererDeleteResume",
  },
];

export const columnDefsFeedback = [
  {
    headerName: "Interviewer",
    field: "interviewer",
    sortable: true,
    sortingOrder: ["asc", "desc"],
    filter: true,
    width: 150,
    cellStyle: { textAlign: "center" },
  },
  {
    headerName: "Candidate",
    field: "candidate",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    filter: true,
    width: 110,
  },
  {
    headerName: "Interview Type",
    field: "interviewType",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    filter: true,
    width: 110,
  },
  {
    headerName: "Interview Round",
    field: "interviewRound",
    sortingOrder: ["asc", "desc"],
    sortable: true,
    filter: true,
    width: 110,
  },

  {
    headerName: "View",
    cellRenderer: "buttonRendererViewResume",
  },
  {
    headerName: "Delete",
    cellRenderer: "buttonRendererDeleteResume",
  },
];


