const items = [
  { id: 1, name: "slim" },
  { id: 2, name: "raja" },
];

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(items),
  };
};
