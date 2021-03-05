define({ "api": [
  {
    "type": "delete",
    "url": "/api/posts/:id",
    "title": "",
    "name": "DeletePost",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>(number) The ID number of the post we're going to be deleting</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Deletion",
            "description": "<p>Successful</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP status 200\n{\n\"message\": \"Deletion Successful\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAuthorized",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FetchFailed",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP status 401\n{\n\"message\": \"Not authorized!\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP status 500\n{\n\"message\": \"Deleting post failed(server may be down?)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/posts.js",
    "groupTitle": "Posts"
  },
  {
    "type": "get",
    "url": "/api/posts?pgsz=2&pg=1",
    "title": "",
    "name": "GetPosts",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "pgsz",
            "description": "<p>PGSZ, short for Page Size controls how many posts the api will return</p>"
          },
          {
            "group": "Parameter",
            "optional": false,
            "field": "pg",
            "description": "<p>PG, short for Page controls which &quot;page&quot; of posts the api will return, in conjunction with PGSZ.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message:",
            "description": "<p>Posts fetched successfully!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP status 200\n{\n  \"message\": \"Posts fetched properly!\",\n  \"posts\": [\n    {\n      \"_id\": \"603eb923bdff774770aaa63c\",\n      \"title\": \"I am a post\",\n      \"content\": \"I contain many words\",\n      \"imagePath\": \"http://phpminor.duckdns.org:28902/images/example-1614723363364.png\",\n      \"creator\": \"60383facbb8a2d4fa464fd3e\",\n      \"__v\": 0\n    },\n    {\n      \"_id\": \"603ec0463b13d31eac9e04cb\",\n      \"title\": \"I am also a post\",\n      \"content\": \"I contain words too\",\n      \"imagePath\": \"http://phpminor.duckdns.org:28902/images/example-2-1614725190796.png\",\n      \"creator\": \"603e9f5535da9249247ac2f2\",\n      \"__v\": 0\n    }\n  ],\n  \"maxPosts\": 2\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "None.",
            "description": "<p>There is no error handling on the get route, any errors will result with a blank screen.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "A blank screen, a 500 error, or cannot resolve this url.",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/posts.js",
    "groupTitle": "Posts"
  },
  {
    "type": "put",
    "url": "/api/posts/:id",
    "title": "",
    "name": "GetSinglePost",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>(number) The ID number of the post we're going to be getting.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Only",
            "description": "<p>the post is returned</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP status 200\n{\n \"_id\": \"603eb923bdff774770aaa63c\",\n \"title\": \"I am a single post\",\n \"content\": \"I contain content, that is for sure\",\n \"imagePath\": \"http://phpminor.duckdns.org:28902/images/example-1614723363364.png\",\n \"creator\": \"60383facbb8a2d4fa464fd3e\",\n \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PostNotFound",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "FetchFailed",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP status 404\n{\n\"message\": \"Post not found(ID may be wrong)\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP status 500\n{\n\"message\": \"Fetching post failed(ID may be wrong)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/posts.js",
    "groupTitle": "Posts"
  },
  {
    "type": "put",
    "url": "/api/posts/:id",
    "title": "",
    "name": "UpdatePost",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "id",
            "description": "<p>(number) The ID number of the post we're going to be editing.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "Update",
            "description": "<p>succeeded!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP status 200\n{\n  \"message\": \"Update succeeded!\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UpdateFailed",
            "description": "<p>(NoAuth)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP status 401\n{\n  \"message\": \"Update post failed(you are unauthorized)\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP status 500\n{\n  \"message\": \"Update post failed(database may be down)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/posts.js",
    "groupTitle": "Posts"
  },
  {
    "type": "post",
    "url": "/api/posts",
    "title": "",
    "name": "UploadPost",
    "group": "Posts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "post",
            "description": "<p>[title: string, content: string, creator: number]</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "message:",
            "description": "<p>Post added successfully!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP status code 200\n{\n  \"message\": \"Post added successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CreateFailed",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP status code 500\n{\n\"message\": \"Creating a post failed(unknown error)\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "backend/routes/posts.js",
    "groupTitle": "Posts"
  }
] });
