"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var request_1 = __importDefault(require("request"));
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
// Replace with your TMDB API key
var apiKey = 'YOUR_TMDB_API_KEY';
app.get('/search', function (req, res) {
    var query = req.query.q; // Get search query from URL parameter
    if (!query) {
        return res.status(400).send('Missing search query');
    }
    var url = "https://api.themoviedb.org/3/search/movie?api_key=".concat(apiKey, "&query=").concat(query);
    (0, request_1.default)(url, function (error, response, body) {
        if (error) {
            console.error('Error fetching data from TMDB API:', error);
            return res.status(500).send('Internal Server Error');
        }
        var data = JSON.parse(body); // Need type assertion due to dynamic data
        res.json(data.results); // Send search results as JSON response
    });
});
app.listen(port, function () {
    console.log("Server listening on port ".concat(port));
});
