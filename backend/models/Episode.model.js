import mongoose from "mongoose";
const { Schema } = mongoose;

const comicBookPageSchema = new Schema({
  comicBookId: {
    type: Schema.Types.ObjectId,
    ref: 'ComicBook',
    required: true
  },
  pageNumber: {
    type: Number,
    required: true
  },
  pdfFiles: [
    {
      path: String,
      contentType: String
    }
  ],
  images: [
    {
      path: String,
      contentType: String
    }
  ]
});

const ComicBookPage = mongoose.model('ComicBookPage', comicBookPageSchema);

export default ComicBookPage;