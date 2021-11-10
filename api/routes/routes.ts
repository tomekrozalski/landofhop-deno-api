import { Router } from "oak";

import { authenticate } from "/api/middleware/authenticate.ts";
import { getBasics } from "./beverages/basics/getBasics.ts";
import { getDetails } from "./beverages/details/getDetails.ts";
import { getTotal } from "./beverages/getTotal.ts";
import { searchByPhrase } from "./beverages/searchByPhrase.ts";
import { getNotes } from "./beverages/admin/getNotes.ts";
import { getStats } from "./beverages/stats/getStats.ts";
import { authorize } from "./sessions/authorize.ts";
import { unauthorize } from "./sessions/unauthorize.ts";
import { verifyToken } from "./sessions/verifyToken.ts";
import { getInstitutions } from "./institutions/getIntitutions.ts";
import { addInstitution } from "./institutions/addInstitution.ts";
import { addBeverage } from "./beverages/admin/addBeverage/addBeverage.ts";
import { getPhotosData } from "./beverages/admin/getPhotosData.ts";
import { addBeverageCover } from "./beverages/admin/photos/addBeverageCover.ts";
import { removeBeverage } from "./beverages/admin/removeBeverage.ts";
import { addBeverageGallery } from "./beverages/admin/photos/addBeverageGallery.ts";
import { getAdminDetails } from "./beverages/admin/getAdminDetails/getAdminDetails.ts";
import { updateBeverage } from "./beverages/admin/updateBeverage.ts";
import { updateBasics } from "./beverages/admin/updateBasics.ts";
import { getPlaces } from "./places/getPlaces.ts";
import { addPlace } from "./places/addPlace.ts";
import { getIngredients } from "./ingredients/getIngredients.ts";
import { addIngredient } from "./ingredients/addIngredient.ts";
import { getStyles } from "./styles/getStyles.ts";
import { addStyle } from "./styles/addStyle.ts";
import { addBeverageCap } from "./beverages/admin/photos/addBeverageCap.ts";

const router = new Router();

router
  .get("/basics/:language?/:skip?/:limit?", getBasics)
  .get("/details/:language/:shortId/:brand/:name", getDetails)
  .get(
    "/admin/beverage/notes/:language/:shortId/:brand/:name",
    authenticate,
    getNotes
  )
  .get("/beverage/total", getTotal)
  .get("/beverage/search/:language/:phrase", searchByPhrase)
  .get("/beverage/stats/:language", getStats)
  .post("/authorize", authorize)
  .get("/unauthorize", unauthorize)
  .get("/verifyToken", authenticate, verifyToken)
  .get("/admin/institution", authenticate, getInstitutions)
  .post("/admin/institution", authenticate, addInstitution, getInstitutions)
  .post("/admin/beverage", authenticate, addBeverage)
  .get("/admin/beverage/photos/:shortId", authenticate, getPhotosData)
  .post("/admin/beverage/cover", authenticate, addBeverageCover)
  .delete("/admin/beverage/:shortId/:brand/:name", authenticate, removeBeverage)
  .post("/admin/beverage/gallery", authenticate, addBeverageGallery)
  .get("/admin/details/:shortId/:brand/:name", authenticate, getAdminDetails)
  .put(
    "/admin/beverage/:shortId/:brand/:name",
    authenticate,
    updateBeverage,
    updateBasics
  )
  .get("/admin/place", authenticate, getPlaces)
  .post("/admin/place", authenticate, addPlace, getPlaces)
  .get("/admin/ingredient", authenticate, getIngredients)
  .post("/admin/ingredient", authenticate, addIngredient, getIngredients)
  .get("/admin/style", authenticate, getStyles)
  .post("/admin/style", authenticate, addStyle, getStyles)
  .post("/admin/beverage/cap", authenticate, addBeverageCap);

export default router;
