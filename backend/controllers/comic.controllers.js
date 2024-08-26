import express from 'express';
import ComicBook from '../models/ComicBook.model.js';
import upload from '../Multer/multerConfig.js';
import ComicBookPage from '../models/Episode.model.js';
import * as paths from 'path';
import fs from 'fs'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router()

export const addComic = async (req, res) => {
  try {
    const { title, author, genre, userId, description } = req.body;
    const coverImage = req.file ? req.file.path : null;

    const newComicBook = new ComicBook({
      title,
      author,
      genre,
      coverImage,
      userId,
      description
    });

    await newComicBook.save();
    res.status(201).json({ message: 'Comic book created successfully', newComicBook });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create comic book', error });
  }
};


export const getComic = async (req, res) => {
  try {
    const comic = await ComicBook.find();
    res.status(200).json(comic);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get comic book', error: err })
  }
}

export const getComicById = async (req, res) => {
  try {
    const id = req.params.id;
    const comic = await ComicBook.findById(id);
    const pages = await ComicBookPage.find({ comicBookId: id })
    console.log(pages, "pages")
    res.status(200).json({
      comic,
      episodes: pages
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get comic book', error: err })
  }
}


export const updateComicById = async (req, res) => {

  try {
    console.log('Directory name:', __dirname); // Log directory name here

    const id = req.params.id;

    // Find the existing comic to get the current cover image path
    const existingComic = await ComicBook.findById(id);
    if (!existingComic) {
      return res.status(404).json({ message: 'Comic book not found' });
    }

    // Check if there's a new cover image uploaded via form-data
    const coverImage = req.file ? req.file.path : null;
    // If a new cover image is uploaded, delete the old one from the uploads directory
    if (coverImage && existingComic.coverImage) {
      // Log the existing comic object to see what's being passed
      console.log(existingComic, "log");

      // Construct the absolute path for the old cover image
      const comicAppPath = paths.resolve(__dirname, '..', '..');

      // If you want to join it with a specific file or directory in comicApp:
      const oldCoverImagePath = paths.join(comicAppPath, existingComic.coverImage);

      // Log the absolute path to ensure it's correct
      console.log(oldCoverImagePath, "here"); // Absolute path should be logged

      // Check if the file exists before attempting to delete
      if (fs.existsSync(oldCoverImagePath)) {
        console.log('File exists, deleting...');
        fs.unlinkSync(oldCoverImagePath);
      } else {
        console.log('File does not exist, skipping deletion');
      }
    }

    // Create an object with the fields to update
    const updateData = {
      ...req.body, // Spread the body to include all other fields
    };

    // console.log(updateData,'imhere')

    if (coverImage) {
      updateData.coverImage = coverImage;
    }

    const comic = await ComicBook.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json(comic);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update comic book', error: err });
  }
};


export const deleteById = async (req, res) => {
  try {
    const id = req.params.id;

    const comicPage = await ComicBookPage.findOne({ comicBookId: id })
    console.log(comicPage, "cPage")

    const comicBook = await ComicBook.findById(id)
    console.log(comicBook, "Book")

    const comicAppPath = paths.resolve(__dirname, '..', '..');

    

    if (comicPage && comicPage.pdfFiles) {
      const AllpdfFiles = comicPage.pdfFiles
      AllpdfFiles.forEach((item) => {
        console.log(item, 'check')
        let pdfFilePath = paths.join(comicAppPath, item.path)
        if (fs.existsSync(pdfFilePath)) {
          console.log('File exists, deleting...');
          fs.unlinkSync(pdfFilePath);
        } else {
          console.log('File does not exist, skipping deletion');
        }

      })
    }

    if(comicPage && comicPage.images){
      const AllimgFiles = comicPage.images
      AllimgFiles.forEach((item) => {
        console.log(item, 'check')
        let imgFilePath = paths.join(comicAppPath, item.path)
        if (fs.existsSync(imgFilePath)) {
          console.log('File exists, deleting...');
          fs.unlinkSync(imgFilePath);
        } else {
          console.log('File does not exist, skipping deletion');
        }
      })

    }

    if(comicBook && comicBook.coverImage) {
      const coverPhoto = paths.join(comicAppPath,comicBook.coverImage)

      if (fs.existsSync(coverPhoto)) { 
        console.log('File exists, deleting...');
        fs.unlinkSync(coverPhoto);
      } else {
        console.log('File does not exist, skipping deletion');
      }
    }




    await ComicBook.findByIdAndDelete(id);
    await ComicBookPage.deleteMany({comicBookId:id})
    res.status(200).json({message:'Deleted Successfully'})
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comic book', error: err })
  }
}



export default router;
