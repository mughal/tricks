import BookInstance from "../models/bookinstance.js";
import asyncHandler from "express-async-handler";

const bookinstance = new bookinstance("yasir", "mirza");
const bookinstance_list = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: bookinstance List ${bookinstance}`);
});

const bookinstance_detail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: bookinstance Detail: ${req.param.id");
});

const bookinstance_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: bookinstance Create Get");
});

const bookinstance_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: bookinstance Create post");
});

const bookinstance_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: bookinstance delete GET");
});

const bookinstance_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: bookinstance delete POST");
});

const bookinstance_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: bookinstance Update GET");
});

const bookinstance_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: bookinstance Update POST");
});

exports.module = {
    bookinstance_list,
    bookinstance_detail,
    bookinstance_create_get,
    bookinstance_create_post,
    bookinstance_delete_get,
    bookinstance_delete_post,
    bookinstance_update_get,
    bookinstance_update_post
};
