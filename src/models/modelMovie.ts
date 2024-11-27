import mongoose, { Document, Schema } from 'mongoose';




interface IMovie extends Document {

    rank : string;
    title : string;
    description: string;
    image: string;
    big_image: string;
    genre : string[];
    thumbnail: string;
    rating : number;
    id: string;
    year: number;
    imdbid: string;
    imdb_link: string;

}


const MovieSchema: Schema = new Schema({

        title: {
            type: String,
            required: false,
            trim: true
        },
        rank: {
            type: String,
            required: false,
            trim: true
        },
        description: {
            type: String,
            required: false,
            trim: true
        },
        image: {
            type: String,
            required: false,
            trim: true
        },
        big_image: {
            type: String,
            required: false,
            trim: true
        },
        thumbnail: {
            type: String,
            required: false,
            trim: true
        },
        id: {
            type: String,
            required: false,
            trim: true
        },
        year: {
            type: Number,
            required: false,
            trim: true
        },
        imdbid: {
            type: String,
            required: false,
            trim: true
        },
        imdb_link: {
            type: String,
            required: false,
            trim: true
        },
        rating: {
            type: Number,
            required: false,
            trim: true
        },
        createAt: {
            type: Number,
            default: Date.now
        },
        genre: {
            type: [String], 
            required: false
        },
        

        isDeleted: {
            type: Boolean,
            default: false  
        },
    },
    {
        timestamps: true,
    }
);


// const MovieModel = mongoose.model<IMovie>('Movie', MovieSchema,'Movie');

// export default MovieModel;

const MovieModel = mongoose.models.Movie || mongoose.model<IMovie>('Movie', MovieSchema, 'Movie');

export default MovieModel;
