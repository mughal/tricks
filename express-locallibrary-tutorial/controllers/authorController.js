import Author from "../models/author.js";
import asyncHandler from "express-async-handler";

const author = new Author("yasir", "mirza");
const author_list = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Author List ${author}`);
});

const author_detail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author Detail: ${req.param.id");
});

const author_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author Create Get");
});

const author_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author Create post");
});

const author_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete GET");
});

const author_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author delete POST");
});

const author_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author Update GET");
});

const author_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Author Update POST");
});

exports.module = {
    author_list,
    author_detail,
    author_create_get,
    author_create_post,
    author_delete_get,
    author_delete_post,
    author_update_get,
    author_update_post
};
