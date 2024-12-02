const Transportation = require("../models/Transportation");

// Get transportation options by location
const getTransportationByLocation = async (req, res) => {
  const { location } = req.params;

  try {
    // Query database
    const transportation = await Transportation.find({ location });

    // Check if results are empty
    if (transportation.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No transportation options found for location: ${location}`,
      });
    }

    // Return results
    res.status(200).json({
      success: true,
      data: transportation,
    });
  } catch (error) {
    console.error("Error fetching transportation:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching transportation options",
      error: error.message,
    });
  }
};

module.exports = {
  getTransportationByLocation,
};
