import ComicBookPage from "../models/Episode.model.js";
import * as paths from 'path';
import fs from 'fs'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadComicPage = async(req,res) => {
    try{
        const {comicBookId} = req.params;

        //Find last pageNumber
        const lastPage = await ComicBookPage.findOne({comicBookId}).sort({pageNumber: -1});
        const nextPageNumber = lastPage ? lastPage.pageNumber + 1 : 1;

        const newComicBookPage = new ComicBookPage({
            comicBookId: comicBookId,
            pageNumber: nextPageNumber,
            pdfFiles: req.files['pdfFiles'].map(file => ({
              path: file.path,
              contentType: file.mimetype
            })),
            images: req.files['images'].map(file => ({
              path: file.path,
              contentType: file.mimetype
            }))
          });
      
          // Save the new page to the database
          await newComicBookPage.save();
      
          res.status(201).json({ message: 'Comic book page uploaded successfully', newComicBookPage });

    } catch (err) {
        res.status(500).json({ message: 'Error uploading comic book page', error });

    }
}


export const getAllComicPage = async(req,res) => {
    try{
        const comics = await ComicBookPage.find().populate('comicBookId')
        if(!comics){
            return res.status(404).json({ message: 'No comic book pages found' });
        }
        res.status(200).json(comics);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comic book page', error });
    }
}


export const getPageById = async (req,res) => {
    try{
        const {id} = req.params;
        const comicPage = await ComicBookPage.findById(id).populate('comicBookId')
        if(!comicPage){
            return res.status(404).json({ message: 'Comic book page not found' });
        }
        res.status(200).json(comicPage);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comic book page', error });
    }
}


export const updateComicPage = async (req,res) => {
    try{
        const {comicBookId} = req.params;
        console.log(comicBookId,"here")
        const comicPage = await ComicBookPage.findOne({comicBookId:comicBookId});
        console.log(comicPage)
        if(!comicPage){
            return res.status(404).json({ message: 'Comic book page not found' });
        }
        console.log("imageeeee1")


        if (req.files['pdfFiles']) {
            const newPdfFiles = req.files['pdfFiles'].map(file => ({
                path: file.path,
                contentType: file.mimetype
            }));
            comicPage.pdfFiles.push(...newPdfFiles);  // Add new files to existing ones
        }

        if (req.files['images']) {
            console.log("imageeeee")
            const newImages = req.files['images'].map(file => ({
                path: file.path,
                contentType: file.mimetype
            }));
            comicPage.images.push(...newImages);  // Add new images to existing ones
        }

        if (req.body.pageNumber) {
            comicPage.pageNumber = req.body.pageNumber;
        }

        // Save the updated document
        await comicPage.save();

        res.status(200).json({ message: 'Comic book page updated successfully', comicPage });

    } catch (error) {
        res.status(500).json({ message: 'Error updating comic book page', error });
    }
}


export const imgdeletePageById = async (req, res) => {
    try {
        const {comicBookId, imageId} = req.params;

        // Find the comic book page by its ID
        const comicPage = await ComicBookPage.findOne({comicBookId:comicBookId});
        // console.log(comicPage)
        if (!comicPage) {
            return res.status(404).json({ message: 'Comic book page not found' });
        }

       console.log(comicPage,'comipage')

        // Find the index of the image to delete
        const imageIndex = comicPage.images.findIndex(image => image._id.toString() === imageId);
        if (imageIndex === -1) {
            return res.status(404).json({ message: 'Image not found' });
        }
        console.log(imageIndex,'qwe')

        if(comicPage && comicPage.images){
            console.log(comicPage.images[imageIndex])
            console.log(imageIndex,'qwe')

            const comicAppPath = paths.resolve(__dirname,'..','..');
            console.log(comicAppPath,'comapth')
            const imageToDelete = paths.join(comicAppPath,comicPage.images[imageIndex].path)

            console.log(imageToDelete,"here"); // Absolute path should be logged
            if (fs.existsSync(imageToDelete)) { 
                console.log('File exists, deleting...');
                fs.unlinkSync(imageToDelete);
              } else {
                console.log('File does not exist, skipping deletion');
              }


        }

        
        // // Remove the image from the filesystem
        // const imagePath = comicPage.images[imageIndex].path;
        // deleteFile(imagePath);

        // // Remove the image from the images array
        comicPage.images.splice(imageIndex, 1);



        // // Save the updated comic book page
        await comicPage.save();

        res.status(200).json({ message: 'Image deleted successfully', comicPage });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting image', error });
    }
};


export const pdfdeletePageById = async (req, res) => {
    try {
        const {comicBookId, pdfId} = req.params;

        // Find the comic book page by its ID
        const comicPage = await ComicBookPage.findOne({comicBookId:comicBookId});
        console.log(comicPage)
        if (!comicPage) {
            return res.status(404).json({ message: 'Comic book page not found' });
        }

        // Find the index of the image to delete
        const pdfIndex = comicPage.pdfFiles.findIndex(pdf => pdf._id.toString() === pdfId);
        if (pdfIndex === -1) {
            return res.status(404).json({ message: 'Image not found' });
        }
        console.log(pdfIndex,'qwe')

        // // Remove the image from the filesystem
        // const imagePath = comicPage.images[imageIndex].path;
        // deleteFile(imagePath);


        
        if(comicPage && comicPage.pdfFiles){
            console.log(comicPage.pdfFiles[pdfIndex])
            console.log(pdfIndex,'qwe')

            const comicAppPath = paths.resolve(__dirname,'..','..');
            console.log(comicAppPath,'comapth')
            const pdfToDelete = paths.join(comicAppPath,comicPage.pdfFiles[pdfIndex].path)

            console.log(pdfToDelete,"here"); // Absolute path should be logged
            if (fs.existsSync(pdfToDelete)) { 
                console.log('File exists, deleting...');
                fs.unlinkSync(pdfToDelete);
              } else {
                console.log('File does not exist, skipping deletion');
              }


        }


        // // Remove the image from the images array
        comicPage.pdfFiles.splice(pdfIndex, 1);

        // // Save the updated comic book page
        await comicPage.save();

        res.status(200).json({ message: 'PDF deleted successfully', comicPage });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting image', error });
    }
};


export const deleteEntireData = async (req,res) => {
    try{
        const {id} = req.params
        await ComicBookPage.findByIdAndDelete(id)
       
        res.status(200).json({message: 'Comic book deleted successfully'})
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error });
    }
}