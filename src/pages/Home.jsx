import React,{useEffect,useState} from 'react'
import service from '../appwrite/config'
import { Container,PostCard } from '../components'
function Home() {
    const[posts,setposts]=useState([])
    useEffect(()=>{service.getposts([]).then((posts)=>{
        if(posts){
            setposts(posts.documents)
        }
    })
    },[])
    
 if(posts.length === 0){
    return (
        <div className='w-full py-8 mt-8 text-center'>
            <Container>
                <div className='flex flex-wrap'>
                    <div className='p-2 w-full'>
                        <h2 className='text-2xl font-bold hover:text-gray-500'>
                            Login to read posts
                        </h2>

                    </div>
                </div>
            </Container>
        </div>
    )

 }
 return(
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    
                    <div>
                        <PostCard {...post}/>
                    </div>
                    
                ))}
            </div>
        </Container>
    </div>
 )
}

export default Home