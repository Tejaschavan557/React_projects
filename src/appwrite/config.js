import conf from '../conf/conf.js'
import {Client,ID,Databases,Storage, Query,} from "appwrite"
const { appwriteUrl, appwriteProjectId ,} = conf;

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(appwriteUrl)
        .setProject(appwriteProjectId)
        this.databases= new Databases(this.client)
        this.bucket=new Storage(this.client)
    }
    // methods for creating Posts
    
    async createPost({title,slug,content,FeaturedImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    FeaturedImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }

    }
    async updatePost(slug,{title,content,FeaturedImage,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDataBaseId,conf.appwriteCollectionId,slug,{
                title,content,FeaturedImage,status
            })
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }

    }
    
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument( 
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
        }
    }
    async getposts(queries=[Query.equal("status","active")])
    {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwriteCollectionId,
                
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )

    }
}

const service = new Service();
export default service;