const { Blogmodel } = require("../models/blogmodel");

// Create a new blog
const createBlog = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.userId;
    const image = req.file ? req.file.filename : null;

    try {
        const blog = new Blogmodel({ title, description, image, userId });
        await blog.save();

        res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) {
        res.status(500).json({ error: "Error in creating the blog" });
    }
};

// Get all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blogmodel.find().populate('userId', 'email').sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Error in fetching blogs" });
    }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blogmodel.findById(id).populate('userId', 'email');
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: "Error in fetching the blog" });
    }
};

// Update a blog
const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const blog = await Blogmodel.findById(id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });

        blog.title = title || blog.title;
        blog.description = description || blog.description;
        if (image) blog.image = image;

        await blog.save();

        res.status(200).json({ message: "Blog updated successfully", blog });
    } catch (error) {
        res.status(500).json({ error: "Error in updating the blog" });
    }
};

// Delete a blog
const deleteBlog = async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blogmodel.findByIdAndDelete(id);
        if (!blog) return res.status(404).json({ error: "Blog not found" });
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting the blog:", error.message);
        res.status(500).json({ error: "Error in deleting the blog" });
    }
};

module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};
