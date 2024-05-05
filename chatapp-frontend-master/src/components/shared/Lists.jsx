import React, { useEffect } from 'react'
import { Box, Stack, Typography, Modal, Avatar, IconButton } from '@mui/material'
import axios from 'axios';
import { useState } from 'react';
import ImageGallery from "react-image-gallery";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import { filterProps } from 'framer-motion';

const Lists = ({ category }) => {
    const [Posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);


    const getPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/post/getall');
            setPosts(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }
    const filterPosts = (category) => {
        const filteredData = Posts.filter((post) => {
            if (post.category === category.toLowerCase) {
                return post
            }

        })
        // console.log("hassaam",filteredData);
        console.log(filteredData);
    }
    useEffect(() => {
        getPosts();
        filterPosts(category);
    }, [category]);
    return (
        <div style={{ height: "90vh", overflow: "hidden" }}>
            <Typography sx={{ textAlign: 'center', fontSize: '3rem', mt: '3rem' }} fontWeight={"bolder"}>{category} Posts</Typography>
            <Stack spacing={2} sx={{ mt: '2rem', marginX: '5rem', height: '100%', overflow: 'auto', "&::-webkit-scrollbar": { display: 'none' }, }} >
                {
                    filteredPosts?.length > 0 ? filteredPosts?.map((post) => <PostListItem post={post} key={post._id} />) : Posts.length <= 0 ? <Typography sx={{ textAlign: 'center', fontSize: '2.5rem', mt: '3rem' }} fontWeight={"bolder"}>No Posts</Typography> : Posts.map((post) => <PostListItem key={post._id} post={post} />)
                }
            </Stack>
        </div>
    )
}

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

const PostListItem = ({ post }) => {
    const { user } = useSelector((state) => state.auth);

    const [open, setOpen] = React.useState(false);
    const [imgs, setImgs] = React.useState([])
    React.useEffect(() => {
        const urls = post.attachments.map(attachment => ({
            original: attachment.url,
            thumbnail: attachment.url + '?thumbnail'
        }));
        setImgs(urls);
    }, [post.attachments]);
    const navigate = useNavigate();
    const handleChatClick = async () => {
        await axios.post('http://localhost:3000/api/v1/post/directchat', {
            name: `${post.author.name} ${user.name}`,
            members: [post.author._id, user._id],
        }).then(res => {
            console.log(res.data.data);
            navigate(`/chat/${res.data.data}`);
        })
    }

    const handlePostClick = () => {
        setOpen(open ? false : true);
    }

    return (
        <>
            <div >
                <Box onClick={handlePostClick}>
                    <Stack style={{ padding: "2rem 1rem", boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px" }} spacing={1} marginX={"6.5rem"} direction={"row"}>
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
                        </Box>
                        <br />
                    </Stack>
                </Box>
            </div>
            <Modal
                open={open}
                onClose={handlePostClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack spacing={1} sx={style}>
                    <Stack direction="row" alignItems={"center"} gap={"1rem"}>
                        <Avatar src={post.author.avatar.url} />
                        <Typography variant="body2" fontWeight={"bold"} color={"text.secondary"}>{post.author.name}</Typography>
                        <Stack position={"absolute"} top={"2.5rem"} right={"2.5rem"} >
                            <IconButton onClick={handleChatClick}>
                                <ChatIcon />
                            </IconButton>
                        </Stack>
                    </Stack>

                    <Typography variant="h6" fontWeight={"bold"}>{post.title}</Typography>
                    {/* <img src={post.image} alt={post.title} style={{ margin: "2rem 0" }} width="700" height="200px" /> */}
                    <Box style={{ margin: "2rem 0", width: '100%', height: '30rem', overflow: 'auto' }}>

                        <ImageGallery items={imgs} />
                    </Box>

                    <Box>
                        <Typography variant="body2" color={"text.secondary"}>
                            {post.description}
                        </Typography>
                    </Box>
                </Stack>
            </Modal>
        </>
    )
}

export default Lists