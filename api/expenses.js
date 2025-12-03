// /api/expenses.js

let expenses = []; // In-memory storage (resets on cold start)

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      data: expenses,
    });
  }

  if (req.method === "POST") {
    try {
      const { amount, description, category, date } = req.body;

      // Validate fields
      const missing = [];
      if (amount === undefined) missing.push("amount");
      if (!description) missing.push("description");
      if (!category) missing.push("category");
      if (!date) missing.push("date");

      if (missing.length > 0) {
        return res.status(400).json({
          success: false,
          error: `Missing required field(s): ${missing.join(", ")}`,
        });
      }

      const newExpense = {
        id: expenses.length + 1,
        amount: Number(amount),
        description,
        category,
        date: new Date(date).toISOString(),
      };

      expenses.push(newExpense);

      return res.status(201).json({
        success: true,
        data: newExpense,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        error: "Internal Server Error",
        details: err.message,
      });
    }
  }

  // Method not allowed
  return res.status(405).json({
    success: false,
    error: "Method Not Allowed",
  });
}
