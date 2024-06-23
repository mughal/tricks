import Genre from "../models/genre.js";
import asyncHandler from "express-async-handler";

const genre = new Genre("yasir", "mirza");
const genre_list = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: genre List ${genre}`);
});

const genre_detail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre Detail: ${req.param.id");
});

const genre_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre Create Get");
});

const genre_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre Create post");
});

const genre_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre delete GET");
});

const genre_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre delete POST");
});

const genre_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre Update GET");
});

const genre_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: genre Update POST");
});

exports.module = {
    genre_list,
    genre_detail,
    genre_create_get,
    genre_create_post,
    genre_delete_get,
    genre_delete_post,
    genre_update_get,
    genre_update_post
};
