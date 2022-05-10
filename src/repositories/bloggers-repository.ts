import {Bloggers, bloggersCollection} from "./db";

export const bloggersRepository = {
    async getBloggers() {
        const bloggers = await bloggersCollection
            .find({}, {projection: {_id:0}})
            .toArray()
        return bloggers
    },
    async getBloggersById(id: number) {
        const bloggerById = await bloggersCollection.findOne({id})
        if (bloggerById) {
            return {
                id: bloggerById.id,
                name: bloggerById.name,
                youtubeUrl: bloggerById.youtubeUrl
            }
        } else {
            return false
        }
    },
    async deleteBloggerById(id: number) {
        const delBlog = await bloggersCollection.deleteOne({id})
        return delBlog.deletedCount === 1
    },
    async updateBloggerById(id: number, name: string, youtubeUrl: string) {
        const updBlog = await bloggersCollection.findOneAndUpdate(
            {id}, {
                $set: {
                    "name": name,
                    "youtubeUrl": youtubeUrl
                }
            })
        return updBlog.value
    },
    async createBlogger(newBlogger: Bloggers) {
        await bloggersCollection.insertOne(newBlogger, {forceServerObjectId: true})
        return newBlogger
    }

}

