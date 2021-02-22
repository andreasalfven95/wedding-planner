module.exports = {
  //From where can images be fetched
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    BASE_URL: 'http://localhost:3000',
    MONGODB_URL:
      'mongodb+srv://andreasalfven95:1nkRt0vMd8AEYVgI@cluster0.eryrr.mongodb.net/wed_plan?retryWrites=true&w=majority',
    ACCESS_TOKEN_SECRET: ']%3x&-{rpgVq)bWryBtCk[~Ng:}wF9Y35t}vudN$8mW^~TB2Df',
    REFRESH_TOKEN_SECRET:
      "N^5W~;n^z:mVWcj!vf8Sp_;'dp^>XEAjkrAG$y`&JZKyDA5`gK;CX#BwqyK{v9q,-wq>uTbx5L(^`6",
    CLOUD_UPDATE_PRESET: 'wedding_plan',
    CLOUD_NAME: 'andreas-alfven',
    CLOUD_API: 'https://api.cloudinary.com/v1_1/andreas-alfven/image/upload',
  },
}
