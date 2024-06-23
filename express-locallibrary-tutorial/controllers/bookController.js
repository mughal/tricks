import Book from "../models/book";
import asyncHandler from "express-async-handler";

const book = new book("yasir", "mirza");

const index = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Site Home Page`);
});

const book_list = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: book List ${book}`);
});

const book_detail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: book Detail: ${req.param.id");
});

const book_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: book Create Get");
});

const book_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: book Create post");
});

const book_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: book delete GET");
});

const book_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: book delete POST");
});

const book_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: book Update GET");
});

const book_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: book Update POST");
});

exports.module = {
    index,
    book_list,
    book_detail,
    book_create_get,
    book_create_post,
    book_delete_get,
    book_delete_post,
    book_update_get,
    book_update_post
};


