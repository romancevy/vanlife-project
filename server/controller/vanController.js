import Van from "../models/Van.js";

export const getVans = async (req, res) => {
  try {
    const getAllVans = await Van.find();
    res.status(200).json(getAllVans);

    if (!getAllVans) {
      return res.status(404).json({ error: "Error fetching data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getVan = async (req, res) => {
  const params = req.params.id;

  try {
    // Suche nach spezifischem Produkt anhand der Id
    const van = await Van.findOne({ id: params });
    res.status(200).json(van);

    if (!van) {
      return res.status(404).json({ error: "Error fetching data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getHostVans = async (req, res) => {
  try {
    const getAllVans = await Van.find();
    res.status(200).json(getAllVans);

    if (!getAllVans) {
      return res.status(404).json({ error: "Error fetching data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getHostVan = async (req, res) => {
  const params = req.params.id;

  try {
    // Suche nach spezifischem Produkt anhand der Id
    const van = await Van.findOne({ id: params });
    res.status(200).json(van);

    if (!van) {
      return res.status(404).json({ error: "Error fetching data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
