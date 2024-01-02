export const generateContent = (req, res) => {
  const { scope, details } = req.params;
  res.send({
    scope,
    details,
  });
};
