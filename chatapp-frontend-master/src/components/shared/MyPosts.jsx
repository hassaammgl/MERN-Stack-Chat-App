import React, { useEffect } from 'react';
import { Box, Stack, Typography, Modal, Avatar, FormControl, InputLabel, Select, MenuItem, Button, TextField } from '@mui/material';
import { AddAPhoto } from "@mui/icons-material";
import axios from "axios";
import { useState } from 'react';
import ImageGallery from "react-image-gallery";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ChatIcon from '@mui/icons-material/Chat';

const MyPosts = ({ open, handlePostClick, setOpen, change }) => {
    const [Posts, setPosts] = useState([]);
    const { user } = useSelector((state) => state.auth);

    const [values, setValues] = React.useState({
        title: "",
        description: "",
        category: "",
        image: [],
        user: user._id
    });

    const [files, setFiles] = React.useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...values, image: files };
        toast.loading("Creating post...");

        const res = await axios.post("http://localhost:3000/api/v1/post/newpost", data);
        toast.dismiss();
        toast.success(res.data.message);
        console.log("res", res);
        setOpen(false);
        change.setChange(!change.change);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleFileInput = (event) => {
        const fileList = Array.from(event.target.files);
        const newFiles = fileList.reduce((acc, curr) => {
            const reader = new FileReader();
            reader.onload = () => {
                acc.push(reader.result);
                setFiles(prevFiles => [...prevFiles, reader.result]);
            };
            reader.readAsDataURL(curr);
            return acc;
        }, []);
    };

    const getPosts = async () => {
        try {
            toast.loading("Getting Posts...");
            const response = await axios.get(`http://localhost:3000/api/v1/post/myposts/${user._id}`);
            setPosts(response.data.data);
            toast.dismiss();
            if (response.data.data.length === 0) {
                toast.error("No posts found...");
            } else {
                toast.success("Posts found successfully...");
            }
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div style={{ height: "90vh", overflow: "hidden" }}>
            <Typography sx={{ textAlign: 'center', fontSize: '3rem', mt: '2.5rem' }} fontWeight={"bolder"}>My Posts</Typography>
            <hr style={{ width: '75%', color: "gray" }} />
            <Stack spacing={3} sx={{ mb: '3rem', marginX: '5rem', height: '100%', overflow: 'auto', "&::-webkit-scrollbar": { display: 'none' }, }} >
                {Posts.length <= 0 ? <Typography sx={{ textAlign: 'center', fontSize: '2.5rem', mt: '3rem' }} fontWeight={"bolder"}>No Posts</Typography> : Posts.map((post) => <PostListItem change={change} key={post._id} post={post} handleSubmit={handleSubmit} handleChange={handleChange} handleFileInput={handleFileInput} />)}
            </Stack>
        </div>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const PostListItem = ({ post, change, handleSubmit, handleChange, handleFileInput }) => {
    const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = React.useState(false);
    const [imgs, setImgs] = React.useState([]);


    React.useEffect(() => {
        const urls = post.attachments.map(attachment => ({
            original: attachment.url,
            thumbnail: attachment.url + '?thumbnail'
        }));
        setImgs(urls);
    }, [post.attachments]);

    const handlePostClick = () => {
        setOpen(open ? false : true);
    };

    const handleDeletePost = async () => {
        toast.loading("Deleting Post...");
        await axios.delete(`http://localhost:3000/api/v1/post/delete/${post._id}`).then(res => {
            console.log(res);
            if (res.data.success === true) {
                toast.dismiss();
                toast.success(res.data.message);
                change.setChange(!change.change);
            } else {
                toast.dismiss();
                toast.error(res.data.message);
            }
        });
    };

    return (
        <>
            <div >
                <Box >
                    <Stack style={{ padding: "2rem 1rem", cursor: "pointer", boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px" }} spacing={1} marginX={"6.5rem"} direction={"row"}>
                        <Box paddingRight={"3rem"}>
                            <img src={post.attachments[0].url} alt={post.title} style={{ borderRadius: "5px" }} width="450px" height="250px" />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight={"bold"} color={"gray"} marginBottom={"1.5rem"}>{post.title}</Typography>
                            <Typography variant="body2" color={"text.secondary"} marginBottom={"1.5rem"}>
                                {post.description.length > 300 ? `${post.description.substring(0, 300)}...` : post.description}
                            </Typography>
                            <Stack direction="row" gap={"1rem"} alignItems={"center"} marginBottom={"0.5rem"}>
                                <Avatar src={post.author.avatar.url} />
                                <Typography variant="body2" fontWeight={"bold"} color={"text.secondary"}>{post.author.name}</Typography>
                            </Stack>
                            <Typography>
                                Posted at: {post.createdAt?.substring(0, 10)}
                            </Typography>
                            <Button onClick={handleDeletePost}>
                                Delete Post
                            </Button>
                            <Button onClick={handlePostClick}>
                                Edit Post
                            </Button>
                        </Box>
                    </Stack>
                </Box>
            </div>
            <EditPost post={post} open={open} handlePostClick={handlePostClick} handleSubmit={handleSubmit} handleChange={handleChange} handleFileInput={handleFileInput} />
        </>
    );
};

const EditPost = ({ post, open, handlePostClick, handleSubmit, handleChange, handleFileInput }) => {
    const [newDescription, setNewDescription] = useState(post.description);
    const [newTitle, setNewTitle] = useState(post.title);

    return (
        <Modal
            open={open}
            onClose={handlePostClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
                style={{ height: "75%", overflow: "auto" }}
                direction={"column"}
            >
                <Typography variant="h6" component="h2" fontSize={"2.5rem"} fontWeight={"bold"} textAlign={"center"} gutterBottom>
                    Edit Post
                </Typography>
                <form
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={newTitle}
                        autoFocus
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        id="description"
                        label="Description"
                        name="description"
                        value={newDescription}
                        autoFocus
                        onChange={(e) => setNewDescription(e.target.value)}
                    />
                    <FormControl
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ marginBottom: '2rem' }}
                    >
                        {/* Category select */}
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained">
                        Submit Changes
                    </Button>
                </form>
            </Stack>
        </Modal>
    );
};

export default MyPosts;
