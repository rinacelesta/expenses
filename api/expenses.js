// In-memory store (resets on redeploy / serverless cold start)
let expenses = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      data: expenses
    });
  }

  if (req.method === "POST") {
    const { amount, description, category, date } = req.body || {};

    // Validate required fields
    const missing = [];
    if (amount === undefined) missing.push("amount");
    if (!description) missing.push("description");
    if (!category) missing.push("category");
    if (!date) missing.push("date");

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        missingFields: missing
      });
    }

    const newExpense = {
      id: expenses.length + 1,
      amount,
      description,
      category,
      date
    };

    expenses.push(newExpense);

    return res.status(201).json({
      success: true,
      data: newExpense
    });
  }

  // Unsupported method
  return res.status(405).json({
    success: false,
    error: `Method ${req.method} not allowed`
  });
}
