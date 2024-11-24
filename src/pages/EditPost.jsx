import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import service from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                try {
                    const fetchedPost = await service.getPost(slug);
                    if (fetchedPost) {
                        setPost(fetchedPost);
                    } else {
                        navigate('/');
                    }
                } catch (error) {
                    console.error("Error fetching post:", error);
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        };

        fetchPost();
    }, [slug, navigate]);

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
