exports.createTrip = async (req, res) => {
    try {
      const { location, accommodation, startDate, endDate, transportation, extraFacilities } = req.body;
  
      // Validate required fields
      if (!location || !accommodation || !startDate || !endDate || !transportation) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const newTrip = new Trip({
        location,
        accommodation,
        startDate,
        endDate,
        transportation,
        extraFacilities,
      });
  
      const savedTrip = await newTrip.save();
      res.status(201).json(savedTrip);
    } catch (error) {
      console.error("Error creating trip:", error); // Log the error for debugging
      res.status(500).json({ message: "Error creating trip", error: error.message || error });
    }
  };
  