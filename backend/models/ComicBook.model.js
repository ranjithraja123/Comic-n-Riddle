import mongoose from "mongoose";
const {Schema} = mongoose;


const comicBookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },
      author: {
        type: String,
        required: true,
        trim: true
      },
      genre: {
        type: String,
        required: true,
        trim: true
      },
    //   publicationDate: {
    //     type: Date,
    //     required: true
    //   },
    coverImage: {
        type: String, 
        // required: true
    },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      description: {
        type: String,
        trim: true
      },
      episodes: {
        type: Schema.Types.ObjectId,
        ref: 'ComicBookPage',
        // required: true
    },

},{timestamps:true});

const ComicBook = mongoose.model('ComicBook', comicBookSchema);
export default ComicBook;

