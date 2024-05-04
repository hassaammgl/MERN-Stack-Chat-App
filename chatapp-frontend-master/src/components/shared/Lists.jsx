import React from 'react'
import { Box, Stack, Typography, Modal } from '@mui/material'
import { RxAvatar } from "react-icons/rx";

const Posts = [
    {
        title: 'Post 1',
        description: 'This is post 1 description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: "https://picsum.photos/200/300",
        author: {
            name: 'John Doe',
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "1"
        },
    },
    {
        title: 'Post 2',
        description: 'This is post 2 description. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis  ',
        image: "https://imgs.search.brave.com/iDw7aVRV00p0wmn0B_Dq0mZhD1FKz5YT1gyO2GkLYl8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTgy/NDY1MDk3L3Bob3Rv/L2h0bWwtY29kZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/cUlIWldfc3JaTkZI/RzVjamVrbGkwLU9T/UzRZbjlWSWNtcFl5/V19jS3B3MD0",
        author: {
            name: 'Jane Smith',
            avatar: "https://www.w3schools.com/howto/img_avatar2.png",
            _id: "2"
        },
    },
    {
        title: 'Post 3',
        description: 'This is post 3 description. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        image: "https://picsum.photos/200/302",
        author: {
            name: 'Bob Johnson',
            avatar: "https://www.w3schools.com/howto/img_avatar3.png",
            _id: "3"
        },
    },
    {
        title: 'Post 4',
        description: 'This is post 4 description. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: "https://picsum.photos/200/303",
        author: {
            name: 'Sarah Williams',
            avatar: "https://www.w3schools.com/howto/img_avatar4.png",
            _id: "4"
        },
    },
    {
        title: 'Post 5',
        description: 'This is post 5 description. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
        image: "https://picsum.photos/200/304",
        author: {
            name: 'Mark Davis',
            avatar: "https://www.w3schools.com/howto/img_avatar5.png",
            _id: "5"
        },
    },
    {
        title: 'Post 6',
        description: 'This is post 6 description. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        image: "https://picsum.photos/200/305",
        author: {
            name: 'Pat Johnson',
            avatar: "https://www.w3schools.com/howto/img_avatar6.png",
            _id: "6"
        },
    },
    {
        title: 'Post 7',
        description: 'This is post 7 description. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.',
        image: "https://picsum.photos/200/306",
        author: {
            name: 'Anne Baker',
            avatar: "https://www.w3schools.com/howto/img_avatar7.png",
            _id: "7"
        },
    },
    {
        title: 'Post 8',
        description: 'This is post 8 description. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.',
        image: "https://picsum.photos/200/307",
        author: {
            name: 'Tim Wilson',
            avatar: "https://www.w3schools.com/howto/img_avatar8.png",
            _id: "8"
        },
    },
    {
        title: 'Post 9',
        description: 'This is post 9 description. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        image: "https://picsum.photos/200/308",
        author: {
            name: 'Michelle Green',
            avatar: "https://www.w3schools.com/howto/img_avatar9.png",
            _id: "9"
        },
    },
    {
        title: 'Post 10',
        description: 'This is post 10 description. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: "https://picsum.photos/200/309",
        author: {
            name: 'Chris Jackson',
            avatar: "https://www.w3schools.com/howto/img_avatar10.png",
            _id: "10"
        },
    },
    {
        title: 'Post 11',
        description: 'This is post 11 description. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
        image: "https://picsum.photos/200/310",
        author: {
            name: 'Emily Wilson',
            avatar: "https://www.w3schools.com/howto/img_avatar11.png",
            _id: "11"
        },
    },
    {
        title: 'Post 12',
        description: 'This is post 12 description. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
        image: "https://picsum.photos/200/311",
        author: {
            name: 'Olivia Davis',
            avatar: "https://www.w3schools.com/howto/img_avatar12.png",
            _id: "12"
        },
    },
    {
        title: 'Post 13',
        description: 'This is post 13 description. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.',
        image: "https://picsum.photos/200/312",
        author: {
            name: 'Ava Jackson',
            avatar: "https://www.w3schools.com/howto/img_avatar13.png",
            _id: "13"
        },
    },
    {
        title: 'Post 14',
        description: 'This is post 14 description. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.',
        image: "https://picsum.photos/200/313",
        author: {
            name: 'Noah Green',
            avatar: "https://www.w3schools.com/howto/img_avatar14.png",
            _id: "14"
        },
    },
    {
        title: 'Post 15',
        description: 'This is post 15 description. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        image: "https://picsum.photos/200/314",
        author: {
            name: 'Logan Wilson',
            avatar: "https://www.w3schools.com/howto/img_avatar15.png",
            _id: "15"
        },
    },
]
const Lists = ({ category }) => {
    return (
        <div style={{ height: "90vh", overflow: "hidden" }}>
            <Typography sx={{ textAlign: 'center', fontSize: '3rem', mt: '3rem' }} fontWeight={"bolder"}>{category} Posts</Typography>
            <Stack spacing={2} sx={{ mt: '2rem', marginX: '5rem', height: '100%', overflow: 'auto', "&::-webkit-scrollbar": { display: 'none' }, }} >
                {
                    Posts.length <= 0 ? <Typography sx={{ textAlign: 'center', fontSize: '3rem', mt: '3rem' }} fontWeight={"bolder"}>No Posts</Typography> : Posts.map((post) => <PostListItem key={post.title} post={post} />)
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

    const [open, setOpen] = React.useState(false);

    const handlePostClick = () => {
        setOpen(open ? false : true);
    }

    return (
        <>
            <div style={{ borderBottom: "1px solid black", padding: "1.5rem 0rem" }}>
                <Box onClick={handlePostClick}>
                    <Stack spacing={1} direction={"row"}>
                        <Box paddingRight={"3rem"}>
                            <img src={post.image} alt={post.title} width="450px" height="250px" />
                        </Box>
                        <Box>
                            <Typography variant="h6" fontWeight={"bold"} color={"gray"}  marginBottom={"1.5rem"}>{post.title}</Typography>
                            <Typography variant="body2" color={"text.secondary"} marginBottom={"1.5rem"}>
                                {post.description.length > 300 ? `${post.description.substring(0, 300)}...` : post.description}
                            </Typography>
                            <Stack direction="row" gap={"1rem"} marginBottom={"0.5rem"}>
                                <RxAvatar height={"80px"} width={"80px"} />
                                {/* <img src={post.author.avatar} /> */}
                                <Typography variant="body2" fontWeight={"bold"}  color={"text.secondary"}>{post.author.name}</Typography>
                            </Stack>
                            <Typography>
                                {/* Created At: {new Date(post.createdAt).toLocaleString()}  */}
                                Created at: 4 May 2024
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </div>
            <Modal
                open={open}
                onClose={handlePostClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Stack spacing={1} direction={"row"} sx={style}>
                    <img src={post.image} alt={post.title} width="300" height="200px" />
                    <Box>

                        <Typography variant="h6" fontWeight={"bold"}>{post.title}</Typography>
                        <Typography variant="body2" color={"text.secondary"}>
                            {post.description}
                        </Typography>
                    </Box>
                    <Stack direction="row">
                        <img src={post.author.avatar} />
                        <Typography variant="body2" color={"text.secondary"}>{post.author.name}</Typography>
                    </Stack>
                </Stack>
            </Modal>
        </>
    )
}

export default Lists