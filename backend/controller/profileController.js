const Profile = require("../model/profileModel");

const getProfile = async (req, res) => {
  try {
    const { googleId } = req.params;
    if (!googleId) {
      return res.status(400).json({ error: "Google ID is required" });
    }

    const profile = await Profile.findOne({ googleId });
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add a profile

const addProfile = async(req,res)=>{
  try{
    const{googleId} = req.params;
    if(!googleId){
      return res.status(400).json({error:"Google ID is required"});
    }
    const {name,email,skills,doi,githubLink,bio} = req.body;
    if(!name || !email || !skills || !doi || !githubLink || !bio){
      return res.status(400).json({error:"All fields are required"});
    }
    const newProfile = await Profile.create({
      googleId,
      name,
      email,
      skills,
      doi,
      githubLink,
      bio,  
    });
    res.status(201).json(newProfile);
  }
  catch(error){
    console.error("Error adding profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getProfile,addProfile };
