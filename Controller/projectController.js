const projects = require("../models/projectSchema");
// add project
exports.addProjects = async (req, res) => {
  console.log("inside add project");
  const { title, languages, github, website, overview } = req.body;
  const projectImg = req.file.filename;
  const userId = req.payload;
  // console.log(title, language, github, website, overview, projectImg, userId);
  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res
        .status(406)
        .json(
          "Project already exists in our collections, please upload another one"
        );
    } else {
      const newProject = new projects({
        title,
        languages,
        github,
        website,
        overview,
        projectImg,
        userId,
      });
      await newProject.save();

      res.status(200).json(newProject);
    }
  } catch (err) {
    res.status(401).json(err);
  }
};

// getHomeProjects
exports.getHomeProjects = async (req, res) => {
  try {
    const allProjects = await projects.find().limit(3);
    res.status(200).json(allProjects);
  } catch (err) {
    res.status(401).json(err);
  }
};
// getUserProjects
exports.getUserProjects=async (req,res)=>{
  const userId=req.payload;
  try{
    const userProjects=await projects.find({userId})
    res.status(200).json(userProjects)
  }catch(err){
    res.status(401).json(err);
  
  }
}

// getAllProjects
exports.getAllProjects=async (req,res)=>{
  try{
    const allProjects=await projects.find()
    res.status(200).json(allProjects)
  }catch(err){
    res.status(401).json(err);
  
  }
}
