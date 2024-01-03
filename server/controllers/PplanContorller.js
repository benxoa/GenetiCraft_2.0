const Plan = require("../db/models/pricing.model");

module.exports.PlanController = async (req, res) => {
  try {
    const { plan, price } = req.body;
    const pricing = new Plan({ plan, price });
    const check_save = await pricing.save();
    check_save().then(() => res.status(201).json({ success: "Plan Created" }));
  } catch (error) {
    res.status(500);
  }
};

module.exports.PlanViewController = async (req, res) => {
  try {
    const plan = await Plan.find();
    res.status(200).json(plan);
  } catch (error) {
    res.status(500);
  }
};
