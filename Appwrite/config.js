const config ={
    ApperiteUrl:String(import.meta.env.VITE_APPWRITE_URL),
    ApperiteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    ApperiteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABSE_ID),
    ApperiteCollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID)
}

export default config;