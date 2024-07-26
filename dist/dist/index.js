"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _fetch_cars_from_db = _interopRequireDefault(require("./models/fetch_cars_from_db.mjs"));
var _create_car = _interopRequireDefault(require("./models/create_car.mjs"));
var _path = _interopRequireWildcard(require("path"));
var _url = require("url");
var _createImage = _interopRequireDefault(require("./models/createImage.mjs"));
var _uuid = require("uuid");
var _upload = _interopRequireDefault(require("./infrastracture/upload.mjs"));
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function (e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != typeof e && "function" != typeof e) return {
    default: e
  };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
      __proto__: null
    },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n.default = e, t && t.set(e, n), n;
}
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
const app = (0, _express.default)();
const port = 3000;
const _dirname = (0, _path.dirname)((0, _url.fileURLToPath)(import.meta.url));
app.use((0, _cors.default)({
  origin: ['http://10.50.90.120:3001', 'http://localhost:3000'],
  credentials: true
}));
app.use(_express.default.static(_path.default.join(_dirname, "../car-sales-project/car-sales-app1/car-sales-app/build/index.html")));
app.use(_express.default.json());
app.use("/uploads", _express.default.static(_path.default.join(process.cwd(), "uploads")));
app.get("/api/cars", async (req, res) => {
  try {
    const CARS = await (0, _fetch_cars_from_db.default)();
    res.json(CARS);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
});
app.get('/', (req, res) => {
  res.redirect('/api/cars');
});
app.post("/api/addCar", _upload.default.array("uploadedCarFile", 30), async (req, res) => {
  const fetchData = req.body;
  let modifiedFormData = {
    ...fetchData,
    id: (0, _uuid.v4)(),
    imageIndex: 0
  };
  
  try {
    let fileName = req.files.map(file => file.filename);
    
    await (0, _create_car.default)(fetchData, modifiedFormData);
    await (0, _createImage.default)(modifiedFormData, fileName);
    res.status(201).json({
      message: "Car added successfully!"
    });
  } catch (error) {
    console.error("Error in POST method", error);
    res.status(500).json({
      error: "Failed to add car"
    });
  } finally {
    modifiedFormData = {};
  }
});
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://10.50.90.120:${port}`);
});