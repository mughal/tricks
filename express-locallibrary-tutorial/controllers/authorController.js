const { body, validationResult} = require("express-validator");
const Book = require("../models/book");
const Author = require("../models/author");
const asyncHandler = require("express-async-handler");

// Display list of all Authors.
// Display list of all Authors.
exports.author_list = asyncHandler(async (req, res, next) => {
    const allAuthors = await Author.find().sort({ family_name: 1 }).exec();
    res.render("author_list", {
      title: "Author List",
      author_list: allAuthors,
    });
  });
  

// Display detail page for a specific Author.
// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
    // Get details of author and all their books (in parallel)
    const [author, allBooksByAuthor] = await Promise.all([
      Author.findById(req.params.id).exec(),
      Book.find({ author: req.params.id }, "title summary").exec(),
    ]);
  
    if (author === null) {
      // No results.
      const err = new Error("Author not found");
      err.status = 404;
      return next(err);
    }
  
    res.render("author_detail", {
      title: "Author Detail",
      author: author,
      author_books: allBooksByAuthor,
    });
  });
  

// Display Author create form on GET.
exports.author_create_get = (req, res, next) => {
  res.render("author_form", {title: "Create Author"});
};

// Handle Author create on POST.
exports.author_create_post = [
    //Validate and Sanitize fields
    body("first_name")
      .trim()
      .isLength({ min: 1})
      .escape()
      .withMessage("First Name must be specified")
      .isAlphanumeric()
      .withMessage("First Name has non Alpha Numeric Characters"),
    
    body("family_name")
      .trim()
      .isLength({ min: 1})
      .escape()
      .withMessage("Family Name must be specified")
      .isAlphanumeric()
      .withMessage("Family Name has non Alpha Numeric Characters"),

    body("date_of_birth", "Invalid date of birth")
      .optional({values: "falsy"})
      .isISO8601()
      .toDate(),
    
    body("date_of_death", "Invalid date of death")
      .optional({values: "falsy"})
      .isISO8601()
      .toDate(),
    
    //Process after validation and Sanitization
    asyncHandler(async (req, res, next) => {
      //Extract validation errors from a request
      const errors = validationResult(req);

      //Create Author object
      const author = new Author ({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      });

      if (!errors.isEmpty()){
        res.render("author_form", {
          title: "Create Author",
          author: author,
          errors: errors.array(),
        });
        return;
      } else {
        await author.save();
        res.redirect(author.url);
      }
      
    }),
];

// Display Author delete form on GET.
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
});

// Handle Author delete on POST.
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
});

// Display Author update form on GET.
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update GET");
});

// Handle Author update on POST.
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Author update POST");
});
