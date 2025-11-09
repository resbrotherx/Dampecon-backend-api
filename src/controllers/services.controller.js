export const getServices = (req, res) => {
  res.json([
    { id: 1, title: "Web Development", description: "Building responsive web apps" },
    { id: 2, title: "Mobile Development", description: "Creating cross-platform apps" },
    { id: 3, title: "UI/UX Design", description: "Designing intuitive user experiences" },
  ]);
};
