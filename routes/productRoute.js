const express=require("express");
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteReview,
    getAdminProducts,
    getSellerProducts
  } = require("../controllers/productController");
  const { isAuthenticatedUser, authorizeRoles, } = require("../middleware/auth");


const router=express.Router(); 

router.route("/products").get(getAllProducts);
router
  .route("/seller/products")
  .get(isAuthenticatedUser, authorizeRoles("seller"), getSellerProducts);

  router.route("/seller/product/new").post(isAuthenticatedUser,authorizeRoles("seller"),createProduct);

  
router.route("/seller/product/:id")
.put(isAuthenticatedUser,authorizeRoles("seller"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("seller"),deleteProduct)
.get(getProductDetails)

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);


router.route("/admin/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router.route("/admin/product/:id")
    .put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
    .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
    .get(getProductDetails)

router.route("/product/:id").get(getProductDetails);
router.route("/reviews").put(isAuthenticatedUser, createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview)


module.exports=router