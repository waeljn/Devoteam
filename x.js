const todo = {
  projectId: "p1",
  accountId: "a1",
  createdAt: "",
  updatedAt: "",
  assignedAt: "",
  title: "",
  desciption: "",
  status: "", // UNASSIGNED || IN_PROGRESS || COMPLETED"
};

const project = {
  title: "",
  desciption: "",
  createdAt: "",
  updatedAt: "",
  leaderId: "", // Account ID
  company: "",
  status: "", // UNASSIGNED || IN_PROGRESS || COMPLETED
};

const account = {
    rank: "" // LV1 || LV2
};

const ownComment = {
  accountId: "",
  message: "",
  type: "OWN",
  createdAt: "",
  updatedAt: "",
};
const managerComment = {
  accountId: "",
  managerId: "",
  message: "",
  type: "BY_MANAGER",
  createdAt: "",
  updatedAt: "",
};