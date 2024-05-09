// import React, { useEffect } from 'react'
// import { Box, Stack, Typography, Modal, Avatar, IconButton, Button } from '@mui/material'
// import axios from 'axios';
// import { useState } from 'react';
// import ImageGallery from "react-image-gallery";
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import ChatIcon from '@mui/icons-material/Chat';


// const MyPosts = () => {
//     const [Posts, setPosts] = useState([]);

//     const { user } = useSelector((state) => state.auth);

//     const getPosts = async () => {
//         try {
//             toast.loading("Getting Posts...");
//             const response = await axios.get(`http://localhost:3000/api/v1/post/myposts/${user._id}`);
//             setPosts(response.data.data);
//             toast.dismiss();
//             if (response.data.data.length === 0) {
//                 toast.error("No posts found...");
//             }
//             else {
//                 toast.success("Posts found successfully...");
//             }
//             console.log(response.data.data);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     useEffect(() => {
//         getPosts();
//     }, []);
//     return (
//         <div style={{ height: "90vh", overflow: "hidden" }}>
//             <Typography sx={{ textAlign: 'center', fontSize: '3rem', mt: '2.5rem' }} fontWeight={"bolder"}>My Posts</Typography>
//             <hr style={{ width: '75%', color: "gray" }} />
//             <Stack spacing={3} sx={{ mb: '3rem', marginX: '5rem', height: '100%', overflow: 'auto', "&::-webkit-scrollbar": { display: 'none' }, }} >
//                 {
//                     Posts.length <= 0 ? <Typography sx={{ textAlign: 'center', fontSize: '2.5rem', mt: '3rem' }} fontWeight={"bolder"}>No Posts</Typography> : Posts.map((post) => <PostListItem key={post._id} post={post} />)
//                 }
//             </Stack>
//         </div>
//     )
// }

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 800,
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     p: 4,
// };


// const PostListItem = ({ post, change }) => {
//     const { user } = useSelector((state) => state.auth);
//     const [open, setOpen] = React.useState(false);
//     const [imgs, setImgs] = React.useState([])
//     React.useEffect(() => {
//         const urls = post.attachments.map(attachment => ({
//             original: attachment.url,
//             thumbnail: attachment.url + '?thumbnail'
//         }));
//         setImgs(urls);
//     }, [post.attachments,  change.change]);

//     const handlePostClick = () => {
//         setOpen(open ? false : true);
//     }

//     const handleDeletePost = async () => {
//         toast.loading("Deleting Post...");
//         await axios.delete(`http://localhost:3000/api/v1/post/delete/${post._id}`).then(res => {
//             console.log(res);
//             if (res.data.success === true) {
//                 toast.dismiss();
//                 toast.success(res.data.message);
//                 change.setChange(!change.change);
//                 // window.location.reload();
//             }
//             else {
//                 toast.dismiss();
//                 toast.error(res.data.message);
//             }
//         })
//         // toast.dismiss();
//     }

//     return (
//         <>
//             <div >
//                 <Box >
//                     <Stack style={{ padding: "2rem 1rem", cursor: "pointer", boxShadow: "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px" }} spacing={1} marginX={"6.5rem"} direction={"row"}>
//                         <Box paddingRight={"3rem"}>
//                             <img src={post.attachments[0].url} alt={post.title} style={{ borderRadius: "5px" }} width="450px" height="250px" />
//                         </Box>
//                         <Box>
//                             <Typography variant="h6" fontWeight={"bold"} color={"gray"} marginBottom={"1.5rem"}>{post.title}</Typography>
//                             <Typography variant="body2" color={"text.secondary"} marginBottom={"1.5rem"}>
//                                 {post.description.length > 300 ? `${post.description.substring(0, 300)}...` : post.description}
//                             </Typography>
//                             <Stack direction="row" gap={"1rem"} alignItems={"center"} marginBottom={"0.5rem"}>
//                                 <Avatar src={post.author.avatar.url} />
//                                 <Typography variant="body2" fontWeight={"bold"} color={"text.secondary"}>{post.author.name}</Typography>
//                             </Stack>
//                             <Typography>
//                                 Posted at: {post.createdAt?.substring(0, 10)}
//                             </Typography>
//                             <Button onClick={handleDeletePost}>
//                                 Delete Post
//                             </Button>
//                             <Button onClick={handlePostClick}>
//                                 Edit Post
//                             </Button>
//                         </Box>
//                     </Stack>
//                 </Box>
//             </div>
//             {/* <EditPost post={post}  /> */}
//         </>
//     )
// }

