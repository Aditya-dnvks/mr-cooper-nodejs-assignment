const Visitor = require("../model/visitorsModel");

const getVisitorsByFlat = async (req, res) => {
  try {
    const { flat } = req.user;
    const visitors = await Visitor.find({ flatNo: flat });
    console.log(visitors, "vis", flat, typeof flat);
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateVisitorStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const visitor = await Visitor.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!visitor) return res.status(404).json({ message: "Visitor not found" });

    res.json({ message: `Visitor ${status}`, visitor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const addDummyVisitors = async (req, res) => {
  try {
    // const dummyVisitors = [
    //   {
    //     visitorName: "John Doe",
    //     visitorPurpose: "Delivery",
    //     flatNo: "A101",
    //     status: "Pending",
    //   },
    //   {
    //     visitorName: "Jane Smith",
    //     visitorPurpose: "Friend Visit",
    //     flatNo: "B202",
    //     status: "Pending",
    //   },
    // ];

    const dummyData = req.body;
    await Visitor.insertOne(dummyData);
    res.status(201).json({ message: "Dummy visitors added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getVisitorsByFlat, updateVisitorStatus, addDummyVisitors };
