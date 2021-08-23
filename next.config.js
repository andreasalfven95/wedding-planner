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
    PLACES_API_URL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDP_RH7igmMV9aDg3qdGafju2UByCafNnA&libraries=places',
  },
}

/* module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
  //From where can images be fetched
  images: {
    domains: ['res.cloudinary.com'],
  },
  future: { webpack5: true },
  webpack5: true,
} */