// const EditPost = ({ post }) => {
//     return (
//         <Modal
//             open={open}
//             onClose={handlePostClick}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//         >
//             <Stack spacing={1} sx={style} style={{ height: "88%", cursor: "pointer" }}>
//                 <Stack direction="row" alignItems={"center"} gap={"1rem"}>
//                     <Avatar src={post.author.avatar.url} />
//                     <Typography variant="body2" fontWeight={"bold"} color={"text.secondary"}>{post.author.name}</Typography>
//                     <Stack position={"absolute"} top={"2.5rem"} right={"2.5rem"} >
//                         <IconButton onClick={handleChatClick}>
//                             {(post.author._id !== user._id) && <ChatIcon />}
//                         </IconButton>
//                     </Stack>
//                 </Stack>

//                 <Typography variant="h6" fontWeight={"bold"}>{post.title}</Typography>
//                 <Box style={{ margin: "2rem 0", width: '100%', height: '28rem', overflow: 'auto' }}>
//                     <ImageGallery items={imgs} />
//                 </Box>

//                 <Box>
//                     <Typography variant="body2" color={"text.secondary"}>
//                         {post.description}
//                     </Typography>
//                 </Box>
//             </Stack>
//         </Modal>
//     )
// }

// export default MyPosts

import React, { useEffect } from 'react';
import { Box, Stack, Typography, Modal, Avatar, IconButton, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import ImageGallery from "react-image-gallery";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ChatIcon from '@mui/icons-material/Chat';

const MyPosts = () => {
    const [Posts, setPosts] = useState([]);
    const [change, setChange] = useState({}); // Add change state

    const { user } = useSelector((state) => state.auth);

    const getPosts = async () => {
        try {
            toast.loading("Getting Posts...");
            const response = await axios.get(`http://localhost:3000/api/v1/post/myposts/${user._id}`);
            setPosts(response.data.data);
            toast.dismiss();
            if (response.data.data.length === 0) {
                toast.error("No posts found...");
            }
            else {
                toast.success("Posts found successfully...");
            }
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div style={{ height: "90vh", overflow: "hidden" }}>
            <Typography sx={{ textAlign: 'center', fontSize: '3rem', mt: '2.5rem' }} fontWeight={"bolder"}>My Posts</Typography>
            <hr style={{ width: '75%', color: "gray" }} />
            <Stack spacing={3} sx={{ mb: '3rem', marginX: '5rem', height: '100%', overflow: 'auto', "&::-webkit-scrollbar": { display: 'none' }, }} >
                {
                    Posts.length <= 0 ? <Typography sx={{ textAlign: 'center', fontSize: '2.5rem', mt: '3rem' }} fontWeight={"bolder"}>No Posts</Typography> : Posts.map((post) => <PostListItem key={post._id} post={post} change={{ change, setChange }} />)
                }
            </Stack>
        </div>
    );
};

const PostListItem = ({ post, change }) => {
    const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = React.useState(false);
    const [imgs, setImgs] = React.useState([]);

    React.useEffect(() => {
        const urls = post.attachments.map(attachment => ({
            original: attachment.url,
            thumbnail: attachment.url + '?thumbnail'
        }));
        setImgs(urls);
    }, [post.attachments, change.change]);

    const handlePostClick = () => {
        setOpen(!open); // Toggle the state
    };

    const handleDeletePost = async () => {
        toast.loading("Deleting Post...");
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/post/delete/${post._id}`);
            console.log(res);
            if (res.data.success === true) {
                toast.dismiss();
                toast.success(res.data.message);
                change.setChange({ ...change, change: !change.change }); // Update the change state
            }
            else {
                toast.dismiss();
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
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
            {/* <EditPost post={post}  /> */}
        </>
    );
};

const EditPost = ({ post, open, handlePostClick }) => {
    return (
        <Modal
            open={open}
            onClose={handlePostClick}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Stack spacing={1} sx={style} style={{ height: "88%", cursor: "pointer" }}>
                <Stack direction="row" alignItems={"center"} gap={"1rem"}>
                    <Avatar src={post.author.avatar.url} />
                    <Typography variant="body2" fontWeight={"bold"} color={"text.secondary"}>{post.author.name}</Typography>
                </Stack>

                <Typography variant="h6" fontWeight={"bold"}>{post.title}</Typography>
                <Box style={{ margin: "2rem 0", width: '100%', height: '28rem', overflow: 'auto' }}>
                    <ImageGallery items={imgs} />
                </Box>

                <Box>
                    <Typography variant="body2" color={"text.secondary"}>
                        {post.description}
                    </Typography>
                </Box>
            </Stack>
        </Modal>
    );
};

export default MyPosts;
