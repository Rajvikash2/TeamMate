const Post = require("../model/postModel");

const getPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) {
    return res.status(404).json({ error: "No Posts found" });
  }
  res.status(200).json(posts);
};

const getPostByOwnerId = async (req, res) => {
  const { ownerGoogleId } = req.params;
  if (!ownerGoogleId) {
    return res.status(400).json({ error: "Owner ID is required" });
  }

  const posts = await Post.find({ ownerGoogleId });
  if (!posts) {
    return res.status(404).json({ error: "No posts found" });
  }
  res.status(200).json(posts);
};

const getApplication = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Return only the applications field
    res.status(200).json({ applications: post.applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createPost = async (req, res) => {
  try{
    const { ownerGoogleId } = req.params;
    if(!ownerGoogleId){
      return res.status(400).json({error:"Google ID is required"});
    }

    const {title, roleReq, desc, jobType, image, domain} = req.body;
    if(!title || !roleReq || !desc || !jobType || !domain){
      return res.status(400).json({error:"All fields are required"});
    }
    const post = new Post({
      ownerGoogleId,
      title,
      roleReq,
      desc,
      jobType,
      image: image || "",
      domain,
    });
    const newPost = await post.save();
    res.status(201).json({success:true,newPost});
  }catch(error){
    console.error("Error Creating post:",error);
    res.status(500).json({error:"Internal Server Error"});
  }
}

// upadate the post
const updatePost = async(req,res)=>{
  try{
    const{postId,googleId}=req.params;
    const{title,roleReq,desc,jobType,image,domain} = req.body;
    if(!postId || !googleId){
      return res.status(400).json({error:"Post ID and Google ID is required"});
    }
    const post = await Post.findById(postId);
    if(!post){
      return res.status(404).json({error:"Post not found"});
    }
    if(post.ownerGoogleId!==googleId){
      return res.status(401).json({error:"Unauthorized"});
    }
    post.title = title;
    post.roleReq = roleReq;
    post.desc = desc;
    post.jobType = jobType;
    post.image = image;
    post.domain = domain;
    const updatedPost =  await post.save();
    res.json({success:true,updatedPost});
  }
  catch(error){
    console.error("Error updating post:",error);
    res.status(500).json({error:"Internal Server Error"});
  }
}

module.exports = { getPosts, getPostByOwnerId, getApplication, createPost, updatePost };